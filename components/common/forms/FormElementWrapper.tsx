import { Text, View, StyleSheet } from 'react-native';
import FormErrorText from '@components/common/text/FormErrorText';

import COLORS from '@constants/colors';
import { ReactNode } from 'react';

interface IFormElementWrapperProps {
  label?: string
  errorText?: string
  halfWidth?: boolean
  children: ReactNode | ReactNode[]
}

export default function FormElementWrapper({
  label,
  errorText,
  halfWidth,
  children
}: IFormElementWrapperProps) {
  return (
    <View style={[
      styles.inputWrapper,
      halfWidth ? styles.halfWidth : ''
    ]}>
      {label && <Text style={styles.inputLabel}>{label}</Text>}
      {children}
      {errorText && <FormErrorText errorText={errorText} />}
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  halfWidth: {
    width: '48%'
  },
  inputLabel: {
    color: COLORS.TEXT.DARKEN20,
    fontSize: 14,
    marginBottom: 5
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLORS.BORDER.BASE,
    color: COLORS.TEXT.DARKEN20,
    backgroundColor: COLORS.BACKGROUND.LIGHTEN,
    padding: 10
  }
})