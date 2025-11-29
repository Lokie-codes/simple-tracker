import axiosInstance from './authAPI';

// API Service functions
export const scheduleAPI = {
  /**
   * Save schedule for a specific date
   * @param {string} date - Date in YYYY-MM-DD format
   * @param {Array} schedule - Array of schedule items
   * @returns {Promise}
   */
  saveSchedule: (date, schedule) => {
    return axiosInstance.post('/api/schedule/', {
      date,
      schedule,
    });
  },

  /**
   * Get schedule for a specific date
   * @param {string} date - Date in YYYY-MM-DD format
   * @returns {Promise}
   */
  getSchedule: (date) => {
    return axiosInstance.get('/api/schedule/get/', {
      params: { date },
    });
  },

  /**
   * Get all schedules
   * @returns {Promise}
   */
  getAllSchedules: () => {
    return axiosInstance.get('/api/schedule/get/');
  },
};

export default axiosInstance;
