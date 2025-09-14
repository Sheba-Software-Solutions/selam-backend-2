import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import { json } from 'body-parser';
import authRouter from './api/auth';
import productsRouter from './api/products';
import jobsRouter from './api/jobs';
import applicationsRouter from './api/applications';
import contactRouter from './api/contact';
import auditRouter from './api/audit';


const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(json());

// Register API routers
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/products', productsRouter);
app.use('/api/v1/jobs', jobsRouter);
app.use('/api/v1/applications', applicationsRouter);
app.use('/api/v1/contact', contactRouter);
app.use('/api/v1/audit-logs', auditRouter);

// Health check endpoint
app.get('/api/v1/health', (req, res) => {
	res.json({ success: true, message: 'API is healthy' });
});

export default app;
