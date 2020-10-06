import mongoose from 'mongoose';

const logsSchema = new mongoose.Schema(
  {
    title: { type: String },
    message: { type: String },
    req: { type: Object },
    response: { type: Object },
    url: { type: Object },
    code: { type: Number },
    headers: { type: Object },
  },
  { timestamps: true }
);

export default mongoose.model('ErrorLog', logsSchema);
