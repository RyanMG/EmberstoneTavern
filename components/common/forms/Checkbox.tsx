import { View } from 'react-native';
import { useRef } from 'react';

import BouncyCheckbox, { BouncyCheckboxHandle} from 'react-native-bouncy-checkbox';

import BodyText from '@components/common/BodyText';

import COLORS from '@constants/colors';

export default function Checkbox({
  label,
  labelItalic = false,
  isChecked,
  setChecked,
  labelPressAction,
  disabled = false,
}: {
  label: string;
  labelItalic?: boolean;
  isChecked: boolean;
  setChecked: (isChecked: boolean) => void;
  labelPressAction?: () => void | null;
  disabled?: boolean;
}) {

  // Allow the label to toggle the checkbox IF we do not pass in a specific action for the label (e.g. a link out or dialog toggle)
  const checkboxRef = useRef<BouncyCheckboxHandle>(null);

  return (
    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginVertical: 10}}>
      <BouncyCheckbox
        onPress={(isChecked: boolean) => setChecked(isChecked)}
        isChecked={isChecked}
        disabled={disabled}
        ref={checkboxRef}
        fillColor={COLORS.CHECKBOX.CHECKED}
        unFillColor={'transparent'}
        innerIconStyle={{
          borderRadius: 3,
          borderColor: COLORS.BORDER.BASE
        }}
        iconStyle={{
          borderRadius: 3,
          borderColor: COLORS.BORDER.BASE
        }}
      />
      <BodyText
        italic={labelItalic}
        label={!!labelPressAction ? false : true}
        link={!!labelPressAction}
        onPress={!!labelPressAction ? labelPressAction : checkboxRef.current?.onCheckboxPress}
      >
        {label}
      </BodyText>
    </View>
  );
}
