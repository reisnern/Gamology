const { Game, User, Review  } = require('../models');

const gameController = {
    // add a game
    addGame({ body}, res) {
        Game.create(body)
        .then(dbGameData => res.json(dbGameData))
        .catch(err => res.status(400).json(err));
    },

    getAllGames(req, res) {
        Game.find({})
        .then(dbGameData => res.json(dbGameData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    getGameById({ params }, res) {
        Game.findOne({ _id: params.id })
        .then(dbGameData => res.json(dbGameData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    updateGame({ params, body }, res) {
        Game.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbGameData => {
                if(!dbGameData) {
                    res.status(404).json({ message: `404! What ever it is you're looking for it isn't here.`});
                    return;
                }
                res.json(dbGameData);
            })
            .catch(err => res.status(400).json(err));
    },

    deleteGame({ params }, res) {
        Game.findOneAndDelete({ _id: params.id })
            .then(dbGameData => {
                if(!dbGameData) {
                    res.status(404).json({ message: '404! Nice try administator but in the words of gandalf the grey "YOU HAVE NO POWER HERE!"'})
                }
            })
            .catch(err => res.status(400).json(err));
    }
}

module.exports = gameController;