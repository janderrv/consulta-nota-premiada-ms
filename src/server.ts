import { schedule } from 'node-cron';
import config from './config';
import AppController from './controllers/app';
import MongoDB from './database/mongodb';
import * as dotenv from 'dotenv';

dotenv.config({ path: __dirname + '/../.env' });

schedule(config.CRON_SCHEDULE, () => {
	MongoDB.connect()
		.then(() => {
			AppController.execute().then(() => {
				MongoDB.disconnect();
			});
		})
		.catch((error) => {
			console.error(error);
		});
});
