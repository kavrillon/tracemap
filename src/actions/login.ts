'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { kv } from '@vercel/kv';
import { LoginFormState } from '@/components';
import { createSession } from '@/libs/session';

const PASSWORD = process.env.PASSWORD;
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 60 * 1000;

export async function login(prevState: LoginFormState, formData: FormData) {
  const ip = headers().get('x-forwarded-for');
  const attemptsKey = `login_attempts_${ip}`;

  const attempts = ((await kv.get(attemptsKey)) as number) || 0;

  if (attempts >= MAX_ATTEMPTS) {
    return {
      ...prevState,
      success: false,
      message: 'Too many attempts, please try again later.',
    };
  }

  const password = formData.get('password');
  if (!password || password !== PASSWORD) {
    await kv.set(attemptsKey, attempts + 1, { ex: WINDOW_MS / 1000 });
    return {
      ...prevState,
      success: false,
      message: 'The password is incorrect.',
    };
  }

  await kv.del(attemptsKey);

  await createSession();
  redirect('/');

  return {
    ...prevState,
    success: false,
    message: 'Successful login.',
  };
}
