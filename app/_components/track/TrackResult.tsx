import { Track } from '@/_types';

interface Props {
  track: Track;
}

export function TrackResult({ track }: Props) {
  return (
    <li className="p-2">
      <div className="text-sm">
        {track.time && track.time?.toLocaleDateString()} {track.name}
      </div>
      <div className="text-xs text-gray-500">{track.type}</div>
    </li>
  );
}
