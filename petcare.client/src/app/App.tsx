import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRouter from './router';
import { ThemeProvider } from '@/features/theme/theme-provider';
import Navbar from '@/features/nav/Navbar';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <main className="max-w-7xl mx-auto px-4 lg:px-2">
            <Navbar />
            <AppRouter />
          </main>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
