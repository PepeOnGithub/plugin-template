import { logger } from "@vendetta";
import Settings from "./Settings";
import { registerCommand, unregisterCommand } from "@vendetta/commands";
import { findByProps } from "@vendetta/metro";
import { ApplicationCommandType, ApplicationCommandInputType, ApplicationCommandOptionType } from "../../../ApplicationCommandTypes";
import { getUser } from "@vendetta/api/users";

const { sendMessage } = findByProps("sendMessage", "receiveMessage");
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

const avatarCommand = registerCommand({
    name: "avatar",
    displayName: "avatar",
    description: "Fetch and display a user's avatar.",
    displayDescription: "Fetch and display a user's avatar.",
    options: [
        {
            name: "user_id",
            displayName: "user_id",
            description: "The ID of the user to fetch the avatar for.",
            displayDescription: "The ID of the user to fetch the avatar for.",
            required: true,
            type: ApplicationCommandOptionType.STRING,
        },
    ],
    applicationId: "-1",
    inputType: ApplicationCommandInputType.BOT,
    type: ApplicationCommandType.CHAT_INPUT,
    execute: async (args, ctx) => {
        const userId = args[0].value;
        try {
            const user = await getUser(userId);
            if (!user) {
                logger.log(`User with ID ${userId} not found.`);
                return;
            }
            const avatarUrl = `${APIUtils.getAPIBaseURL()}/users/${user.id}/avatars/${user.avatar}.png`;
            sendMessage(ctx.channel.id, { content: `Avatar URL for ${user.username}: ${avatarUrl}` });
        } catch (error) {
            logger.error("Error fetching avatar:", error);
        }
    },
});

export default {
    onLoad: () => {
        logger.log("Hello world!");
        commands.push(spamCommand, avatarCommand);
    },
    onUnload: () => {
        logger.log("Goodbye, world.");
        commands.forEach(command => unregisterCommand(command.name));
        commands = [];
    },
    settings: Settings,
};
