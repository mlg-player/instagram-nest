import * as dotenv from 'dotenv';

dotenv.config();

const { SALT_KEY, MONGO_DB_URL, DB_NAME } = process.env;

// Creating an array
const envList = [SALT_KEY, DB_NAME, MONGO_DB_URL];

for (const index in envList) {
      const value = envList[index];
      // Checking if key exists
      // else it throws error
      if (!value) {
            throw new Error(
                  index + ' is not defined in the environment variables.'
            );
      }
}
export const envConfig = {
      salt: SALT_KEY,
      mongoUrl: MONGO_DB_URL,
      dnName: DB_NAME,
};
