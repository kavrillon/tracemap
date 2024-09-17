import { Point, Track } from '@/_types';
import { TracksUploadForm, Map, TrackResultList } from '@/_components';
import { getTracks } from '@/_lib/file';

const MAP_CENTER: Point = [46.5, 2.5];

export default async function HomePage() {
  const tracks: Track[] = await getTracks();
  const hasTracks = tracks.length > 0;

  return (
    <main className="bordered-gradient relative h-screen w-screen">
      <div
        className={`absolute left-0 top-0 z-20 h-full w-full ${hasTracks ? 'invisible' : ''}`}
      >
        <TracksUploadForm />
      </div>

      <div className="relative z-10 flex h-full w-full flex-col md:flex-row">
        <div className="relative flex-auto bg-slate-200 md:col-span-3">
          <Map center={MAP_CENTER} tracks={tracks} fixed={!hasTracks} />
        </div>
        <div
          className={`${hasTracks ? 'h-[200px] md:h-full md:w-[300px]' : 'h-0 md:w-0'} flex-shrink-0 flex-grow-0 overflow-hidden overflow-y-auto`}
        >
          <TrackResultList tracks={tracks} />
        </div>
      </div>
    </main>
  );
}
