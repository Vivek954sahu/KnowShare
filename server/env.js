import { config } from "dotenv";

// eslint-disable-next-line no-undef
config({path: "../.env"});

// eslint-disable-next-line no-undef
export const { 
    PORT, MONGODB_URI, JWT_SECRET,
    } = process.env;