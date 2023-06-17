import {ContextMenuCommandBuilder,ApplicationCommandType, AttachmentBuilder} from "discord.js";
import getAlbumsFromUser from "../imgur/getAlbumsFromUser.js";
import getAlbumImages from "../imgur/getAlbumImages.js";

export const spamAppCommand =  new ContextMenuCommandBuilder()
    .setName("spam")
    .setType(ApplicationCommandType.User)
    .toJSON();

export const spamApp = async function (interaction){
    await interaction.deferReply();
    const user = interaction.targetUser;

    if(user.bot){
        await interaction.editReply({content:"No puedo spamear a un bot"});
        return;
    }

    const albums = await getAlbumsFromUser(process.env.imgurUsername);
    const randomAlbum = albums[Math.floor(Math.random() * albums.length)];
    const urls = await getAlbumImages(randomAlbum.id);

    await interaction.editReply({content:`Spameando a ${user.username} con ${urls.length} imagenes de ${randomAlbum.title}`});

    let attachments = [];
    for (let i = 0; i < urls.length; i++) {
        let attachment = new AttachmentBuilder(urls[i]);
        attachments.push(attachment);
    }
    //can send 10 at a time
    const imgCount = attachments.length/10;
    for (let i = 0; i < imgCount; i++) {

        await user.send({
            files: attachments.splice(0,10)
        });
    }

    await interaction.editReply({content:`He spameado a ${user.username}`});
}