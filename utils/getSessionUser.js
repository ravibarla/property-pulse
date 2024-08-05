import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";
async function getSessionUser() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return null;
  }
  return {
    user: session.user,
    userId: session.user.id,
  };
}

export default getSessionUser;
