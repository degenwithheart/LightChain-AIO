import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost' };

export default function Button({ variant = 'primary', children, ...rest }: Props) {
  const base = 'inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium focus:outline-none';
  const className =
    variant === 'primary'
      ? `${base} bg-teal-400 text-teal-900 hover:bg-teal-300`
      : variant === 'secondary'
      ? `${base} bg-gray-100 text-gray-900`
      : `${base} bg-transparent text-gray-900`;
  return (
    <button {...rest} className={`${className} ${rest.className || ''}`}>
      {children}
    </button>
  );
}
