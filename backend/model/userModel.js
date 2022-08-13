const mongoose = require("mongoose");
const validator = require("validator");
const { default: isEmail } = require("validator/lib/isEmail");

const userScheme = new mongoose.Schema(
  {
    // kebab case bn yozilsin
    account_id: {
      type: mongoose.Schema.ObjectID,
      ref: "accounts",
    },
    full_name: {
      type: String,
      minLength: 3,
      maxLength: 30,
      required: [true, "Siz toliq ismingizni kiritishingiz kerak"],
    },
    birth_date: {
      type: String,
      required: [true, "Siz tugilgan yilingizni kiritishingiz shart"],
    },
    image: {
      type: String,
      default: "default.jpg",
    },
    phone: {
      unique: [true, "Oldin foydalanilgan phone kiritdingiz"],
      type: String,
      required: "Siz telefon raqam kiritishingiz kerak",
    },
    email: {
      unique: [true, "Oldin foydalanilgan email kiritdingiz"],
      lowercase: true,
      type: String,
      validate: {
        validator: function (val) {
          return validator.isEmail(val);
        },
        message: "Siz togri email kiriting",
      },
      required: [true, "Siz emailni kiritishingiz shart"],
    },
    password: {
      type: String,
      validate: {
        validator: function (val) {
          return validator.isStrongPassword(val);
        },
        message: "Siz togri password kiriting",
      },
      required: [true, "Siz parolni kiritishingiz shart"],
      select: false,
    },
    password_confirm: {
      type: String,
      validate: {
        validator: function (val) {
          return val == this.password;
        },
        message: "Siz bir xil password kiritishingiz shart",
      },
      required: [true, "Siz password_confirmni kiritishingiz shart"],
    },
    role: {
      enum: ["user", "admin"],
      type: String,
      default: "user",
    },
    phone_active: {
      type: Boolean,
      default: false,
    },
    email_active: {
      type: Boolean,
      default: false,
    },
    active_user: {
      type: Boolean,
      default: true,
    },
    password_change_date: {
      type: Date,
      default: undefined,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("users", userScheme);

module.exports = User;
