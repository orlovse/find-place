import React from "react";
import { ListingCard } from "../../components/";
import { User } from "../../lib/graphql/queries/User/__generated__/User";
import { List, Typography } from "antd";

interface Props {
    userBookings: User["user"]["bookings"];
    bookingsPage: number;
    limit: number;
    setBookingsPage: (page: number) => void;
}

const { Paragraph, Text, Title } = Typography;

export const UserBookings = ({
    userBookings,
    bookingsPage,
    limit,
    setBookingsPage
}: Props ) => {
    const total = userBookings ? userBookings.total : null;
    const result = userBookings ? userBookings.result : null;

    const userBookingsList = userBookings ? (
        <List 
            grid = {{
                gutter: 8,
                xs: 1,
                sm: 2,
                lg: 4
            }}
            dataSource = {result ? result : undefined}
            locale = {{ emptyText: "You haven't made any bookings!" }}
            pagination={{
                position: "top",
                current: bookingsPage,
                total: total ? total : undefined,
                defaultPageSize: limit,
                hideOnSinglePage: true,
                showLessItems: true,
                onChange: (page: number) => setBookingsPage(page)
            }}
            renderItem = { userBooking => {
                const bookingHistory = (
                    <div>
                        <div>
                            Check in: <Text strong>{userBooking.checkIn}</Text>
                        </div>
                        <div>
                            Check out: <Text strong>{userBooking.checkOut}</Text>
                        </div>                        
                    </div>
                );

                return (
                    <List.Item>
                        {bookingHistory}
                    <   ListingCard listing = { userBooking.listing } />
                    </List.Item>                    
                );
            }}
        />
    ) : null;

    const userBookingsElement = userBookingsList ? (
        <div style={{paddingTop: "40px"}}>
            <Title level={4}>
                Bookings
            </Title>
            <Paragraph>
                This section highlights the bookings you've made, and the check-in/check-out dates associated with said bookings.
            </Paragraph>
            {userBookingsList}
        </div>
    ) : null;

    return userBookingsElement;
}