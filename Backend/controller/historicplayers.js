import response from '../utils/response.js';
import { MongooseConnection } from '../models/historicplayers.js';
import mongoose from 'mongoose';

export default class HistoricPlayersController {

  static async getHistoricPlayers() {
    const player = await MongooseConnection.getHistoricPlayers();
    return (player)
  }

  static async getHistoricPlayersById(id) {
    try {
      const player = await MongooseConnection.getHistoricPlayersById(id);
      if (!player) {
        return response({
          success: false,
          status: 404,
          message: 'Historic player not found',
          error: 'No player with that ID'
        });
      }
      return response({
        success: true,
        status: 200,
        message: 'Historic player found',
        data: player
      });
    } catch (error) {
      return response({
        success: false,
        status: 500,
        message: 'Internal server error',
        error: error.message
      });
    }
  }

  static async getHistoricPlayersByName(name) {
    try {
      const player = await MongooseConnection.getHistoricPlayersByName(name);
      if (!player) {
        return response({
          success: false,
          status: 404,
          message: 'Historic player not found',
          error: 'No player with that name'
        });
      }
      return response({
        success: true,
        status: 200,
        message: 'Historic player founded',
        data: player
      });
    } catch (error) {
      return response({
        success: false,
        status: 500,
        message: 'Internal server error',
        error: error.message
      });
    }
  }


  /////////////////// POST ///////////////////

  static async createHistoricPlayer(data) {
  const requiredFields = ['name', 'position', 'nationality', 'region', 'teams', 'data'];

  const missingFields = requiredFields.filter(field => {
    const value = data[field];

    if (typeof value === 'string') return value.trim() === '';
    if (Array.isArray(value)) return value.length === 0;

    return value === undefined || value === null;
  });

  if (missingFields.length > 0) {
    return response({
      success: false,
      status: 406,
      message: 'Invalid input data',
      error: `Missing fields: ${missingFields.join(', ')}`
    });
  }

  try {
    const createdPlayer = await MongooseConnection.createHistoricPlayer(data);
    return response({
      success: true,
      status: 201,
      message: 'Historic player created successfully',
      data: createdPlayer,
      error: null
    });
  } catch (error) {
    if (error.code === 11000) {
      return response({
        success: false,
        status: 400,
        message: 'Historic player already exists',
        error: 'Duplicated name'
      });
    }

    return response({
      success: false,
      status: 500,
      message: 'Error creating historic player',
      error: error.message
    });
  }
}


  /////////////////// PUT ///////////////////

  static async replaceHistoricPlayer(id, data) {
    try {
      if (!id || !data.name || !data.position || !data.nationality || !data.region || !data.teams || !data.world_cup || !data.data) {
        return response({
          success: false,
          status: 400,
          message: 'Invalid input data',
          error: 'All fields are required'
        });
      }

      const existingPlayer = await MongooseConnection.getHistoricPlayersById(id);
      if (!existingPlayer) {
        return response({
          success: false,
          status: 404,
          message: 'Historic player not found',
          error: 'No player with that ID'
        });
      }

      const replacedPlayer = await MongooseConnection.replaceHistoricPlayer(id, data);

      return response({
        success: true,
        status: 200,
        message: 'Historic player replaced successfully',
        data: replacedPlayer
      });

    } catch (error) {
      return response({
        success: false,
        status: 500,
        message: 'Internal server error',
        error: error.message
      });
    }
  }

  /////////////////// PATCH ///////////////////

  static async updateHistoricPlayer(id, data) {
  try {
    const updatedHistoricPlayer = await MongooseConnection.updateHistoricPlayer(id, data);
    return response({
      success: true,
      status: 200,
      message: 'Historic player updated successfully',
      data: updatedHistoricPlayer
    });
  } catch (error) {
    return response({
      success: false,
      status: 404,
      message: 'The historic player already exists',
      error: error.message
    });
  }
}

  /////////////////// DELETE BY ID ///////////////////


  static async deleteHistoricPlayerById(id) {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response({
        success: false,
        status: 400,
        message: 'Invalid ID format',
        error: 'Invalid ID'
      });
    }

    const deletedPlayer = await MongooseConnection.deleteHistoricPlayerById(id);

    return response({
      success: true,
      status: 200,
      message: 'Player deleted successfully',
      data: deletedPlayer
    });

  } catch (error) {
    return response({
      success: false,
      status: 400,
      message: 'Failed to delete player',
      error: error.message,
    });
  }
}

  /////////////////// DELETE BY NAME ///////////////////


  static async deleteHistoricPlayerByName(name) {
  try {
    const deletedHistoricPlayerByName = await MongooseConnection.deleteHistoricPlayerByName(name);
    return response({
      success: true,
      status: 200,
      message: 'Historic player deleted successfully',
      data: deletedHistoricPlayerByName
    });
  } catch (error) {
    return response({
      success: false,
      status: 400,
      message: 'Failed to delete player',
      error: error.message
    });
  }
}

  /////////////////// FILTER BY REGION ///////////////////

  static async getHistoricPlayersByRegion(region) {
  try {
    const result = await MongooseConnection.getHistoricPlayersByRegion(region);

    return response({
      success: true,
      status: 200,
      message: 'Historic players found by region',
      data: result
    });
  } catch (error) {
    return response({
      success: false,
      status: 500,
      message: 'Failed to get historic players by region',
      error: error.message
    });
  }
}
}