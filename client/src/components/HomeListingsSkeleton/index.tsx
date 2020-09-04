import React from "react";
import { Card, List, Skeleton } from "antd";

import loadingCardCover from "./assets/listing-loading-card-cover.jpg";

export const HomeListingsSkeleton = () => {
    const emptyData = [{}, {}, {}, {}]
    return (
        <div>
            <Skeleton paragraph={{ rows: 0 }} />
            <List 
                grid={{
                    gutter: 8,
                    xs: 1,
                    sm: 2,
                    lg: 4,
                    xl: 4,
                    xxl: 4
                }}
                dataSource={emptyData}
                renderItem={() => (
                    <List.Item>
                        <Card 
                            cover={
                                <div style={{
                                    backgroundImage: `url(${loadingCardCover})`
                                }}></div>
                            }
                            loading
                        />
                    </List.Item>
                )}
            />
        </div>
    )
}