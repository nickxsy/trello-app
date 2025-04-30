import { ReactNode } from 'react';
import clsx from 'clsx';

export function UiCenterContentLayout({
  children,
  className
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        'container mx-auto max-w-[600px] m-full px-10',
        className
      )}
    >
      {children}
    </div>
  );
}
