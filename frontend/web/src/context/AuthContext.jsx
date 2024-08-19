import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


axios.defaults.baseURL = 'http://localhost:5001'; // Replace with your backend URL

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in by checking localStorage for a token
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token with the backend
      axios.get('/api/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => {
        setUser(response.data);
      }).catch(error => {
        console.error("Token verification failed", error);
        localStorage.removeItem('token');
      });
    }
  }, []);
  

  const login = async (username, password) => {
    try {
      const response = await axios.post('/api/users/login', { username, password });
      const token = response.data.token;
  
      // Store the token in localStorage
      localStorage.setItem('token', token);
  
      // Set the user state with user info (optional)
      const userProfile = await axios.get('/api/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUser(userProfile.data);
  
      navigate('/dashboard');
    } catch (error) {
      alert('Invalid credentials');
      console.error('Login error:', error);
    }
  };
  
  const logout = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };
  

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
