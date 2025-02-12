import { ThemeProvider } from '@mui/material/styles'
import { createTheme } from '@mui/material/styles'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import '../styles/bundle.css'

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

  const theme = createTheme({
    palette: {
      primary: {
        main: '#F3F3F3',
      },
      secondary: {
        main: '#EC008C',
      },
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ToastContainer position="bottom-right" />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default MyApp