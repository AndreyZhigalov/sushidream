
import React from 'react'

export const CartIcon = () => {
    return (
        <svg width="40" height="40" viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_1_26)">
                <g filter="url(#filter0_dddd_1_26)">
                    <path d="M105 63.6364C105 79.7576 105 112 65 112C25 112 25 79.7576 25 63.6364M105 63.6364V65.9394M105 63.6364V36H25V64.2121M45 36C45 30 49 18 65 18C81 18 85 30 85 36" stroke="white" strokeWidth="7" strokeLinecap="round" shapeRendering="crispEdges" />
                </g>
            </g>
            <defs>
                <filter id="filter0_dddd_1_26" x="5" y="-2" width="120" height="134" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset />
                    <feGaussianBlur stdDeviation="4.5" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.901961 0 0 0 0 0 0 0 0 0 0.494118 0 0 0 1 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_26" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset />
                    <feGaussianBlur stdDeviation="9" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.901961 0 0 0 0 0 0 0 0 0 0.494118 0 0 0 1 0" />
                    <feBlend mode="normal" in2="effect1_dropShadow_1_26" result="effect2_dropShadow_1_26" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset />
                    <feGaussianBlur stdDeviation="9" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.901961 0 0 0 0 0 0 0 0 0 0.494118 0 0 0 1 0" />
                    <feBlend mode="normal" in2="effect2_dropShadow_1_26" result="effect3_dropShadow_1_26" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset />
                    <feGaussianBlur stdDeviation="9" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.901961 0 0 0 0 0 0 0 0 0 0.494118 0 0 0 1 0" />
                    <feBlend mode="normal" in2="effect3_dropShadow_1_26" result="effect4_dropShadow_1_26" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect4_dropShadow_1_26" result="shape" />
                </filter>
                <clipPath id="clip0_1_26">
                    <rect width="130" height="130" fill="white" />
                </clipPath>
            </defs>
        </svg>
    )
}

export const UserIcon = () => {
    return (
        < svg width="35" height="35" viewBox="0 0 100 100" fill="none" >
            <path d="M11 97C11 81.3333 11 50 50 50C89 50 89 81.3333 89 97" stroke="white" strokeWidth="7" strokeLinecap="round" />
            <path d="M70 22.5C70 33.2265 61.0893 42 50 42C38.9107 42 30 33.2265 30 22.5C30 11.7735 38.9107 3 50 3C61.0893 3 70 11.7735 70 22.5Z" stroke="white" strokeWidth="7" />
        </svg >
    )
}

export const MenuIcon = () => {
    return (
        <svg width="35" height="35" viewBox="0 0 100 100" fill="none" >
            <path d="M6 15H94" stroke="white" strokeWidth="10" strokeLinecap="round" />
            <line x1="7" y1="50" x2="93" y2="50" stroke="white" strokeWidth="10" strokeLinecap="round" />
            <line x1="5" y1="85" x2="91" y2="85" stroke="white" strokeWidth="10" strokeLinecap="round" />
        </svg>
    )
}
