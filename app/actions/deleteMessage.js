"use server";
import React from "react";
import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import Message from "@/models/Message";
import getSessionUser from "@/utils/getSessionUser";
import { revalidatePath, revalidateTag } from "next/cache";
async function deleteMessage(messageId) {
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User Id is required");
  }
  const { userId } = sessionUser;
  const message = await Message.findById(messageId);
  //verify ownership
  if (message.recipient.toString() !== userId) {
    throw new Error("UNauthorised");
  }
  await message.deleteOne();
  revalidatePath("/", "layout");
}

export default deleteMessage;
