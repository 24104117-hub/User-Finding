import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const fetchUserData = () => {
    axios.get(`https://api.github.com/users/${username}`)
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setUserData(null);
      });
  };

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="username"
      />
      <button onClick={fetchUserData}>Search User</button>
      <div>
        {userData && (
          <div>
            <img 
              src={userData.avatar_url} 
              alt={userData.login} 
              width="100" 
            />
            <h3>{userData.name || userData.login}</h3>
            <p>{userData.bio}</p>
            <p>Followers: {userData.followers} | Following: {userData.following}</p>
            <p>Public Repos: {userData.public_repos}</p>
            <a href={userData.html_url} target="_blank" rel="noreferrer">
              View GitHub Profile
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;