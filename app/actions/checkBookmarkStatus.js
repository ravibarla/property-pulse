"use server";
import connectDB from "@/config/database";
import User from "@/models/Users";
import getSessionUser from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import React from "react";
async function checkBookmarkStatus(propertyId) {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User Id is required");
  }
  const { userId } = sessionUser;
  const user = await User.findById(userId);

  let isBookMarked = user.bookmarks.includes(propertyId);
  return {
    isBookMarked,
  };
}

export default checkBookmarkStatus;
