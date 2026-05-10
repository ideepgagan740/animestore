'use client';

import { Moon, ShoppingCart, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@shared/ui/atoms/Button';
import { useAppSelector } from '@store/hooks';

export function Header() {
  const { theme, setTheme } = useTheme();
  const itemCount = useAppSelector((state) => state.cart.items.reduce((sum, item) => sum + item.quantity, 0));

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Anime Store</p>
          <h1 className="text-xl font-black">Enterprise Marketplace</h1>
        </div>
        <nav className="flex items-center gap-3" aria-label="Main navigation">
          <Button variant="secondary" aria-label="Cart items">
            <ShoppingCart className="mr-2 h-4 w-4" /> {itemCount}
          </Button>
          <Button
            variant="ghost"
            aria-label="Toggle color theme"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <Sun className="hidden h-4 w-4 dark:block" />
            <Moon className="h-4 w-4 dark:hidden" />
          </Button>
        </nav>
      </div>
    </header>
  );
}
