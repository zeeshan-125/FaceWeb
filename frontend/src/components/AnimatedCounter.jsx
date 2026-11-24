import { useState, useEffect, useRef } from 'react';

function getInitialDisplay(val) {
  if (val === undefined || val === null) return '0';
  const strVal = String(val);
  if (strVal.includes('0.00')) return strVal;
  const isVendor = strVal.startsWith('#');
  const prefix = isVendor ? '#' : '';
  const clean = strVal.replace(/^[#]/, '');
  const match = clean.match(/^([\d,]+(?:\.\d+)?)\s*(.*)$/);
  if (!match) return strVal;
  const suffix = match[2] ? (match[2].startsWith('+') ? match[2] : ' ' + match[2]) : '';
  return `${prefix}0${suffix}`;
}

export default function AnimatedCounter({
  value,
  duration = 1300,
  delay = 1000,
  triggerOnView = false,
}) {
  const [displayValue, setDisplayValue] = useState(() => getInitialDisplay(value));
  const [inView, setInView] = useState(!triggerOnView);
  const elementRef = useRef(null);

  useEffect(() => {
    if (!triggerOnView) {
      setInView(true);
      return;
    }

    const node = elementRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => {
      if (node) observer.unobserve(node);
    };
  }, [triggerOnView]);

  useEffect(() => {
    if (value === undefined || value === null) {
      setDisplayValue('0');
      return;
    }

    if (!inView) {
      setDisplayValue(getInitialDisplay(value));
      return;
    }
    setDisplayValue(getInitialDisplay(value));

    const strVal = String(value);
    const isVendor = strVal.startsWith('#');
    const prefix = isVendor ? '#' : '';
    const clean = strVal.replace(/^[#]/, '');

    // Handle 0.00 specifically (smooth countdown to absolute zero)
    if (clean === '0.00' || clean === '0.00 LTI') {
      const suffix = clean.includes('LTI') ? ' LTI' : '';
      let start = null;
      let frameId;
      const timeoutId = setTimeout(() => {
        const step = (timestamp) => {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          // Ease out cubic
          const ease = 1 - Math.pow(1 - progress, 3);
          const current = (0.50 * (1 - ease)).toFixed(2);
          setDisplayValue(progress === 1 ? `0.00${suffix}` : `${current}${suffix}`);
          if (progress < 1) {
            frameId = requestAnimationFrame(step);
          }
        };
        frameId = requestAnimationFrame(step);
      }, delay);

      return () => {
        clearTimeout(timeoutId);
        cancelAnimationFrame(frameId);
      };
    }

    const match = clean.match(/^([\d,]+(?:\.\d+)?)\s*(.*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const numStr = match[1].replace(/,/g, '');
    const suffix = match[2] ? (match[2].startsWith('+') ? match[2] : ' ' + match[2]) : '';
    const targetNum = parseFloat(numStr);
    const hasCommas = match[1].includes(',');

    let start = null;
    let frameId;

    const timeoutId = setTimeout(() => {
      const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        // Easing: easeOutExpo / easeOutQuart
        const ease = 1 - Math.pow(1 - progress, 4);
        const current = targetNum * ease;

        const rounded = Math.round(current);
        const formatted = hasCommas ? rounded.toLocaleString('en-US') : rounded.toString();

        setDisplayValue(`${prefix}${formatted}${suffix}`);

        if (progress < 1) {
          frameId = requestAnimationFrame(step);
        } else {
          setDisplayValue(value);
        }
      };

      frameId = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(frameId);
    };
  }, [value, duration, delay, inView]);

  return <span ref={elementRef} className="tabular-nums inline-block">{displayValue}</span>;
}
