import mongoose from 'mongoose';
import config from '../config';

export default class MongoDB {
	public static async connect() {
		await mongoose.connect(config.MONGODB_URL);
		console.log('Connected to MongoDB');
	}

	public static async disconnect() {
		await mongoose.disconnect();
		console.log('Disconnected from MongoDB');
	}

	public static getConnection() {
		return mongoose.connection;
	}
}
