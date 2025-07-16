import express from 'express';
import { historicPlayersRouter}  from './routes/historicplayers.js';
import { userRouter } from './routes/user.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();


const app = express();

//// MIDLEWARE ////
app.use(cookieParser());
app.use(express.json()); 


app.get ('/', (req, res) => {
  res.status(200).send('Welcome to the Historic Players API');
});

/// ROUTES ////

app.use('/historicplayers', historicPlayersRouter);
app.use('/api', userRouter);
app.use('/api/test', (req, res) => {
  res.send('Ruta test funcionando');
});


app.use((req, res) => {
res.status(404).send('404 not found')});

  const server = app.listen(process.env.PORT, () => {
  console.log('Server is running on port http://localhost:' + process.env.PORT);
});


