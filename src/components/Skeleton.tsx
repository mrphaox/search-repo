import React from "react";

const Skeleton = () => {
  return (
    <div className="bg-gray-700 animate-pulse p-4 rounded-lg shadow-lg">
      <div className="h-6 bg-gray-600 w-3/4 rounded mb-2"></div>
      <div className="h-4 bg-gray-600 w-1/2 rounded"></div>
    </div>
  );
};

export default Skeleton;
