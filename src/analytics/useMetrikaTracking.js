import { useEffect, useRef } from 'react';
import { installLinkTracking, sendPageview } from './metrika.js';

export default function useMetrikaTracking(route) {
  const lastSent = useRef(null);
  useEffect(() => installLinkTracking(), []);

  useEffect(() => {
    // The initial hit is manual too (defer:true in both counter snippets).
    // Wait for the init snippet so early route changes aren't silently lost.
    const send = () => sendPageview(route, lastSent);
    send();
    window.addEventListener("ludno:metrika-ready", send);
    return () => window.removeEventListener("ludno:metrika-ready", send);
  }, [route]);
}
