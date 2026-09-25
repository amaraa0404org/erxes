import { Route, Routes } from 'react-router';
import { Suspense, lazy } from 'react';

import { Spinner } from 'erxes-ui';

const HelloPage = lazy(() =>
  import('./HelloPage').then((module) => ({
    default: module.HelloPage,
  })),
);

export const Hello = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route index element={<HelloPage />} />
      </Routes>
    </Suspense>
  );
};
