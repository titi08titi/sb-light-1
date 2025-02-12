import { Box, Button, Container, Typography } from '@mui/material'
import { useRouter } from 'next/router'

export default function ErrorPage() {
  const router = useRouter()
  const { error } = router.query

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Error
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          {error}
        </Typography>
        <Button variant="contained" color="primary" onClick={() => router.push('/')}>
          Return Home
        </Button>
      </Box>
    </Container>
  )
}