import React from "react";
import { Link } from "react-router-dom";
import { MenuItems } from "../MenuItems";
import { Viewer } from "../../lib/types";
import { Layout, Row, Col } from "antd";
import { HomeOutlined } from '@ant-design/icons';

interface Props {
    viewer: Viewer;
    setViewer: (viewer: Viewer) => void;
}

const { Header } = Layout;

export const AppHeader = ({viewer, setViewer}: Props) => {


    return (
        <Header style={{background: "white", boxShadow: "0 2px 8px #f0f1f2"}}>
            <Row justify="space-between">
                <Col>
                    <Link to="/">
                        <HomeOutlined />
                    </Link>                
                </Col>
                <Col>
                    <MenuItems viewer={viewer} setViewer={setViewer} />
                </Col>
            </Row>
        </Header>
    )
}