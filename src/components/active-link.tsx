'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  href: string;
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export function ActiveLink({ children, title, className, href }: Props) {
  const pathname = usePathname();

  return (
    <Link
      className={cn(className, {
        'font-medium text-primary': pathname === href,
      })}
      href={href}
      title={title}
    >
      {children}
    </Link>
  );
}
