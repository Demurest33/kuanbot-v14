import {SlashCommandBuilder} from "discord.js";
import getAlbumsFromUser from "../../imgur/getAlbumsFromUser.js";
import {makeStringSelectMenu} from "./componentBuilders.js";
import initCollector from "./componentsListener.js";

export const readCommand = new SlashCommandBuilder()
    .setName("read")
    .setDescription("Te manda un album de imgur")
    .addSubcommand((subcommand) =>
        subcommand
        .setName("album")
        .setDescription("Manda un album"))
    .addSubcommand((subcommand) =>
        subcommand
        .setName("doujin")
        .setDescription("Manda una pornito"))
    .toJSON();

export const read = async (interaction) => {
    await interaction.deferReply();
    
    let albums = [];
    if (interaction.options.getSubcommand() === "doujin") 
        albums = await getAlbumsFromUser(process.env.imgurUsername,true);
    
    else if (interaction.options.getSubcommand() === "album") 
        albums = await getAlbumsFromUser(process.env.imgurUsername);
    
    const message = await interaction.channel?.send({
        components: [makeStringSelectMenu(albums)],
    });

    const imgurEmbed = {
        albumId: '',
        currentImg: 0,
        urls: [],
    };

    await initCollector(message, imgurEmbed, interaction);
}