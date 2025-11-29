import { useState, useCallback } from 'react';
import { scheduleAPI } from '../api/scheduleAPI';
import { DEFAULT_SCHEDULE_SLOTS, ERROR_MESSAGES, SUCCESS_MESSAGES } from '../constants';

/**
 * Custom hook for managing schedule state and API operations
 * @param {string} initialDate - Initial date in YYYY-MM-DD format
 * @returns {Object} Schedule state and handlers
 */
export const useSchedule = (initialDate) => {
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [schedule, setSchedule] = useState(
    DEFAULT_SCHEDULE_SLOTS.map(slot => ({
      ...slot,
      activity: '',
      category: '',
      energy: '',
    }))
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  /**
   * Fetch schedule for a specific date
   */
  const fetchSchedule = useCallback(async (date) => {
    setLoading(true);
    setError(null);
    try {
      const response = await scheduleAPI.getSchedule(date);
      const chores = response.data.chores;

      // Create a map of time -> chore for quick lookup
      const choreMap = {};
      chores.forEach(chore => {
        choreMap[chore.time] = chore;
      });

      // Map fetched chores to schedule slots
      const updatedSchedule = DEFAULT_SCHEDULE_SLOTS.map(slot => {
        const chore = choreMap[slot.time];
        if (chore) {
          return {
            ...slot,
            id: chore.id,
            activity: chore.activity,
            category: chore.category,
            energy: chore.energy_level || '',
          };
        }
        return { ...slot, activity: '', category: '', energy: '' };
      });

      setSchedule(updatedSchedule);
    } catch (err) {
      setError(ERROR_MESSAGES.FETCH_FAILED);
      console.error('Error fetching schedule:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Update a chore field
   */
  const updateChore = useCallback((time, field, value) => {
    setSchedule(prevSchedule =>
      prevSchedule.map(item =>
        item.time === time ? { ...item, [field]: value } : item
      )
    );
  }, []);

  /**
   * Submit schedule
   */
  const submitSchedule = useCallback(async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const payload = {
        date: selectedDate,
        schedule: schedule,
      };
      await scheduleAPI.saveSchedule(payload.date, payload.schedule);
      setSuccess(SUCCESS_MESSAGES.SAVED);
    } catch (err) {
      setError(ERROR_MESSAGES.SAVE_FAILED);
      console.error('Error saving schedule:', err);
    } finally {
      setLoading(false);
    }
  }, [selectedDate, schedule]);

  return {
    selectedDate,
    setSelectedDate,
    schedule,
    setSchedule,
    loading,
    error,
    success,
    setError,
    setSuccess,
    fetchSchedule,
    updateChore,
    submitSchedule,
  };
};
