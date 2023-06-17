import {ContextMenuCommandBuilder,ApplicationCommandType} from "discord.js";

export const getAvatarCommand =  new ContextMenuCommandBuilder()
    .setName("getavatar")
    .setType(ApplicationCommandType.User)
    .toJSON();


export const getAvatar = async function (interaction){
    // await interaction.reply({content:interaction.targetUser.displayAvatarURL({dynamic:true}),ephemeral:true});
    await interaction.reply({content:interaction.targetUser.displayAvatarURL()});
}