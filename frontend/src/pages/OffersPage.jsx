import { useEffect, useState } from 'react';
import OffersSection from '../components/sections/OffersSection';
import { fetchOffers } from '../utils/api';

export default function OffersPage() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    fetchOffers().then(setOffers).catch(console.error);
  }, []);

  return <OffersSection offers={offers} />;
}
