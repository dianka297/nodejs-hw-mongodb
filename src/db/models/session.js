// src/models/session.js
import { Schema, model } from 'mongoose';

const sessionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },


    accessToken: { type: String },
    refreshToken: { type: String },

    accessTokenValidUntil: { type: Date, required: true },
    refreshTokenValidUntil: { type: Date },   
  },
  { timestamps: true, versionKey: false }
);

export const Session = model('Session', sessionSchema);
