import { registerCommand } from "@vendetta/commands";
import { findByProps } from "@vendetta/metro";
import { ApplicationCommandOptionType, ApplicationCommandInputType, ApplicationCommandType } from "discord-api-types/v10";

const { sendMessage } = findByProps("sendMessage", "receiveMessage");

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const spamCommand = registerCommand({
  name: "spam",
  displayName: "Spam",
  description: "Spams any message",
  displayDescription: "Spams any message",
  options: [
    {
      name: "amount",
      displayName: "Amount",
      description: "Enter the number of times to send the message.",
      displayDescription: "Enter the number of times to send the message.",
      required: true,
      type: ApplicationCommandOptionType.Integer,
    },
    {
      name: "sleep",
      displayName: "Sleep",
      description: "Enter the time delay between each message in milliseconds.",
      displayDescription: "Enter the time delay between each message in milliseconds.",
      required: true,
      type: ApplicationCommandOptionType.Integer,
    },
    {
      name: "message",
      displayName: "Message",
      description: "Enter the message to spam.",
      displayDescription: "Enter the message to spam.",
      required: true,
      type: ApplicationCommandOptionType.String,
    },
  ],
  applicationId: "-1",
  inputType: ApplicationCommandInputType.BOT,
  type: ApplicationCommandType.CHAT_INPUT,
  execute: async (args: any, ctx: any) => {
    const amount = args.find((arg: any) => arg.name === "amount").value;
    const sleepTime = args.find((arg: any) => arg.name === "sleep").value;
    const message = args.find((arg: any) => arg.name === "message").value;

    for (let i = 0; i < amount; i++) {
      sendMessage(ctx.channel.id, { content: message });
      await sleep(sleepTime);
    }
  },
});

export default spamCommand;
