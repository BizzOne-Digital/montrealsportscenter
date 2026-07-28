import { useEffect, useState } from 'react';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import { fetchTestimonials } from '../utils/api';

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetchTestimonials().then(setTestimonials).catch(console.error);
  }, []);

  return <TestimonialsSection testimonials={testimonials} />;
}
