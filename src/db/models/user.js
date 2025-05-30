import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// При серіалізації користувача (наприклад, при відповіді клієнту), не повертати пароль
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

// ✅ Експортуємо з уніфікованою назвою User (так само як Contact, Session)
export const User = model('users', userSchema);
