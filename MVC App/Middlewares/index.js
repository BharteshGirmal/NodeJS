const fs = require("fs");

function generateReqResLog(filename) {
  return (req, res, next) => {
    const log = `\n\nURL: ${req.url}\nHostName: ${
      req.hostname
    }\nPayload: ${JSON.stringify(req.body)}\nTimeStamp: ${new Date()}`;

    // Try-catch only around the file writing logic
    fs.writeFile(filename, log, { flag: "a" }, (err) => {
      if (err) {
        console.log("Error writing to log file:", err.message);
      }
      next(); // Always call next(), even if logging fails
    });
  };
}

module.exports = { generateReqResLog };
