import React from "react";
import { Button, Card, Layout, Typography } from "antd";

const { Content } = Layout;
const { Text, Title } = Typography;

export const Login = () => {
    return (
        <Content>
            <Card>
                <div>
                    <Title level={3}>
                        Log in to FindPlace
                    </Title>
                    <Text>Sign om with Google to start booking avaible</Text>
                </div>
                <Button type="primary">
                    <span>
                        Log in with Google
                    </span>
                </Button>
                <Text type="secondary">Note: by signing in you will be redirected to sign in with your Google account.</Text>
            </Card>
        </Content>
    )
}