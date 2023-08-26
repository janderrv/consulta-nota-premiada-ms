import { Browser, Page, launch } from 'puppeteer';

export interface IPuppeteerService {
	browser: Browser;
}

export class PuppeteerService implements IPuppeteerService {
	public browser: Browser;
	public page: Page;

	public async init(): Promise<void> {
		this.browser = await launch({
			headless: 'new',
			args: [
				'--start-maximized',
				'--no-sandbox',
				'--disable-setuid-sandbox',
			],
		});
	}

	public async createPage(): Promise<Page> {
		this.page = await this.browser.newPage();
		await this.page.setViewport({ width: 1366, height: 768 });
		return this.page;
	}

	public async closePage(): Promise<void> {
		await this.page.close();
	}

	public async closeBrowser(): Promise<void> {
		await this.browser.close();
	}

	public async goTo(url: string): Promise<void> {
		await this.page.goto(url);
	}

	public async click(selector: string): Promise<void> {
		await this.page.click(selector);
	}

	public async find(selector: string): Promise<void> {
		await this.page.waitForSelector(selector);
	}

	public async findAndClick(selector: string): Promise<void> {
		await this.find(selector);
		await this.click(selector);
	}

	public async findAndType(selector: string, text: string): Promise<void> {
		await this.find(selector);
		await this.type(selector, text);
	}

	public async waitForDisappear(selector: string): Promise<void> {
		await this.page.waitForSelector(selector, {
			hidden: true,
			visible: false,
		});
	}

	public async waitForAppear(selector: string): Promise<void> {
		await this.page.waitForSelector(selector, {
			visible: true,
			hidden: false,
		});
	}

	public async printScreen(path: string): Promise<void> {
		await this.page.screenshot({
			path,
		});
	}

	public async printElementScreen(
		selector: string,
		path: string,
	): Promise<void> {
		const element = await this.page.$(selector);
		if (element) {
			await element.screenshot({
				path,
			});
		}
	}

	public async type(selector: string, text: string): Promise<void> {
		await this.page.type(selector, text);
	}
}
