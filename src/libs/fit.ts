import fs from 'node:fs/promises';
import { Point, Track } from '@/types';
import { UPLOADED_FOLDER } from './file';
import FitParser from 'fit-file-parser';

export async function getTracksFromFITFiles(files: string[]): Promise<Track[]> {
  const parser = new FitParser({
    force: true,
    speedUnit: 'km/h',
    lengthUnit: 'km',
    temperatureUnit: 'celsius',
    elapsedRecordField: true,
  });

  let tracks: Track[] = [];
  for (const f of files) {
    const file = await fs.readFile(UPLOADED_FOLDER + f);
    const extract = await getTracksFromFITFile(parser, file, f);
    if (extract.length > 0) tracks = [...tracks, ...extract];
  }

  return tracks;
}

async function getTracksFromFITFile(
  parser: any,
  file: Buffer,
  filename: string,
): Promise<Track[]> {
  const fit = await parseFIT(parser, file);
  if (!fit.records || fit.records.length === 0) {
    // console.log('FIT file has no records!', fit);
    // throw new Error('Unexpected FIT file format.');
    return [];
  }

  const parsedTracks: Track[] = [];
  let points: Point[] = [];

  for (const r of fit.records) {
    if (r.position_lat && r.position_long) {
      points.push([r.position_lat, r.position_long]);
    }
  }

  if (points.length > 0) {
    parsedTracks.push({
      // name: gpx.trk.name, // TODO: find name
      type: fit.sessions[0]?.sport || undefined,
      time: fit.sessions[0] ? new Date(fit.sessions[0].start_time) : new Date(),
      // source: gpx.$.creator, // TODO: find source
      filename,
      points,
    });
  }

  return parsedTracks;
}

async function parseFIT(parser: any, file: Buffer): Promise<any> {
  return new Promise((resolve, reject) => {
    parser.parse(file, (error: any, data: any) => {
      if (error) reject(error);
      else resolve(data);
    });
  });
}
