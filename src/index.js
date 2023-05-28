require('dotenv').config();
const { Client, Events, GatewayIntentBits, IntentsBitField, Collection } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

const fs = require("node:fs");
const path = require("node:path");

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js")); 

client.commands = new Collection();

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file)
    const command = require(filePath);
    if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command)
    } else {
        console.log(`O comando no arquivo ${filePath} está faltando o atributo 'data' ou 'execute'.`);
    }
}

console.log(client.commands);

client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(process.env.DISCORD_TOKEN);

client.on(Events.InteractionCreate, async interaction => {
    if(!interaction.isChatInputCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName);
    if(!command) {
        console.error("Comando não encontrado.");
        return;
    }
    try {
        await command.execute(interaction)
    } catch (error) {
        console.error(error);
        await interaction.reply("Houve um erro ao executar esse comando!")
    }
});