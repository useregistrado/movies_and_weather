
import { Suspense } from 'react';
import ParamsComponent from './ParamsComponent';

export default function PageComponent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ParamsComponent />
    </Suspense>
  );
}
