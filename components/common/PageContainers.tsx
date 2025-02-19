import { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

export default function PageContainer({ children }: { children: ReactNode }) {
  return (
    <View style={styles.container}>
      {children}
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
    backgroundColor: Colors.BG_BASE
  }
})
