import AppController from './controllers/app';
import MongoDB from './database/mongodb';
import * as dotenv from 'dotenv';

dotenv.config({ path: __dirname + '/../.env' });

MongoDB.connect()
	.then(() => {
		AppController.execute().then(() => {
			MongoDB.disconnect();
		});
	})
	.catch((error) => {
		console.error(error);
	});
