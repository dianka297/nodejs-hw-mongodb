export function getEnvVar(name, defaultValue) {
  if (typeof name !== 'string' || name.trim() === '') {
    throw new Error(`Invalid environment variable name: '${name}'`);
  }

  const value = process.env[name];

  if (value !== undefined && value !== '') {
    return value;
  }

  if (defaultValue !== undefined) {
    return defaultValue;
  }

  throw new Error(`Missing required environment variable: '${name}'`);
}
