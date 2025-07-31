import React, { createContext, useContext, useState, useEffect } from 'react';

interface WeatherData {
  temperature: number;
  condition: string;
  location: string;
}

interface WeatherContextType {
  weather: WeatherData | null;
  loading: boolean;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate weather API call
    const fetchWeather = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setWeather({
        temperature: 28,
        condition: 'Clear',
        location: 'Mumbai, India'
      });
      setLoading(false);
    };

    fetchWeather();
  }, []);

  const value = {
    weather,
    loading
  };

  return <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>;
};