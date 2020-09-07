import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { Viewer } from "../../lib/types";
import { formatListingPrice, displaySuccessNotification, displayErrorMessage } from "../../lib/utils";
import { DISCONNECT_STRIPE } from "../../lib/graphql/mutations";
import { DisconnectStripe as DisconnectStripeData } from "../../lib/graphql/mutations/DisconnectStripe/__generated__/DisconnectStripe";
import { User as UserData } from "../../lib/graphql/queries/User/__generated__/User";
import { Avatar, Button, Card, Divider, Tag, Typography } from "antd";

interface Props {
    user: UserData["user"];
    viewer: Viewer;
    viewerIsUser: boolean;
    setViewer: (viewer: Viewer) => void;
    handleUserRefetch: () => void;
}

const stripeAuthUrl = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_S_CLIENT_ID}&scope=read_write`;
const { Paragraph, Text, Title } = Typography;

export const UserProfile = ({user, viewer, viewerIsUser, setViewer, handleUserRefetch }: Props) => {
    const [disconnectStripe, { loading }] = useMutation<DisconnectStripeData>(
        DISCONNECT_STRIPE, {
            onCompleted: data => {
                if (data && data.disconnectStripe) {
                    setViewer({ ...viewer, hasWallet: data.disconnectStripe.hasWallet })
                    displaySuccessNotification(
                        "You've successfully disconnected from Strip!",
                        "You'll have to reconnect with Stripe to continue to create listings."
                    );
                    handleUserRefetch();
                }
            },
            onError: () => {
                displayErrorMessage(
                    "Sorry! We weren't able to disconnect you from Stripe. Please try again later."
                );
            }
        }
    );
    
    const redirectToStripe = () => {
        window.location.href = stripeAuthUrl;
    };

    const additionalDetails = user.hasWallet ? (
        <>
            <Paragraph>
                <Tag color="green">Stripe Registered</Tag>
            </Paragraph>
            <Paragraph>
                Income Earned: {""}
                <Text strong>{user.income ? formatListingPrice(user.income) : `$0`} </Text>
            </Paragraph>
            <Button 
                type="primary" 
                loading={loading} 
                onClick={() => disconnectStripe()}
            >
                Disconnect Stripe
            </Button>
            <Paragraph type="secondary">
                By disconnecting, you won't be able to receive{" "}
                <Text strong>any further payments</Text>. This will prevent users from booking
                listings that you might have already created.
            </Paragraph>
        </>
    ) : (
    <>
        <Paragraph>
            Interested in becoming a FindPlace host? Register with your Stripe account!
        </Paragraph>
        <Button type="primary" onClick={redirectToStripe}>
            Connect with Stripe
        </Button>
        <Paragraph type="secondary">
            FindPlace uses <a href="https://stripe.com/en-US/connect" target="_blank" rel="noopener noreferrer">Stripe</a> to help transfer your earnings in a secure and truster manner.
        </Paragraph>    
    </> 
    );

    const additionalDetailsSection = viewerIsUser ? (
        <div>
            <Divider />
            <Title level={4}>Additional details</Title>
            {additionalDetails}
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