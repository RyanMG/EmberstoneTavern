import { IconButton as PaperIconButton } from 'react-native-paper';
import COLORS from '@constants/colors';

export default function IconButton({
  onPress,
  disabled = false,
  iconName,
  iconSize = 20,
  theme = 'primary'
}: {
  onPress: () => void;
  disabled?: boolean;
  iconName: string;
  iconSize?: number;
  theme?: 'primary' | 'secondary' | 'destroy';
}) {
  return (
    <PaperIconButton
      icon={iconName}
      disabled={disabled}
      iconColor={theme === 'primary' ? COLORS.BUTTON.PRIMARY : theme === 'secondary' ? COLORS.BUTTON.SECONDARY : COLORS.BUTTON.DESTROY}
      size={iconSize}
      onPress={onPress}
    />
  )
};
