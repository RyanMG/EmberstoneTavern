import RNPickerSelect, { Item } from 'react-native-picker-select';
import FormElementWrapper from '@components/common/forms/FormElementWrapper';
import { StyleSheet } from 'react-native';
import Colors from '@constants/Colors';

interface ISelectElementProp<T> {
  label: string;
  halfWidth?: boolean;
  placeholder?: string | null;
  value: T;
  options: Item[];
  onSelectValue: (value: T) => void;
  errorText?: string;
  disabled?: boolean;
}

export default function SelectElement<T>({
  onSelectValue,
  value,
  options,
  placeholder = null,
  label,
  errorText,
  halfWidth = false,
  disabled = false
}: ISelectElementProp<T>) {

  let placeHolderValue = {};
  if (placeholder) {
    placeHolderValue = {
      label: placeholder,
      value: undefined
    }
  }

  return (
    <FormElementWrapper
      label={label}
      halfWidth={halfWidth}
      errorText={errorText}
    >
      <RNPickerSelect
        onValueChange={(value: T) => onSelectValue(value)}
        style={{inputWeb: styles.pickerInput}}
        value={value}
        placeholder={placeHolderValue}
        items={options}
        disabled={disabled}
      />
    </FormElementWrapper>
  );
}

const styles = StyleSheet.create({
  pickerInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.BORDER.BASE,
    borderRadius: 5,
    backgroundColor: Colors.BACKGROUND.LIGHTEN,
    color: Colors.TEXT.DARKEN20
  }
});
