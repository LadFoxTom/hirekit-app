import type { Metadata } from 'next';

export const metadata: Metadata = {
  robots: 'index, follow',
};

export default function CareerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white antialiased">
      {children}
    </div>
  );
}
