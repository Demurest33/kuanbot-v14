import {Client,Events,GatewayIntentBits} from "discord.js"
import dotenv from 'dotenv'; dotenv.config();

// import getCommands from './getCommands.js';
import { readCommand, read } from './SlashCommands/read/index.js';
import {spamComamnd, spam} from './SlashCommands/spam/index.js';
import { spamAppCommand, spamApp } from './aplicationCommands/spamAppCommand.js';
import { helpCommand, help } from './SlashCommands/help/index.js';

export const client = new Client({intents:[GatewayIntentBits.Guilds]});
client.login(process.env.TOKEN);

client.once(Events.ClientReady, async (c) => {
    console.log(`Logged in as ${c.user.tag}`);
    //it does not wait fro the commands to be gotten
    // const comamnds = await getCommands(client);
    // console.log(comamnds);
    // console.log('have to wait for the commands to be created');
    //quzias tenga que ejecutar todas las funciones de los comandos weaCommando() y que cargen en el index.js

    client.application?.commands.create(readCommand,process.env.GUILD_ID);
    client.application?.commands.create(spamComamnd,process.env.GUILD_ID);
    client.application?.commands.create(spamAppCommand,process.env.GUILD_ID);
    client.application?.commands.create(helpCommand,process.env.GUILD_ID);
});

client.on(Events.InteractionCreate, async (interaction) => {
    
    if (interaction.isContextMenuCommand() && interaction.commandName === "spam"){
        spamApp(interaction);
        return;
    }
    
    if (!interaction.isChatInputCommand()) return;
    switch (interaction.commandName) {
        case "read": read(interaction); break;
        case "spam": spam(interaction); break;
        case "help": help(interaction); break;
        default: break;
    }
});