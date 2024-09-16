import React from 'react';

const StaticBanner = ({ items }) => {
  return (
    <div className="bg-black text-white py-6 px-4 flex flex-col sm:flex-row items-center justify-center">
      <div className="flex flex-wrap justify-center items-center">
        {items.map((item, index) => (
          <span key={index} className="inline-flex items-center mx-2 my-1">
            <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm sm:text-base">{item}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default StaticBanner;
