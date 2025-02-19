import {StyleSheet, TextInput, KeyboardTypeOptions, Text, View} from 'react-native';
import FormErrorText from '@components/common/text/FormErrorText';
import Colors from '@/constants/Colors';

export default function InputElement({
  label,
  placeholder,
  keyboardType = 'default',
  value,
  onChangeText,
  secureTextEntry = false,
  errorText
}: {
  label: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions | undefined;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  errorText?: string;
}) {
  return (
    <View style={styles.inputWrapper}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
      />
      {errorText && <FormErrorText errorText={errorText} />}
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginBottom: 10
  },
  inputLabel: {
    color: Colors.TEXT.DARKEN,
    fontSize: 14,
    marginBottom: 5
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.BORDER.BASE,
    color: Colors.TEXT.DARKEN,
    padding: 10
  }
})
