import {ActionRowBuilder, StringSelectMenuBuilder} from "discord.js";

export function makeSelect(albums){
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