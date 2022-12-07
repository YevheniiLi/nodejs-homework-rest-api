const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = Schema(
    {
        password: {
            type: String,
            required: [true, 'Password is required'],
            minLength: 6,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
        },
        subscription: {
            type: String,
            enum: ["starter", "pro", "business"],
            default: "starter"
        },
        token: {
            type: String,
            default: null,
        },
        avatarURL: {
            type: String,
            required: true,
        },
            verify: {
              type: Boolean,
              default: false,
            },
            verificationToken: {
              type: String,
              required: [true, 'Verify token is required'],
            },
    }
);

const User = model("user", userSchema);

const registerSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
    subscription: Joi.string(),
});

const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required()
});

const updateSubscriptionSchema = Joi.object({
    subscription: Joi.string().required(),
});

module.exports = {
    User,
    registerSchema,
    loginSchema,
    updateSubscriptionSchema,
};