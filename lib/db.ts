import mongoose from 'mongoose';

const db = process.env.DATABASE_URL!;

let isConnected = false;

export async function connectToDb() {
  // Set strict query mode for Mongoose to prevent unknown field queries.
  mongoose.set('strictQuery', true);

  // If the connection is already established, return without creating a new connection.
  if (isConnected) {
    console.log('Already connected to the database');
    return;
  }

  try {
    await mongoose.connect(db);

    isConnected = true;
    console.log('Connected to the database');
  } catch (error) {
    console.log(error);
  }
}
