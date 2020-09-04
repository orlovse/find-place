import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { HomeHero } from "../../components";
import { displayErrorMessage } from "../../lib/utils";
import { Col, Layout, Typography, Row } from "antd";

import mapBackground from "./assets/map-background.jpg";
import sanFransiscoImage from "./assets/san-fransisco.jpg";
import cancunImage from "./assets/cancun.jpg";

const { Content } = Layout;
const { Paragraph, Title } = Typography;


export const Home = ({ history }: RouteComponentProps) => {

    const onSearch = (value: string) => {
        const trimmedValue = value.trim();
        if(trimmedValue) {
            history.push(`/listings/${trimmedValue}`);
        } else {
            displayErrorMessage("Please enter a valid search");
        }
    }

    return (
        <Content style={{ 
            backgroundImage: `url(${mapBackground})`,
            padding: "60px 120px",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "10% 0"
        }}>
            <HomeHero onSearch={onSearch} />
            <Row justify="center">
                <Title level={2}>
                    Your guide for all things rental
                </Title>                
            </Row>
            <Row justify="center">
                <Paragraph>
                    Helping you make the best decisions in renting your last minute locations.
                </Paragraph>
            </Row>
            <Row justify="center">
                <Link to="/listings/united%20states" className="ant-btn ant-btn-primary ant-btn-lg">
                    Popular listings in the United States
                </Link>
            </Row>

            <div>
                <Title level={4}>
                    Listings of any kind
                </Title>
                <Row gutter={12}>
                    <Col xs={24} sm={12}>
                        <Link to="/listings/san%20fransisco">
                            <div>
                                <img src={sanFransiscoImage} alt="San Fransisco" />
                            </div>
                        </Link>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Link to="/listings/cancun">
                            <div>
                                <img src={cancunImage} alt="Cancun" />
                            </div>
                        </Link>
                    </Col>                
                </Row>
            </div>
        </Content>
    )
} 