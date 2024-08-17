import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'
import Login from './components/login/Login'
import PrivateRoute from './components/privateRoute/PrivateRoute';
import Dashboard from './Dashboard';


function App() {
  return (
    <div className="App">
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard/*"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
    </div>
  );
}

export default App;
