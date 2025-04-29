import { Confirmations } from '@/widgets/confirmations';

import { ComposeChildren } from '@/shared/lib/react';

import { abilityContext, useAbilityFactory } from '@/features/auth';

export function AppProvider({ children }: { children: React.ReactNode }) {
  const ability = useAbilityFactory();

  return (
    <ComposeChildren>
      <Confirmations />
      <abilityContext.Provider value={ability} />
      {children}
    </ComposeChildren>
  );
}
