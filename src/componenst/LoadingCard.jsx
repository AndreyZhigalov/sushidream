import React from "react"
import ContentLoader from "react-content-loader"

export const LoadingCard = (props) => (
    <ContentLoader
        speed={2}
        width={200}
        height={300}
        viewBox="0 0 200 300"
        backgroundColor="#ebebeb"
        foregroundColor="#f2f2f2"
        {...props}
    >
        <rect x="0" y="0" rx="10" ry="10" width="200" height="200" />
        <rect x="15" y="209" rx="2" ry="2" width="163" height="11" />
        <rect x="15" y="225" rx="2" ry="2" width="126" height="11" />
        <circle cx="171" cy="267" r="20" />
        <circle cx="125" cy="267" r="11" />
        <circle cx="95" cy="267" r="11" />
        <rect x="15" y="264" rx="2" ry="2" width="54" height="22" />
        <rect x="15" y="250" rx="2" ry="2" width="45" height="11" />
    </ContentLoader>
)


