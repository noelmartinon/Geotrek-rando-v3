import { useRouter } from 'next/router';
import { TouristicContentUI } from 'components/pages/touristicContent';

const TouristicContent = () => {
  const router = useRouter();
  const { touristicContent } = router.query;
  return <TouristicContentUI touristicContentUrl={touristicContent} />;
};

export default TouristicContent;