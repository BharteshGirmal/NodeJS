const jwt = require("jsonwebtoken");
const SECRET_KEY = "BHARTESH_JWT_TOKEN9178";

const getJwtToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

const setJwtToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    SECRET_KEY
  );
};

module.exports = { setJwtToken, getJwtToken };
