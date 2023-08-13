import {GraphQLClient, gql} from 'graphql-request';
import Format from '../../layout/format';
import { useRouter } from 'next/router'
import { Loader } from '../../components/Loader';

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
            <div className="px-5 py-8 md:px-20"> {/* Padding around the content */}
                <div className="flex items-center justify-between mb-5">
                    <div className="w-1/2 pr-5"> {/* Left column */}
                        <p className="text-3xl md:text-5xl font-bold text-gray-600 hover:text-gray-800">{post.title}</p>
                    </div>
                    <div className="w-1/2"> {/* Right column */}
                        <img src={post.coverPhoto.url} alt="" className="mx-auto" width={600} height={600} />
                    </div>
                </div>
                <div className="text-gray-500 py-8">
                    <p dangerouslySetInnerHTML={{ __html: post.content.html }}></p>
                </div>
                <div className="flex items-center py-5">
                    <img src={post.author.avatar.url} width={60} height={60} className="rounded-full mr-4" />
                    <h1 className="text-md font-bold text-gray-800">{post.author.name}</h1>
                </div>
                <div className="text-center text-orange-600 py-3">
                    <p>Published {post.datePublished}</p>
                </div>
            </div>
        </Format>
    );
}

