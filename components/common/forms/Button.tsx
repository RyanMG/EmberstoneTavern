import { Button as PaperButton, IconButton } from 'react-native-paper';
import Colors from '@/lib/constants/Colors';

export default function Button({
  title,
  onPress,
  disabled = false,
  compact = false,
  iconName,
  iconOnly = false,
  theme = 'primary'
}: {
  title?: string;
  onPress: () => void;
  disabled?: boolean;
  compact?: boolean;
  iconName?: string;
  iconOnly?: boolean;
  theme?: 'primary' | 'secondary' | 'destroy';
}) {
  if (iconOnly && iconName) {
    return (
      <IconButton
        icon={iconName}
        iconColor={theme === 'primary' ? Colors.BUTTON.PRIMARY : theme === 'secondary' ? Colors.BUTTON.SECONDARY : Colors.BUTTON.DESTROY}
        size={20}
        onPress={onPress}
      />
    )
  }

  return (
    <PaperButton
      buttonColor={theme === 'primary' ? Colors.BUTTON.PRIMARY : theme === 'secondary' ? Colors.BUTTON.SECONDARY : Colors.BUTTON.DESTROY}
      textColor={Colors.TEXT.BASE}
      icon={iconName}
      onPress={onPress}
      mode="contained"
      compact={compact}
      disabled={disabled}
    >
      {title}
    </PaperButton>
  )
}
