import { Schema, model } from 'mongoose';

interface IUser {
  name: string;
  email: string;
  avatar?: string;
  date: Date;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: String,
  date: Date,
});

// 3. Create a Model.
export const User = model<IUser>('User', userSchema);
