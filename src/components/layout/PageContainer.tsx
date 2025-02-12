import { Box, Container, Typography } from '@mui/material'
import { Navbar } from './Navbar'

interface PageContainerProps {
  children: React.ReactNode
  title?: string
}

export function PageContainer({ children, title }: PageContainerProps) {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar />
      <Container sx={{ py: 4 }}>
        {title && (
          <Typography 
            variant="h5" 
            component="h1" 
            color="secondary"
            gutterBottom
          >
            {title}
          </Typography>
        )}
        {children}
      </Container>
    </Box>
  )
}