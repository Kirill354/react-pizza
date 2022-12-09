import React from 'react';
import ContentLoader from 'react-content-loader';

export const SkeletonPizInf: React.FC = () => (
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
      <rect x="95" y="317" rx="10" ry="10" width="90" height="27" />
   </ContentLoader>
);
