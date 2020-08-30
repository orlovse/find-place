import React, { useState } from "./node_modules/react";
import {Home, Host, Listing, Listings, Login,  NotFound, User } from '../../pages';
import { Viewer } from "../../lib/types";
import { BrowserRouter, Switch, Route } from "./node_modules/react-router-dom";
import { Layout } from "./node_modules/antd";

const initialViewer: Viewer = {
    id: null,
    token: null,
    avatar: null,
    hasWallet: null,
    didRequest: false
}

export const App = () => {
    const [viewer, setViewer] = useState<Viewer>(initialViewer);
    return (
      <BrowserRouter>
        <Layout id="app">
            <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/host" component={Host} />
            <Route exact path="/listing/:id" component={Listing} />
            <Route exact path="/listings/:location?" component={Listings} />
            <Route exact path="/login" render={props => <Login {...props} setViewer={setViewer} />} />
            <Route exact path="/user/:id" component={User} />
            <Route component={NotFound} />
            </Switch>
        </Layout>
      </BrowserRouter>
    )
  }