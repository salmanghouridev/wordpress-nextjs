import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';

export const getServerSideProps = async ({ params }) => {
  const { slug } = params;
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/posts?_embed&slug=${slug}`);
  const [post] = await response.json();

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
  };
};

export default function BlogPost({ post }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Head>
        <title>{post.title.rendered}</title>
        <meta name="description" content={post.excerpt.rendered} />
      </Head>

      <h1>{post.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />

      {/* Display the featured image if available */}
      {post._embedded && post._embedded['wp:featuredmedia'] && (
        <Image
          src={post._embedded['wp:featuredmedia'][0].source_url}
          alt="Featured Image"
          loading="lazy"
          width={600}
          height={400}
        />
      )}
    </div>
  );
}
