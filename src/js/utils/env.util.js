import { config } from 'dotenv';
config();

export const dummyDataURL = process.env.DUMMY_DATA_URL;
export const dummyDataURLAuth = `${dummyDataURL}/auth`;