import mongoose, { Document, Schema, Model } from 'mongoose'

import bcrypt from 'bcryptjs'

export type UserAttributes = {
  firstName: string,
  companyName: string,
  password: string,
  active: Boolean,
  acceptTerms: Boolean,
  document: {
    type: string,
    number: string
  },
  phone: {
    ddd: Number,
    number: Number
  },
  passwordResetToken: string,
  passwordResetExpires: Date
};

export type UserDocument = Document & UserAttributes;

type UserModel = Model<UserDocument>;

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: [function () { return this.document.type === 'cpf' }]
    },
    lastName: {
      type: String,
      trim: true,
      required: [function () { return this.document.type === 'cpf' }]
    },
    companyName: {
      type: String,
      trim: true,
      required: [function () { return this.document.type !== 'cpf' }]
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      required: true
    },
    document: {
      type: {
        type: String,
        lowercase: true,
        trim: true,
        required: true
      },
      number: {
        type: String,
        trim: true,
        required: true
      }
    },
    phone: {
      ddd: {
        type: Number,
        min: [11, 'DDD Inválido'],
        max: [99, 'DDD Inválido'],
        required: true
      },
      number: {
        type: Number,
        min: [99999999, 'Telefone Inválido'],
        max: [999999999, 'Telefone Inválido'],
        required: true
      }
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    passwordResetToken: {
      type: String,
      select: false
    },
    passwordResetExpires: {
      type: Date,
      select: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    active: {
      type: Boolean,
      default: true
    },
    acceptTerms: {
      type: Boolean,
      required: true
    }
  },
  {
    timestamps: true
  }
)

UserSchema.pre('save', async function<UserModel> (next) {
  if (this.password) {
    this.password = await bcrypt.hash(this.password, 5)
  }

  if (this.document.number) {
    this.document.number = this.document.number.replace(/[^a-zA-Z 0-9]/g, '')
  }

  next()
})

export default mongoose.model<UserDocument, UserModel>('User', UserSchema)
