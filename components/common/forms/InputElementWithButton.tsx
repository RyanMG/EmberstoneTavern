import {StyleSheet, View } from 'react-native';
import Button from '@components/common/forms/Button';
import InputElement, { IInputElementProps } from '@components/common/forms/InputElement';

interface IInputElementWithButtonProps extends IInputElementProps {
  buttonLabel: string;
  onPress: () => void;
}

export default function InputElementWithButton(props: IInputElementWithButtonProps) {

  return (
    <View style={styles.inputWrapper}>
      <View style={{flex: 1}}>
        <InputElement {...props} />
      </View>

      <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 40}}>
        <Button
          title={props.buttonLabel}
          onPress={props.onPress}
          disabled={props.disabled}
        />
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    flex: 1,
    width: '100%'
  }
})
