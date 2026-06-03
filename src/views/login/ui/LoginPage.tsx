import { LoginForm, LoginHero } from '@/features/auth/login';

export function LoginPage() {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <LoginHero />
      <LoginForm />
    </div>
  );
}
