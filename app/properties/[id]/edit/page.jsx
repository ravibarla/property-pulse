import React from "react";
import PropertyEditForm from "@/components/PropertyEditForm";
import connectDB from "@/config/database";
import { convertToSerializableObject } from "@/utils/convertToObject";
import Property from "@/models/Property";
async function PropertyEditPage({ params }) {
  await connectDB();
  const propertyDoc = await Property.findById(params.id).lean();
  const property = convertToSerializableObject(propertyDoc);

  if (!property) {
    <h1>Property Not Found</h1>;
  }

  return (
    <section className="bg-blue-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8mb-4 shadow-md rounded-md border m-4 md:m-0">
          <PropertyEditForm property={property} />
        </div>
      </div>
    </section>
  );
}

export default PropertyEditPage;
