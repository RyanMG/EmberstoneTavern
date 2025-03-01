import { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import COLORS from '@constants/colors';

export default function ContentBox({ children }: { children: ReactNode }) {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 20,
    padding: 20,
    backgroundColor: COLORS.BACKGROUND.BASE,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.BORDER.BASE,
  }
})
