const { validateJwtToken } = require("./authJwtAuthentication");

const authenticateCookieValue = (req, res, next) => {
  console.log("req.cookies:", req.cookies);

  const tokenCookieValue = req.cookies.tokenCookie;

  console.log(
    "Token value:",
    tokenCookieValue,
    "Type:",
    typeof tokenCookieValue
  );

  if (!tokenCookieValue || typeof tokenCookieValue !== "string") {
    console.log("No valid token found in cookies.");
    return next();
  }

  try {
    const userPayload = validateJwtToken(tokenCookieValue); // ✅ decode once
    req.user = userPayload;
    console.log("Token validated:", userPayload);
  } catch (error) {
    console.log(`JWT validation failed: ${error.message}`);
  }

  return next();
};

module.exports = { authenticateCookieValue };
