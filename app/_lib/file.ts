import { Track } from '@/_types';
import fs from 'node:fs/promises';
import { getTracksFromGPXFiles } from './gpx';

export const UPLOADED_FOLDER = process.env.DATA_FOLDER as string;

export async function getTracks(): Promise<Track[]> {
  const gpxFiles = (
    await fs.readdir(UPLOADED_FOLDER, { withFileTypes: false })
  ).filter((f) => f.endsWith('.gpx'));

  let tracks: Track[] = [];
  const extract = await getTracksFromGPXFiles(gpxFiles);
  tracks = [...tracks, ...extract];

  return tracks.sort((a, b) => {
    if (a.time && b.time && a.time < b.time) return 1;
    if (a.time && b.time && a.time > b.time) return -1;
    return 0;
  });
}
