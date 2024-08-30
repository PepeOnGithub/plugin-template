import { registerCommand } from "@vendetta/commands";
import { findByProps } from "@vendetta/metro";
import { ApplicationCommandOptionType, ApplicationCommandInputType, ApplicationCommandType } from "@vendetta/commands/types";

const { sendMessage } = findByProps("sendMessage", "receiveMessage");

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const spamCommand = registerCommand({
  name: "spam",
  displayName: "Spam",
  description: "Spams a message a specified number of times with a delay.",
  displayDescription: "Spams a message a specified number of times with a delay.",
  options: [
    {
      name: "amount",
      displayName: "Amount",
      description: "Number of times to send the message.",
      displayDescription: "Number of times to send the message.",
      required: true,
      type: ApplicationCommandOptionType.INTEGER,
    },
    {
      name: "sleep",
      displayName: "Sleep",
      description: "Time delay between each message in milliseconds.",
      displayDescription: "Time delay between each message in milliseconds.",
      required: true,
      type: ApplicationCommandOptionType.INTEGER,
    },
    {
      name: "message",
      displayName: "Message",
      description: "The message to spam.",
      displayDescription: "The message to spam.",
      required: true,
      type: ApplicationCommandOptionType.STRING,
    },
  ],
  applicationId: "-1",
  inputType: ApplicationCommandInputType.BOT,
  type: ApplicationCommandType.CHAT_INPUT,
  execute: async (args, ctx) => {
    const amount = args.find(arg => arg.name === "amount").value as number;
    const sleepTime = args.find(arg => arg.name === "sleep").value as number;
    const message = args.find(arg => arg.name === "message").value as string;

    for (let i = 0; i < amount; i++) {
      sendMessage(ctx.channel.id, { content: message });
      await sleep(sleepTime);
    }
  },
});

export default spamCommand;
