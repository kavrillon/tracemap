import fs from 'node:fs/promises';
import { Repository } from '@/repository';
import { Track } from '@/types/track';

const DATA_FOLDER = process.env.DATA_FOLDER as string;
const DATA_FILENAME = 'data.json';

export const JsonTrackRepository: Repository<Track> = {
  getAll: async (): Promise<Track[]> => getFileContent(),

  save: async (item: Track): Promise<void> => {
    const tracks = await getFileContent();
    return saveFileContent([...tracks, item]);
  },

  saveAll: async (items: Track[]): Promise<void> => {
    const tracks = await getFileContent();
    return saveFileContent([...tracks, ...items]);
  },
};

async function getFileContent(): Promise<Track[]> {
  try {
    const content = await fs.readFile(DATA_FOLDER + DATA_FILENAME, 'utf8');
    const data = JSON.parse(content) as any[];
    return data.map((t) => ({
      ...t,
      time: new Date(t.time),
    }));
  } catch (err) {
    await saveFileContent([]);
    return [];
  }
}

async function saveFileContent(tracks: Track[]): Promise<void> {
  return fs.writeFile(DATA_FOLDER + DATA_FILENAME, JSON.stringify(tracks));
}
