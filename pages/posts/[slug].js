import {GraphQLClient, gql} from 'graphql-request';
import Format from '../../layout/format';
import Link from 'next/link';
// import ReactHtmlParser from 'react-html-parser';

const graphcms = new GraphQLClient(
  "https://api-us-east-1-shared-usea1-02.hygraph.com/v2/cll6qjzv804qm01um9wvpgn63/master"
)

const QUERY = gql`
    query Post($slug: String!){
        post(where: {slug: $slug}){
           id 
           title
           excerpt
           slug
           datePublished
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
        fallback: false, 
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
  return (
    <Format>
      <div className="px-5 py-3 md:px-20">
        <Link href="/" className="text-orange-300 text-sm hover:text-orange-600 cursor-pointer">
          {'< Back to Main Page'}
        </Link>
        <br />
      </div>
      <div className="px-5 py-8 md:px-20">
        {/* Display the image on top */}
        <div className="mb-4">
          <img src={post.coverPhoto.url} alt="" className="mx-auto" width={800} height={800} />
        </div>
        <div className="text-center">
          {/* Display the title */}
          <div className="text-3xl md:text-5xl font-bold text-gray-800 mb-2">{post.title}</div>
          <br />
          {/* Display the excerpt */}
          <p className="text-lg text-gray-500">{post.excerpt}</p>
        </div>
        
        <hr className="my-8 border-t border-gray-300" />

        {/* Display the content */}
        <div className="content-indent">
          <div dangerouslySetInnerHTML={{ __html: post.content.html }}></div>
        </div>
        
        {/* Display the author and date info */}
        <div className="text-left text-orange-600 py-3">
          <p>Published {post.datePublished}</p>
        </div>
        <div className="flex items-center py-3">
          <img src={post.author.avatar.url} className="rounded-full mr-4" style={{ width: '40px', height: '40px' }} />
          <h1 className="text-md font-bold text-orange-800">{post.author.name}</h1>
        </div>
      </div>
    </Format>
  );
}
  

