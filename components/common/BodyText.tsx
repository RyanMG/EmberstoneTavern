import { StyleSheet, Text } from 'react-native';
import Colors from '@/lib/constants/Colors';
import { ReactNode } from 'react';

export default function BodyText({
  textSize = 'md',
  italic = false,
  bold = false,
  children
}: {
  textSize?: 'sm' | 'md' | 'lg' | 'xl';
  italic?: boolean;
  bold?: boolean;
  children: ReactNode;
}) {
  return (
    <Text style={[
      styles.text,
      italic ? styles.italic : '',
      bold ? styles.bold : '',
      styles[textSize as keyof typeof styles]
    ]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    color: Colors.TEXT.BASE,
    fontStyle: 'normal',
    fontWeight: 'normal'
  },
  italic: {
    fontStyle: 'italic'
  },
  bold: {
    fontWeight: 'bold'
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
  },
  xl: {
    fontSize: 24,
    lineHeight: 36
  }
});
