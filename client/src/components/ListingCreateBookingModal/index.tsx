import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { 
    Button,
    Divider,
    Modal,
    Typography
} from "antd";
import { CardElement, injectStripe, ReactStripeElements } from "react-stripe-elements";
import { KeyOutlined } from "@ant-design/icons";
import moment, { Moment } from "moment";
import { CREATE_BOOKING } from "../../lib/graphql/mutations";
import { CreateBooking as CreateBookingData, CreateBookingVariables } from "../../lib/graphql/mutations/CreateBooking/__generated__/CreateBooking";
import { formatListingPrice, displaySuccessNotification, displayErrorMessage } from "../../lib/utils";

import styles from './index.module.css';

interface Props {
    id: string;
    price: number;
    modalVisible: boolean;
    checkInDate: Moment;
    checkOutDate: Moment;
    setModalVisible: (modalVisible: boolean) => void;
    clearBookingData: () => void;
    handleListingRefetch: () => Promise<void>;
}

const { Paragraph, Text, Title } = Typography;

export const ListingCreateBookingModal = ({ 
    id,
    price, 
    modalVisible, 
    checkInDate, 
    checkOutDate, 
    setModalVisible,
    clearBookingData,
    handleListingRefetch,
    stripe
}: Props & ReactStripeElements.InjectedStripeProps) => {
    const [createBooking, {  loading }] = useMutation<CreateBookingData, CreateBookingVariables>(CREATE_BOOKING, {
        onCompleted: () => {
            clearBookingData();
            displaySuccessNotification(
                "You've successfully booked the listing.",
                "Booking history can always be found in your User page."
            );
            handleListingRefetch();
        },
        onError: () => {
            displayErrorMessage("Sorry! We weren't able to successfully book the listing. Please try again later.")
        }
    });
    const daysBooked = checkOutDate.diff(checkInDate, "days") + 1;
    const listingPrice = price * daysBooked;

    const handleCreateBooking = async () => {
        if (!stripe) {
            return displayErrorMessage("Sorry! We weren't able to connect with Stripe.");
        }

        let { token: stripeToken, error } = await stripe.createToken();

        if (stripeToken) {
            createBooking({
                variables: {
                    input: {
                        id,
                        source: stripeToken.id,
                        checkIn: moment(checkInDate).format("YYYY-MM-DD"),
                        checkOut: moment(checkOutDate).format("YYYY-MM-DD"),
                    }
                }
            });
        } else {
            displayErrorMessage(
                error && error.message 
                ? error.message 
                : "Sory! We weren't able to book the listing. Please try again later."
            );
        }
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
                <Button 
                    size="large" 
                    type="primary" 
                    loading={loading}
                    onClick={handleCreateBooking}
                >
                    Book
                </Button>
            </div>
        </Modal>
    )
}

export const WrappedListingCreateBookingModal = injectStripe(ListingCreateBookingModal);