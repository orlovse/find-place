import React from "react";
import moment, { Moment } from "moment";
import { 
    Button, 
    Card, 
    Col, 
    DatePicker, 
    Divider, 
    Row, 
    Typography 
} from "antd";
import { Listing as ListingData } from "../../lib/graphql/queries/Listing/__generated__/Listing";
import { displayErrorMessage, formatListingPrice } from "../../lib/utils";
import { Viewer } from "../../lib/types";
import { BookingsIndex } from "./types";

const { Paragraph, Text, Title } = Typography;

interface Props {
    viewer: Viewer;
    host: ListingData["listing"]["host"];
    price: number;
    bookingsIndex: ListingData["listing"]["bookingsIndex"];
    checkInDate: Moment | null;
    checkOutDate: Moment | null;
    setCheckInDate: (checkInDate: Moment | null) => void;
    setCheckOutDate: (checkOutDate: Moment | null) => void;
    setModalVisible: (setModalVisible: boolean) => void;
}

export const ListingCreateBooking = ({ 
    viewer,
    host,
    price, 
    bookingsIndex,
    checkInDate,  
    checkOutDate,
    setCheckInDate,
    setCheckOutDate,
    setModalVisible
}: Props ) => {
    const bookingsIndexJSON: BookingsIndex = JSON.parse(bookingsIndex);
    
    const dateIsBooked = (currentDate: Moment) => {
        const year = moment(currentDate).year();
        const month = moment(currentDate).month();
        const day = moment(currentDate).date();

        if (bookingsIndexJSON[year] && bookingsIndexJSON[year][month]) {
            return Boolean(bookingsIndexJSON[year][month][day]);
        } else {
            return false;
        }
    }

    const disabledDate = (currentDate?: Moment) => {
        if (currentDate) {
            const dateIsBeforeEndOfDay = currentDate.isBefore(moment().endOf("day"));

            return dateIsBeforeEndOfDay || dateIsBooked(currentDate);
        } else {
            return false;
        }
    }

    const verifyAndSetCheckOutDate = (selectedCheckOutDate: Moment | null) => {
        if (checkInDate && selectedCheckOutDate) {
            if (moment(selectedCheckOutDate).isBefore(checkInDate, "days")) {
                return displayErrorMessage(
                    `You can't book date of check out to be prior to check in!`
                );
            }

            let dateCursor = checkInDate;

            while (moment(dateCursor).isBefore(selectedCheckOutDate, "days")) {
                dateCursor = moment(dateCursor).add(1, "days");

                const year = moment(dateCursor).year();
                const month = moment(dateCursor).month();
                const day = moment(dateCursor).date();

                if (
                  bookingsIndexJSON[year] && 
                  bookingsIndexJSON[year][month] && 
                  bookingsIndexJSON[year][month][day]
                ) {
                    return displayErrorMessage("You can't book a period of time that overlaps existing bookings. Please try again.");
                }
            }
        }

        setCheckOutDate(selectedCheckOutDate);
    };

    const viewerIsHost = viewer.id === host.id;
    const checkInInputDisabled = !viewer.id || viewerIsHost || !host.hasWallet;
    const checkOutInputDisabled = checkInInputDisabled || !checkInDate;
    const buttonDisabled = checkInInputDisabled || !checkInDate || !checkOutDate;

    let buttonMessage =  "You won't be charged yet.";
    if (!viewer.id) {
        buttonMessage = "You have to be signed in to book a listing.";
    } else if (viewerIsHost) {
        buttonMessage = "You can't book your own listing.";
    } else if (!host.hasWallet) {
        buttonMessage = "The host has disconnected from Stripe and thus won't be able to recive payments."
    }

    return (
        <Card>
            <Row justify="center">
                <Col>
                    <Paragraph>
                        <Title level={2}>
                            {formatListingPrice(price)}
                            <span>/day</span>
                        </Title>
                    </Paragraph>                
                </Col>
                <Divider />
                <Col>
                    <Paragraph strong>Check in</Paragraph>
                    <DatePicker 
                        value={checkInDate} 
                        disabledDate={disabledDate}
                        disabled={checkInInputDisabled}
                        format={"YYYY/MM/DD"}
                        showToday={false}
                        onChange={dateValue => setCheckInDate(dateValue)} 
                        onOpenChange={() => setCheckOutDate(null)}
                    />
                </Col>
                <Col>
                    <Paragraph strong>Check out</Paragraph>
                    <DatePicker 
                        value={checkOutDate} 
                        disabledDate={disabledDate}
                        format={"YYYY/MM/DD"}
                        showToday={false}
                        disabled={checkOutInputDisabled}
                        onChange={dateValue => verifyAndSetCheckOutDate(dateValue)} 
                    />
                </Col>
                <Divider />
                <Col>
                    <Button 
                        size="large" 
                        type="primary"
                        disabled={buttonDisabled}
                        onClick={() => setModalVisible(true)}
                        style={{ display: "block", margin: "0 auto 10px"}}
                    >Request to book</Button>
                    <Paragraph>
                        <Text type="secondary" mark>{buttonMessage}</Text>
                    </Paragraph>
                </Col>
            </Row>
        </Card>
    );
}