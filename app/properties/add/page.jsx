import PropertyAddForm from "@/components/PropertyAddForm";
import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/config/database";
import Property from "@/models/Property"; 
// import properties from "@/properties.json"
import React from "react";

const AddPropertyPage=async()=> {
  return (
   
    <section className="bg-blue-50">
        <div className="container m-auto max-w-2xl py-24">
            <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0 ">
              <PropertyAddForm/>
            </div>
        </div>
    </section>
  );
}

export default AddPropertyPage;
