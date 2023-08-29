import { AppController } from './controllers/app';
import * as dotenv from 'dotenv';

dotenv.config({ path: __dirname + '/../.env' });

AppController.execute();
