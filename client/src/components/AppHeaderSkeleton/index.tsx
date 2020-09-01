import React from "react";
import { Layout } from "antd";
import { HomeOutlined } from "@ant-design/icons";

const { Header } = Layout;

export const AppHeaderSkeleton = () => {
    return (
        <Header>
            <HomeOutlined />
        </Header>
    );
}