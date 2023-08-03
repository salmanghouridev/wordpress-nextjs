import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function BlogList({ posts }) {
  if (!posts || !Array.isArray(posts)) {
    return <p>No posts available.</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">WordPress Blog Posts</h1>
      <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {posts.map((post) => (
          <li key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <article className="p-4">
              {post._embedded && post._embedded['wp:featuredmedia'] && (
                <Image
                  src={post._embedded['wp:featuredmedia'][0].source_url}
                  alt="Featured Image"
                  loading="lazy"
                  width={600}
                  height={400}
                />
              )}
              <div>
                <h2 className="text-lg font-semibold mb-2">{post.title.rendered}</h2>
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                />
                <Link href={`/blog/${post.slug}`} passHref>
                  <a className="text-blue-500 hover:underline mt-2 inline-block">Read More</a>
                </Link>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
