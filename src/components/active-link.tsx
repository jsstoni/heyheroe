'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function ActiveLink({ children, className, href }: Props) {
  const pathname = usePathname();

  return (
    <Link
      className={cn(className, {
        'rounded-full bg-orange-600 text-white': pathname.includes(href),
      })}
      href={href}
    >
      {children}
    </Link>
  );
}
