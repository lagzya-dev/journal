import { GetServerSideProps, NextPage } from 'next'
import {
  GetPost,
  GetPostQuery,
  GetPostVariables,
  PostReader,
} from 'entities/posts'
import { client } from 'shared/api'
import { Helmet } from 'shared/lib/helmet'

const Post: NextPage<GetPost> = ({ post }) => (
  <>
    <Helmet
      description={post.description}
      image={post.previewUrl || undefined}
      title={post.title}
    />

    <PostReader
      {...post}
      previewUrl={post.previewUrl || undefined}
      publicationDate={post.createdAt}
      tags={post.tags?.map((tag) => tag.name)}
    />
  </>
)

export const getServerSideProps: GetServerSideProps<{
  post: GetPost['post']
}> = async ({ query }) => {
  const { data } = await client.query<GetPost, GetPostVariables>({
    query: GetPostQuery,
    variables: { uid: query.uid?.toString() ?? '' },
    fetchPolicy: 'no-cache',
  })

  return {
    props: { post: data.post },
  }
}

export default Post
