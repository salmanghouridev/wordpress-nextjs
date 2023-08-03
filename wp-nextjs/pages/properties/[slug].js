import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';

export const getServerSideProps = async ({ params }) => {
  const { slug } = params;
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/properties?_embed&slug=${slug}`);
  const [property] = await response.json();

  if (!property) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      property,
    },
  };
};

export default function PropertyDetails({ property }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Head>
        <title>{property.title.rendered}</title>
        <meta name="description" content={property.content.rendered} />
      </Head>

      <h1>{property.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: property.content.rendered }} />

      {/* Display other property details */}
      <p>ID: {property.id}</p>
      <p>Date: {property.date}</p>
      <p>Slug: {property.slug}</p>
      <p>Property Size: {property.property_size}</p>
      <p>Property Rooms: {property.property_rooms}</p>
      <p>Property Bedrooms: {property.property_bedrooms}</p>
      <p>Property Sqyd Size: {property.property_sqyd_size}</p>
      <p>Property Year Built: {property.property_year_built}</p>
      <p>Property Garage Size: {property.property_garage_size}</p>
      <p>Property Floor Number: {property.property_floor_number}</p>
      <p>Property Price: {property.property_price}</p>
      <p>Property Agent: {property.property_agent.join(', ')}</p>
      <p>Property Status: {property.property_status.join(', ')}</p>
      <p>Property Type: {property.property_type.join(', ')}</p>
      <p>Property City: {property.property_city.join(', ')}</p>
      <p>Property Neighborhood: {property.property_neighborhood.join(', ')}</p>
      <p>Property Country: {property.property_country.join(', ')}</p>
      <p>Property Categories: {property.property_categories.join(', ')}</p>
      <p>Property Feature Amenities: {property.property_feature_amenities.join(', ')}</p>

      {/* Display the featured image if available */}
      {property._embedded && property._embedded['wp:featuredmedia'] && (
        <div>
          <h2>Featured Image</h2>
          <Image
            src={property._embedded['wp:featuredmedia'][0].source_url}
            alt="Featured Image"
            loading="lazy"
            width={600}
            height={400}
          />
        </div>
      )}
    </div>
  );
}
