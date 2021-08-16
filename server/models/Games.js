const { Schema, model } = require('mongoose');

const GameSchema = new Schema ({
    gameName: {
        type: String
    },
    genera: {
        type: String
    },
    review: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
},
{
    toJSON: {
        virtuals: true,
    },
    id: false
}
);

const Game = model('Game', GameSchema);

module.exports = Game;