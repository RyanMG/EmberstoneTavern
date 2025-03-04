export type TDialogContent = {
  title: string
  body: string
  actionLabel?: string
  action?: () => void
} | null;
