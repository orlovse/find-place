import React from "react";
import { ListingCard } from "../../components/";
import { User } from "../../lib/graphql/queries/User/__generated__/User";
import { List, Typography } from "antd";

interface Props {
    userListings: User["user"]["listings"];
    listingsPage: number;
    limit: number;
    setListingsPage: (page: number) => void;
}

const { Paragraph, Title } = Typography;

export const UserListings = ({
    userListings,
    listingsPage,
    limit,
    setListingsPage
}: Props ) => {
    const { total, result } = userListings;

    const userListingsList = (
        <List 
            grid={{
                gutter: 8,
                xs: 1,
                sm: 2,
                lg: 4
            }}
            dataSource={result}
            locale={{ emptyText: "User doesn't  have any listings yet!" }}
            pagination={{
                position: "top",
                current: listingsPage,
                total,
                defaultPageSize: limit,
                hideOnSinglePage: true,
                showLessItems: true,
                onChange: (page: number) => setListingsPage(page)
            }}
            renderItem={ userListing => (
                <List.Item>
                    <ListingCard listing={ userListing } />
                </List.Item>
            )}
        />
    );

    return (
        <div style={{paddingTop: "40px"}}>
            <Title level={4}>
                Listings
            </Title>
            <Paragraph>
                This section highlights the listings this user currently hosts and has made available for bookings.
            </Paragraph>
            {userListingsList}
        </div>
    );
}