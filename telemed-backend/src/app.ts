import express = require('express');
import cors = require('cors');
import helmet from 'helmet';
import morgan from 'morgan';
import patientRouter from './routes/patient-routes';
import { errorHandler } from './middlewares/error-middleware';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));

app.get('/', (req, res) => res.send({ ok: true, service: 'telemed-backend' }));

// Routes
app.use('/api/patients', patientRouter);


app.use(errorHandler);

export default app;
