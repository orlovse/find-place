import React, { useEffect, useRef } from "react";
import { Redirect } from "react-router-dom";
import { useApolloClient, useMutation } from "@apollo/react-hooks";
import { ErrorBanner } from "../../components/";
import { LOG_IN } from "../../lib/graphql/mutations";
import { AUTH_URL } from "../../lib/graphql/queries";
import { LogIn as LogInData, LogInVariables } from "../../lib/graphql/mutations/LogIn/__generated__/LogIn";
import { AuthUrl as AuthUrlData } from "../../lib/graphql/queries/AuthUrl/__generated__/AuthUrl";
import { Viewer } from "../../lib/types";
import { displaySuccessNotification, displayErrorMessage } from "../../lib/utils";
import { Button, Card, Layout, Spin, Row, Typography } from "antd";

interface Props {
    setViewer: (viewer: Viewer) => void;
}

const { Content } = Layout;
const { Paragraph, Text, Title } = Typography;

export const Login = ({ setViewer }: Props) => {
    const client = useApolloClient();
    const [
        logIn, 
        { data: logInData, loading: logInLoading, error: logInError }
    ] = useMutation<LogInData, LogInVariables>(LOG_IN, {
        onCompleted: (data) => {
            if(data && data.logIn && data.logIn.token) {
                setViewer(data.logIn);
                sessionStorage.setItem("token", data.logIn.token);
                displaySuccessNotification("You've successfully logged in!");
            }
        }
    });
    const logInRef = useRef(logIn);

    useEffect(() => {
        const code = new URL(window.location.href).searchParams.get("code");

        if(code) {
            logInRef.current({
                variables: {
                    input: { code }
                }
            });
        }
    }, []);

    const handleAuthorize = async () => {
        try {
            const { data } = await client.query<AuthUrlData>({
                query: AUTH_URL
            });
            window.location.href = data.authUrl;
        } catch {
            displayErrorMessage("Sorry! We weren't able to log in you. Please try again later!");
        }
    }

    if(logInLoading) {
        return (
            <Content>
                <Row justify="center" align="middle" style={{height:"100vh"}}>
                    <Spin size="large" tip="Logging you in..." />
                </Row>
            </Content>
        );
    }

    if(logInData && logInData.logIn) {
        const { id: viewerId } = logInData.logIn;
        return <Redirect to={`/user/${viewerId}`} />;
    }

    const logInErrorBannerElement = logInError? (
        <ErrorBanner description="Sorry! We weren't able to log in you. Please try again later!" />
    ) : null;

    return (
        <Content>
            <Row justify="center" align="middle" style={{height:"100vh"}}>
                { logInErrorBannerElement }
                <Card style={{  width: "450px", margin: "0 auto", textAlign: "center", padding: "10px 0 20px"}}>
                    <Paragraph>
                        <Title level={3}>
                            Log in to FindPlace
                        </Title>
                    </Paragraph>
                    <Paragraph>
                        <Text>Sign om with Google to start booking avaible</Text>
                    </Paragraph>
                    <Paragraph>
                        <Button type="primary" onClick={handleAuthorize}>
                            <span>
                                Log in with Google
                            </span>
                        </Button>
                    </Paragraph>
                    <Paragraph>
                        <Text type="secondary">Note: by signing in you will be redirected to sign in with your Google account.</Text>
                    </Paragraph>
                </Card>
            </Row>
        </Content>
    )
}