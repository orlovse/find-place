import React from "react";
import { 
    Button,
    Divider,
    Modal,
    Typography
} from "antd";
import { KeyOutlined } from "@ant-design/icons";
import moment, { Moment } from "moment";
import { formatListingPrice } from "../../lib/utils";


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
    setModalVisible 
}: Props) => {
    const daysBooked = checkOutDate.diff(checkInDate, "days") + 1;
    const listingPrice = price * daysBooked;
    
    return (
        <Modal
            visible={modalVisible}
            centered
            footer={null}
            onCancel={() => setModalVisible(false)}
        >
            <div>
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

                <Button size="large" type="primary">Book</Button>
            </div>
        </Modal>
    )
}