import { NecordModule } from 'necord';
import { Module } from '@nestjs/common';
import { IntentsBitField } from 'discord.js';
import { AppService } from './app.service';
import { NotionModule } from './notion/notion.module';
import { RoutineProvider } from './decorators/decorators.provider';


@Module({
	imports: [
		NecordModule.forRoot({
			token: process.env.DISCORD_TOKEN,
			intents: [
				IntentsBitField.Flags.Guilds,
				IntentsBitField.Flags.GuildMessages,
				IntentsBitField.Flags.DirectMessages
			]
		}),
		NotionModule
	],
	providers: [
		AppService,
		RoutineProvider
	]
})


export class AppModule {

}