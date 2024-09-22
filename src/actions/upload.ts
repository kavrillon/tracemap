'use server';

import { revalidatePath } from 'next/cache';
import { getTracksFromGPXFile } from '@/libs/gpx';
import { JsonTrackRepository } from '@/repository';
import { getTracksFromFITFile } from '@/libs/fit';
import { Track } from '@/types';

export async function upload(formData: FormData) {
  const files = formData.getAll('files') as File[];

  let tracks: Track[] = [];
  for (let i = 0; i < files.length; i++) {
    if (files[i].name.endsWith('.gpx')) {
      const arrayBuffer = await files[i].arrayBuffer();
      const content = Buffer.from(arrayBuffer).toString('utf-8');
      tracks = [...tracks, ...getTracksFromGPXFile(content, files[i].name)];
    }
    if (files[i].name.endsWith('.fit')) {
      const arrayBuffer = await files[i].arrayBuffer();
      const content = Buffer.from(arrayBuffer);
      tracks = [
        ...tracks,
        ...(await getTracksFromFITFile(content, files[i].name)),
      ];
    }
  }
  await JsonTrackRepository.saveAll(tracks);

  revalidatePath('/');
}
