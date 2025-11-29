import React, { useEffect } from 'react';
import { useSchedule } from '../hooks/useSchedule';
import { SCHEDULE_CATEGORIES, ENERGY_LEVELS } from '../constants';
import './ChoreTable.css';

const ChoreTable = () => {
  const initialDate = new Date().toISOString().split('T')[0];
  const {
    selectedDate,
    setSelectedDate,
    schedule,
    loading,
    error,
    success,
    setSuccess,
    fetchSchedule,
    updateChore,
    submitSchedule,
  } = useSchedule(initialDate);

  // Fetch schedule when date changes
  useEffect(() => {
    fetchSchedule(selectedDate);
  }, [selectedDate, fetchSchedule]);

  // Auto-clear success message after 3 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [success, setSuccess]);

  const handleActivityChange = (time, value) => {
    updateChore(time, 'activity', value);
  };

  const handleCategoryChange = (time, value) => {
    updateChore(time, 'category', value);
  };

  const handleEnergyChange = (time, value) => {
    updateChore(time, 'energy', value);
  };

  const handleSubmit = () => {
    submitSchedule();
  };

  return (
    <div className="chore-table-wrapper">
      <h1 className="chore-header">Daily Schedule Tracker</h1>

      <div className="date-selector-section">
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          disabled={loading}
        />
        <button
          className="refresh-button"
          onClick={() => fetchSchedule(selectedDate)}
          disabled={loading}
        >
          {loading ? '⏳ Loading...' : '🔄 Refresh'}
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      {loading && <p className="loading-indicator">Loading schedule...</p>}

      <table className="schedule-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Activity</th>
            <th>Category</th>
            <th>Energy Level</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((slot, index) => (
            <tr key={`slot-${index}`}>
              <td className="time-cell">{slot.time}</td>
              <td>
                <input
                  type="text"
                  value={slot.activity}
                  onChange={(e) => handleActivityChange(slot.time, e.target.value)}
                  placeholder="Enter activity"
                  disabled={loading}
                />
              </td>
              <td>
                <select
                  value={slot.category}
                  onChange={(e) => handleCategoryChange(slot.time, e.target.value)}
                  disabled={loading}
                >
                  <option value="">Select category</option>
                  {SCHEDULE_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <select
                  value={slot.energy}
                  onChange={(e) => handleEnergyChange(slot.time, e.target.value)}
                  disabled={loading}
                >
                  <option value="">Select energy</option>
                  {ENERGY_LEVELS.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={handleSubmit}
        className="submit-button"
        disabled={loading}
      >
        {loading ? '⏳ Saving...' : '✓ Submit Schedule'}
      </button>
    </div>
  );
};

export default ChoreTable;