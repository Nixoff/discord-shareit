import { NecordModule } from 'necord';
import { Module } from '@nestjs/common';
import { IntentsBitField } from 'discord.js';
import { AppCommands } from './app.commands';
import { AppService } from './app.service';

@Module({
	imports: [
		NecordModule.forRoot({
			token: process.env.DISCORD_TOKEN,
			intents: [
				IntentsBitField.Flags.Guilds,
				IntentsBitField.Flags.GuildMessages,
				IntentsBitField.Flags.DirectMessages
			]
		})
	],
	providers: [AppCommands, AppService]
})
export class AppModule {}