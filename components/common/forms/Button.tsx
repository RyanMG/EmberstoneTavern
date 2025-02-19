import { Button as RNButton } from 'react-native';
import Colors from '@constants/Colors';

export default function Button({
  title,
  onPress,
  disabled = false,
  theme = 'primary'
}: {
  title: string,
  onPress: () => void,
  disabled?: boolean;
  theme?: 'primary' | 'secondary' | 'destroy';
}) {
  return (
    <RNButton
      title={title}
      color={theme === 'primary' ? Colors.BUTTON.PRIMARY : theme === 'secondary' ? Colors.BUTTON.SECONDARY : Colors.BUTTON.DESTROY}
      onPress={onPress}
      disabled={disabled}
    />
  )
}
