import dotenv from "dotenv";
dotenv.config();
console.log("MONGODB_USER:", process.env.MONGODB_USER); // Для отладки
export function getEnvVar(name, defaultValue){
    const value = process.env[name];

    if (value) return value;

    if(defaultValue) return defaultValue;


    throw new Error(`Missing: process.env['${name}'].`);
}