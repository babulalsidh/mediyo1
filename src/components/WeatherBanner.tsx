import React from 'react';
import { useWeather } from '../contexts/WeatherContext';
import { Thermometer, MapPin, AlertTriangle } from 'lucide-react';

const WeatherBanner = () => {
  const { weather, loading } = useWeather();

  if (loading) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 animate-pulse">
        <div className="h-4 bg-blue-200 rounded w-3/4"></div>
      </div>
    );
  }

  if (!weather) return null;

  const getStorageAdvice = (temp: number) => {
    if (temp > 30) {
      return {
        message: "High temperature! Store medicines in cool, dry place below 25°C",
        color: "text-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200"
      };
    } else if (temp > 25) {
      return {
        message: "Moderate temperature. Ensure medicines are stored properly",
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-200"
      };
    } else {
      return {
        message: "Good temperature for medicine storage",
        color: "text-green-600",
        bgColor: "bg-green-50",
        borderColor: "border-green-200"
      };
    }
  };

  const advice = getStorageAdvice(weather.temperature);

  return (
    <div className={`${advice.bgColor} border ${advice.borderColor} rounded-lg p-4 mb-6`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-gray-600" />
            <span className="text-sm text-gray-600">{weather.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Thermometer className="h-4 w-4 text-gray-600" />
            <span className="text-sm text-gray-600">{weather.temperature}°C</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <AlertTriangle className={`h-4 w-4 ${advice.color}`} />
          <span className={`text-sm font-medium ${advice.color}`}>
            {advice.message}
          </span>
        </div>
      </div>
    </div>
  );
};

export default WeatherBanner;