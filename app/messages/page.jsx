import React from "react";
import connectDB from "@/config/database";
import getSessionUser from "@/utils/getSessionUser";
import Message from "@/models/Message";
import { convertToSerializableObject } from "@/utils/convertToObject";
import MessageCard from "@/components/MessageCard";
async function Messagespage() {
  const sessionUser = await getSessionUser();
  const { userId } = sessionUser;
  const readMessages = await Message.find({ recipient: userId, read: true })
    .sort({ createdAt: -1 })
    .populate("sender", "username")
    .populate("property", "name")
    .lean();
  const unreadMessages = await Message.find({ recipient: userId, read: false })
    .sort({ createdAt: -1 })
    .populate("sender", "username")
    .populate("property", "name")
    .lean();
  const messages = [...readMessages, ...unreadMessages].map((messageDocs) => {
    const message = convertToSerializableObject(messageDocs);
    message.sender = convertToSerializableObject(messageDocs.sender);
    message.property = convertToSerializableObject(messageDocs.property);
    return message;
  });

  await connectDB();
  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4-md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Messages</h1>
          <div className="space-y-4">
            {messages.length === 0 ? (
              <p>You have no messages</p>
            ) : (
              messages.map((message) => (
                <MessageCard key={message._id} message={message} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Messagespage;
