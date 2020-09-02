import React from "react";
import { Card, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";

interface Props {
    listing: {
        id: string;
        title: string;
        image: string;
        address: string;
        price: number;
        numOfGuests: number;
    };
}

const { Text, Title } = Typography;

export const ListingCard = ({ listing }: Props) => {
    const { title, image, address, price, numOfGuests } = listing;
    return (
        <Card hoverable cover={<div style={{backgroundImage: `url(${image})` }} />}>
            <Title level={4} >
                {price}
                <span>/day</span>
            </Title>
            <Text strong ellipsis >
                {title}
            </Text>
            <Text strong ellipsis>
                {address}
            </Text>
            <div>
                <UserOutlined />
                <Text>{numOfGuests} guests </Text>
            </div>
        </Card>
    );
}