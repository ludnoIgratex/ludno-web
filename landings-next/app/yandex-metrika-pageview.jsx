"use client";

import { Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import useMetrikaTracking from '../../src/analytics/useMetrikaTracking';

function Tracker() {
  const pathname = usePathname();
  const search = useSearchParams().toString();
  useMetrikaTracking(pathname + (search ? `?${search}` : ''));
  return null;
}

export default function YandexMetrikaPageview() {
  return <Suspense fallback={null}><Tracker /></Suspense>;
}
