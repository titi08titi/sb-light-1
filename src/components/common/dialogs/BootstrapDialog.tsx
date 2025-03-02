import CloseIcon from '@mui/icons-material/Close'
import { DialogTitle, IconButton } from '@mui/material'

export type DialogElement = {
  open: () => void
}

type DialogTitleProps = {
  id: string
  children?: React.ReactNode
  onClose: () => void
}

export default function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}
