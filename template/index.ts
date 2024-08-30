
import { logger } from "@vendetta";
import Settings from "./Settings";
import { registerCommand } from "@vendetta/commands";
import { findByProps } from "@vendetta/metro";
import { url } from "@vendetta/metro/common";
import { ApplicationCommandType, ApplicationCommandInputType, ApplicationCommandOptionType } from "../../../ApplicationCommandTypes";

const { sendMessage, receiveMessage } = findByProps("sendMessage", "receiveMessage");
const { sendBotMessage } = findByProps("sendBotMessage");
const APIUtils = findByProps("getAPIBaseURL", "get");
let commands = [];
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

function randomWord(any) {
    return any[Math.floor(Math.random() * any.length)];
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const spamCommand = registerCommand({
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
            type: ApplicationCommandOptionType.INTEGER,
        },
        {
            name: "sleep",
            displayName: "sleep",
            description: "Enter the time delay between each message in milliseconds.",
            displayDescription: "Enter the time delay between each message in milliseconds.",
            required: true,
            type: ApplicationCommandOptionType.INTEGER,
        }
    ],
    applicationId: "-1",
    inputType: ApplicationCommandInputType.BOT,
    type: ApplicationCommandType.CHAT_INPUT,

    execute: async (args, ctx) => {
        const amount = args[0].value;
        const sleepTime = args[1].value;

        for (let idx = 0; idx < amount; idx++) {
            const rw = randomWord(words);
            const rn = getRandomNumber();
            const sym = "`";
            const content = `${rw} ${sym} ${rn} ${sym}`;
            await sleep(sleepTime);
            sendMessage(ctx.channel.id, { content });
        }
    },
});

export default {
    onLoad: () => {
        logger.log("Hello world!");
        commands.push(spamCommand);
    },
    onUnload: () => {
        logger.log("Goodbye, world.");
        commands.splice(commands.indexOf(spamCommand), 1);
    },
    settings: Settings,
};
