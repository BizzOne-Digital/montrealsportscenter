import FacilitySection from '../components/sections/FacilitySection';
import GallerySection from '../components/sections/GallerySection';
import HoursLocationSection from '../components/sections/HoursLocationSection';

export default function FacilityPage({ settings }) {
  return (
    <>
      <FacilitySection />
      <GallerySection category="facility" title="A closer look" subtitle="at the facility." />
      <HoursLocationSection settings={settings} />
    </>
  );
}
