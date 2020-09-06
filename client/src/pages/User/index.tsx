import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { USER } from "../../lib/graphql/queries";
import { User as UserData, UserVariables } from "../../lib/graphql/queries/User/__generated__/User";
import { Viewer } from "../../lib/types";
import { ErrorBanner, PageSkeleton, UserBookings, UserListings, UserProfile } from "../../components";
import { Col, Layout, Row} from "antd";

interface Props {
    viewer: Viewer;
}

interface MatchParams {
    id: string;
}

const { Content } = Layout;
const PAGE_LIMIT = 4;

export const User = ({ 
    viewer, 
    match 
}: Props & RouteComponentProps<MatchParams>) => {
    const [listingsPage, setListingsPage] = useState(1);
    const [bookingsPage, setBookingsPage] = useState(1);
    
    const { data, loading, error } = useQuery<UserData, UserVariables>(USER, {
        variables: {
            id: match.params.id,
            bookingsPage,
            listingsPage,
            limit: PAGE_LIMIT
        }
    });

    const stripeError = new URL(window.location.href).searchParams.get("stripe_error");
    const stripeErrorBanner = stripeError ? (
        <ErrorBanner description="We had an issue connecting with Stripe. Please try again soon." />
    ) : null;

    if(loading) {
        return (
            <Content>
                <PageSkeleton />
            </Content>
        );
    }

    if(error) {
        return (
            <Content>
                <ErrorBanner description="This user may not exist" />
                <PageSkeleton />
            </Content>
        );
    }

    const user = data ? data.user : null;
    
    const viewerIsUser = viewer.id === match.params.id;
    // const viewerIsUser = false;

    const userListings = user ? user.listings : null;
    const userBookings = user ? user.bookings : null; 

    const userProfileElement = user ? <UserProfile user={user} viewerIsUser={viewerIsUser} /> : null;
    
    const userListingsElement = userListings ? (
        <UserListings 
            userListings={userListings} 
            listingsPage={listingsPage} 
            limit={PAGE_LIMIT} 
            setListingsPage={setListingsPage} 
        />
    ) : null;

    const userBookingsElement = userBookings ? (
        <UserBookings
            userBookings={userBookings} 
            bookingsPage={bookingsPage} 
            limit={PAGE_LIMIT} 
            setBookingsPage={setBookingsPage} 
        />
    ) : null;

    return (
        <Content>
            {stripeErrorBanner}
            <Row gutter={12} justify="space-between">
                <Col xs={24}>{userProfileElement}</Col>
                <Col xs={24}>
                    {userListingsElement}
                    {userBookingsElement}
                </Col>
            </Row>
        </Content>
    );
}