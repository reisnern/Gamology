import React from "react";
import { Provider } from 'react-redux';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.css';
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import store from './utils/store';

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem('id_token')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  },
  uri: '/graphql',
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Provider store={store}>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
          </Provider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;