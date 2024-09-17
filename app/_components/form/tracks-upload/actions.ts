'use server';

import fs from 'node:fs/promises';
import { revalidatePath } from 'next/cache';
import { resolveWithMinDuration } from '@/_lib/promise';
import { UPLOADED_FOLDER } from '@/_lib/file';

const MINIMUM_DURATION = 1000;

export async function uploadFiles(formData: FormData) {
  const files = formData.getAll('files') as File[];

  const promises = files.map(async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    await fs.writeFile(`${UPLOADED_FOLDER}${file.name}`, buffer);
  });

  await resolveWithMinDuration(promises, MINIMUM_DURATION);
  revalidatePath('/');
}
