import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo"
import { App } from "./components";
import * as serviceWorker from './serviceWorker';
import "./styles/index.css";

const client = new ApolloClient({
  uri: "/api",
  request: async operation => {
    const token = sessionStorage.getItem("token");
    operation.setContext({
      headers: {
        "X-CSRF-TOKEN": token || ""
      }
    });
  }
});


ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
