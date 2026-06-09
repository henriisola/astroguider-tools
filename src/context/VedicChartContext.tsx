import React, { createContext, useContext, useState, ReactNode } from 'react';

interface NavamsaPosition {
  planet: string;
  sign: string;
}

interface numerologyChartData {
  birthDetails: {
    day: number;
    month: number;
    year: number;
    hour: number;
    minute: number;
    location: string;
    latitude: number;
    longitude: number;
    timezone: number;
  };
  planets: any[]; // määrittele tarvittaessa tarkemmin
  navamsaChart?: NavamsaPosition[];
  // Lisää muut kentät kuten ascendant, sunSign jne. tarpeen mukaan
}

interface numerologyChartContextType {
  data: numerologyChartData | null;
  setData: (data: numerologyChartData) => void;
}

const numerologyChartContext = createContext<numerologyChartContextType | undefined>(undefined);

export const numerologyChartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<numerologyChartData | null>(null);

  return (
    <numerologyChartContext.Provider value={{ data, setData }}>
      {children}
    </numerologyChartContext.Provider>
  );
};

export const usenumerologyChartContext = (): numerologyChartContextType => {
  const context = useContext(numerologyChartContext);
  if (!context) {
    throw new Error('usenumerologyChartContext must be used within a numerologyChartProvider');
  }
  return context;
};
