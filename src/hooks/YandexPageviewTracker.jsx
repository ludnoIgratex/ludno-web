import { useLocation } from 'react-router-dom';
import useMetrikaTracking from '../analytics/useMetrikaTracking';

export default function YandexPageviewTracker() {
  const { pathname, search } = useLocation();
  useMetrikaTracking(pathname + search);
  return null;
}
