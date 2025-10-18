'use client';

import { ErrorPage } from '../components/ErrorPage';

export default function NotFound() {
  return (
    <ErrorPage
      title="Page Not Found"
      message="The page you're looking for doesn't exist or has been moved."
      code={404}
      actions={[
        {
          label: 'Go Home',
          onClick: () => window.location.href = '/',
        },
        {
          label: 'Go Back',
          onClick: () => window.history.back(),
          variant: 'outline',
        },
      ]}
    />
  );
}