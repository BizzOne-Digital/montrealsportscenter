import { useEffect, useState } from 'react';
import HeroSection from '../components/sections/HeroSection';
import ProgramsSection from '../components/sections/ProgramsSection';
import FacilitySection from '../components/sections/FacilitySection';
import MembershipsSection from '../components/sections/MembershipsSection';
import OffersSection from '../components/sections/OffersSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import { fetchHero, fetchPrograms, fetchMemberships, fetchOffers, fetchTestimonials } from '../utils/api';

export default function HomePage() {
  const [data, setData] = useState({});

  useEffect(() => {
    Promise.all([
      fetchHero(), fetchPrograms(), fetchMemberships(), fetchOffers(), fetchTestimonials()
    ]).then(([hero, programs, memberships, offers, testimonials]) => {
      setData({ hero, programs, memberships, offers, testimonials });
    }).catch(console.error);
  }, []);

  return (
    <>
      <HeroSection hero={data.hero} />
      <ProgramsSection programs={data.programs} />
      <FacilitySection />
      <MembershipsSection memberships={data.memberships} />
      <OffersSection offers={data.offers} />
      <TestimonialsSection testimonials={data.testimonials} />
    </>
  );
}
