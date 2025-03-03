import { Button as PaperButton, IconButton } from 'react-native-paper';
import COLORS from '@constants/colors';

export default function Button({
  title,
  onPress,
  disabled = false,
  compact = false,
  theme = 'primary'
}: {
  title?: string;
  onPress: () => void;
  disabled?: boolean;
  compact?: boolean;
  theme?: 'primary' | 'secondary' | 'destroy';
}) {
  return (
    <PaperButton
      buttonColor={theme === 'primary' ? COLORS.BUTTON.PRIMARY : theme === 'secondary' ? COLORS.BUTTON.SECONDARY : COLORS.BUTTON.DESTROY}
      textColor={COLORS.TEXT.BASE}
      onPress={onPress}
      mode="contained"
      compact={compact}
      disabled={disabled}
    >
      {title}
    </PaperButton>
  )
}
