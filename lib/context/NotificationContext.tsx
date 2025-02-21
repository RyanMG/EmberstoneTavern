import { createContext, useContext, ReactNode, useState } from 'react';

const NotificationContext = createContext<{
  showNotification: (message: string) => void;
  snackbarMessage: string | null;
  setSnackbarMessage: (showSnackbar: string | null) => void;
}>({
  showNotification: () => {},
  snackbarMessage: null,
  setSnackbarMessage: () => {}
});

export default function NotificationProvider({ children }: { children: ReactNode }) {
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);

  const showNotification = (message: string) => {
    setSnackbarMessage(message);
  };

  return (
    <NotificationContext.Provider value={{
      showNotification,
      snackbarMessage,
      setSnackbarMessage
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotification = () => useContext(NotificationContext);
