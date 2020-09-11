import React, { useState, useEffect } from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { MenuItems } from "../MenuItems";
import { Viewer } from "../../lib/types";
import { Input, Layout } from "antd";
import { displayErrorMessage } from "../../lib/utils";

import logo from "./assets/logo.png";

interface Props {
    viewer: Viewer;
    setViewer: (viewer: Viewer) => void;
}

const { Header } = Layout;

const { Search } = Input;

export const AppHeader = withRouter(({viewer, setViewer, location, history}: Props & RouteComponentProps) => {
    const [search, setSearch] = useState("");

    useEffect(() => {
        const { pathname } = location;
        const pathnameSubString = pathname.split("/");
        if (!pathname.includes("/listings")) {
            setSearch("");
            return;
        }

        if (pathname.includes("/") &&  pathnameSubString.length === 3) {
            setSearch(pathnameSubString[2]);
            return;
        }
    }, [location]);

    const onSearch = (value: string) => {
        const trimmedValue = value.trim();

        if (trimmedValue) {
            history.push(`/listings/${trimmedValue}`);
        } else {
            displayErrorMessage("Please enter a valid search.");
        }
    }

    return (
        <Header className="app-header">
        <div className="app-header__logo-search-section">
          <div className="app-header__logo">
            <Link to="/">
              <img src={logo} alt="App logo" />
            </Link>
          </div>
          <div className="app-header__search-input">
            <Search
              placeholder="Search 'London'"
              enterButton
              value={search}
              onChange={event => setSearch(event.target.value)}
              onSearch={onSearch}
            />
          </div>
        </div>
        <div className="app-header__menu-section">
          <MenuItems viewer={viewer} setViewer={setViewer} />
        </div>
      </Header>
    )
})