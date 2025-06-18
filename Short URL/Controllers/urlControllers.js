const URL = require("../Model/urlModel");
const shortid = require("shortid");

const getShortURL = async (req, res) => {
  try {
    console.log("Inside GetshortURL ...");

    const body = req.body;

    if (!body.url) {
      return res.render("Home", { urls: [], error: "URL is required..." });
    }

    let shortID;
    let exists = true;

    while (exists) {
      shortID = shortid.generate();
      exists = await URL.findOne({ shortID });
    }

    console.log(`Short ID created is ${shortID}`);

    const result = await URL.create({
      shortID: shortID,
      URL: body.url,
      visitedHistory: [],
      createdBy: res.user?._id || null, // fallback in case user is missing
    });

    console.log(result);

    // Assuming you want to show all URLs on Home page:
    const urls = await URL.find({ });

    res.render("Home", { urls, error: null });
  } catch (err) {
    console.error(err);
    res.status(500).render("Home", {
      urls: [],
      error: "Something went wrong while creating short URL.",
    });
  }
};

const getURLAnalytics = async (req, res) => {
  const shortID = req.params.shortId;
  const Result = await URL.findOne({ shortID });
  return res.json({
    totalClicks: Result.visitedHistory.length,
    analytics: Result.visitedHistory,
  });
};

const redirectURL = async (req, res) => {
  try {
    const shortID = String(req.params.shortid);
    console.log("Redirecting shortId:", shortID);

    const result = await URL.findOneAndUpdate(
      { shortID: shortID }, // fix field name too
      {
        $push: {
          visitedHistory: {
            timestamp: Date.now(), // wrapped in object
          },
        },
      },
      { new: true }
    );

    if (!result) {
      return res.status(404).send("Short URL not found.");
    }

    return res.redirect(result.URL);
  } catch (error) {
    console.error("Error in redirectURL:", error);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = { getShortURL, getURLAnalytics, redirectURL };
