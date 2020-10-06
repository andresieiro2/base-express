import mongoose from 'mongoose';

const postsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    descripton: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('Post', postsSchema);
