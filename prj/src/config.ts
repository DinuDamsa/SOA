import * as dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 8000;
const MATERIALS_MS_URL = process.env.PRODUCTS_MS_URL || 'http://localhost:8080';
const ORDER_MS_URL = process.env.ORDER_MS_URL || 'http://localhost:8081';

export { PORT, MATERIALS_MS_URL, ORDER_MS_URL };
