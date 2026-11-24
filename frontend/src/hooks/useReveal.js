import { useEffect } from 'react';

export default function useReveal(deps = []) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('revealed');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal, .reveal-up, .reveal-card, .reveal-scale').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, deps);
}
