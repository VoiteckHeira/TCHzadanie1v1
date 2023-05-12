import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
export const ver = process.env.REACT_APP_VERSION || '1.0.0';


function App() {

  const [name, setName] = useState('Wojciech Dziedzic');
  const [ipAddress, setIpAddress] = useState('');
  const [localTime, setLocalTime] = useState('');
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then((response) => response.json())
      .then((data) => {
        setIpAddress(data.ip);
        axios
          .get(`https://timezoneapi.io/api/ip/?${data.ip}`)
          .then((response) => {
            const timezone = response.data.data.timezone.id;
            const currentTime = new Date().toLocaleString('en-US', { timeZone: timezone });
            setLocalTime(currentTime);
          })
          .catch((error) => console.log(error));
        setInterval(() => setTime(new Date()), 1000);
      })
      .catch((error) => console.log(error));
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1>{name}</h1>
          <p>IP address: {ipAddress}</p>
          {"Hostname: " + window.location.hostname}:{window.location.port};
          <p>Version: {ver}</p>
          <br />
          <p>UTC time: {new Date().toUTCString()}</p>
          <p>Timezone: {Intl.DateTimeFormat().resolvedOptions().timeZone}</p>
        </div>
      </header>
    </div>
  );
}

export default App;
