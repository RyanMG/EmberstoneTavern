import { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { useNotification } from '@context/NotificationContext';
import Colors from '@/lib/constants/colors';

export default function PageContainer({ children }: { children: ReactNode }) {
  const { snackbarMessage, setSnackbarMessage } = useNotification();

  return (
    <View style={styles.container}>
      {children}
      <Snackbar
        visible={!!snackbarMessage}
        onDismiss={() => setSnackbarMessage(null)}
        elevation={5}
        duration={3000}
        action={{
          label: 'Dismiss',
          onPress: () => setSnackbarMessage(null),
        }}>
        {snackbarMessage}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100%',
    width: '100%',
    padding: 20,
    backgroundColor: Colors.BACKGROUND.BASE
  }
})
