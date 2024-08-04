import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";
import connectDB from "@/config/database";
import User from "@/models/Users";
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    //invoked on succesfull sign in
    async signIn({ profile }) {
      //1.connect to the db
      await connectDB();
      //2. check if user exist
      const userExist = await User.findOne({ email: profile.email });
      //3. if not then create user
      if (!userExist) {
        //truncate username if too long
        const username = profile.name.slice(0, 20);
        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }
      //4. return true to allow sign in
      return true;
    },
    //session callback function that modifies the session object
    async session({ session }) {
      //1. get the user from database
      const user = await User.findOne({ email: session.user.email });

      //2. assign user id from session
      session.user.id = user._id.toString();
      //3. return the session
      return session;
    },
  },
};
