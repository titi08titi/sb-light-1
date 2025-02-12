import { Box, Button, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { PageContainer } from '../components/layout/PageContainer'

export default function Home() {
  const router = useRouter()

  return (
    <PageContainer>
      <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        minHeight: '80vh'
      }}>
        <Typography variant="h4" color="secondary">
          Welcome to Sb
        </Typography>
        <Button 
          variant="contained" 
          color="secondary"
          onClick={() => router.push('/reports/intrastat')}
        >
          Go to Intrastat Reports
        </Button>
      </Box>
    </PageContainer>
  )
}