import { Track } from '@/_types';
import { TrackResult } from './TrackResult';

interface Props {
  tracks: Track[];
}

export function TrackResultList({ tracks }: Props) {
  return (
    <ul className="flex flex-col gap-0 p-0">
      {tracks.map((t, i) => (
        <TrackResult key={i} track={t} />
      ))}
    </ul>
  );
}
