const JWT = require("jsonwebtoken");
const SECRET_KEY = "JDBHSGDYUFUYDAD3";
const generateJwtToken = (user) => {
  const payload = {
    _id: user._id,
    email: user.email,
    fullName:user.fullName,
    profileURL: user.profileImgURL,
    role: user.role,
  };

  const token = JWT.sign(payload, SECRET_KEY, { expiresIn: "1d" });

  return token;
};
const validateJwtToken = (token) => {
  const payload = JWT.verify(token, SECRET_KEY);
  return payload;
};

module.exports = { generateJwtToken, validateJwtToken };
