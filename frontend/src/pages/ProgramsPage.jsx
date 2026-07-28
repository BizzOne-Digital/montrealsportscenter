import { useEffect, useState } from 'react';
import ProgramsSection from '../components/sections/ProgramsSection';
import { fetchPrograms } from '../utils/api';

export default function ProgramsPage() {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    fetchPrograms().then(setPrograms).catch(console.error);
  }, []);

  return <ProgramsSection programs={programs} />;
}
