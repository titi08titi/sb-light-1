import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import { useRouter } from 'next/router'

export function Navbar() {
  const router = useRouter()
  
  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <IconButton 
          edge="start" 
          color="secondary" 
          onClick={() => router.push('/')}
        >
          <HomeIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }}>
          <Typography 
            variant="h6" 
            component="div" 
            color="secondary"
            sx={{ ml: 2 }}
          >
            Sb
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  )
}