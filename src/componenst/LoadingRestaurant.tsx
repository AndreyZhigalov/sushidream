import React from 'react';
import ContentLoader from 'react-content-loader';

const LoadingRestaurant: React.FC = (props) => (
  <ContentLoader
    speed={2}
    width={320}
    height={150}
    viewBox="0 0 320 150"
    backgroundColor="#071b2c"
    foregroundColor="#233748"
    {...props}>
    <rect x="0" y="0" rx="3" ry="3" width="320" height="150" />
  </ContentLoader>
);

export default LoadingRestaurant;
