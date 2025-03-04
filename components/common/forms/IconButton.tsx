import { IconButton as PaperIconButton } from 'react-native-paper';
import COLORS from '@constants/colors';

export default function IconButton({
  onPress,
  disabled = false,
  iconName,
  iconSize = 20,
  mode,
  theme = 'primary'
}: {
  onPress: () => void;
  disabled?: boolean;
  iconName: string;
  iconSize?: number;
  mode?: 'outlined' | 'contained' | 'contained-tonal';
  theme?: 'primary' | 'secondary' | 'destroy' | 'white';
}) {
  return (
    <PaperIconButton
      icon={iconName}
      mode={mode ? mode : undefined}
      disabled={disabled}
      iconColor={theme === 'primary' ? COLORS.BUTTON.PRIMARY : theme === 'secondary' ? COLORS.BUTTON.SECONDARY : theme === 'white' ? COLORS.TEXT.BASE : COLORS.BUTTON.DESTROY}
      size={iconSize}
      style={{padding: 0}}
      onPress={onPress}
    />
  )
};
