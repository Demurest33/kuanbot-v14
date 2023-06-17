import { makeEmbed,makebuttons,makeModal } from "./componentBuilders.js";
import getAlbumImages from "../../imgur/getAlbumImages.js";
import {client} from "../../index.js";
import {Events} from "discord.js"

export default async function initCollector(message, imgurEmbed, referedInteraction) {
    const collector = message.createMessageComponentCollector();

    await collector.on('collect', async (interaction) => {

        if (interaction.isStringSelectMenu()) {
            imgurEmbed.albumId = interaction.values[0];
            imgurEmbed.urls = await getAlbumImages(imgurEmbed.albumId);

            await interaction.update({
                embeds: [makeEmbed(imgurEmbed)],
                components: [makebuttons(imgurEmbed.urls[imgurEmbed.currentImg])],
            });

            referedInteraction.deleteReply();

            return;
        }

        try {
            const bookLenght = imgurEmbed.urls.length - 1;

            if(interaction.customId === 'index') {
                await interaction.showModal(makeModal());
                return;
            }

            if (interaction.customId === 'next') {
                imgurEmbed.currentImg++;
            }
            else if (interaction.customId === 'previous') {
                imgurEmbed.currentImg--;
            }
    
            if (imgurEmbed.currentImg < 0) {
                imgurEmbed.currentImg = bookLenght;
            }
            else if (imgurEmbed.currentImg > bookLenght) {
                imgurEmbed.currentImg = 0;
            }
            
            await interaction.update({
                embeds: [makeEmbed(imgurEmbed)],
                components: [makebuttons(imgurEmbed.urls[imgurEmbed.currentImg])],
            });
        } catch (error) {
            console.log(error);
        }
    });

    client.on(Events.InteractionCreate, async (interaction) => {

        if(interaction.isModalSubmit() && interaction.customId === "modal-index"){
            const index = interaction.fields.getTextInputValue('index');

            //check if index is a number
            if(isNaN(index)){
                await interaction.reply({
                    content: "El indice debe ser un numero",
                    ephemeral: true,
                });
                return;
            }

            if(index < 0 || index > imgurEmbed.urls.length-1){
                await interaction.reply({
                    content: "El indice debe estar entre 0 y " + (imgurEmbed.urls.length-1),
                    ephemeral: true,
                });
                return;
            }

            imgurEmbed.currentImg = index;
            await interaction.update({
                embeds: [makeEmbed(imgurEmbed)],
                components: [makebuttons(imgurEmbed.urls[imgurEmbed.currentImg])],
            });
            return;
        }
    });
}