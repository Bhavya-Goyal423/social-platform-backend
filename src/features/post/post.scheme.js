import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  imageUrl: {
    data: Buffer,
    contentType: String,
    name: String,
  },
  caption: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  likes: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Likes",
      },
    ],
    default: [],
  },
  comments: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments",
      },
    ],
    default: [],
  },
});

const postModel = mongoose.model("Posts", PostSchema);
export default postModel;
