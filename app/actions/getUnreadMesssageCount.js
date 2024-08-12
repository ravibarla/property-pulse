"use server";
import connectDB from "@/config/database";
import Message from "@/models/Message";
import User from "@/models/Users";
import getSessionUser from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import React from "react";

async function getUnreadMesssageCount() {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User Id is required");
  }
  const { userId } = sessionUser;
  const count = await Message.countDocuments({
    recipient: userId,
    read: false,
  });
  return { count };
}

export default getUnreadMesssageCount;
