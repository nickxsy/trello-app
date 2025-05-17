import { ReactNode, useId } from 'react';
import {
  Combobox,
  ComboboxButton,
  ComboboxOption,
  ComboboxOptions,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions
} from '@headlessui/react';
import clsx from 'clsx';

import { ChevronUpDownIcon } from './ui-icons';

type BaseOption = {
  id: string | number;
};

export type UiSelectProps<T extends BaseOption | undefined> = {
  className?: string;
  options?: T[];
  value?: T;
  onChange: (value: T) => void;
  label?: string;
  error?: string;
  getLabel: (value: T) => string;
  renderPreview?: (value?: T) => ReactNode;
  renderOption?: (
    value: T,
    o: { selected?: boolean; active?: boolean }
  ) => ReactNode;
};

export function UiSelect<T extends BaseOption | undefined>({
  onChange,
  value,
  options,
  className,
  label,
  error,
  getLabel,
  renderPreview,
  renderOption = o => getLabel(o)
}: UiSelectProps<T>) {
  const id = useId();

  const handleChange = (value: T | null) => {
    onChange((value ?? undefined) as T);
  };

  return (
    <div className={clsx(className, 'flex flex-col gap-1')}>
      {label && (
        <label htmlFor={id} className="block">
          {label}
        </label>
      )}
      <Combobox value={value ?? null} onChange={handleChange}>
        <div className="relative rounded border border-slate-300 focus-within:border-teal-600 h-10 outline-none z-10">
          <ComboboxButton
            id={id}
            className={
              ' h-full w-full outline-none grow bg-transparent flex items-center '
            }
          >
            {renderPreview?.(value) ??
              (value && (
                <div className="px-2 whitespace-nowrap">{getLabel(value)}</div>
              ))}
            <ChevronUpDownIcon
              className="h-5 w-10 text-gray-400 ml-auto"
              aria-hidden="true"
            />
          </ComboboxButton>

          <ComboboxOptions className="absolute top-full mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {options?.map(option => (
              <ComboboxOption
                key={option?.id ?? 'empty'}
                value={option}
                className={({ focus, selected }) =>
                  clsx(
                    'relative flex cursor-default select-none p-4 ',
                    focus ? 'bg-teal-600 text-white' : 'text-slate-900',
                    selected && 'bg-teal-500 text-white'
                  )
                }
              >
                {params => <>{renderOption(option, params)}</>}
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        </div>
      </Combobox>
      {error && <div className="text-rose-400 text-sm">{error}</div>}
    </div>
  );
}
