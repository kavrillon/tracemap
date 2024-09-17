'use server';

import fs from 'node:fs/promises';
import { revalidatePath } from 'next/cache';

export async function uploadFiles(formData: FormData) {
  const files = formData.getAll('files') as File[];

  await Promise.all(
    files.map(async (file) => {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);

      await fs.writeFile(`./content/uploaded/${file.name}`, buffer);
    }),
  );

  revalidatePath('/');
}
