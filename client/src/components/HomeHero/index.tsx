import React from "react";
import { Link } from "react-router-dom";
import { Card, Col, Input, Row, Typography } from "antd";

import torontoImage from "./assets/toronto.jpg";
import dubaiImage from "./assets/dubai.jpg";
import losAngelesImage from "./assets/los-angeles.jpg";
import londonImage from "./assets/london.jpg";

import styles from "./styles.module.css";

const { Title } =  Typography;
const { Search } = Input;

interface Props {
    onSearch: (value: string) => void;
}

const cards = [
    {
        id: 11111,
        name: "Toronto",
        link: "/listings/toronto",
        image: torontoImage,
    },
    {
        id: 22222,
        name: "Dubai" ,
        link: "/listings/dubai",
        image: dubaiImage,
    },
    {
        id: 33333,
        name: "Los Angeles",
        link: "/listings/los%20angeles",
        image: losAngelesImage,
    },
    {
        id: 4444,
        name: "London",
        link: "/listings/los%20angeles",
        image: londonImage,
    },
];

const cardsList = cards.map(card => (
    <Col xs={12} md={6} key={card.id}>
        <Link to={card.link}>
            <Card 
                className={styles.card} 
                bodyStyle={{
                    paddingTop: "0",
                    paddingBottom: "0",
                    height: "0",
                    textAlign: "center",
                    fontSize: "20px",
                    color: "#fff",
                    fontWeight: "bold",
                    position: "relative",
                    bottom: "45px"
                }}
                cover={<img alt={card.name} src={card.image} />}
            >
                {card.name}
            </Card>
        </Link>
    </Col>
))

export const HomeHero = ({ onSearch }: Props) => {
    return (
        <div>
            <Title>Find a place you'll love to stay at</Title>
            <Search 
                placeholder="Search 'San Fransisco"
                size="large"
                enterButton
                onSearch={onSearch}
                className={styles.search}
            />
            <Row gutter={12} >
                {cardsList}
            </Row>
        </div>
    )
}