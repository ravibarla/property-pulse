"use client";
import bookmarkProperty from "@/app/actions/bookmarkProperty";
import checkBookmarkStatus from "@/app/actions/checkBookmarkStatus";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";

function BookmarkButton({ property }) {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [isBookMarked, setIsBookMarked] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    checkBookmarkStatus(property._id).then((res) => {
      if (res.error) {
        toast.error(res.error);
      }
      if (res.isBookMarked) {
        setIsBookMarked(res.isBookMarked);
      }

      setLoading(false);
    });
  }, [checkBookmarkStatus, property._id, userId]);
  const handleClick = async () => {
    if (!userId) {
      toast.error("you need to be signied in to bookmark a listing");
      return;
    }
    bookmarkProperty(property._id).then((res) => {
      if (res.error) {
        return toast.error(res.error);
      }
      setIsBookMarked(res.isBookMarked);
      toast.success(res.message);
    });
  };
  if (loading) {
    return <p className="text-center">Loading ...</p>;
  }
  return isBookMarked ? (
    <button
      className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full
   flex items-center justify-center"
      onClick={() => handleClick()}
    >
      <FaBookmark className="fas fa-bookmark mr-2" /> Remove Bookmark
    </button>
  ) : (
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full
   flex items-center justify-center"
      onClick={() => handleClick()}
    >
      <FaBookmark className="fas fa-bookmark mr-2" /> Bookmark Property
    </button>
  );
}

export default BookmarkButton;