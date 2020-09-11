import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { HomeHero, HomeListings, HomeListingsSkeleton } from "../../components";
import { displayErrorMessage } from "../../lib/utils";
import { LISTINGS } from "../../lib/graphql/queries/Listings";
import { Listings as ListingsData, ListingsVariables } from "../../lib/graphql/queries/Listings/__generated__/Listings";
import { ListingsFilter } from "../../lib/graphql/globalTypes";
import { Col, Layout, Typography, Row } from "antd";

import mapBackground from "./assets/map-background.jpg";
import sanFransiscoImage from "./assets/san-fransisco.jpg";
import cancunImage from "./assets/cancun.jpg";

import styles from "./style.module.css";

const { Content } = Layout;
const { Paragraph, Title } = Typography;

const PAGE_LIMIT = 4;
const PAGE_NUMBER = 1;

export const Home = ({ history }: RouteComponentProps) => {
    const { loading, data } = useQuery<ListingsData, ListingsVariables>(LISTINGS, {
        variables: {
            filter: ListingsFilter.PRICE_HIGH_TO_LOW,
            limit: PAGE_LIMIT,
            page: PAGE_NUMBER
        }
    })
    const onSearch = (value: string) => {
        const trimmedValue = value.trim();
        if(trimmedValue) {
            history.push(`/listings/${trimmedValue}`);
        } else {
            displayErrorMessage("Please enter a valid search");
        }
    }

    const renderListingsSection = () => {
        if(loading) {
            return <HomeListingsSkeleton />;
        }

        if(data) {
            return (
                <HomeListings title="Premium Listings" listings={ data.listings.result } />
            )
        }

        return null;
    }

    return (
        <Content className={styles.home} style={{ backgroundImage: `url(${mapBackground})` }}>
            <HomeHero onSearch={onSearch} />
            <div className={styles.section}>
                <Title level={2}>
                    Your guide for all things rental
                </Title>                

                <Paragraph>
                    Helping you make the best decisions in renting your last minute locations.
                </Paragraph>

                <Link to="/listings/united%20states" className="ant-btn ant-btn-primary ant-btn-lg">
                    Popular listings in the United States
                </Link>
            </div>

            {renderListingsSection()}

            <div>
                <Title level={4}>
                    Listings of any kind
                </Title>
                <Row gutter={12}>
                    <Col xs={24} sm={12}>
                        <Link to="/listings/san%20fransisco">
                            <div>
                                <img src={sanFransiscoImage} style={{width: "100%"}} alt="San Fransisco" />
                            </div>
                        </Link>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Link to="/listings/cancun">
                            <div>
                                <img src={cancunImage} style={{width: "100%"}} alt="Cancun" />
                            </div>
                        </Link>
                    </Col>                
                </Row>
            </div>
        </Content>
    )
} 