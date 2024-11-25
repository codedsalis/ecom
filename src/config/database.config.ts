export default () => ({
  databaseConfig: {
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME || 'ecom',
    password: process.env.DB_PASSWORD,
    name: process.env.DB_DATABASE || 'ecom',
  },
});
