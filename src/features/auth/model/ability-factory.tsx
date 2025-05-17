import { defineAbility, MongoAbility, MongoQuery } from '@casl/ability';

import { type Session } from '@/entities/session';

type CRUD = 'create' | 'read' | 'delete' | 'update';
type Abilities =
  | ['sign-in-as' | 'sign-out', 'User' | { id: string }]
  | [ CRUD | 'update-access', 'Board' | { ownerId: string, editorsIds: string[] }]
  | [CRUD, 'Board' | { ownerId: string; editorsIds: string[] }]
  | [CRUD, 'Tasks' | { authorId: string }];

type Conditions = MongoQuery;

export type Ability = MongoAbility<Abilities, Conditions>;

export const abilityFactory = (session: Session | undefined) =>
  defineAbility<Ability>(can => {
    if (!session) {
      can('sign-in-as', 'User');

      return;
    }

    const { userId } = session;

    can('sign-in-as', 'User', { id: { $ne: userId } });
    can('sign-out', 'User', { id: userId });

    // BOARD

    can('create', 'Board');
    can('read', 'Board', { ownerId: userId });
    can('read', 'Board', { editorsIds: { $in: [userId] } });
    can('delete', 'Board', { ownerId: userId });
    can('update', 'Board', { ownerId: userId });
    can('update-access', 'Board', { ownerId: userId });

    // TASKS

    can('create', 'Tasks');
    can('read', 'Tasks', { authorId: userId });
    can('delete', 'Tasks', { authorId: userId });
    can('update', 'Tasks', { authorId: userId });
  });
