
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Suggestions() {
  const [suggestions, setSuggestions] = useState([]);
  const [selected, setSelected] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { destination, days } = location.state || {};

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await axios.post('/api/trips/suggestions', 
          { destination, days },
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
        setSuggestions(response.data);
      } catch (error) {
        console.error(error);
        navigate('/login');
      }
    };
    fetchSuggestions();
  }, [destination, days, navigate]);

  const handleCheckbox = (activity) => {
    setSelected(prev => 
      prev.some(item => item.name === activity.name)
        ? prev.filter(item => item.name !== activity.name)
        : [...prev, activity]
    );
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/trips/create', 
        { destination, days, selectedActivities: selected },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      navigate(`/itinerary/${response.data._id}`);
    } catch (error) {
      console.error(error);
      navigate('/login');
    }
  };

  return (
    <div>
      <h1>Suggestions for {destination}</h1>
      <div className="activity-list">
        {suggestions.map((activity, index) => (
          <label key={index}>
            <input
              type="checkbox"
              onChange={() => handleCheckbox(activity)}
            />
            {activity.name} ({activity.type}, {activity.duration} hours)
          </label>
        ))}
      </div>
      <button onClick={handleSubmit}>Generate Itinerary</button>
    </div>
  );
}

export default Suggestions;