const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

const db = require('./config/connection');
const { authMiddleware } = require('./utils/auth');
const { resolvers, typeDefs } = require('./schemas');

const app = express();
const PORT = process.env.PORT || 3001;

<<<<<<< HEAD
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./routes'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/gamology', {
    useFindandModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
=======
const server = new ApolloServer({
    resolvers,
    typeDefs,
    context: authMiddleware
>>>>>>> 64e3a50b772cf1a0b0acea13ed0412e01b8f6b36
});

server.applyMiddleware({ app });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`Connected on localhost:${PORT}`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
});