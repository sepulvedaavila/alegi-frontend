
import React from 'react';

const MockUIHeader = () => {
  return (
    <div className="bg-gray-50 flex items-center p-4 border-b border-gray-100">
      <div className="flex space-x-2">
        <div className="w-3 h-3 rounded-full bg-gray-300"></div>
        <div className="w-3 h-3 rounded-full bg-gray-300"></div>
        <div className="w-3 h-3 rounded-full bg-gray-300"></div>
      </div>
      <div className="mx-auto flex items-center text-sm text-gray-500 font-medium">
        ALEGI Case Predictor
      </div>
    </div>
  );
};

export default MockUIHeader;
