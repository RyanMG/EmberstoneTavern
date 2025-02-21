import { StyleSheet, Text } from 'react-native';
import Colors from '@/lib/constants/Colors';
import { ReactNode } from 'react';

export default function BodyText({
  textSize = 'md',
  italic = false,
  children
}: {
  textSize?: 'sm' | 'md' | 'lg';
  italic?: boolean;
  children: ReactNode;
}) {
  return (
    <Text style={[
      styles.text,
      italic ? styles.italic : '',
      styles[textSize as keyof typeof styles]
    ]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    color: Colors.TEXT.BASE,
    fontStyle: 'normal'
  },
  italic: {
    fontStyle: 'italic'
  },
  sm: {
    fontSize: 14,
    lineHeight: 21
  },
  md: {
    fontSize: 16,
    lineHeight: 24
  },
  lg: {
    fontSize: 18,
    lineHeight: 32
  }
});
