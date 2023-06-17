/*Quiero que este comando mande un embed que explique lo que hacen los otros dos comandos /read y /spam. tambien qeu tenga un reolector de reacciones que le de interactividad al usuario como mandarle mi info de contacto*/

import { SlashCommandBuilder } from "discord.js";

export const helpCommand = new SlashCommandBuilder()
    .setName("help")
    .setDescription("Muestra la ayuda de los comandos")
    .toJSON();

export const help = async (interaction) => {
    await interaction.reply({
        embeds: [{
            title: "Comandos",
            description: "Aqui estan todos los comandos",
            fields: [
                {
                    name: "/read",
                    value: "Manda un album de imgur",
                },
                {
                    name: "/spam",
                    value: "Spamea un mensaje",
                },
                {
                    name: "/help",
                    value: "Muestra la ayuda de los comandos",
                },
            ],
        }],
    });
}
