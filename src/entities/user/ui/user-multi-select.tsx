import { UiMultipleSelect } from '@/shared/ui/ui-multiple-select';

import { User } from '../model/types';
import { useUsers } from '../model/users.store';

import { UserPreview } from './user-preview';

export function UserMultiSelect({
  className,
  userIds,
  onChangeUserIds,
  label,
  error
}: {
  error?: string;
  className?: string;
  userIds: string[];
  label?: string;
  onChangeUserIds: (ids: string[]) => void;
}) {
  const users = useUsers(s => s.users);
  const selectedUsers = users.filter(u => userIds.includes(u.id));
  const onChangeUsers = (users: User[]) => {
    onChangeUserIds(users.map(u => u.id));
  };

  return (
    <UiMultipleSelect
      error={error}
      className={className}
      label={label}
      options={users}
      value={selectedUsers}
      onChange={onChangeUsers}
      getLabel={user => user.name}
      renderPreview={users =>
        users?.map(user => (
          <UserPreview
            key={user.id}
            className="shrink-0 px-1"
            size="sm"
            {...user}
          />
        ))
      }
      renderOption={user => <UserPreview size="sm" {...user} />}
    />
  );
}
