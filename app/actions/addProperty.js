"use server";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import getSessionUser from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
async function addProperty(formData) {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User Id is required");
  }
  const { userId } = sessionUser;
  //access all amenities and images
  const ameninties = formData.getAll("amenities");
  const images = formData
    .getAll("images")
    .filter((image) => image.name !== "")
    .map((image) => image.name);
  const propertyData = {
    owner: userId,
    type: formData.get("type"),
    name: formData.get("name"),
    description: formData.get("description"),
    location: {
      street: formData.get("location.street"),
      city: formData.get("location.city"),
      state: formData.get("location.state"),
      zipcode: formData.get("location.zipcode"),
    },
    beds: formData.get("beds"),
    baths: formData.get("baths"),
    square_feet: formData.get("square_feet"),
    ameninties,
    rates: {
      weekly: formData.get("rates.weekly"),
      nightly: formData.get("rates.nightly"),
      monthly: formData.get("rates.monthly"),
    },
    sellor_info: {
      name: formData.get("sellor_info.name"),
      email: formData.get("sellor_info.email"),
      phone: formData.get("sellor_info.phone"),
    },
    images,
  };
  // console.log("propertyData :", propertyData);
  const newProperty = new Property(propertyData);
  await newProperty.save();
  revalidatePath("/", "layout");
  redirect(`/properties/${newProperty._id}`);
}

export default addProperty;
