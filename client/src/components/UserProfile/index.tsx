import React from "react";
import { User as UserData } from "../../lib/graphql/queries/User/__generated__/User";
import { Avatar, Button, Card, Divider, Typography } from "antd";

interface Props {
    user: UserData["user"];
    viewerIsUser: boolean;
}

const stripeAuthUrl = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_S_CLIENT_ID}&scope=read_write`;
const { Paragraph, Text, Title } = Typography;

export const UserProfile = ({user, viewerIsUser }: Props) => {
    const redirectToStripe = () => {
        window.location.href = stripeAuthUrl;
    }
    const additionalDetailsSection = viewerIsUser ? (
        <div>
            <Divider />
            <Title level={4}>Additional details</Title>
            <Paragraph>
                Interested in becoming a FindPlace host? Register with your Stripe account!
            </Paragraph>
            <Button type="primary" onClick={redirectToStripe}>
                Connect with Stripe
            </Button>
            <Paragraph type="secondary">
                FindPlace uses <a href="https://stripe.com/en-US/connect" target="_blank" rel="noopener noreferrer">Stripe</a> to help transfer your earnings in a secure and truster manner.
            </Paragraph>
        </div>
    ) : null;
    return (
        <Card>
            <Avatar size={100} src={user.avatar} />
            <Divider />
            <Title level={4}>Details</Title>
            <Paragraph>
                Name: <Text strong>{user.name}</Text>
            </Paragraph>
            <Paragraph>
                Contact: <Text strong>{user.contact}</Text>
            </Paragraph>   
            {additionalDetailsSection}         
        </Card>
    );
}