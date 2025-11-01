import './global.css'
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppRouter } from './components/AppRouter';
import { store } from './store';
import { Provider } from 'react-redux';


export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <GluestackUIProvider mode="light">
              <AppRouter/>
        </GluestackUIProvider>
      </Provider>
    </QueryClientProvider>
  );
}



const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
})


