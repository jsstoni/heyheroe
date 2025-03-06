'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import type { SVGProps } from 'react';

const Loader = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="280"
    height="80"
    viewBox="0 0 280 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="40" cy="40" r="40" fill="#D9D9D9" />
    <rect x="95" y="20" width="185" height="15" rx="4" fill="#D9D9D9" />
    <rect x="95" y="45" width="142" height="15" rx="4" fill="#D9D9D9" />
  </svg>
);

export default function Profile() {
  const auth = useSession();

  const { data: session, status } = auth;

  if (status === 'loading') {
    return <Loader width={120} height={35} className="animate-pulse" />;
  }

  if (!session) {
    return (
      <Link
        className="rounded-full border border-amber-500 px-4 py-1 text-amber-500 hover:bg-amber-500 hover:text-white"
        href="/login"
      >
        Empezar ahora
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <img
        className="size-8 rounded-full"
        src={session.user?.image || ''}
        alt="avatar"
      />
      <Link className="text-sm font-medium hover:text-amber-400" href="/admin">
        {session.user?.name}
        <span className="block text-xs font-normal text-gray-400">
          {session.user?.email}
        </span>
      </Link>
    </div>
  );
}
