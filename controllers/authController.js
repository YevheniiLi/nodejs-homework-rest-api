const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/users");
const createError = require("../helpers/createError");
const { JWT_KEY } = process.env;
const gravatar = require("gravatar");
const jimp = require("jimp");
const path = require("path");
const fs = require("fs/promises");

const signup = async (req, res, next) => {
  const { email, password, subscription } = req.body;
  const avatarURL = gravatar.url(email);
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, "Email in use");
  }

  const hashPass = await bcrypt.hash(password, 10);
  const registerUser = await User.create({
    email,
    password: hashPass,
    subscription,
    avatarURL,
  });

  return res.status(201).json({
    user: {
      email: registerUser.email,
      subscription: registerUser.subscription,
    },
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw createError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw createError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, JWT_KEY, { expiresIn: "1h" });
  const { subscription } = await User.findByIdAndUpdate(user._id, { token });

  return res.status(201).json({
    token,
    user: {
      email,
      subscription,
    },
  });
};

const logout = async (req, res, next) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204);
};

const getCurrent = async (req, res, next) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

const updateSubscription = async (req, res, next) => {
  const userId = req.user._id;
  const user = await User.updateSubscription(userId, req.body);
  if (user) {
    return res.status(200).json({
      data: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  }
  throw createError(401);
};

const avatar = async (req, res, next) => {
  const { user, file } = req;
  file.filename = user._id + ".jpeg";
  const image = await jimp.read(file.path);
  image.resize(250, 250);
  await image.writeAsync(file.path);
  const newPath = path.join(__dirname, "../public/avatars", file.filename);
  await fs.rename(file.path, newPath);
  user.avatarURL = "/avatars/" + file.filename;
  await User.findByIdAndUpdate(user._id, user);
  return res.json({
    avatarURL: "/avatars/" + file.filename,
  });
};

module.exports = {
  signup,
  login,
  logout,
  getCurrent,
  avatar,
  updateSubscription,
};
