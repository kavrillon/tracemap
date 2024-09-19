'use client';

import { useFormState } from 'react-dom';
import { login } from '@/actions';
import { SubmitButton } from './submit-button';

export interface LoginFormState {
  success: boolean | null;
  message: string | null;
}

const INITIAL_STATE: LoginFormState = {
  success: null,
  message: null,
};

export function LoginForm() {
  const [formState, action] = useFormState(login, INITIAL_STATE);

  return (
    <form action={action}>
      <div className="h-full w-full rounded-lg bg-white text-center shadow sm:min-w-[400px] sm:max-w-md md:mt-0 xl:p-0">
        <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
          <div>
            <label
              htmlFor="password"
              className="text-gradient mb-4 block text-xl font-bold text-gray-900 md:text-2xl"
            >
              Please enter your password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900"
              required
            />
          </div>
          <SubmitButton />
          {formState.message && (
            <div className="font-bold">{formState.message}</div>
          )}
        </div>
      </div>
    </form>
  );
}
