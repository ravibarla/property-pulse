"use server";
import React from "react";
import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidateTag } from "next/cache";
async function deleteProperty(propertyId) {
  const sessionUser = await getSessionUser();
  if (!sessionUser || !session.userId) {
    throw new Error("User Id is required");
  }
  const { userId } = sessionUser;
  const property=await Property.findById(propertyId)
  if(!property){
    throw new Error("User Id is required");
  }
  return <div>deleteProperty</div>;
}

export default deleteProperty;
