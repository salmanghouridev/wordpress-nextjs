import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import PropertyList from './PropertyList';

import Link from 'next/link'
const inter = Inter({ subsets: ['latin'] })

export default function Home({ posts, properties }) {
  return (
    <div>
      <Head>
        <title>Home Page</title>
      </Head>
      <div>
        <h1>WordPress Blog Posts</h1>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h2>{post.title.rendered}</h2>
              <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
              <Link href={`/blog/${post.slug}`} passHref>
                Read More
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <PropertyList properties={properties} />
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const postsResponse = await fetch(process.env.NEXT_PUBLIC_API_URL + `/posts?_embed&order=desc&per_page=10&status=publish`);
  const propertiesResponse = await fetch(process.env.NEXT_PUBLIC_API_URL + `/properties?_embed&order=desc&per_page=10&status=publish`);
  

  const posts = await postsResponse.json();
  const properties = await propertiesResponse.json();

  return {
    props: {
      posts,
      properties,
    },
  };
};