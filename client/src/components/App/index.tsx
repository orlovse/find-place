import React, { useState } from "react";
import {Home, Host, Listing, Listings, Login,  NotFound, User } from '../../pages';
import { AppHeader } from "../AppHeader";
import { Viewer } from "../../lib/types";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Affix, Layout } from "antd";

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
            <Affix offsetTop={0}>
              <AppHeader viewer={viewer} setViewer={setViewer} />
            </Affix>
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