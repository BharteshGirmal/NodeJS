const URL = require("../Model/urlModel");
const shortid = require("shortid");
const express = require("express");

const getShortURL = async (req, res) => {
  const body = req.body;
  const SHORTID = shortid.generate();
  console.log(`short id created is ${SHORTID}`);

  if (!body.url) return res.status(500).json({ error: "URL is Reuired ..." });
  const result = await URL.create({
    shortenID: SHORTID,
    URL: body.url,
    visitedHistory: [],
  });

  res.status(200).json({ message: "Sucess", id: SHORTID });
};

const getURLAnalytics = async (req, res) => {
  const shortId = req.params.shortId;
  const Result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: Result.visitedHistory.length,
    analytics: Result.visitedHistory,
  });
};

const redirectURL = async (req, res) => {
  try {
    const shortId = String(req.params.shortid);
    console.log("Redirecting shortId:", shortId);

    const result = await URL.findOneAndUpdate(
      { shortenID: shortId }, // fix field name too
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
