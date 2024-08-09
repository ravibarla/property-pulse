import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/config/database";
import User from "@/models/Users";
import getSessionUser from "@/utils/getSessionUser";
import React from "react";

async function SavedPropertiesPage() {
  await connectDB();
  const { userId } = await getSessionUser();
  const { bookmarks } = await User.findById(userId).populate("bookmarks");

  return (
    <section className="px-4 py-6 ">
      <div className="lg:container m-auto container px-4 py-6 ">
        <h1 className="text-2xl mb-4">saved properties</h1>
        {bookmarks.length === 0 ? (
          <p>No saved property</p>
        ) : (
          <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
            {bookmarks.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default SavedPropertiesPage;
