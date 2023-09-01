import { Schema, Types } from 'mongoose';
import database from '../database/mongodb';
import Client from './types/client';

const clientSchema = new Schema<Client>({
	_id: {
		type: Types.ObjectId,
		auto: true,
	},
	name: {
		type: String,
		required: true,
	},
	cpf: {
		type: String,
		required: true,
	},
	nextConsult: {
		type: String,
		required: true,
	},
});

const connection = database.getConnection();
const model = connection.model<Client>('Client', clientSchema);

export default class ClientModel extends model {
	public static async findByNextConsult(nextConsult: string) {
		return this.find({ nextConsult });
	}

	public static updateNextConsult(_id: string, nextConsult: string) {
		return this.updateOne({ _id }, { nextConsult });
	}
}
