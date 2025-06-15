
import React from 'react';

interface StatisticCardProps {
  percentage: string;
  description: string;
}

const StatisticCard: React.FC<StatisticCardProps> = ({ percentage, description }) => {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg text-center hover:transform hover:translate-y-[-5px] transition-all duration-300 relative z-10">
      <div className="text-5xl md:text-6xl font-display font-bold text-[#fcb900] mb-4">
        {percentage}
      </div>
      <p className="text-[#003366] font-medium text-lg">
        {description}
      </p>
    </div>
  );
};

export default StatisticCard;
