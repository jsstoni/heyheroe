import { type ReactNode, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

type ErrorSuspenseProps = {
  loading?: ReactNode;
  error: ReactNode;
  children: ReactNode;
};

export function ErrorSuspense({
  loading,
  error,
  children,
}: ErrorSuspenseProps) {
  const content = loading ? (
    <Suspense fallback={loading}>{children}</Suspense>
  ) : (
    children
  );

  return <ErrorBoundary fallback={error}>{content}</ErrorBoundary>;
}
