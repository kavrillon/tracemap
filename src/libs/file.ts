import fs from 'node:fs/promises';
import { Track } from '@/types';
import { getTracksFromFITFiles } from './fit';
import { getTracksFromGPXFiles } from './gpx';

export const UPLOADED_FOLDER = process.env.DATA_FOLDER as string;

export async function getTracks(): Promise<Track[]> {
  const files = await fs.readdir(UPLOADED_FOLDER, { withFileTypes: false });
  const gpxFiles = files.filter((f) => f.endsWith('.gpx'));
  const fitFiles = files.filter((f) => f.endsWith('.fit'));

  let tracks: Track[] = [];
  const gpxTracks = await getTracksFromGPXFiles(gpxFiles);
  const fitTracks = await getTracksFromFITFiles(fitFiles);
  tracks = [...tracks, ...gpxTracks];
  tracks = [...tracks, ...fitTracks];

  return tracks.sort((a, b) => {
    if (a.time && b.time && a.time < b.time) return 1;
    if (a.time && b.time && a.time > b.time) return -1;
    return 0;
  });
}
