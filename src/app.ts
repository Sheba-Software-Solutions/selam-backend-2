import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import { json } from 'body-parser';

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(json());


// Health check endpoint
app.get('/api/v1/health', (req, res) => {
	res.json({ success: true, message: 'API is healthy' });
});

export default app;
