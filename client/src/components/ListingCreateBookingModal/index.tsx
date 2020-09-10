import React from "react";
import { 
    Button,
    Divider,
    Modal,
    Typography
} from "antd";
import { CardElement, injectStripe, ReactStripeElements } from "react-stripe-elements";
import { KeyOutlined } from "@ant-design/icons";
import moment, { Moment } from "moment";
import { formatListingPrice } from "../../lib/utils";

import styles from './index.module.css';

interface Props {
    price: number;
    modalVisible: boolean;
    checkInDate: Moment;
    checkOutDate: Moment;
    setModalVisible: (modalVisible: boolean) => void;
}

const { Paragraph, Text, Title } = Typography;

export const ListingCreateBookingModal = ({ 
    price, 
    modalVisible, 
    checkInDate, 
    checkOutDate, 
    setModalVisible,
    stripe
}: Props & ReactStripeElements.InjectedStripeProps) => {
    const daysBooked = checkOutDate.diff(checkInDate, "days") + 1;
    const listingPrice = price * daysBooked;

    const handleCreateBooking = async () => {
        if (!stripe) {
            return;
        }

        let { token: stripeToken } = await stripe.createToken();
        console.log(stripeToken);
    }
    
    return (
        <Modal
            visible={modalVisible}
            centered
            footer={null}
            onCancel={() => setModalVisible(false)}
        >
            <div className={styles.center}>
                <Title>
                    <KeyOutlined />
                </Title>
                <Title level={3} >
                    Book your trip
                </Title>
                <Paragraph>
                    Enter your payment information to book the listing from the dates between{" "} 
                    <Text mark strong>
                        {moment(checkInDate).format("MMMM Do YYYY")}
                    </Text> {" "}
                    and {" "}
                    <Text mark strong>
                        {moment(checkOutDate).format("MMMM Do YYYY")}
                    </Text>
                    , inclusive. 
                </Paragraph>

                <Divider />

                <Paragraph>
                    {formatListingPrice(price, false)} * {daysBooked} days = {" "}
                    <Text strong>{formatListingPrice(listingPrice, false)}</Text>
                </Paragraph>
                <Paragraph strong>
                    Total = <Text mark>{formatListingPrice(listingPrice, false)}</Text>
                </Paragraph>

                <Divider />
                <CardElement hidePostalCode className={styles.card} />
                <Button size="large" type="primary" onClick={handleCreateBooking}>Book</Button>
            </div>
        </Modal>
    )
}

export const WrappedListingCreateBookingModal = injectStripe(ListingCreateBookingModal);