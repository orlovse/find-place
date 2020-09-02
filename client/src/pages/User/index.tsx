import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { USER } from "../../lib/graphql/queries";
import { User as UserData, UserVariables } from "../../lib/graphql/queries/User/__generated__/User";
import { Viewer } from "../../lib/types";
import { ErrorBanner ,PageSkeleton ,UserProfile } from "../../components";
import { Col, Layout, Row} from "antd";

interface Props {
    viewer: Viewer;
}

interface MatchParams {
    id: string;
}

const { Content } = Layout;

export const User = ({ viewer, match }: Props & RouteComponentProps<MatchParams>) => {
    const { data, loading, error } = useQuery<UserData, UserVariables>(USER, {
        variables: {
            id: match.params.id
        }
    });

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
    // console.log(viewer)
    // const viewerIsUser = viewer.id === match.params.id;
    const viewerIsUser = false;

    const userProfileElement = user ? <UserProfile user={user} viewerIsUser={viewerIsUser} /> : null;
    return (
        <Content>
            <Row gutter={12} justify="space-between">
                <Col xs={24}>{userProfileElement}</Col>
            </Row>
        </Content>
    );
}