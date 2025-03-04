import COLORS from '@constants/colors';
import { ScreenProps } from 'expo-router';

export const pageHeaderOptions: ScreenProps['options'] = {
  headerStyle: {
    backgroundColor: COLORS.BACKGROUND.BROWN,
    height: 45,
    borderBottomColor: COLORS.BORDER.DARKEN50,
    borderBottomWidth: 1
  },
  headerTintColor: COLORS.TEXT.BASE,
  headerTitleAlign: 'center',
  headerTitleStyle: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: COLORS.TEXT.DARKEN20
  },
};
