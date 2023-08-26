import config from '../config';
import { PuppeteerService } from '../services/puppeteer';

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

			await puppeteerService.printElementScreen(
				modal,
				'notams-premiada.png',
			);

			await puppeteerService.closeBrowser();
			console.log('Done!');
		} catch (error) {
			console.error(error);
		}
	};
}
