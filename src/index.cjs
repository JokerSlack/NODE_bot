const { Api, TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input"); // npm i input
require("dotenv").config();

const stringSession = new StringSession(process.env.TOKEN_SESSION); // fill this later with the value from session.save()

(async () => {
  console.log("Loading interactive example...");
  const client = new TelegramClient(stringSession, process.env.API_ID, process.env.API_HASH, {
    connectionRetries: 5,
  });
  await client.start({
    phoneNumber: async () => await input.text("Please enter your number: "),
    password: async () => await input.text("Please enter your password: "),
    phoneCode: async () =>
      await input.text("Please enter the code you received: "),
    onError: (err) => console.log(err),
  });
  await client.connect();

  client.addEventHandler(async event => {
    const message = event.message
    if(message) {
      if((process.env.GROUPS).includes(message.peerId.chatId.value)){
        console.log(message.message)
      }
    }
  }, console.log("testado"));
})();
