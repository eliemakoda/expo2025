const bcrypt = require("bcrypt");
async function hashPassword(password) {
  const saltRounds = 10; //  the more the best but it takes time to encrypt password
  const hash = await bcrypt.hash(password, saltRounds);
  return String(hash);
}

async function verifyPassword(password, hashedPassword) {
  const match = await bcrypt.compare(password, hashedPassword);
  return match; // true or false
}

const validatePassword = (password) => {
  // Regular expressions to check for the required criteria
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber =/[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  // Check if all conditions are met
  return hasUppercase && hasLowercase && hasNumber && hasSpecialChar;
};




module.exports = {
  hashPassword,
  verifyPassword,
  validatePassword
};
