import { RefObject } from 'react';
import {StyleSheet, TextInput} from 'react-native';

import FormElementWrapper from '@components/common/forms/FormElementWrapper';
import COLORS from '@constants/colors';

export default function FakeInput({
  label,
  value,
  placeholder,
  onFocus,
  inputRef,
  halfWidth = false,
  errorText
}: {
  label: string;
  value: string;
  placeholder?: string;
  onFocus: () => void;
  inputRef: RefObject<TextInput>;
  halfWidth?: boolean;
  errorText?: string;
}) {
  return (
    <FormElementWrapper
      label={label}
      halfWidth={halfWidth}
      errorText={errorText}
    >
      <TextInput
        style={styles.input}
        value={value}
        placeholder={placeholder}
        editable={false}
        ref={inputRef}
        onFocus={onFocus}
      />
    </FormElementWrapper>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLORS.BORDER.BASE,
    color: COLORS.TEXT.DARKEN20,
    backgroundColor: COLORS.BACKGROUND.LIGHTEN,
    padding: 10,
    flex: 1,
  }
})
