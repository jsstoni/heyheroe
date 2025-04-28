import { cn } from '@/lib/utils';

export default function ErrorMessage({
  message,
  className,
}: {
  message?: string;
  className?: string;
}) {
  if (!message) return null;
  return <div className={cn('text-sm text-red-500', className)}>{message}</div>;
}
