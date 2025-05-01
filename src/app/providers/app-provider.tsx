import { QueryClientProvider } from '@tanstack/react-query';

import { Confirmations } from '@/widgets/confirmations';

import { queryClient } from '@/shared/api';
import { ComposeChildren } from '@/shared/lib';

import { AbilityProvider } from './ability-provider';

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ComposeChildren>
      <QueryClientProvider client={queryClient} />
      <AbilityProvider />
      <Confirmations />
      {children}
    </ComposeChildren>
  );
}
