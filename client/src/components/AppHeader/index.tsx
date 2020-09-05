import React, { useState, useEffect } from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { MenuItems } from "../MenuItems";
import { Viewer } from "../../lib/types";
import { Input, Layout, Row, Col } from "antd";
import { HomeOutlined } from '@ant-design/icons';
import { displayErrorMessage } from "../../lib/utils";

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
        <Header style={{background: "white", boxShadow: "0 2px 8px #f0f1f2"}}>
            <Row>
                <Col span={1}>
                    <Link to="/">
                        <HomeOutlined />
                    </Link>                
                </Col>
                <Col flex={1}>
                    <Search 
                        placeholder="Search"
                        enterButton
                        value={search}
                        onChange={event => setSearch(event.target.value)}
                        onSearch={onSearch}
                        style={{transform: "translate(0, 50%)"}}
                    />
                </Col>
                <Col>
                    <MenuItems viewer={viewer} setViewer={setViewer} />
                </Col>
            </Row>
        </Header>
    )
})