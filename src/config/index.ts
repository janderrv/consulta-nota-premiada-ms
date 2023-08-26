import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

interface ENV {
	API_NOTAMS_PREMIADA: string | undefined;
}

interface Config {
	API_NOTAMS_PREMIADA: string;
}

const getConfig = (): ENV => {
	return {
		API_NOTAMS_PREMIADA: process.env.API_NOTAMS_PREMIADA,
	};
};

const getSanitzedConfig = (config: ENV): Config => {
	for (const [key, value] of Object.entries(config)) {
		if (value === undefined) {
			throw new Error(`Missing key ${key} in config.env`);
		}
	}
	return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;
