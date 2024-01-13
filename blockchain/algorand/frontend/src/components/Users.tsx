import React, { useState } from 'react';
import axios from 'axios';

function ClaimCertificate() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [certificateUrl, setCertificateUrl] = useState(null);

    const handleLogin = async () => {
      try {
          const response = await axios.post('http://localhost:8000/login', {}, {
              auth: {
                  username,
                  password
              }
          });
          if (response.status === 200) {
              setIsLoggedIn(true);
          }
      } catch (error) {
          console.error(error);
      }
    };

    const handleClaim = async () => {
        try {
            const response = await axios.post('http://localhost:8000/claim_certificate', {}, {
                auth: {
                    username,
                    password
                }
            });
            if (response.status === 200) {
                setCertificateUrl(response.data.asset_url);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {!isLoggedIn ? (
                <div className="space-y-4">
                    <input className="px-3 py-2 border border-gray-300 rounded-md" type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
                    <input className="px-3 py-2 border border-gray-300 rounded-md" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md" onClick={handleLogin}>Login</button>
                </div>
            ) : (
                <div className="space-y-4">
                    <input className="px-3 py-2 border border-gray-300 rounded-md" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
                    <input className="px-3 py-2 border border-gray-300 rounded-md" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md" onClick={handleClaim}>Claim My Certificate</button>
                    {certificateUrl && <a href={certificateUrl} target="_blank" rel="noopener noreferrer">View My Certificate</a>}
                </div>
            )}
        </div>
    );
}

export default ClaimCertificate;
