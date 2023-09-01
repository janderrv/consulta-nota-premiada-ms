import { Document, Types } from 'mongoose';

type Client = Document & {
	_id: Types.ObjectId;
	name: string;
	cpf: string;
	nextConsult: string;
};

export default Client;
