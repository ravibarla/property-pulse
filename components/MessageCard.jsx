"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import markMessagesAsRead from "@/app/actions/markMessagesAsRead";
import deleteMessage from "@/app/actions/deleteMessage";
import { useGlobalContext } from "@/context/GobalContext";
function MessageCard({ message }) {
  const [isRead, setIsRead] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false);
  const { setUnreadCount } = useGlobalContext();
  const handleReadClick = async () => {
    const read = await markMessagesAsRead(message._id);
    setIsRead(false);
    setUnreadCount((prevCount) => (read ? prevCount - 1 : prevCount + 1));
    toast.success(`Marked As ${read ? "read" : "new"}`);
  };
  const handleDeleteClick = async () => {
    await deleteMessage(message._id);
    setIsDeleted(true);
    setUnreadCount((prevCount) => (isRead ? prevCount : prevCount - 1));
    toast.success("Message Deleted");
  };
  if (isDeleted) {
    return <p>Deleted Message</p>;
  }
  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border-gray-200">
      {!isRead && (
        <div className="absolute top-2 right-2 bg-yellow-500  text-white px-2 py-2 rounded-md">
          New
        </div>
      )}
      <h2 className="text-xl mb-4">
        <span className="font-bold ">Property Inquery:</span>{" "}
        {message.property.name}
      </h2>
      <p className="text-gray-700  ">{message.body}</p>
      <ul>
        <li>
          <strong>Reply Email :</strong>{" "}
          <a href={"mailto:${message.email}"} className="text-blue-500">
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone :</strong>{" "}
          <a href={"tel:${message.phone}"} className="text-blue-500">
            {message.phone}
          </a>
        </li>
        <li suppressHydrationWarning>
          <strong>Recieved :</strong>{" "}
          {new Date(message.createdAt).toLocaleDateString()}
        </li>
      </ul>
      <button
        className="mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md "
        onClick={() => handleReadClick()}
      >
        {isRead ? "Mark As New " : "Mark As Read"}
      </button>
      <button
        className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md "
        onClick={() => handleDeleteClick()}
      >
        Delete
      </button>
    </div>
  );
}

export default MessageCard;
