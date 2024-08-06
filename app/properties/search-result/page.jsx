import PropertyCard from "@/components/PropertyCard";
import PropertySearchForm from "@/components/PropertySearchForm";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { convertToSerializableObject } from "@/utils/convertToObject";
import Link from "next/link";
import React from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
async function SearchResultPage({ searchParams: { location, propertyType } }) {
  await connectDB();
  const locationPattern = new RegExp(location, "i");
  let query = {
    $or: [
      {
        name: locationPattern,
      },
      {
        description: locationPattern,
      },
      {
        "location.street": locationPattern,
      },

      {
        "location.city": locationPattern,
      },
      {
        "location.state": locationPattern,
      },
      {
        "location.zipcode": locationPattern,
      },
    ],
  };
  if (propertyType && propertyType !== "ALL") {
    const typePattern = new RegExp(propertyType, "i");
    query.type = typePattern;
  }

  const propertiesQueryResults = await Property.find(query).lean();
  const properties = convertToSerializableObject(propertiesQueryResults);
  console.log(properties);
  return (
    <>
      <section className="bg-blue-400 py-4">
        <div className="max-w-7xl max-auto px-4 flex flex-col item-start sm-p-x-6 p-x-8">
          <PropertySearchForm />
        </div>
      </section>
      <section className="px-4 py-6">
        <div className="container-xl container m-auto px-4 py-6">
          <Link
            href="/properties"
            className="flex items-center text-blue-500 hover:underline mb-3"
          >
            <FaArrowCircleLeft className="mr-2 mb-1" />
            Back To Properties
          </Link>
          <h1 className="text-2xl mb-4">search Results</h1>
          {properties.length === 0 ? (
            <p>No Search Results</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default SearchResultPage;
