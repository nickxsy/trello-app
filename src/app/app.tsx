import { AppProvider } from './providers/app-provider';
import { AppLoader } from './app-loader';
import { AppRouter } from './app-router';

export function App() {
  return (
    <AppProvider>
      <AppLoader>
        <AppRouter />
      </AppLoader>
    </AppProvider>
  );
}
