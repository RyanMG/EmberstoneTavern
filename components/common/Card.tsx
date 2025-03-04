import COLORS from '@constants/colors';
import { View, StyleSheet } from 'react-native';
import { ReactNode } from 'react';

export default function Card({
  children
}: {
  children: ReactNode
}) {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: COLORS.BACKGROUND.BROWN,
    borderColor: COLORS.BORDER.DARKEN,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15
  }
});