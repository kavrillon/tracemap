import 'server-only';
import { cookies } from 'next/headers';
import { JWTPayload, SignJWT, jwtVerify } from 'jose';

export const SESSION_DURATION = 24 * 60 * 60 * 1000;
const COOKIE_SESSION_NAME = 'session';
const SECRET_KEY = process.env.SESSION_SECRET;
const ENCODED_KEY = new TextEncoder().encode(SECRET_KEY);

interface SessionPayload extends JWTPayload {}

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(ENCODED_KEY);
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, ENCODED_KEY, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    console.log('Failed to verify session');
  }
}

export async function createSession() {
  const expiresAt = new Date(Date.now() + SESSION_DURATION);
  const session = await encrypt({ expiresAt });

  cookies().set(COOKIE_SESSION_NAME, session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
}

export async function getSession() {
  const session = cookies().get(COOKIE_SESSION_NAME)?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }
    
  return session;
}

export async function updateSession() {
  const session = cookies().get(COOKIE_SESSION_NAME)?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  const expires = new Date(Date.now() + SESSION_DURATION);
  cookies().set(COOKIE_SESSION_NAME, session, {
    httpOnly: true,
    secure: true,
    expires,
    sameSite: 'lax',
    path: '/',
  });
}

export function deleteSession() {
  cookies().delete(COOKIE_SESSION_NAME);
}
