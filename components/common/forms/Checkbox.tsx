import { View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

import BodyText from '@components/common/BodyText';

import COLORS from '@constants/colors';

export default function Checkbox({
  label,
  labelItalic = false,
  isChecked,
  setChecked,
  labelPressAction
}: {
  label: string;
  labelItalic?: boolean;
  isChecked: boolean;
  setChecked: (isChecked: boolean) => void;
  labelPressAction?: () => void;
}) {
  return (
    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginVertical: 10}}>
      <BouncyCheckbox
        onPress={(isChecked: boolean) => setChecked(isChecked)}
        isChecked={isChecked}
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
        link={!!labelPressAction}
        onPress={!!labelPressAction ? labelPressAction : undefined}
      >
        {label}
      </BodyText>
    </View>
  );
}
