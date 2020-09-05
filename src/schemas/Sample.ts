import mongoose, { Document, Schema } from 'mongoose'

type Sample = Document & {};

const SampleSchema = new Schema(
  {
    message: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      required: true
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tag'
      }
    ]
  },
  {
    timestamps: true
  }
)

export default mongoose.model<Sample>('Sample', SampleSchema)
