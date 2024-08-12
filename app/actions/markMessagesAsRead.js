'use server'
import connectDB from "@/config/database";
import Message from "@/models/Message";
import User from "@/models/Users";
import getSessionUser from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import React from "react";

async function markMessagesAsRead(messageId) {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User Id is required");
  }
  const { userId } = sessionUser;
  const user = await User.findById(userId);
  const message = await Message.findById(messageId);
  if (!message) {
    throw new Error("Message not found");
  }
  //verify ownership
  if (message.recipient.toString() !== userId) {
    throw new Error("Unauthorised");
  }
  message.read = !message.read;
  revalidatePath("/messages", "page");
  await message.save();
  return message.read;
}

export default markMessagesAsRead;
