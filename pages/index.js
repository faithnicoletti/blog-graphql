import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {GraphQLClient, gql} from 'graphql-request';
import BlogCard from '../components/BlogCard';
import Format from '../layout/format';

const graphcms = new GraphQLClient(
  "https://api-us-east-1-shared-usea1-02.hygraph.com/v2/cll6qjzv804qm01um9wvpgn63/master"
)

const QUERY = gql`
  {
    posts {
      id, 
      title,
      datePublished, 
      slug, 
      content {
        html
      }
      author {
        name,
        avatar {
          url
        }
      }
      coverPhoto {
          url
        }
      }
    }
`;

export async function getStaticProps() {
  const { posts } = await graphcms.request(QUERY);
  return {
    props: {
      posts, 
    },
    revalidate: 10,
  };
}

export default function Home ({ posts }) { 
  return (
    <Format>
      <div className={styles.container}>
      <main className={styles.main}>
        {posts.map((post) => (
          <BlogCard 
          title={post.title} 
          author={post.author} 
          coverPhoto={post.coverPhoto}
          key={post.id}
          datePublished={post.datePublished}
          slug={post.slug}
          />
        ))}
      </main>
      </div>
  </Format>
  )
}
