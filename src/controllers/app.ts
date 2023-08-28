import config from '../config';
import { PuppeteerService } from '../services/puppeteer';
import { RabbitMQService } from '../services/rabbitmq';

export class AppController {
	static execute = async () => {
		const checkWinnerButton =
			'#home > div.home__container > div > div.col.s12.l8.margin-top-15 > div:nth-child(1) > div.col.s12.l5 > button';
		const inputCpf = '#cpf';
		const analyzeCpfButton =
			'#modal > div > div > div > div > span > form > div:nth-child(2) > div > button';
		const modal = '#modal > div > div > div > div:nth-child(1)';
		const sadFace =
			'#modal > div > div > div > div:nth-child(1) > div > img';

		try {
			const puppeteerService = new PuppeteerService();

			await puppeteerService.init();
			await puppeteerService.createPage();

			await puppeteerService.goTo(config.API_NOTAMS_PREMIADA);

			await puppeteerService.findAndClick(checkWinnerButton);
			await puppeteerService.findAndType(inputCpf, '00000000000');
			await puppeteerService.findAndClick(analyzeCpfButton);

			await puppeteerService.waitForDisappear(analyzeCpfButton);
			await puppeteerService.waitForAppear(sadFace);

			const file = await puppeteerService.printElementScreen(modal);

			await puppeteerService.closeBrowser();

			await AppController.sendToRabbitMQ(file);
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
