import React from "react";
import { Link } from "react-router-dom";
import { iconColor, formatListingPrice } from "../../lib/utils";
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
    const { id, title, image, address, price, numOfGuests } = listing;
    return (
        <Link to={`/listing/${id}`}>
            <Card hoverable cover={<div style={{
                backgroundImage: `url(${image})`,
                width: "100%",
                height: "195px",
                backgroundSize: "cover",
                backgroundPosition: "50%"
            }} />}>
                <Title level={4} >
                    {formatListingPrice(price)}
                    <span>/day</span>
                </Title>
                <Text strong ellipsis >
                    {title}
                </Text>
                <Text ellipsis>
                    {address}
                </Text>
                <div>
                    <UserOutlined style={{ color: iconColor }} />
                    <Text>{numOfGuests} guests </Text>
                </div>
            </Card>
        </Link>
    );
}