import {GraphQLClient, gql} from 'graphql-request';
import Format from '../../layout/format';
import { useRouter } from 'next/router'
import { Loader } from '../../components';

const graphcms = new GraphQLClient(
  "https://api-us-east-1-shared-usea1-02.hygraph.com/v2/cll6qjzv804qm01um9wvpgn63/master"
)

const QUERY = gql`
    query Post($slug: String!){
        post(where: {slug: $slug}){
           id 
           title
           slug
           datePublished  # Remove the comma here
           author{
            id 
            name 
            avatar {
                url
            }
        }
        content{
            html
        }
        coverPhoto{
            id 
            url
        }
    }
}
`;


const SLUGLIST = gql`
    {
        posts {
            slug
        }
    }
`

export async function getStaticPaths() {
    const {posts} = await graphcms.request(SLUGLIST);
    return{
        paths: posts.map((post) => ({ params: { slug: post.slug } })),
        fallback: true, 
    };
}

export async function getStaticProps({ params }) {
  const slug = params.slug; 
  const data = await graphcms.request(QUERY, { slug });
  const post = data.post;
  return {
    props: {
      post, 
    },
    revalidate: 10,
  };
}


export default function BlogPost({ post }) {
    const router = useRouter();

    if(router.isFallback) {
        return <Loader />
    }
    return (
        <Format>
            <div className="px-5 py-8 md:px-20">
                <div className="relative overflow-hidden h-[25vh]">
                    <div className="h-1/4 w-full absolute top-0 left-0">
                        <img src={post.coverPhoto.url} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-center absolute w-full top-1/4">
                        <p className="text-3xl md:text-5xl font-bold text-gray-600">{post.title}</p>
                    </div>
                </div>
                <div className="text-gray-500 py-8">
                    <p dangerouslySetInnerHTML={{ __html: post.content.html }}></p>
                </div>
                <div className="flex items-center py-5">
                    <img src={post.author.avatar.url} width={60} height={60} className="rounded-full mr-4" />
                    <h1 className="text-md font-bold text-gray-800">{post.author.name}</h1>
                </div>
                <div className="text-cleft text-orange-600 py-1">
                    <p>Published {post.datePublished}</p>
                </div>
            </div>
        </Format>
    );
}

