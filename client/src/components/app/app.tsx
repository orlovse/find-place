import React from "react";
import {Home, Host, Listing, Listings, NotFound, User } from '../../pages';
import { BrowserRouter, Switch, Route } from "react-router-dom";

export const App = () => {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/host" component={Host} />
          <Route exact path="/listing/:id" component={Listing} />
          <Route exact path="/listings/:location?" component={Listings} />
          <Route exact path="/user/:id" component={User} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    )
  }