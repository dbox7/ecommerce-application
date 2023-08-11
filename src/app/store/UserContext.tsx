import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserContextProps {
  user: boolean;
  setUser: (value: boolean) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [user, setUser] = useState<boolean>(false);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );

};

export const useUserContext = () => {

  const context = useContext(UserContext);

  if (!context) {

    throw new Error('useUserContext must be used within a UserProvider');
  
  }
  return context;

};