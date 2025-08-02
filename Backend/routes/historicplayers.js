import { Router } from "express";
import mongoose from "mongoose";
import HistoricPlayersController from "../controller/historicplayers.js";
import Authenticator from '../utils/authenticator.js';


export const historicPlayersRouter = Router();


historicPlayersRouter.get('/', async (req, res) => {
  const players = await HistoricPlayersController.getHistoricPlayers(req, res);
  res.json(players);
});

/////////////////// FILTER BY REGION ///////////////////

historicPlayersRouter.get('/region/:region', async (req, res) => {
  const { region } = req.params;
  const result = await HistoricPlayersController.getHistoricPlayersByRegion(region);
 res.status(result.status).json(result);
});

/////////////////// GET BY NAME ///////////////////

historicPlayersRouter.get('/name/:name', async (req, res) => {
  const { name } = req.params;
  const result = await HistoricPlayersController.getHistoricPlayersByName(name);
 res.status(result.status).json(result);
});

/////////////////// DELETE BY NAME ///////////////////

historicPlayersRouter.delete('/name/:name', async (req, res) => {
  const { name } = req.params;
  const result = await HistoricPlayersController.deleteHistoricPlayerByName(name);
 res.status(result.status).json(result);
});

/////////////////// GET BY ID ///////////////////

historicPlayersRouter.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  if (mongoose.Types.ObjectId.isValid(id)) {
    const result = await HistoricPlayersController.getHistoricPlayersById(id);
    res.status(result.status).json(result);
  } else { next() }
});


//////////////////// POST ////////////////////

historicPlayersRouter.post('/', async (req, res) => {
  const result = await HistoricPlayersController.createHistoricPlayer(req.body);
  res.status(result.status).json(result);
  console.log(req.body)

});

//////////////////// PUT ////////////////////

historicPlayersRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await HistoricPlayersController.replaceHistoricPlayer(id, req.body);
  res.status(result.status).json(result);
});

/////////////////// PATCH ///////////////////

historicPlayersRouter.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await HistoricPlayersController.updateHistoricPlayer(id, req.body);
  res.status(result.status).json(result);
});

/////////////////// DELETE BY ID ///////////////////

historicPlayersRouter.delete('/:id', Authenticator, async (req, res, next) => {
  const { id } = req.params;
  if (mongoose.Types.ObjectId.isValid(id)) {
    const result = await HistoricPlayersController.deleteHistoricPlayerById(id);
    res.status(result.status).json(result);
  } else { next() }
});

/////////////////// FILTER BY REGION ///////////////////

historicPlayersRouter.get('/region/:region', async (req, res) => {
  const { region } = req.params;
  const responseObj = await HistoricPlayersController.getHistoricPlayersByRegion(region);
  res.status(responseObj.status).json(responseObj);
});