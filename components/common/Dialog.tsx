import { Button as PaperButton, Dialog as PaperDialog, Portal, Text } from 'react-native-paper';
import Colors from '@constants/Colors';
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
      <PaperDialog visible={dialogContent !== null} onDismiss={() => setDialogContent(null)} style={{backgroundColor: Colors.BACKGROUND.GREEN, borderWidth: 1, borderRadius: 5, borderColor: Colors.BORDER.BASE}}>
        <PaperDialog.Title style={{color: Colors.TEXT.BASE, fontWeight: 'bold'}}>{dialogContent?.title}</PaperDialog.Title>
        <PaperDialog.Content>
          <Text style={{color: Colors.TEXT.BASE, fontSize: 16, lineHeight: 21}}>{dialogContent?.body}</Text>
        </PaperDialog.Content>
        <PaperDialog.Actions>
          <PaperButton mode="outlined" buttonColor={Colors.BACKGROUND.BROWN} textColor={Colors.TEXT.BASE} onPress={() => dialogContent?.action?.()}>{dialogContent?.actionLabel}</PaperButton>
          <PaperButton mode="outlined" buttonColor={Colors.BACKGROUND.GREEN} textColor={Colors.TEXT.BASE} onPress={() => setDialogContent(null)}>Cancel</PaperButton>
        </PaperDialog.Actions>
      </PaperDialog>
    </Portal>
  );
}