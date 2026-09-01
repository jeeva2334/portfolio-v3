import { createContext, useContext, useEffect, useState } from 'react';
import { ref, get } from 'firebase/database';
import { db } from '../lib/firebase';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [works, setWorks] = useState([]);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const worksSnapshot = await get(ref(db, 'works'));
      const notesSnapshot = await get(ref(db, 'notes'));
      
      if (worksSnapshot.exists()) {
        const data = worksSnapshot.val();
        const worksList = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        })).sort((a, b) => (b.created_at || 0) - (a.created_at || 0));
        setWorks(worksList);
      } else {
        setWorks([]);
      }

      if (notesSnapshot.exists()) {
        const data = notesSnapshot.val();
        const notesList = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        })).sort((a, b) => (b.created_at || 0) - (a.created_at || 0));
        setNotes(notesList);
      } else {
        setNotes([]);
      }
    } catch (err) {
      console.error('Error fetching data from Firebase RTDB:', err);
    } finally {
      setIsLoading(false);
    }
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
