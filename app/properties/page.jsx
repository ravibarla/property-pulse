import properties from "@/properties.json";
import PropertyCard from "@/components/PropertyCard";
import Property from "@/models/Property";
import Pagination from "@/components/pagination";
import connectDB from "@/config/database";
// async function fetchProperties() {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/properties`);
//     if (!res.ok) {
//       throw new Error("Failed to fetch data");
//     }
//     return res.json();
//   } catch (err) {
//     console.log(err);
//   }
// }
async function PropertyPage({ searchParams: { page = 1, pageSize = 2 } }) {
  // const properties = await fetchProperties();
  await connectDB();
  const skip = (page - 1) * pageSize;
  const total = await Property.countDocuments({});

  const properties = await Property.find({}).skip(skip).limit(pageSize);
  const showPagination = total > pageSize;
  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto">
        {properties.length == 0 ? (
          <p>No properties found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
        {showPagination && (
          <Pagination
            page={parseInt(page)}
            pageSize={parseInt(pageSize)}
            totalItems={total}
          />
        )}
      </div>
    </section>
  );
}

export default PropertyPage;
