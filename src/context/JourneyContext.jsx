import { createContext, useContext, useState } from 'react';

const JourneyContext = createContext();

export const JourneyProvider = ({ children }) => {
  const [journeyState, setJourneyState] = useState({
    stage: 'learned', // learned, registered, prepared, ready
    isEligible: null,
    isFirstTimer: null,
  });

  const updateJourney = (updates) => {
    setJourneyState(prev => ({ ...prev, ...updates }));
  };

  return (
    <JourneyContext.Provider value={{ journeyState, updateJourney }}>
      {children}
    </JourneyContext.Provider>
  );
};

export const useJourney = () => useContext(JourneyContext);
