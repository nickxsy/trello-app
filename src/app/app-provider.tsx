import { Confirmations } from '@/widgets/confirmations';

import { abilityContext, useAbilityFactory } from '@/features/auth';

import { ComposeChildren } from '@/shared/lib';

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
