import { Router } from "express";
import mongoose from "mongoose";
import historicPlayersController from "../controller/historicplayers.js";


export const historicPlayersRouter = Router();


  historicPlayersRouter.get('/', async (req, res) => {
    const players = await historicPlayersController.getHistoricPlayers(req, res);
    res.json(players);
  });

  historicPlayersRouter.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    if (mongoose.Types.ObjectId.isValid(id)) {
    const player = await historicPlayersController.getHistoricPlayersById(id);
    res.json(player);} else { next()}
  });

   historicPlayersRouter.get('/:name', async (req, res) => {
    const { name } = req.params;
      const player = await historicPlayersController.getHistoricPlayersByName(name);
      res.json(player);
  });

//////////////////// POST ////////////////////

  historicPlayersRouter.post('/', async (req, res) => {
    const created = await historicPlayersController.createHistoricPlayer(req.body);
     res.json(created);
  });

//////////////////// PUT ////////////////////

  historicPlayersRouter.put('/:id', async (req, res) => {
    const {id} = req.params;
    const replacedHistoricPLayer = await historicPlayersController.replaceHistoricPlayer(id, req.body);
    res.json(replacedHistoricPLayer);
  });

/////////////////// PATCH ///////////////////

  historicPlayersRouter.patch('/:id', async (req, res) => {
    const {id} = req.params;
    const updatedHistoricPLayer = await historicPlayersController.updateHistoricPlayer(id, req.body);
    res.json(updatedHistoricPLayer);
  });

/////////////////// DELETE BY ID ///////////////////

  historicPlayersRouter.delete('/:id', async (req, res, next) => {
    const {id} = req.params;
    if (mongoose.Types.ObjectId.isValid(id)){
    const deletedHistoricPlayerById = await historicPlayersController.deleteHistoricPlayerById(id);
    res.json(deletedHistoricPlayerById);
    } else { next()}
  });

/////////////////// DELETE BY NAME ///////////////////

  historicPlayersRouter.delete('/:name', async (req, res) => {
    const {name} = req.params;
    const deletedHistoricPlayerByName = await historicPlayersController.deleteHistoricPlayerByName(name);
    res.json(deletedHistoricPlayerByName);
  });

