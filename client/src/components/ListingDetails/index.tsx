import React from "react";
import { Link } from "react-router-dom";
import { Listing as ListingData } from "../../lib/graphql/queries/Listing/__generated__/Listing";
import { iconColor } from "../../lib/utils";
import { Avatar, Divider, Tag, Typography } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";

interface Props {
    listing: ListingData["listing"];
}

const { Paragraph, Title } = Typography;

export const ListingDetails = ({ listing }: Props) => {
    const {title, description, image, type, address, city, numOfGuests, host } = listing;
    return (
        <div>
            <div style={{ 
                backgroundImage: `url(${image})`, 
                width: "100%",
                height: "500px",
                backgroundSize: "cover",
                backgroundPosition: "50%"
            }} />
            <div>
                <Paragraph type="secondary" ellipsis >
                    <Link to={`/listings/${city}`} >
                        <EnvironmentOutlined style={{ color: iconColor }} /> {city}
                    </Link>

                    <Divider type="vertical" />
                    {address}
                </Paragraph>
                <Title level={3} >
                    {title}
                </Title>
            </div>

            <div>
                <Link to={`/user/${host.id}`}>
                    <Avatar src={host.avatar} size={64} />
                    <Title level={2}>
                        {host.name}
                    </Title>
                </Link>
            </div>

            <Divider />

            <div>
                <Title level={4}>About this space</Title>
                <div>
                    <Tag color="magenta">{type}</Tag>
                    <Tag color="magenta">{numOfGuests} Guests</Tag>
                </div>
                <Paragraph ellipsis={{ rows: 3, expandable: true }}>
                    {description}
                </Paragraph>
            </div>
        </div>
    );
}