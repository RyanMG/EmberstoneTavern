import { Button as PaperButton, Dialog as PaperDialog, Portal, Text } from 'react-native-paper';
import COLORS from '@constants/colors';
import { TDialogContent } from '@definitions/ui';

export default function Dialog({
  dialogContent,
  setDialogContent
}: {
  dialogContent: TDialogContent
  setDialogContent: (dialogContent: TDialogContent | null) => void
}) {
  return (
    <Portal>
      <PaperDialog visible={dialogContent !== null} onDismiss={() => setDialogContent(null)} style={{backgroundColor: COLORS.BACKGROUND.GREEN, borderWidth: 1, borderRadius: 5, borderColor: COLORS.BORDER.BASE}}>
        <PaperDialog.Title style={{color: COLORS.TEXT.BASE, fontWeight: 'bold'}}>{dialogContent?.title}</PaperDialog.Title>
        <PaperDialog.Content>
          <Text style={{color: COLORS.TEXT.BASE, fontSize: 16, lineHeight: 21}}>{dialogContent?.body}</Text>
        </PaperDialog.Content>
        <PaperDialog.Actions>
          <PaperButton mode="outlined" buttonColor={COLORS.BACKGROUND.BROWN} textColor={COLORS.TEXT.BASE} onPress={() => dialogContent?.action?.()}>{dialogContent?.actionLabel}</PaperButton>
          <PaperButton mode="outlined" buttonColor={COLORS.BACKGROUND.GREEN} textColor={COLORS.TEXT.BASE} onPress={() => setDialogContent(null)}>Cancel</PaperButton>
        </PaperDialog.Actions>
      </PaperDialog>
    </Portal>
  );
}