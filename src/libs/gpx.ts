import fs from 'node:fs/promises';
import { XMLParser } from 'fast-xml-parser';
import { Point, Track } from '@/types';
import { UPLOADED_FOLDER } from './file';

export async function getTracksFromGPXFiles(files: string[]): Promise<Track[]> {
  const parser = new XMLParser({
    attributesGroupName: '$',
    attributeNamePrefix: '',
    ignoreAttributes: false,
    parseAttributeValue: true,
  });

  let tracks: Track[] = [];
  for (const f of files) {
    const file = await fs.readFile(UPLOADED_FOLDER + f, 'utf8');
    const extract = getTracksFromGPXFile(parser, file, f);
    if (extract.length > 0) tracks = [...tracks, ...extract];
  }

  return tracks;
}

function getTracksFromGPXFile(
  parser: XMLParser,
  file: string,
  filename: string,
): Track[] {
  const { gpx } = parser.parse(file);

  if (!gpx.trk && !gpx.rte) {
    console.log('GPX file has neither tracks nor routes!', gpx);
    throw new Error('Unexpected gpx file format.');
  }

  const parsedTracks: Track[] = [];

  let points: Point[] = [];
  for (let trkpt of gpx.trk.trkseg.trkpt || []) {
    if (
      typeof trkpt.$ !== 'undefined' &&
      typeof trkpt.$.lat !== 'undefined' &&
      typeof trkpt.$.lon !== 'undefined'
    ) {
      points.push([parseFloat(trkpt.$.lat), parseFloat(trkpt.$.lon)]);
    }
  }

  if (points.length > 0) {
    parsedTracks.push({
      name: gpx.trk.name,
      type: gpx.trk.type,
      time: new Date(gpx.metadata?.time),
      source: gpx.$.creator,
      filename,
      points,
    });
  }

  return parsedTracks;
}
