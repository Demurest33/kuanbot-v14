import {EmbedBuilder,ActionRowBuilder,ButtonStyle,ButtonBuilder, StringSelectMenuBuilder,ModalBuilder,TextInputBuilder,TextInputStyle} from "discord.js";

export function makeEmbed({albumId, currentImg, urls}) {
    const embed = new EmbedBuilder()
        .setTitle('Album')
        .setURL(`https://imgur.com/a/${albumId}`)
        .setDescription(`Image ${currentImg} of ${urls.length-1}`)
        .setImage(`${urls[currentImg]}`)
        return embed;
}

export function makebuttons(imgurl) {

    const buttons = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId('previous')
            // .setLabel('Previous')
            .setStyle(ButtonStyle.Primary)
            .setEmoji('⏪'),
        new ButtonBuilder()
            .setCustomId('index')
            // .setLabel('Index')
            .setStyle(ButtonStyle.Secondary)
            .setEmoji('🔎'),
        new ButtonBuilder()
            .setCustomId('next')
            // .setLabel('Next')
            .setStyle(ButtonStyle.Primary)
            .setEmoji('⏩'),
        new ButtonBuilder()
            .setLabel('Link')
            .setStyle(ButtonStyle.Link)
            .setURL(imgurl)
    );

    return buttons;
}

export function makeStringSelectMenu(albums){

    const select = new ActionRowBuilder()
    select.addComponents(
        new StringSelectMenuBuilder()
            .setCustomId('select')
            .setPlaceholder('Please select an album')
            .setMinValues(1)
            .setMaxValues(1)
    );

    albums.forEach(album => {
        select.components[0]
        .addOptions([
            {
                label: `${album.title}`,
                description: `${album.description} | ${album.images_count} images`,
                value: `${album.id}`,
                emoji: '📂',

            },
        ]);
    });
    return select;
}

export function makeModal(){
    const modal = new ModalBuilder()
    .setCustomId('modal-index')
    .setTitle('Set index')
    .addComponents(
        new ActionRowBuilder()
        .addComponents(
            new TextInputBuilder()
            .setCustomId('index')
            .setLabel('Set desired index')
            .setRequired(true)
            .setStyle(TextInputStyle.Short)
        )
    );

    return modal;
}