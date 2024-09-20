import { LoginForm, Logo } from '@/components';

export default function LoginPage() {
  return (
    <main className="flex h-full w-full flex-col items-center justify-center">
      <div className="relative">
        <div className="absolute left-1/2 top-0 mb-24 w-60 -translate-x-1/2 -translate-y-[200%] text-slate-300 md:w-72">
          <Logo />
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
