import { Router } from "express";
import mongoose from "mongoose";
import HistoricPlayersController from "../controller/historicplayers.js";


export const historicPlayersRouter = Router();


historicPlayersRouter.get('/', async (req, res) => {
  const players = await HistoricPlayersController.getHistoricPlayers(req, res);
  res.json(players);
});

/////////////////// FILTER BY REGION ///////////////////

historicPlayersRouter.get('/region/:region', async (req, res) => {
  const { region } = req.params;
  const playersByRegion = await HistoricPlayersController.getHistoricPlayersByRegion(region);
  res.json(playersByRegion);
});

/////////////////// GET BY NAME ///////////////////

historicPlayersRouter.get('/name/:name', async (req, res) => {
  const { name } = req.params;
  const player = await HistoricPlayersController.getHistoricPlayersByName(name);
  res.json(player);
});

/////////////////// DELETE BY NAME ///////////////////

historicPlayersRouter.delete('/name/:name', async (req, res) => {
  const { name } = req.params;
  const deletedHistoricPlayerByName = await HistoricPlayersController.deleteHistoricPlayerByName(name);
  res.json(deletedHistoricPlayerByName);
});

/////////////////// GET BY ID ///////////////////

historicPlayersRouter.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  if (mongoose.Types.ObjectId.isValid(id)) {
    const player = await HistoricPlayersController.getHistoricPlayersById(id);
    res.json(player);
  } else { next() }
});


//////////////////// POST ////////////////////

historicPlayersRouter.post('/', async (req, res) => {
  const created = await HistoricPlayersController.createHistoricPlayer(req.body);
  res.json(created);
});

//////////////////// PUT ////////////////////

historicPlayersRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const replacedHistoricPLayer = await HistoricPlayersController.replaceHistoricPlayer(id, req.body);
  res.json(replacedHistoricPLayer);
});

/////////////////// PATCH ///////////////////

historicPlayersRouter.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const updatedHistoricPLayer = await HistoricPlayersController.updateHistoricPlayer(id, req.body);
  res.json(updatedHistoricPLayer);
});

/////////////////// DELETE BY ID ///////////////////

historicPlayersRouter.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  if (mongoose.Types.ObjectId.isValid(id)) {
    const deletedHistoricPlayerById = await HistoricPlayersController.deleteHistoricPlayerById(id);
    res.json(deletedHistoricPlayerById);
  } else { next() }
});

/////////////////// FILTER BY REGION ///////////////////

historicPlayersRouter.get('/region/:region', async (req, res) => {
  const { region } = req.params;
  const responseObj = await HistoricPlayersController.getHistoricPlayersByRegion(region);
  res.status(responseObj.status).json(responseObj);
});