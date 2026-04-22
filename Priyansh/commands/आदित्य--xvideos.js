const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "xvideo",
  version: "1.0.0",
  hasPermssion: 1, // सिर्फ Bot Admin
  credits: "— आदित्य हूं यार ː͢» 🩷🪽",
  description: "Download and send random videos from xvideos API",
  commandCategory: "18+",
  usages: "[page]",
  cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;

  try {
    const page = args[0] || 3000;
    const res = await axios.get(`https://betadash-api-swordslush-production.up.railway.app/xvideos?page=${page}`);
    const data = res.data.result;

    if (!data || data.length === 0) {
      return api.sendMessage("❌ कोई वीडियो नहीं मिला।", threadID, messageID);
    }

    const randomIndex = Math.floor(Math.random() * data.length);
    const video = data[randomIndex];
    const videoUrl = video.videoUrl;
    const filePath = path.join(__dirname, "cache", "randomxvideo.mp4");

    const videoStream = (await axios({
      url: videoUrl,
      method: "GET",
      responseType: "stream"
    })).data;

    const writer = fs.createWriteStream(filePath);
    videoStream.pipe(writer);

    writer.on("finish", () => {
      api.sendMessage({
        body: `🔞 ${video.title}\n\n👉 XVideos API से वीडियो`,
        attachment: fs.createReadStream(filePath)
      }, threadID, messageID);
    });

    writer.on("error", (err) => {
      console.error(err);
      api.sendMessage("❌ वीडियो डाउनलोड में दिक्कत आ गई।", threadID, messageID);
    });

  } catch (err) {
    console.error(err);
    api.sendMessage("❌ API से डेटा लाने में दिक्कत आ गई।", threadID, messageID);
  }
};
