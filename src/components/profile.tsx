'use client';

import { useSession } from '@/lib/auth-client';
import Link from 'next/link';

export default function Profile() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Link
        className="border-primary-500 text-primary-500 hover:bg-primary-500 rounded-full border px-4 py-1 hover:text-white"
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
      <Link
        className="hover:text-primary-400 text-sm font-medium"
        href="/admin"
      >
        {session.user?.name}
        <span className="block text-xs font-normal text-gray-400">
          {session.user?.email}
        </span>
      </Link>
    </div>
  );
}
