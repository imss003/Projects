import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {ChakraProvider, extendTheme} from '@chakra-ui/react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom';

const colors = {
  backGround: {
    900: "#051923",
    800: "#003554",
    700: "#006494",
    600: "#0582ca",
    500: "#00a6fb"
  }
}
const theme = extendTheme({colors});
const queryClient = new QueryClient({
  defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <App/>
        </QueryClientProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
