import React from "react";

interface BreakdownItem {
  label: string;
  percentage: number;
}

interface PerformanceBreakdownProps {
  data: BreakdownItem[];
  title?: string;
}

export default function PerformanceBreakdown({
    data,
    title = "Performance Breakdown",
  }: PerformanceBreakdownProps) {
    // Calculate grey bar width based on percentage
    const calculateGreyWidth = (percentage: number) => {
      const baseWidth = 10; // Minimum width 30%
      const remainingWidth = 90; // Remaining 70% scales with percentage
      return baseWidth + (remainingWidth * (percentage / 100));
    };
  
    return (
      <div className="p-4 rounded">
        <h3 className="font-semibold mb-4">{title}</h3>
        {data.map((item, index) => (
          <div key={index} className="mb-3 flex items-center">
            <span className="text-sm w-20 mr-2">{item.label}</span>
            <div className="relative flex-grow pr-20">
              <div 
                className="h-6 bg-gray-200 rounded relative"
                style={{ 
                  width: `${calculateGreyWidth(item.percentage)}%`,
                  transition: 'width 0.3s ease-in-out'
                }}
              >
                <div
                  className="h-6 bg-orange-500 rounded absolute top-0 left-0"
                  style={{ 
                    width: `${item.percentage}%`,
                    transition: 'width 0.3s ease-in-out'
                  }}
                />
                <span
                  className="text-sm absolute transform translate-x-full whitespace-nowrap"
                  style={{ 
                    left: '95%',
                    marginLeft: '0.5rem'
                  }}
                >
                  {item.percentage}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }