import React from "react";
import moment, { Moment } from "moment";
import { Button, Card, Col, DatePicker, Divider, Row, Typography } from "antd";
import { displayErrorMessage, formatListingPrice } from "../../lib/utils";

const { Paragraph, Title } = Typography;

interface Props {
    price: number;
    checkInDate: Moment | null;
    checkOutDate: Moment | null;
    setCheckInDate: (checkInDate: Moment | null) => void;
    setCheckOutDate: (checkOutDate: Moment | null) => void;
}

export const ListingCreateBooking = ({ 
    price, 
    checkInDate,  
    checkOutDate,
    setCheckInDate,
    setCheckOutDate
}: Props ) => {

    const disabledDate = (currentDate?: Moment) => {
        if (currentDate) {
            const dateIsBeforeEndOfDay =currentDate.isBefore(moment().endOf("day"));

            return dateIsBeforeEndOfDay;
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
        }

        setCheckOutDate(selectedCheckOutDate);
    };

    const checkOutInputDisabled = !checkInDate;
    const buttonDisabled = !checkInDate || !checkOutDate;

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
                    >Request to book</Button>
                </Col>
            </Row>






        </Card>
    );
}