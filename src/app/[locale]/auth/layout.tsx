import React from 'react';

export default function AuthLayout({children}: {children: React.ReactNode;}) {
  return (
    <div className='flex min-h-[650] flex-col items-center justify-center p-4 rounded-xl'>{children}</div>
  );
}
