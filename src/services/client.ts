import ClientModel from '../models/client';

export default class ClientService {
	static formatDate(date: Date) {
		const dd = String(date.getDate()).padStart(2, '0');
		const mm = String(date.getMonth() + 1).padStart(2, '0');
		const yyyy = date.getFullYear();
		return yyyy + '-' + mm + '-' + dd;
	}

	static async getTodayClients() {
		const today = new Date();
		const formattedDate = ClientService.formatDate(today);
		return ClientModel.findByNextConsult(formattedDate);
	}

	static async updateNextConsult(_id: string) {
		const nextConsult = new Date();
		nextConsult.setDate(nextConsult.getDate() + 15);
		const formattedDate = ClientService.formatDate(nextConsult);
		return ClientModel.updateNextConsult(_id, formattedDate);
	}
}
