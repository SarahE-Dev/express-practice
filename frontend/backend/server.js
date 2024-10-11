import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import todoRouter from './todoRouter.js';

const app = express();
const port = 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(cors());


app.use('/todos', todoRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

