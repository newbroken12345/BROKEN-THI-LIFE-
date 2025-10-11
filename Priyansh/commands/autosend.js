const fs = require("fs");
const axios = require("axios");

const CREDIT_HEX = "6458706861584a79595770776458513d";
const BANNER_HEX = "34706149347061493470575834706152347061523470615234706149347061493470575834706149347061493470614934706152347061523470615234706149347061493470575834706152347061523470615234706149347061493470575834706152347061523470615234706149347061493470614934706152347061523470615234706149347061493470614934706152347061523470615234706149347061493470614934706152347061523470615234706149347061493470614934706152";
const WARNING_HEX = "384a2b536f79425451314a4a55465167516b785051307446524344776e354b6a437643666c4b556751334a6c5958526c5a434b6f634b6a4d6a4d7a4d6a4d444e6a4d304e6d4d546d4d7a4d444e6a4d304e6d4d546d4d7a4d444e6a4d304e6d4d546d4d7a4d444e6a4d304e6d4d546d4d7a4d444e6a4d30";

function hexToBase64String(hex) {
  try {
    return Buffer.from(hex, "hex").toString("utf8");
  } catch {
    return null;
  }
}
function base64ToUtf8(b64) {
  try {
    return Buffer.from(b64, "base64").toString("utf8");
  } catch {
    return null;
  }
}
function hexToUtf8Plain(hex) {
  const b64 = hexToBase64String(hex);
  if (!b64) return null;
  return base64ToUtf8(b64);
}

(function verifyCredit() {
  try {
    const src = fs.readFileSync(__filename, "utf8");
    const m = src.match(/credits\s*:\s*(['"])([0-9a-fA-F]+)\1/);
    const literal = m ? m[2] : null;

    if (!literal || literal !== CREDIT_HEX) {
      const banner = hexToUtf8Plain(BANNER_HEX) || "=== SCRIPT BLOCKED ===";
      const warning = hexToUtf8Plain(WARNING_HEX) || "Credit verification failed.";
      console.log("\x1b[31m%s\x1b[0m", banner);
      console.log("\x1b[31m%s\x1b[0m", warning);
      console.log("\x1b[31m%s\x1b[0m", "🚫 Script blocked: credit verification failed.");
      process.exit(1);
    }
  } catch (err) {
    console.error("❌ Credit verification failed:", err?.message || err);
    process.exit(1);
  }
})();

module.exports.config = {
  name: "hourlytime",
  version: "4.1.0",
  hasPermssion: 0,
  credits: "6458706861584a79595770776458513d",
  description: "Sends hourly announcements with time, date, day, shayari, and a random image to groups only.",
  commandCategory: "Utilities",
  usages: "",
  cooldowns: 0,
};

function getDecodedCredit() {
  try {
    const base64 = Buffer.from(module.exports.config.credits, "hex").toString("utf8");
    return Buffer.from(base64, "base64").toString("utf8");
  } catch {
    return null;
  }
}

const shayariList = [
  "𝐓𝐞𝐑𝐚 𝐒𝐚𝐚𝐓𝐡 🙄 𝐓𝐞𝐑𝐢 𝐁𝐚𝐚𝐓𝐞𝐢𝐍 🥰 𝐓𝐞𝐑𝐢 𝐂𝐚𝐑𝐞 😘 𝐓𝐞𝐑𝐢 𝐑𝐞𝐬𝐏𝐞𝐜𝐓 😍 𝐭𝐞𝐑𝐚 𝐏𝐲𝐚𝐑 😶 𝐁𝐚𝐬 𝐘𝐚𝐇𝐢 𝐂𝐡𝐚𝐇𝐢𝐘𝐞 𝐌𝐮𝐣𝐇𝐞 🙈🙈",
  "𝐌𝐢𝐋𝐞 𝐓𝐡𝐄 𝐄𝐤 𝐀𝐉𝐧𝐚𝐁𝐢 𝐁𝐚𝐧𝐊𝐚𝐑 𝐀𝐚𝐣 𝐌𝐞𝐫𝐞 𝐃𝐢𝐥 𝐊𝐢 𝐙𝐚𝐑𝐨𝐨𝐑𝐚𝐓 𝐇𝐨 𝐓𝐮𝐌",
  "𝐔𝐃𝐚𝐚𝐒 𝐇𝐮 𝐏𝐚𝐑 𝐓𝐮𝐉𝐡𝐒𝐞 𝐍𝐚𝐑𝐚𝐙 𝐍𝐚𝐇𝐢 𝐓𝐞𝐑𝐞 𝐏𝐚𝐒𝐬 𝐍𝐚𝐇𝐢 𝐉𝐡𝐨𝐨𝐓 𝐊𝐚𝐇𝐮 𝐓𝐨 𝐬𝐁 𝐊𝐮𝐜𝐇 𝐇 𝐌𝐞𝐑𝐞 𝐏𝐚𝐒𝐒 𝐎𝐫 𝐒𝐚𝐜𝐇 𝐊𝐚𝐇𝐚 𝐓𝐨 𝐓𝐞𝐑𝐞 𝐒𝐢𝐖𝐚 𝐊𝐮𝐂𝐡 𝐊𝐇𝐚𝐚𝐒 𝐍𝐚𝐇𝐢",
  "𝐓𝐮𝐣𝐇𝐞 𝐏𝐚𝐓𝐚 𝐊𝐲𝐔 𝐍𝐚𝐇𝐢 𝐂𝐡𝐚𝐥𝐓𝐚 ! 𝐤𝐢 𝐌𝐞𝐑𝐞 𝐓𝐞𝐑𝐚 𝐁𝐢𝐍𝐚 𝐃𝐢𝐥 𝐍𝐚𝐇𝐢 𝐋𝐠𝐓a",
  "𝐊𝐚𝐈𝐬𝐚 𝐃𝐢𝐤𝐇𝐓𝐚 𝐇𝐮 𝐊𝐚𝐈𝐒𝐚 𝐋𝐚𝐆𝐓𝐚 𝐇𝐮 𝐊𝐲𝐀 𝐅𝐚𝐑𝐪 𝐏𝐚𝐑𝐓𝐚 𝐇𝐚𝐈 𝐓𝐞𝐑𝐞 𝐁𝐚𝐃 𝐊𝐢𝐒𝐢 𝐊𝐨 𝐀𝐚𝐜𝐇𝐚 𝐋𝐚𝐠𝐍𝐚 𝐁𝐡𝐈 𝐌𝐮𝐣𝐇𝐞 𝐀𝐚𝐜𝐇𝐚 𝐍𝐚𝐇𝐢 𝐋𝐚𝐠𝐓𝐚",
  "𝐍𝐚 𝐉𝐚𝐚𝐍𝐞 𝐊𝐢𝐒 𝐓𝐚𝐑𝐚𝐇 𝐊𝐚 𝐈𝐬𝐇𝐪 𝐊𝐚𝐑 𝐑𝐞𝐇𝐞 𝐇𝐚𝐈𝐧 𝐇𝐮𝐌 𝐉𝐢𝐒𝐤𝐄 𝐇𝐨 𝐍𝐚𝐇𝐢 𝐒𝐚𝐊𝐭𝐄 𝐔𝐬 𝐇𝐢 𝐊𝐞 𝐇𝐢 𝐊𝐞 𝐇𝐨 𝐑𝐞𝐡𝐄 𝐇𝐚𝐈 𝐇𝐮𝐌",
  "𝐓𝐞𝐑𝐢 𝐂𝐡𝐚𝐇𝐚𝐓 𝐌𝐞𝐢𝐍 𝐢𝐓𝐧𝐚 𝐂𝐡𝐚𝐇𝐧𝐄 𝐓𝐇𝐢 𝐊𝐢 𝐏𝐚𝐢𝐑 𝐊𝐢𝐒𝐢 𝐂𝐡𝐚𝐇𝐧𝐄 𝐊𝐢 𝐂𝐡𝐚𝐇𝐚𝐓 𝐊𝐢 𝐂𝐡𝐚𝐇𝐚𝐓 𝐍𝐚 𝐑𝐞𝐇𝐢",
  "𝐙𝐢𝐧𝐃𝐚𝐆𝐢 𝐌𝐞𝐢𝐧 𝐀𝐠𝐚𝐑 𝐊𝐮𝐜𝐇 𝐁𝐮𝐑𝐚 𝐇𝐨 𝐓𝐨𝐇 𝐒𝐚𝐁𝐚𝐑 𝐑𝐚𝐊𝐡𝐎 𝐊𝐲𝐔𝐧𝐊𝐢 𝐑𝐨𝐨 𝐊𝐚𝐑 𝐅𝐢𝐑 𝐇𝐚𝐒𝐧𝐄 𝐊𝐚 𝐌𝐚𝐙𝐚 𝐇𝐢 𝐚𝐥𝐀𝐠 𝐇𝐨𝐓𝐚 𝐇𝐚𝐢",
  "𝐍𝐚𝐚 𝐑𝐚𝐬𝐓𝐨𝐍 𝐍𝐞 𝐒𝐚𝐚𝐓𝐡 𝐃𝐢𝐘𝐚 𝐍𝐚 𝐌𝐚𝐧𝐙𝐢𝐥 𝐍𝐞 𝐈𝐧𝐓𝐞𝐙𝐚𝐚𝐑 𝐊𝐢𝐘𝐚 𝐌𝐞𝐢𝐍 𝐊𝐲𝐀 𝐥𝐢𝐊𝐇𝐮 𝐀𝐩𝐍𝐢 𝐙𝐢𝐧𝐃𝐚𝐆𝐢 𝐏𝐚𝐑 𝐌𝐞𝐑𝐞 𝐒𝐚𝐚𝐓𝐡 𝐓𝐨 𝐔𝐦𝐞𝐞𝐃𝐨𝐧 𝐍𝐞 𝐁𝐡𝐈 𝐌𝐚𝐙𝐚𝐚𝐊 𝐊𝐢𝐘𝐚",
  "𝐈𝐦 𝐍𝐨𝐓 𝐎𝐤𝐚𝐘 𝐊𝐲𝐮𝐍 𝐊𝐢 𝐀𝐚𝐩𝐊𝐢 𝐘𝐚𝐚𝐃 𝐑𝐮𝐋𝐚𝐓𝐢 𝐇𝐚𝐢 𝐁𝐚𝐇𝐨𝐓",
  "𝐓𝐞𝐑𝐢 𝐊𝐚𝐚𝐌𝐘𝐚𝐁𝐢 𝐏𝐚𝐑 𝐓𝐚𝐑𝐞𝐞𝐅 𝐓𝐞𝐑𝐢 𝐊𝐨𝐒𝐇𝐢𝐒𝐡 𝐏𝐫 𝐓𝐚𝐚𝐍𝐚 𝐇𝐨𝐠𝐚 𝐓𝐞𝐑𝐞 𝐃𝐮𝐤𝐇 𝐌𝐞 𝐊𝐮𝐂𝐡 𝐋𝐨𝐆 𝐓𝐞𝐑𝐞 𝐒𝐮𝐊𝐡 𝐌𝐞 𝐙𝐚𝐌𝐚𝐚𝐍𝐚 𝐇𝐨𝐆",
  "𝐊𝐢𝐓𝐍𝐚 𝐏𝐲𝐚𝐚𝐑𝐚 𝐇𝐚𝐢 𝐖𝐨 𝐒𝐡𝐀𝐪𝐒 𝐉𝐨 𝐌𝐞𝐑𝐢 𝐇𝐚𝐑 𝐙𝐮𝐁𝐚𝐚𝐍 𝐏𝐞 𝐒𝐡𝐚𝐌𝐢𝐋 𝐇𝐚𝐢 𝐘𝐞 𝐊𝐚𝐈𝐬𝐚 𝐈𝐬𝐇𝐪 𝐌𝐚𝐢 𝐌𝐞𝐑𝐚 𝐉𝐨 𝐀𝐝𝐇𝐮𝐑𝐚 𝐇𝐨𝐊𝐞 𝐁𝐡𝐢 𝐊𝐚𝐚𝐌𝐢𝐥 𝐇𝐚𝐢",
  "𝐌𝐮𝐣𝐡𝐊𝐨 𝐀𝐢𝐒𝐚 𝐃𝐚𝐫𝐃 𝐌𝐢𝐋𝐚 𝐉𝐢𝐬𝐊𝐢 𝐃𝐚𝐖𝐀 𝐍𝐚𝐇𝐢 𝐏𝐚𝐢𝐑 𝐁𝐡𝐢 𝐊𝐡𝐮𝐒𝐡 𝐇𝐮𝐍 𝐌𝐮𝐣𝐇𝐞 𝐔𝐬 𝐒𝐞 𝐊𝐨𝐈 𝐆𝐢𝐥𝐀 𝐍𝐚𝐇𝐢 𝐀𝐮𝐑 𝐊𝐢𝐓𝐧𝐄 𝐀𝐚𝐧𝐒𝐮 𝐁𝐚𝐇𝐚𝐔𝐧 𝐀𝐛 𝐔𝐬 𝐊𝐞 𝐋𝐢𝐘𝐚 𝐉𝐢𝐬𝐊𝐨 𝐊𝐡𝐔𝐝𝐚 𝐍𝐞 𝐌𝐞𝐑𝐞 𝐍𝐚𝐬𝐄𝐄𝐛 𝐌𝐚𝐈𝐧 𝐋𝐢𝐤𝐇𝐚 𝐇𝐢𝐍𝐚𝐇𝐢",
  "𝐖𝐨𝐇 𝐊𝐡𝐮𝐒𝐡 𝐇𝐀𝐢 𝐏𝐚𝐑 𝐒𝐡𝐚𝐘𝐚𝐝 𝐇𝐮𝐌 𝐒𝐞 𝐍𝐚𝐇𝐢 𝐖𝐨𝐇 𝐍𝐚𝐑𝐚𝐉 𝐇𝐚𝐢 𝐏𝐚𝐑 𝐒𝐡𝐚𝐘𝐚𝐝 𝐇𝐮𝐌 𝐒𝐞 𝐍𝐚𝐇𝐢 𝐊𝐨𝐍 𝐊𝐞𝐇𝐚𝐓𝐚 𝐇𝐚𝐢 𝐊𝐞 𝐔𝐧𝐊𝐞 𝐃𝐢𝐥𝐥 𝐌𝐞 𝐌𝐨𝐇𝐨𝐁𝐚𝐚𝐓 𝐍𝐚𝐇𝐢 𝐌𝐨𝐇𝐨𝐁𝐚𝐚𝐓 𝐇𝐚𝐢 𝐏𝐚𝐑 𝐒𝐡𝐚𝐘𝐚𝐝 𝐇𝐮𝐌 𝐒𝐞 𝐍𝐚𝐡𝐢",
];

const imgLinks = [
  "https://i.ibb.co/rKMnYwTG/Messenger-creation-9-F827-ED0-8-DD4-4-C34-9-FE4-AC4-E22-D42-EB4.jpg",
  "https://i.ibb.co/vx0twGKb/Messenger-creation-A1-BF47-B3-6-ECB-4-BC3-81-B0-9-A4-B3-D7-F0-C34.jpg",
  "https://i.ibb.co/20tnVBqz/Messenger-creation-AD12-A384-5-AE4-4821-ACEC-897826-C49-A8-E.jpg",
  "https://i.ibb.co/nqWRG6tc/Messenger-creation-D3-E54-A3-E-D48-E-477-B-848-B-D39-DC1-A02780.jpg",
  "https://i.ibb.co/PzGpsrm5/Messenger-creation-49-A838-B8-7777-4978-A447-B3-DBB28825-EF.jpg",
  "https://i.ibb.co/C3hHpdgL/Messenger-creation-17-BF3320-DFB8-4678-A7-A6-F61-EC482-E321.jpg",
  "https://i.ibb.co/TBCzNLvr/Messenger-creation-18-AA35-C2-5-E6-A-43-E0-9-AD7-4183884-D72-CE.jpg",
  "https://i.ibb.co/mVwhrg9s/Messenger-creation-9-EBFE441-9-B26-4-AC2-A76-C-0-AB9432-A85-D5.jpg",
  "https://i.ibb.co/ymjT8M5x/Messenger-creation-22766034-4076-453-B-A505-E511-B06-AC7-DA.jpg",
];

let lastSentHour = null;

async function sendHourlyMessages(api) {
  try {
    const now = new Date();
    const karachiTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));

    const currentHour = karachiTime.getHours();
    const currentMinute = karachiTime.getMinutes();

    if (currentMinute !== 0 || lastSentHour === currentHour) return;

    lastSentHour = currentHour;

    const hour12 = currentHour % 12 || 12;
    const ampm = currentHour >= 12 ? "PM" : "AM";
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const date = karachiTime.getDate();
    const month = months[karachiTime.getMonth()];
    const year = karachiTime.getFullYear();
    const day = days[karachiTime.getDay()];

    const randomShayari = shayariList[Math.floor(Math.random() * shayariList.length)];
    const randomImage = imgLinks[Math.floor(Math.random() * imgLinks.length)];

    const message =
      `[      𝐓      𝐈     𝐌     𝐄       ]\n\n` +
      `»»   𝐓𝐈𝐌𝐄   ➪  ${hour12}:00  ${ampm} ⏰\n` +
      `»»   𝐃𝐀𝐓𝐄   ➪  ${date}   ✰   ${month}✰${year} 📆\n` +
      `»»   𝐃𝐀𝐘   ➪  ${day}  ⏳\n\n` +
      `${randomShayari}\n\n` +
      `𝐎𝐰𝐧𝐞𝐫      ➻      — आदि बाबू ː͢» 🩷 🪽`;

    const threadList = await api.getThreadList(100, null, ["INBOX"]);
    const groupThreads = threadList.filter(thread => thread.isSubscribed && thread.isGroup);

    for (const thread of groupThreads) {
      try {
        const imageStream = await axios.get(randomImage, { responseType: "stream" }).then(res => res.data);
        await api.sendMessage({ body: message, attachment: imageStream }, thread.threadID);
      } catch (err) {
        console.error(`Failed to send message to thread ${thread.threadID}:`, err.message);
      }
    }

    console.log(`Hourly message sent to ${groupThreads.length} groups.`);
  } catch (error) {
    console.error("Error in hourly announcement:", error.message);
  }
}

module.exports.handleEvent = async function({ api }) {
  if (!global.hourlyInterval) {
    global.hourlyInterval = setInterval(() => {
      sendHourlyMessages(api);
    }, 60000);
  }
};

module.exports.run = async function({ api, event }) {
  api.sendMessage("Hourly announcements activated! Bot will send time updates every hour in groups only.", event.threadID);
};