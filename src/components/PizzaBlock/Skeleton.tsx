import React from 'react';
import ContentLoader from 'react-content-loader';

export const Skeleton: React.FC = () => (
   <ContentLoader
      className="pizza-block"
      speed={2}
      width={280}
      height={466}
      viewBox="0 0 280 466"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb">
      <rect x="0" y="268" rx="10" ry="10" width="280" height="27" />
      <circle cx="139" cy="122" r="122" />
      <rect x="0" y="313" rx="10" ry="10" width="279" height="88" />
      <rect x="0" y="430" rx="10" ry="10" width="90" height="27" />
      <rect x="126" y="421" rx="20" ry="20" width="152" height="45" />
   </ContentLoader>
);
