"use server";
import connectDB from "@/config/database";
import User from "@/models/Users";
import getSessionUser from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import React from "react";

async function bookmarkProperty(propertyId) {
 
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User Id is required");
  }
  const { userId } = sessionUser;
  const user = await User.findById(userId);

  let isBookMarked = user.bookmarks.includes(propertyId);
  let message;
  if (isBookMarked) {
    //if already bookmarked than remove
    user.bookmarks.pull(propertyId);
    message = "Bookmark Removed";
    isBookMarked = false;
  } else {
    user.bookmarks.push(propertyId);
    message = "Bookmark Added";
    isBookMarked = true;
  }
  await user.save();
  revalidatePath("/properties/saved", "page");

  return {
    message,
    isBookMarked,
  };
}

export default bookmarkProperty;
