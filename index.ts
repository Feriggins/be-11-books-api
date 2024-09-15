import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import db from './config/connection';
import routes from './routes';

dotenv.config();

const app: Application = express();
const PORT: number = parseInt(process.env.PORT || '3001', 10);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.use(routes);

app.get('/', (req, res) => {
    return res.status(200).send({
        message: 'Thank you, but this endpoint does not return anything'
    })
})

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        // Log where we can go to test our API
    });
});
