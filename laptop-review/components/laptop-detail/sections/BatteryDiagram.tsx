import React from 'react';

// Define types for the component props
interface UsageDataItem {
  type: string;
  hours: number;
  color: string;
  percentage: number;
}

interface BatterySectionProps {
  rating?: string;
  capacity?: string;
  usageData?: UsageDataItem[];
  description?: string;
}

const BatterySection: React.FC<BatterySectionProps> = ({ 
  rating = "8.7/10",
  capacity = "75Wh",
  usageData = [
    { type: "Casual Use", hours: 12.5, color: "bg-green-500", percentage: 83 },
    { type: "Watching Online Video", hours: 10.2, color: "bg-blue-500", percentage: 68 },
    { type: "Extreme Use (Gaming/Rendering)", hours: 3.8, color: "bg-yellow-500", percentage: 25 }
  ],
  description
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">2. Battery</h3>
        <div className="bg-blue-600 text-white px-3 py-1 rounded-full font-bold">{rating}</div>
      </div>

      <div className="mb-4">
        <p className="mb-2">
          <span className="font-medium">Battery Capacity:</span> {capacity}
        </p>
      </div>

      <h4 className="font-semibold mb-4">Battery Life</h4>
      <div className="space-y-6 mb-6">
        {usageData.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between mb-2">
              <span className="font-medium">{item.type}</span>
              <span className="font-medium">{item.hours} hours</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className={`h-4 rounded-full ${item.color} flex items-center justify-end px-2`}
                style={{ width: `${item.percentage}%` }}
              >
                <span className="text-xs text-white font-medium">{item.hours}h</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {description && <p className="text-gray-700">{description}</p>}
    </div>
  );
};

export default BatterySection;