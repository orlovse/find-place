import React from "react";
import { Link } from "react-router-dom";
import { MenuItems } from "../MenuItems";
import { Viewer } from "../../lib/types";
import { Layout } from "antd";
import { HomeOutlined } from '@ant-design/icons';

interface Props {
    viewer: Viewer;
    setViewer: (viewer: Viewer) => void;
}

const { Header } = Layout;

export const AppHeader = ({viewer, setViewer}: Props) => {


    return (
        <Header>
            <Link to="/">
                <div>
                    <div>
                        <HomeOutlined />
                    </div>
                </div>
            </Link>
            <MenuItems viewer={viewer} setViewer={setViewer} />
        </Header>
    )
}