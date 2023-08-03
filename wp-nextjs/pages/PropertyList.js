import Link from 'next/link';

export default function PropertyList({ properties }) {
  // Check if 'properties' is defined and is an array
  if (!properties || !Array.isArray(properties)) {
    return <div>No properties available.</div>;
  }

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
