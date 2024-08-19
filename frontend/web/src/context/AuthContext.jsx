import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5001'; // Replace with your backend URL
axios.defaults.withCredentials = true; // Important: allows cookies to be sent with requests

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Function to load the user profile from the backend
  const loadUserProfile = async () => {
    try {
      const response = await axios.get('/api/users/profile');
      setUser({
        first_name: response.data.personal_info.first_name,
        last_name: response.data.personal_info.last_name,
        email: response.data.personal_info.email
      });
    } catch (error) {
      console.error("Token verification failed", error);
      setUser(null);
    }
  };

  useEffect(() => {
    loadUserProfile(); // Load user profile on component mount
  }, []);

  const login = async (username, password) => {
    try {
      await axios.post('/api/users/login', { username, password });

      // Fetch user profile after login
      await loadUserProfile();

      navigate('/dashboard');
    } catch (error) {
      alert('Invalid credentials');
      console.error('Login error:', error);
    }
  };

  const logout = async () => {
    try {
      await axios.post('/api/users/logout');
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
