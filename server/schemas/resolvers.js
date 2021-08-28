const { AuthenticationError } = require('apollo-server-express')

const { signToken } = require('../utils/auth')
const { User, Game, Genre, Order } = require('../models')

const stripe = process.env.STRIPE_KEY

const resolvers = {
  Query: {
    genre: async () => {
      return await Genre.find()
    },
    game: async (parent, { _id }) => {
      return await Game.findById(_id).populate('genre')
    },
    games: async (parent, { genre, name }) => {
      const params = {}

      if (genre) {
        params.genre = genre
      }

      if (name) {
        params.name = {
          $regex: name
        }
      }

      return await Game.find(params).populate('genre')
    },
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          '-__v -password'
        )
        return userData
      }
      throw new AuthenticationError('Not logged in')
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.games',
          populate: 'genre'
        })

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate)

        return user
      }

      throw new AuthenticationError('HANG ON PARTNER, this aint the wild west you have to login first')
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.games',
          populate: 'genre'
        })

        return user.orders.id(_id)
      }

      throw new AuthenticationError('HANG ON PARTNER, this aint the wild west you have to login first')
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin
      const order = new Order({ games: args.games })
      const { games } = await order.populate('games').execPopulate()
      const lineItems = []

      for (let i = 0; i < games.length; i++) {
        const game = await stripe.games.create({
          name: games[i].name,
          description: games[i].description,
          images: [`${url}/images/${games[i].image}`]
        })

        const price = await stripe.prices.create({
          game: game.id,
          unit_amount: games[i].price * 100,
          currency: 'usd'
        })

        lineItems.push({
          price: price.id,
          quantity: 1
        })
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      })

      return { session: session.id }
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args)
      const token = signToken(user)

      return { token, user }
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email })

      if (!user) {
        throw new AuthenticationError('WROOOONG, try again!')
      }

      const correctPw = await user.isCorrectPassword(password)

      if (!correctPw) {
        throw new AuthenticationError('WROOOONG, try again!')
      }

      const token = signToken(user)
      return { token, user }
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true })
      }

      throw new AuthenticationError('HANG ON PARTNER, this aint the wild west you have to login first')
    },
    addOrder: async (parent, { games }, context) => {
      console.log(context)

      if (context.user) {
        const order = new Order({ games })

        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } })

        return order
      }

      throw new AuthenticationError('HANG ON PARTNER, this aint the wild west you have to login first')
    }
  }
}

module.exports = resolvers
