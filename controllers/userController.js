const fs = require("fs");
const crypto = require("crypto");
const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");

exports.addUser = catchAsync(async (req, res) => {
  req.body.password = crypto
    .createHash("sha256")
    .update(req.body.password)
    .digest("hex");

  let newUser = await User.create(req.body);
  newUser = newUser.toObject();
  delete newUser.password;

  res.status(200).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});

exports.getAllUsers = catchAsync(async (req, res) => {
  const foundUser = await User.find();
  if (foundUser) {
    res.status(200).json({
      status: "success",
      data: {
        user: foundUser,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
});

exports.getUserById = catchAsync(async (req, res) => {
  const foundUser = await User.findById(req.params.id);
  if (foundUser) {
    res.status(200).json({
      status: "success",
      data: {
        user: foundUser,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
});


exports.updateUserById = catchAsync(async (req, res) => {
  req.body.password = crypto
  .createHash("sha256")
  .update(req.body.password)
  .digest("hex");
  
  const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false });
  if (updateUser) {
    res.status(200).json({
      status: "update success",
      data: {
        user: updateUser,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
});

exports.deleteUserById = catchAsync(async (req, res) => {
  const foundUser = await User.findByIdAndDelete(req.params.id);
  if (foundUser) {
    res.status(200).json({
      status: "delete success",
      data: {
        user: foundUser,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
});
