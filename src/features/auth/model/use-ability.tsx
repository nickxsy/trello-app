import { subject } from '@casl/ability';
import { useMemo } from 'react';

import { createStrictContext, useStrictContext } from '@/shared/lib/react';

import { useSession } from '@/entities/session';

import { Ability, abilityFactory } from './ability-factory';

export const abilityContext = createStrictContext<Ability>();

export const useAbility = () => {
  return useStrictContext(abilityContext);
};
export { subject };

export const useAbilityFactory = () => {
  const session = useSession(s => s.currentSession);

  const ability = useMemo(() => {
    return abilityFactory(session);
  }, [session]);

  return ability;
};
