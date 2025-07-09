 // models/contact.js
// Схема контакта с учётом всех правок (photo, phoneNumber, enum contactType)

import { Schema, model } from 'mongoose';

const contactSchema = new Schema(
  {
    // Основные поля
    name:        { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email:       { type: String },

    // Фото контакта (ссылка Cloudinary)
    photo:       { type: String },

    // Дополнительные свойства
    isFavourite: { type: Boolean, default: false },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      default: 'personal',
    },

    // Владелец контакта
    userId: {
      type: Schema.Types.ObjectId,
      ref:  'User',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Contact = model('contacts', contactSchema);
