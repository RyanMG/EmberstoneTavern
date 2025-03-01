import {StyleSheet, TextInput, KeyboardTypeOptions} from 'react-native';
import FormElementWrapper from '@components/common/forms/FormElementWrapper';
import COLORS from '@constants/colors';

interface IInputElementProps {
  label?: string;
  placeholder?: string;
  halfWidth?: boolean;
  keyboardType?: KeyboardTypeOptions | undefined;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  isMultiline?: boolean;
  disabled?: boolean;
  errorText?: string;
}

export {
  IInputElementProps
};

export default function InputElement({
  label,
  placeholder,
  halfWidth = false,
  keyboardType = 'default',
  value,
  onChangeText,
  secureTextEntry = false,
  isMultiline = false,
  disabled = false,
  errorText
}: IInputElementProps) {

  return (
    <FormElementWrapper
      label={label}
      halfWidth={halfWidth}
      errorText={errorText}
    >
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={value}
        multiline={isMultiline}
        numberOfLines={isMultiline ? 7 : 1}
        maxLength={isMultiline ? 500 : 50}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        editable={!disabled}
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
