'use client';

import { upload } from '@/actions';
import { FilesUpload } from './files-upload';

export function UploadForm() {
  return (
    <form
      action={upload}
      className="relative flex h-full w-full items-center justify-center"
    >
      <FilesUpload />
    </form>
  );
}
