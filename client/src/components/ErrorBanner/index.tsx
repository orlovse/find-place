import React from "react";
import { Alert } from "antd";

interface Props {
    message?: string;
    description?: string;
}

export const ErrorBanner = ({ 
    message = "Something went wrong", 
    description = "Look like something went wront. Please check your connection"
}: Props ) =>  {
    return (
        <Alert 
            banner
            closable
            message={message}
            description={description}
            type="error"
        />
    )
};