import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [works, setWorks] = useState([]);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    const { data: worksData } = await supabase.from('works').select('*').order('created_at', { ascending: false });
    const { data: notesData } = await supabase.from('notes').select('*').order('created_at', { ascending: false });
    
    if (worksData) setWorks(worksData);
    if (notesData) setNotes(notesData);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ works, notes, isLoading, refetch: fetchData }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
