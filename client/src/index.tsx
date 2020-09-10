import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { StripeProvider } from "react-stripe-elements";
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
      <StripeProvider apiKey={process.env.REACT_APP_S_PABLISHABLE_KEY as string}>
        <App />
      </StripeProvider>
    </ApolloProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
