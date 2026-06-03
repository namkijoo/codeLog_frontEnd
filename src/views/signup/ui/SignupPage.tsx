import { SignupForm, SignupHero } from '@/features/auth/signup';

export function SignupPage() {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <SignupHero />
      <SignupForm />
    </div>
  );
}
