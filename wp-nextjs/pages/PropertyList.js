import Link from 'next/link';

export default function PropertyList({ properties }) {
  return (
    <div>
      <h1>Properties</h1>
      <ul>
        {properties.map((property) => (
          <li key={property.id}>
            <h2>{property.title.rendered}</h2>
            <div dangerouslySetInnerHTML={{ __html: property.content.rendered }} />
            <Link href={`/properties/${property.slug}`} passHref>
              Read More
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
