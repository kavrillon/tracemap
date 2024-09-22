import { UploadForm, Map, TrackResultList } from '@/components';
import { JsonTrackRepository } from '@/repository';
import { Point } from '@/types';

const MAP_CENTER: Point = [46.5, 2.5];

export default async function HomePage() {
  let tracks = await JsonTrackRepository.getAll();
  // console.log('🚀 ~ HomePage ~ tracks:', tracks);
  // tracks = [];
  const hasTracks = tracks.length > 0;

  return (
    <main className="h-full w-full">
      <div
        className={`absolute left-0 top-0 z-20 h-full w-full ${hasTracks ? 'invisible' : ''}`}
      >
        <UploadForm />
      </div>

      <div className="relative z-10 flex h-full w-full flex-col md:flex-row">
        <div className="relative flex-auto bg-slate-200 md:col-span-3">
          <Map center={MAP_CENTER} tracks={tracks} fixed={!hasTracks} />
        </div>
        <div
          className={`${hasTracks ? 'h-[200px] md:h-full md:w-[300px]' : 'h-0 md:w-0'} flex-shrink-0 flex-grow-0 overflow-hidden overflow-y-auto`}
        >
          <TrackResultList tracks={tracks} />

          <UploadForm />
        </div>
      </div>
    </main>
  );
}
