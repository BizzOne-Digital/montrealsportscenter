import { useEffect, useRef, useState } from 'react';

export default function Reveal({ children, className = '', as: Tag = 'div', delay = 0, ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.unobserve(el); }
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'visible' : ''}${className ? ` ${className}` : ''}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
