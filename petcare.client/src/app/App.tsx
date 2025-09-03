import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRouter from './router';
import { ThemeProvider } from '@/features/theme/theme-provider';
import Navbar from '@/features/nav/Navbar';
import { Toaster } from '@/components/ui/sonner';
import Footer from '@/features/nav/Footer';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <main className="max-w-6xl mx-auto px-4 mb-4 lg:px-2 min-h-[calc(100vh-64px)]">
            <Navbar />
            <AppRouter />
          </main>
          <Footer />
          <Toaster />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
