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

commands.push(
registerCommand({
name: "raid1",
displayName: "raid1",
description: "raid1",
displayDescription: "Executes a raid!",
options: [],
// @ts-ignore
applicationId: "-1",
inputType: 1,
type: 1,

execute: async (args, ctx) => {
  for (let idx = 0; idx < 5; idx++) {
    const rn = getRandomNumber();
    const rw = randomWord(words);
    const sym = "`"; // SYM is short for symbol
    const content = `${rw} ${sym} ${rn} ${sym}`;
    await sleep(idx * 1000);
    MessageActions.sendMessage(ctx.channel.id, { content });
  }
}
})
);

export const onUnload = () => {
for (const unregisterCommand of commands) {
unregisterCommand();
}
};
