import { useEffect, useState } from 'react';
import MembershipsSection from '../components/sections/MembershipsSection';
import PricingSection from '../components/sections/PricingSection';
import { fetchMemberships, fetchPricing } from '../utils/api';

export default function MembershipsPage() {
  const [memberships, setMemberships] = useState([]);
  const [pricing, setPricing] = useState([]);

  useEffect(() => {
    fetchMemberships().then(setMemberships).catch(console.error);
    fetchPricing().then(setPricing).catch(console.error);
  }, []);

  return (
    <>
      <MembershipsSection memberships={memberships} />
      <PricingSection pricing={pricing} />
    </>
  );
}
