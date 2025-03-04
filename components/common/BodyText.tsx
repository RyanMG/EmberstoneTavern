import { StyleSheet, Text } from 'react-native';
import COLORS from '@constants/colors';
import { ReactNode } from 'react';

export default function BodyText({
  textSize = 'md',
  italic = false,
  bold = false,
  link = false,
  center = false,
  onPress,
  children
}: {
  textSize?: 'sm' | 'md' | 'lg' | 'xl';
  italic?: boolean;
  bold?: boolean;
  link?: boolean;
  center?: boolean;
  onPress?: () => void;
  children: ReactNode;
}) {
  return (
    <Text style={[
      styles.text,
      italic ? styles.italic : '',
      bold ? styles.bold : '',
      link ? styles.link : '',
      center ? styles.center : '',
      styles[textSize as keyof typeof styles]
    ]} onPress={onPress}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    color: COLORS.TEXT.BASE,
    fontStyle: 'normal',
    fontWeight: 'normal',
  },
  center: {
    textAlign: 'center'
  },
  italic: {
    fontStyle: 'italic'
  },
  bold: {
    fontWeight: 'bold'
  },
  link: {
    color: COLORS.TEXT.LINK,
    cursor: 'pointer'
  },
  sm: {
    fontSize: 14,
    lineHeight: 16
  },
  md: {
    fontSize: 16,
    lineHeight: 20
  },
  lg: {
    fontSize: 18,
    lineHeight: 20
  },
  xl: {
    fontSize: 20,
    lineHeight: 22
  },
  '2xl': {
    fontSize: 24,
    lineHeight: 26
  },
  '3xl': {
    fontSize: 28,
    lineHeight: 30
  }
});
