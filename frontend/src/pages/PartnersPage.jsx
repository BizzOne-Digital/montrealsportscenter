import { useEffect, useState } from 'react';
import PartnersSection from '../components/sections/PartnersSection';
import PartnerBenefitsSection from '../components/sections/PartnerBenefitsSection';
import GallerySection from '../components/sections/GallerySection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import { fetchTestimonials } from '../utils/api';

export default function PartnersPage() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetchTestimonials().then(setTestimonials).catch(console.error);
  }, []);

  return (
    <>
      <PartnersSection />
      <PartnerBenefitsSection />
      <GallerySection category="events" title="Community &" subtitle="partner events." />
      <TestimonialsSection testimonials={testimonials} />
    </>
  );
}
