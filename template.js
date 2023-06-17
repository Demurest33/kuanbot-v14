import dotenv from 'dotenv';
dotenv.config();
import {Client,Events,GatewayIntentBits,SlashCommandBuilder} from "discord.js"

const client = new Client({ intents:[GatewayIntentBits.Guilds]}); // This is the line that is causing the error

client.once(Events.ClientReady, (c) => {
    console.log(`Logged in as ${c.user.tag}`);

    const ping = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with pong")
    .toJSON()

    client.application?.commands.create(ping,process.env.GUILD_ID);

});

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "ping") {
        await interaction.reply("Pong!");
    }
});

client.login(process.env.TOKEN);