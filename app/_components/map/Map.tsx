import dynamic from 'next/dynamic';
import { Props } from './DynamicMap';
import { MapLoader } from './MapLoader';

const DynamicMap = dynamic(() => import('./DynamicMap'), {
  loading: () => <MapLoader />,
  ssr: false,
});

export function Map(props: Props) {
  return (
    <>
      <DynamicMap {...props} />
    </>
  );
}
