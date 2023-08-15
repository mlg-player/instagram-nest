import * as dotenv from 'dotenv';

dotenv.config();

const { SALT_KEY } = process.env;
const env_config = {
      SALT_KEY,
};
export default env_config;
