import cloudinary from "cloudinary";
import { User } from "../models/userSchema.js";

cloudinary.config({
  cloud_name: "dide16ilx",
  api_key: "379792494121579",
  api_secret: "Ck2AAnhDcR9MIdTNONwfqUts9VM",
});

export const uploadfile = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ success: false, message: "Avatar Required!" });
    }

    const {avatar} = req.files;

    const cloudinaryResponseForAvatar = await cloudinary.uploader.upload(
      avatar.tempFilePath,
      { folder: "AVATAR" }
    );

    if (!cloudinaryResponseForAvatar || cloudinaryResponseForAvatar.error) {
      console.error(  
        "Cloudinary Error:",
        cloudinaryResponseForAvatar.error || "Unknown Cloudinary error"
      );
      return res.status(500).json({ success: false, message: "Failed to upload avatar to Cloudinary" });
    }

    const user = await User.create({
      avatar: {
        public_id: cloudinaryResponseForAvatar.public_id,
        url: cloudinaryResponseForAvatar.secure_url,
      },
    });

    return res.status(200).json({
      success: true,
      message: "User registered",
      user,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const uploadfileMultiple =async(req,res)=>{
  try {
    if (!req.files || !req.files.avatar) {
      return res.status(400).json({ success: false, message: "At least one avatar file is required!" });
    }

    const avatars = Array.isArray(req.files.avatar) ? req.files.avatar : [req.files.avatar];

    const uploadResponses = await Promise.all(
      avatars.map(async (file) => {
        const response = await cloudinary.uploader.upload(file.tempFilePath, { folder: "AVATAR" });
        if (response.error) {
          throw new Error(response.error.message || "Unknown Cloudinary error");
        }
        return {
          public_id: response.public_id,
          url: response.secure_url,
        };
      })
    );

    const user = await User.create({ avatars: uploadResponses });

    return res.status(200).json({
      success: true,
      message: "User registered with multiple avatars",
      user,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}