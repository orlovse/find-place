import React, { useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { ListingCard, ListingsFilters } from "../../components";
import { LISTINGS } from "../../lib/graphql/queries";
import { Listings as ListingsData, ListingsVariables } from "../../lib/graphql/queries/Listings/__generated__/Listings";
import { ListingsFilter } from "../../lib/graphql/globalTypes";
import { Layout, List, Typography } from "antd";

interface MatchParams {
    location: string;
}

const { Content } = Layout;
const { Paragraph, Text, Title } = Typography;

const PAGE_LIMIT = 8;

export const Listings = ({ match }: RouteComponentProps<MatchParams>) => {
    const [filter, setFilter] = useState(ListingsFilter.PRICE_LOW_TO_HIGH);
    const { data } = useQuery<ListingsData, ListingsVariables>(LISTINGS, {
        variables: {
            location: match.params.location,
            filter,
            limit: PAGE_LIMIT,
            page: 1
        }
    });

    const listings = data ? data.listings : null;
    const listingsRegion = listings ? listings.region : null;
    const listingsSectionElement = listings && listings.result.length ? (
        <div>
            <ListingsFilters filter={filter} setFilter={setFilter} />
            <List 
                grid={{
                    gutter: 8,
                    xs: 1,
                    sm: 2,
                    md: 2,
                    lg: 4,
                    xl: 4,
                    xxl: 4
                }}
                dataSource={listings.result}
                renderItem={listing => (
                    <List.Item>
                        <ListingCard listing={listing} />
                    </List.Item>
                )}
            />
        </div>
    ) : (
        <div>
            <Paragraph>It appears that no listings have yet been created for{" "}
                <Text mark>"{listingsRegion}"</Text>
            </Paragraph>
            <Paragraph>
                Be the first person to create a <Link to="/host">listing in this area</Link>.
            </Paragraph>            
        </div>
    );

    const listingsRegionElement = listingsRegion ? (
        <Title level={3}>Results for "{listingsRegion}"</Title>
    ) : null;

    return (
        <Content>
            {listingsRegionElement}
            {listingsSectionElement}
        </Content>
    )
}