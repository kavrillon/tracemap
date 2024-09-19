'use server';

import fs from 'node:fs/promises';
import { revalidatePath } from 'next/cache';
import {
  MINIMUM_PROMISE_DURATION,
  resolveWithMinDuration,
} from '@/libs/promise';
import { UPLOADED_FOLDER } from '@/libs/file';

export async function upload(formData: FormData) {
  const files = formData.getAll('files') as File[];

  const promises = files.map(async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    await fs.writeFile(`${UPLOADED_FOLDER}${file.name}`, buffer);
  });

  await resolveWithMinDuration(promises, MINIMUM_PROMISE_DURATION);
  revalidatePath('/');
}
