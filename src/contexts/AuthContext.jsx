import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Load admins
    const storedAdmins = localStorage.getItem('admins');
    if (storedAdmins) {
      setAdmins(JSON.parse(storedAdmins));
    } else {
      // Add default admin
      const defaultAdmin = { email: 'admin@hynopharmacy.com', password: 'admin123', name: 'Admin', id: 'admin123', isAdmin: true };
      setAdmins([defaultAdmin]);
      localStorage.setItem('admins', JSON.stringify([defaultAdmin]));
    }

    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const registerAdmin = (adminData) => {
    const updatedAdmins = [...admins, adminData];
    setAdmins(updatedAdmins);
    localStorage.setItem('admins', JSON.stringify(updatedAdmins));
  };

  const value = {
    user,
    admins,
    login,
    logout,
    registerAdmin,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
