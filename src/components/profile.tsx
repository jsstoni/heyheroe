'use client';

import { useSession } from '@/lib/auth-client';
import Link from 'next/link';

export default function Profile() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Link
        className="rounded-full border border-primary px-4 py-1 text-primary hover:bg-primary hover:text-white"
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
        alt={session.user.name}
        title={session.user.name}
      />
      <Link
        className="text-sm font-medium hover:text-primary"
        href="/dashboard"
      >
        {session.user?.name}
        <span className="block text-xs font-normal text-gray-400">
          {session.user?.email}
        </span>
      </Link>
    </div>
  );
}
