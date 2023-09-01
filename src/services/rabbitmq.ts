import { Connection, Channel, connect } from 'amqplib';

interface IRabbitMQ {
	connect(url: string): Promise<void>;
	sendToQueue(queue: string, content: object): Promise<boolean>;
	close(): Promise<void>;
}

export default class RabbitMQService implements IRabbitMQ {
	private connection: Connection;
	private channel: Channel;

	public async connect(url: string) {
		this.connection = await connect(url);
		this.channel = await this.connection.createChannel();
	}

	private async createQueue(queue: string) {
		return this.channel.assertQueue(queue);
	}

	public async sendToQueue(queue: string, content: object) {
		await this.createQueue(queue);

		return this.channel.sendToQueue(
			queue,
			Buffer.from(JSON.stringify(content)),
		);
	}

	public async close() {
		await this.channel.close();
		await this.connection.close();
	}
}
