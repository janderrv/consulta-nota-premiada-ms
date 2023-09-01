import config from '../config';
import PuppeteerService from '../services/puppeteer';
import RabbitMQService from '../services/rabbitmq';
import ClientService from '../services/client';

export default class AppController {
	static execute = async () => {
		const checkWinnerButton =
			'#home > div.home__container > div > div.col.s12.l8.margin-top-15 > div:nth-child(1) > div.col.s12.l5 > button';
		const inputCpf = '#cpf';

		const modal = '#modal > div > div > div > div:nth-child(1)';
		const sadFace =
			'#modal > div > div > div > div:nth-child(1) > div > img';

		try {
			const clients = await ClientService.getTodayClients();
			if (clients?.length) {
				const puppeteerService = new PuppeteerService();
				await puppeteerService.init();
				await puppeteerService.createPage();

				for (const client of clients) {
					await puppeteerService.goTo(config.API_NOTAMS_PREMIADA);
					await puppeteerService.findAndClick(checkWinnerButton);
					await puppeteerService.findAndType(inputCpf, client.cpf);
					await puppeteerService.pressEnter();
					await puppeteerService.waitForAppear(sadFace);
					const file =
						await puppeteerService.printElementScreen(modal);
					await AppController.sendToRabbitMQ(file);
				}

				await puppeteerService.closeBrowser();

				const updateClients = clients.map((client) =>
					ClientService.updateNextConsult(client._id),
				);

				await Promise.all(updateClients);
			}
		} catch (error) {
			console.error(error);
		}
	};

	static async sendToRabbitMQ(file: string | Buffer) {
		const rabbitMQService = new RabbitMQService();

		await rabbitMQService.connect(config.RABBITMQ_URL);
		await rabbitMQService.sendToQueue(config.TELEGRAM_QUEUE, {
			image: file,
		});
		await rabbitMQService.close();

		console.info('Message sent to RabbitMQ');
	}
}
