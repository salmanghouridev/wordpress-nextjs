import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function PropertyList({ properties }) {
  if (!properties || !Array.isArray(properties)) {
    return <div className="text-center text-gray-500">No properties available.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
      {properties.map((property) => (
        <div key={property.id} className="bg-white rounded-lg shadow-md hover:shadow-lg border border-gray-200">
          {property._embedded && property._embedded['wp:featuredmedia'] && (
            <Image
              src={property._embedded['wp:featuredmedia'][0].source_url}
              alt="Featured Image"
              loading="lazy"
              width={600}
              height={400}
              className="object-cover w-full h-48 rounded-t-lg"
            />
          )}
          <div className="p-6">
          <Link href={`/properties/${property.slug}`} passHref><h2 className="text-xl font-semibold text-gray-800">{property.title.rendered}</h2></Link>
            <div className="flex items-center mt-2">
              <div className="mr-2 bg-blue-600 py-1 px-2 text-xs font-medium text-white rounded-md">
              {property.property_neighborhood.join(', ')}
              </div>
              <div className="ml-2 bg-green-500 py-1 px-2 text-xs font-medium text-white rounded-md">
              {property.property_type.join(', ')}
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <div className="flex items-center">
                <img src="https://img.icons8.com/windows/24/000000/bedroom.png" alt="Bedrooms" />
                <p className="ml-2 text-sm font-medium text-gray-700">{`${property.property_bedrooms} Bedrooms`}</p>
              </div>
              <div className="flex items-center">
                <img src="https://img.icons8.com/pastel-glyph/24/000000/bath--v2.png" alt="Bathrooms" />
                <p className="ml-2 text-sm font-medium text-gray-700">{`${property.property_rooms} Bathrooms`}</p>
              </div>
              <div className="flex items-center">
                <img src="https://img.icons8.com/ios-glyphs/24/000000/expand--v1.png" alt="Area" />
                <p className="ml-2 text-sm font-medium text-gray-700">{`${property.property_sqyd_size} sqm`}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-extrabold text-blue-800">${property.property_price}</p>
            </div>
          </div>
          <div className="px-6 py-4 flex justify-between items-center border-t border-gray-200">
            <div className="flex items-center">
              <img src={property.agentImage} alt="Agent" className="w-10 h-10 rounded-full object-cover mr-3" />
              <div>
                <p className="text-sm font-semibold text-gray-800"> {property.property_agent.join(', ')}</p>
                <p className="text-xs text-gray-600">Real Estate Agent</p>
              </div>
            </div>
            <div className="flex">
              <a href={`tel:${property.agentPhone}`} className="mr-2 bg-gray-200 p-2 text-gray-600 rounded-full hover:bg-gray-300">
                <img src="https://img.icons8.com/color/24/000000/ringer-volume.png" alt="Call Agent" />
              </a>
              <a href={`https://wa.me/${property.agentWhatsApp}`} className="bg-green-500 p-2 text-white rounded-full hover:bg-green-600">
                <img src="https://img.icons8.com/external-those-icons-lineal-color-those-icons/24/000000/external-WhatsApp-social-media-those-icons-lineal-color-those-icons.png" alt="WhatsApp" />
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
