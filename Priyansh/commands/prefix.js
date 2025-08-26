module.exports.config = {
  name: "prefix",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭",
  description: "given prefix detail",
  commandCategory: "Dành cho Admin",
  usages: "",
  cooldowns: 5,
};

module.exports.handleEvent = async ({ event, api, Threads }) => {
  var { threadID, messageID, body, senderID } = event;
  //if (senderID == global.data.botID) return;
  if ((this.config.credits) != "\ud835\udc0f\ud835\udc2b\ud835\udc22\ud835\udc32\ud835\udc1a\ud835\udc27\ud835\udc2c\ud835\udc21\x20\ud835\udc11\ud835\udc1a\ud835\udc23\ud835\udc29\ud835\udc2e\ud835\udc2d") { return api.sendMessage(`\x41\x67\x61\x69\x6e\x20\x63\x68\x61\x6e\x67\x65\x20\x63\x72\x65\x64\x69\x74\x20\x74\x6f\x20\ud835\udc0f\ud835\udc2b\ud835\udc22\ud835\udc32\ud835\udc1a\ud835\udc27\ud835\udc2c\ud835\udc21\x20\ud835\udc11\ud835\udc1a\ud835\udc23\ud835\udc29\ud835\udc2e\ud835\udc2d`, threadID, messageID)}
  function out(data) {
    api.sendMessage(data, threadID, messageID)
  }
  var dataThread = (await Threads.getData(threadID));
  var data = dataThread.data; 
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  var arr = ["mpre","mprefix","prefix", "dấu lệnh", "prefix của bot là gì","daulenh", "duong", "what prefix", "freefix", "what is the prefix", "bot dead", "bots dead", "where prefix", "what is bot", "what prefix bot", "*" ,"how use bot", "@","bot not working","+","where prefix","prefx","prfix","prifx","perfix",".","/"];
  arr.forEach(i => {
    let str = i[0].toUpperCase() + i.slice(1);
    if (body === i.toUpperCase() | body === i | str === body) {
const prefix = threadSetting.PREFIX || global.config.PREFIX;
      if (data.PREFIX == null) {
        return out(`𝐓𝐇𝐈𝐒 𝐈𝐒 𝐌𝐘 𝐏𝐑𝐄𝐅𝐈𝐗 ⇉    [    ${prefix}    ]     »`)
      }
      else return out('️️️️️️️️️️️️️️️️️️️️️️️️️️️𝐓𝐇𝐈𝐒 𝐈𝐒 𝐌𝐘 𝐏𝐑𝐄𝐅𝐈𝐗 ⇉ [    ${prefix}    ]     »' + data.PREFIX)
    }

  });
};

module.exports.run = async({ event, api }) => {
    return api.sendMessage("error", event.threadID)
}