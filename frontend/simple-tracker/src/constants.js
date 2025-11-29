// Schedule constants
export const SCHEDULE_CATEGORIES = [
  'Work',
  'Exercise',
  'Learning',
  'Break',
  'Personal',
];

export const ENERGY_LEVELS = [1, 2, 3];

export const ENERGY_LABELS = {
  1: 'Low',
  2: 'Medium',
  3: 'High',
};

// Default schedule time slots
export const DEFAULT_SCHEDULE_SLOTS = [
  { id: 1, time: '10:00 - 10:30' },
  { id: 2, time: '10:30 - 11:00' },
  { id: 3, time: '11:00 - 11:30' },
  { id: 4, time: '11:30 - 12:00' },
  { id: 5, time: '12:00 - 12:30' },
];

// Error messages
export const ERROR_MESSAGES = {
  FETCH_FAILED: 'Failed to fetch schedule',
  SAVE_FAILED: 'Failed to save schedule',
  INVALID_DATE: 'Invalid date selected',
};

// Success messages
export const SUCCESS_MESSAGES = {
  SAVED: 'Schedule saved successfully!',
  LOADED: 'Schedule loaded successfully',
};
