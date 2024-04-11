import React from 'react';
import ContentLoader from 'react-content-loader';

export const LoadingCard: React.FC = () => (
  <ContentLoader
    speed={2}
    width="100%"
    height="330px"
    preserveAspectRatio="none"
    viewBox="0, 0, 300, 330"
    backgroundColor="#ebebeb"
    foregroundColor="#f2f2f2">
    <rect x="0" y="0" rx="10" ry="10" width={'100%'} height="200" />
    <rect x="15" y="209" rx="2" ry="2" width={'90%'} height="11" />
    <rect x="15" y="225" rx="2" ry="2" width={'70%'} height="11" />
    <circle cx="90%" cy="295" r="20" />
    <circle cx="65%" cy="295" r="11" />
    <circle cx="50%" cy="295" r="11" />
    <rect x="15" y="295" rx="2" ry="2" width={'30%'} height="22" />
    <rect x="15" y="275" rx="2" ry="2" width={'20%'} height="11" />
  </ContentLoader>
);
