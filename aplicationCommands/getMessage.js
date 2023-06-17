import {ContextMenuCommandBuilder,ApplicationCommandType} from "discord.js";

export const getMessageCommand =  new ContextMenuCommandBuilder()
    .setName("getmessage")
    .setType(ApplicationCommandType.Message)
    .toJSON();


export const getMessage = async function (interaction){
    // await interaction.reply({content:interaction.targetUser.displayAvatarURL({dynamic:true}),ephemeral:true});
    await interaction.reply({content:'Content: ' + interaction.targetMessage.content});
}