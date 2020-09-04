import React from "react";
import { ListingCard } from "../ListingCard";
import { Listings } from "../../lib/graphql/queries/Listings/__generated__/Listings";
import { List, Typography } from "antd";

interface Props {
    title: string;
    listings: Listings["listings"]["result"];
}

const { Title } = Typography;

export const HomeListings = ({ title, listings}: Props) => {
    return (
        <div>
            <Title level={4}>{title}</Title>
            <List 
                grid={{
                    gutter: 8,
                    xs: 1,
                    sm: 2,
                    lg: 4,
                    xl: 4,
                    xxl: 4
                }}
                dataSource={listings}
                renderItem={listing => (
                    <List.Item>
                        <ListingCard listing={listing} />
                    </List.Item>
                )}
            />
        </div>
    )
}