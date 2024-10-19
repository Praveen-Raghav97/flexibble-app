// pages/api/auth/[...nextauth].ts

import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { connectToDatabase } from '../../../utils/mongodb';
import User from '../../../models/User'; // Assuming the User model is in models/User.ts

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    // This function is called after successful sign-in
    async signIn({ user, account, profile }) {
      await connectToDatabase();  // Connect to MongoDB

      // Check if the user exists in the database
      const existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        // If the user does not exist, create a new user
        const newUser = new User({
          name: user.name,
          email: user.email,
          password: "", // No password required for OAuth, but we need the field for consistency
          role: "user", // Default role
          createdAt: new Date(),
        });

        // Save the new user in the database
        await newUser.save();
      }

      // If the user exists, allow sign-in
      return true;
    },
    async session({ session, user, token }) {
      // Add any additional information to the session
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin', // Custom sign-in page
  },
});



// utils/mongodb.ts

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

/** Cache the database connection in production */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
