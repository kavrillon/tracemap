import dynamic from 'next/dynamic';
import { MapProps } from './dynamic-map';

const DynamicMap = dynamic(() => import('./dynamic-map'), {
  loading: () => <p>The map is loading...</p>,
  ssr: false
});

const Map = (props: MapProps) => {
  return (
    <>
      <DynamicMap {...props} />
    </>
  )
}

export default Map;
