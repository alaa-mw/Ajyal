// contexts/SelectedCourseContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

interface SelectedCourseContextType {
  selectedCourseId: string | null;
  selectedCourseName: string | null;
  setSelectedCourse: (id: string | null, name?: string | null) => void;
}

const SelectedCourseContext = createContext<SelectedCourseContextType>({
  selectedCourseId: null,
  selectedCourseName: null,
  setSelectedCourse: () => {},
});

export const SelectedCourseProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [selectedCourseId, setSelectedCourseIdState] = useState<string | null>(null);
  const [selectedCourseName, setSelectedCourseNameState] = useState<string | null>(null);

  // Load from localStorage on initial render
  useEffect(() => {
    const storedId = localStorage.getItem('selectedCourseId');
    const storedName = localStorage.getItem('selectedCourseName');
    if (storedId) {
      setSelectedCourseIdState(storedId);
    }
    if (storedName) {
      setSelectedCourseNameState(storedName);
    }
  }, []);

  const setSelectedCourse = (id: string | null, name: string | null = null) => {
    if (id) {
      localStorage.setItem('selectedCourseId', id);
      if (name) {
        localStorage.setItem('selectedCourseName', name);
        setSelectedCourseNameState(name);
      }
    } else {
      localStorage.removeItem('selectedCourseId');
      localStorage.removeItem('selectedCourseName');
      setSelectedCourseNameState(null);
    }
    setSelectedCourseIdState(id);
  };

  return (
    <SelectedCourseContext.Provider value={{ 
      selectedCourseId, 
      selectedCourseName,
      setSelectedCourse 
    }}>
      {children}
    </SelectedCourseContext.Provider>
  );
};

export const useSelectedCourse = () => useContext(SelectedCourseContext);