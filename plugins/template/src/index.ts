import { logger } from "@vendetta";
import Settings from "./Settings";

export default {
    onLoad: () => {
        logger.log("Hello world!");
    },
    onUnload: () => {
        logger.log("Goodbye, world.");
    },
    settings: Settings,
}

import { registerCommand } from "@vendetta/commands";
import { findByProps } from "@vendetta/metro";

const MessageActions = findByProps("sendMessage", "receiveMessage");
const commands = [];
const getRandomNumber = () => Math.floor(Math.random() * 100);

const words = [
"### Get Raided LOL!",
"### BOZO ASS SERVER!",
"### I should have brought a condom because this server has no protection",
"### Look I did the funny",
"# Hey look || @everyone ||",
"# Sorry for the ping || @here ||",
"### This server is getting raided by a plugin LMAO!!!",
"### Skill Issue"
];

function randomWord(any: string | any[]) {
return any[Math.floor(Math.random() * any.length)];
}

function sleep(ms: number | undefined) {
return new Promise((resolve) => setTimeout(resolve, ms));
}


commands.push(registerCommand({
  name: "spam",
  displayName: "spam",
  description: "Spams any message",
  displayDescription: "Spams any message",
  options: [
  {
    name: "amount",
    displayName: "amount",
    description: "Enter the number of times to send the message.",
    displayDescription: "Enter the number of times to send the message.",
    required: true,
    type: 4, 
  },
  {
    name: "sleep",
    displayName: "sleep",
    description: "Enter the time delay between each message in milliseconds.",
    displayDescription: "Enter the time delay between each message in milliseconds.",
    required: true,
    type: 4,
  }],
  applicationId: "-1",
  inputType: 1,
  type: 1,

  execute: async (args, ctx) => {
    const amount = args[0].value;
    const sleepTime = args[1].value;

    for (let idx = 0; idx < amount; idx++) {
        const rw = randomWord(words);
    const sym = "`"; // SYM is short for symbol
      const content = `${rw} ${sym} ${rn} ${sym}`;
      await sleep(idx * sleepTime);
      MessageActions.sendMessage(ctx.channel.id, { content });
    }
  },
}));
