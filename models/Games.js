const { Schema, model } = require('mongoose');

const GameSchema = new Schema ({
    gameName: {
        type: String
    },

});

const Game = model('Game', GameSchema);

module.exports = Game;