import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SleepEntry {
  id: string;
  date: string;
  bedtime: string;
  wakeTime: string;
  quality: number; // 1-5
  mood: 'terrible' | 'poor' | 'okay' | 'good' | 'excellent';
  notes?: string;
  duration: number; // in minutes
}

export interface SleepGoal {
  targetBedtime: string;
  targetWakeTime: string;
  targetDuration: number; // in hours
}

interface SleepState {
  entries: SleepEntry[];
  goal: SleepGoal;
  addEntry: (entry: Omit<SleepEntry, 'id' | 'duration'>) => void;
  updateEntry: (id: string, entry: Partial<SleepEntry>) => void;
  deleteEntry: (id: string) => void;
  setGoal: (goal: SleepGoal) => void;
  getAverageQuality: (days?: number) => number;
  getAverageDuration: (days?: number) => number;
}

const calculateDuration = (bedtime: string, wakeTime: string): number => {
  const bed = new Date(`2000-01-01 ${bedtime}`);
  let wake = new Date(`2000-01-01 ${wakeTime}`);
  
  // If wake time is before bedtime, it's the next day
  if (wake < bed) {
    wake = new Date(`2000-01-02 ${wakeTime}`);
  }
  
  return Math.round((wake.getTime() - bed.getTime()) / (1000 * 60));
};

export const useSleepStore = create<SleepState>()(
  persist(
    (set, get) => ({
      entries: [],
      goal: {
        targetBedtime: '22:00',
        targetWakeTime: '06:00',
        targetDuration: 8
      },
      
      addEntry: (entry) => {
        const duration = calculateDuration(entry.bedtime, entry.wakeTime);
        const newEntry: SleepEntry = {
          ...entry,
          id: Date.now().toString(),
          duration
        };
        
        set((state) => ({
          entries: [newEntry, ...state.entries].sort((a, b) => 
            new Date(b.date).getTime() - new Date(a.date).getTime()
          )
        }));
      },
      
      updateEntry: (id, updatedEntry) => {
        set((state) => ({
          entries: state.entries.map((entry) => {
            if (entry.id === id) {
              const updated = { ...entry, ...updatedEntry };
              if (updatedEntry.bedtime || updatedEntry.wakeTime) {
                updated.duration = calculateDuration(
                  updated.bedtime,
                  updated.wakeTime
                );
              }
              return updated;
            }
            return entry;
          })
        }));
      },
      
      deleteEntry: (id) => {
        set((state) => ({
          entries: state.entries.filter((entry) => entry.id !== id)
        }));
      },
      
      setGoal: (goal) => set({ goal }),
      
      getAverageQuality: (days = 7) => {
        const { entries } = get();
        const recentEntries = entries.slice(0, days);
        if (recentEntries.length === 0) return 0;
        
        const total = recentEntries.reduce((sum, entry) => sum + entry.quality, 0);
        return Number((total / recentEntries.length).toFixed(1));
      },
      
      getAverageDuration: (days = 7) => {
        const { entries } = get();
        const recentEntries = entries.slice(0, days);
        if (recentEntries.length === 0) return 0;
        
        const total = recentEntries.reduce((sum, entry) => sum + entry.duration, 0);
        return Number((total / recentEntries.length / 60).toFixed(1));
      }
    }),
    {
      name: 'sleep-storage'
    }
  )
);