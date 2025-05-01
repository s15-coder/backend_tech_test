import express, { Request, Response } from 'express';
import cors from 'cors';
import router from './routes';

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());
app.use('/', router);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

