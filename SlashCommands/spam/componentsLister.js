import getAlbumImages from "../../imgur/getAlbumImages.js";
import { AttachmentBuilder } from "discord.js";
export default async function initCollector(message, gap, user) {

    const collector = message.createMessageComponentCollector();

    collector.on('collect', async (interaction) => {

        if(interaction.customId === 'select'){
            const albumId = interaction.values[0];
            const urls = await getAlbumImages(albumId);

            let attachments = [];
            urls.forEach(element => {
                attachments.push(new AttachmentBuilder(element));
            });

            await interaction.reply({
                content:`Spammeando a ${user.username}   ${(urls.length - attachments.length)}/${urls.length}`,
                components: [],
            });

            let currentImg = 0;
            
            for (let i = 0; i < urls.length; i++) {
                try {
                    await user.send({files: attachments.splice(0,gap)});
                     await interaction.editReply({content: `Spammeando a ${user.username}   ${(urls.length - attachments.length)}/${urls.length}`});
                    currentImg += gap;
                } catch (error) {
                     await interaction.editReply({
                        content: `Hubo un error mandando las imagenes ${user.username} procediendo a mandar las urls restantes`,
                    });

                    for (let i = currentImg; i < urls.length; i++) {
                        await user.send(urls[i]);
                         await interaction.editReply({content: `${i+1}/${urls.length}`});
                    }
                    break;
                }
            }

             await interaction.editReply({content:`He spameado a ${user.username}`});
        }
    });
}