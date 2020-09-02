import React, { useState, useEffect, useRef } from "react";
import {Home, Host, Listing, Listings, Login,  NotFound, User } from '../../pages';
import { AppHeader } from "../AppHeader";
import { Viewer } from "../../lib/types";
import { LOG_IN } from "../../lib/graphql/mutations";
import { LogIn as LogInData, LogInVariables } from "../../lib/graphql/mutations/LogIn/__generated__/LogIn";
import { useMutation } from "@apollo/react-hooks";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Affix, Layout, Spin } from "antd";
import { AppHeaderSkeleton, ErrorBanner } from "../../components";

const initialViewer: Viewer = {
    id: null,
    token: null,
    avatar: null,
    hasWallet: null,
    didRequest: false
}

export const App = () => {
    const [viewer, setViewer] = useState<Viewer>(initialViewer);
    const [logIn, { error }] = useMutation<LogInData, LogInVariables>(LOG_IN, {
      onCompleted: data => {
        if (data && data.logIn) {
          setViewer(data.logIn);

          if (data.logIn.token) {
            sessionStorage.setItem("token", data.logIn.token);
          } else {
            sessionStorage.removeItem("token");
          }
        }
      }
    });

    const logInRef = useRef(logIn);

    useEffect(() => {
      logInRef.current();
    }, []);

    if (!viewer.didRequest && !error) {
      return (
        <Layout>
          <AppHeaderSkeleton />
          <Spin size="large" tip="Launching..." />
        </Layout>
      )
    }

    const logInErrorBannerElement = error
      ? <ErrorBanner description="Please try again later" />
      : null

    return (
      <BrowserRouter>
        <Layout id="app">
            { logInErrorBannerElement }
            <Affix offsetTop={0}>
              <AppHeader viewer={viewer} setViewer={setViewer} />
            </Affix>
            <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/host" component={Host} />
            <Route exact path="/listing/:id" component={Listing} />
            <Route exact path="/listings/:location?" component={Listings} />
            <Route exact path="/login" render={props => <Login {...props} setViewer={setViewer} />} />
            <Route exact path="/user/:id" render={props => <User {...props} viewer={viewer} />} />
            <Route component={NotFound} />
            </Switch>
        </Layout>
      </BrowserRouter>
    )
  }