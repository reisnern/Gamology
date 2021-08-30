import React from 'react'
import { Provider } from 'react-redux'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import store from './utils/store'

import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Account from './pages/Account'
import Game from './pages/Game'
import Navbar from './components/Navbar'

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem("id_token");

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
  uri: "/graphql",
});

function App () {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Provider store={store}>
          <Navbar />
          <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/account" component={Account} />
            <Route exact path="/game" component={Game} />
          </Switch>
          </main>
          </Provider>
        </div>
      </Router>
    </ApolloProvider>
  )
}

export default App
