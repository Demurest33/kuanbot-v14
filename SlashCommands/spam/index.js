import {SlashCommandBuilder} from "discord.js";
import getAlbumsFromUser from "../../imgur/getAlbumsFromUser.js";
import {makeSelect} from "./componentBuilders.js";
import initCollector from "./componentsLister.js";

export const spamComamnd =  new SlashCommandBuilder()
.setName("spam")
.setDescription("Spamea a alguien")
.addSubcommand((subcommand) =>
    subcommand
    .setName("spam-nopor")
    .setDescription("Spamea un album")
    .addUserOption((option) =>
        option
        .setName("usuario")
        .setDescription("Usuario a spamear")
        .setRequired(true)
    ),
)
.addSubcommand((subcommand) =>
    subcommand
    .setName("spam-doujinshi")
    .setDescription("Spamea un doujinshi")
    .addUserOption((option) =>
        option
        .setName("usuario")
        .setDescription("Usuario a spamear")
        .setRequired(true)
    ),
).toJSON();

export const spam = async (interaction) => {
    await interaction.deferReply();
    const user = interaction.options.getUser("usuario");

    let albums = [], gap = 1;
    if (user.bot){await interaction.editReply("No puedes spamear a un bot"); return;}    

    if (interaction.options.getSubcommand() === "spam-nopor") albums = await getAlbumsFromUser(process.env.imgurUsername);
    else if (interaction.options.getSubcommand() === "spam-doujinshi"){albums = await getAlbumsFromUser(process.env.imgurUsername,true);gap = 10;}

    const message = await interaction.channel?.send({
        components: [makeSelect(albums)],
    });
    
    await interaction.deleteReply();

    await initCollector(message,gap,user);
    
    // OTHER TESTS
    // const attachment = new AttachmentBuilder("./audio.mp3");
    // const attachment = new AttachmentBuilder("https://firebasestorage.googleapis.com/v0/b/posts-cad4a.appspot.com/o/Music%2Frolling%20girl.mp3-1685821459377?alt=media&token=863ace1f-1b87-488b-8ea5-cdb6beacaff1");
}