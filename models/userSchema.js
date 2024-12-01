import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  avatars: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
});

export const User = mongoose.model("User", userSchema);
