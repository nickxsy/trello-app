import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

import { ROUTER_PATHS, type RouterPathsType } from '@/shared/constants';

type NavLinksType = {
  to: RouterPathsType;
  name: string;
};

const links: NavLinksType[] = [
  {
    to: ROUTER_PATHS.BOARDS,
    name: 'Доски'
  },
  {
    to: ROUTER_PATHS.USERS,
    name: 'Пользователи'
  },
  {
    to: ROUTER_PATHS.TASKS,
    name: 'Задачи'
  }
];

export function NavLinks() {
  const linkClassName = ({ isActive }: { isActive?: boolean }) =>
    clsx(isActive && 'underline');
  return (
    <div className="text-lg flex gap-5">
      {links.map(link => (
        <NavLink key={link.to} className={linkClassName} to={link.to}>
          {link.name}
        </NavLink>
      ))}
    </div>
  );
}
