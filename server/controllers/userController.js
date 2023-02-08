const userModel = require("../models/userModel").userModel;
const bcrypt = require("bcrypt");

const getUserByEmailIdAndPassword = async (email, password) => {
  let user = await userModel.findOne(email);

  if (user) {
    const checkPassword = await isUserValid(user, password);
    if (checkPassword) {
      return user;
    }
  }
  return null;
};

const getUser = async (id) => {
  let user = await userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user, password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, user.password, (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
};

module.exports = {
  getUserByEmailIdAndPassword,
  getUser,
};


