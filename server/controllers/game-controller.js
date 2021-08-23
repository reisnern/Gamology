const { Game } = require('../models');

const gameController = {
    // ===============================CREATE====================================
    // add a game
    addGame({ body}, res) {
        Game.create(body)
        .then(dbGameData => res.json(dbGameData))
        .catch(err => res.status(400).json(err));
    },
    //================================READ=======================================
    // pull all games from the library
    getAllGames(req, res) {
        Game.find({})
        .then(dbGameData => res.json(dbGameData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // find game by genera
    getGamesByGenera({ body }, res) {
        Game.find({ genera: body.genera })
        //TODO: add a .sort(to sort games based on number of positive)
        .then(dbGameData => res.json(dbGameData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    //find game by id  
    getGameById({ params }, res) {
        Game.findOne({ _id: params.id })
        .then(dbGameData => res.json(dbGameData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    //===================================UPDATE=======================================
    // update game info 
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
    // ====================================DELETE====================================
    // remove a game from the db
    deleteGame({ params }, res) {
        Game.findOneAndDelete({ _id: params.id })
            .then(dbGameData => {
                if(!dbGameData) {
                    res.status(404).json({ message: '404! Nice try administrator but in the words of gandalf the grey "YOU HAVE NO POWER HERE!"'})
                }
            })
            .catch(err => res.status(400).json(err));
    }
}

module.exports = gameController;