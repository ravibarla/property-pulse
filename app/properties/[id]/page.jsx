import React from "react";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import PropertyHeader from "@/components/PropertyHeader";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import PropertyDetails from "@/components/PropertyDetails";
import PropertyImages from "@/components/PropertyImages";
import { convertToSerializableObject } from "@/utils/convertToObject";

import ShareButtons from "@/components/ShareButtons";
import PropertyContactForm from "@/components/PropertyContactForm";
import BookmarkButton from "@/components/BookmarkButton";

const PropertyDynamicPage = async ({ params }) => {
  await connectDB();
  const propertyDocs = await Property.findById(params.id).lean();
  const property = convertToSerializableObject(propertyDocs);
  if (!property) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Property Not Found
      </h1>
    );
  }
  return (
    <>
      <PropertyHeader image={property.images[0]} />
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            href="/properties"
            className="text-blue-500 hover:text-blue-600 flex items-center"
          >
            <FaArrowLeft className="fas fa-arrow-left mr-2" /> Back to
            Properties
          </Link>
        </div>
      </section>
      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            {/* <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6"> */}
            <PropertyDetails property={property} />
            <aside className="space-y-4">
              <BookmarkButton property={property} />
              <ShareButtons property={property} />
              <PropertyContactForm property={property} />
            </aside>
          </div>
        </div>
      </section>
      <PropertyImages images={property.images} />
    </>
  );
};

export default PropertyDynamicPage;
