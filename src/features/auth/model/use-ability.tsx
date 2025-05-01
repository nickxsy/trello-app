import { useMemo } from 'react';
import { subject } from '@casl/ability';

import { useSession } from '@/entities/session';

import { createStrictContext, useStrictContext } from '@/shared/lib';

import { Ability, abilityFactory } from './ability-factory';

export const abilityContext = createStrictContext<Ability>();

export const useAbility = () => useStrictContext(abilityContext);

export { subject };

export const useAbilityFactory = () => {
  const session = useSession();

  const ability = useMemo(() => abilityFactory(session), [session]);

  return ability;
};
