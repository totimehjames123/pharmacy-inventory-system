import React, { useState, useEffect } from 'react';

const SignUpPage = () => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Fetch options from your API
    fetch('http://localhost:5000/allStocks')
      .then(response => response.json())
      .then(data => setOptions(data.stocks))
      .catch(error => console.error('Error fetching options:', error));
  }, []);

  const handleOptionChange = event => {
    setSelectedOption(event.target.value);
  };

  const handleUsernameChange = event => {
    setUsername(event.target.value);
  };

  const handleSignUp = () => {
    // Perform signup logic with selectedOption and username
    console.log('Signing up with:', selectedOption, username);
    // Add your signup logic here
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <label>
        Select an option:
        <select value={selectedOption} onChange={handleOptionChange}>
          <option value="" disabled>Select an option</option>
          {options.map(option => (
            <option key={option.id} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
      </label>

      <br />

      <label>
        Username:
        <input type="text" value={username} onChange={handleUsernameChange} />
      </label>

      <br />

      <button onClick={handleSignUp} disabled={!selectedOption || !username}>
        Sign Up
      </button>

      {selectedOption && (
        <div>
          <p>Selected Option: {selectedOption}</p>
        </div>
      )}
    </div>
  );
};

export default SignUpPage;
