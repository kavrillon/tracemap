import dynamic from 'next/dynamic';
import { Props } from './dynamic-map';
import { MapLoader } from './map-loader';

const DynamicMap = dynamic(() => import('./dynamic-map'), {
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
