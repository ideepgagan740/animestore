import { LoginForm } from '@modules/auth/components/LoginForm';

export function AuthPage() {
  return (
    <section className="mx-auto max-w-md rounded-3xl border border-border bg-card p-8 shadow-xl">
      <h2 className="text-3xl font-black">Sign in</h2>
      <p className="mt-2 text-sm text-foreground/70">Access orders, cart, wishlist, and admin tools.</p>
      <div className="mt-8">
        <LoginForm />
      </div>
    </section>
  );
}
