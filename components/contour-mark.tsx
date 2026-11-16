export function ContourMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" role="presentation" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M31.5 6.5c7.4.4 13.9 4.1 17.6 9.6 3.4 5.1 3.6 11.4.9 16.6-2.6 5-7.6 8.9-13.9 10.4-6.2 1.5-13 .6-18.1-2.6C12.8 37.3 9.8 31.8 9.9 26.1c.1-5.6 3.2-10.9 8.1-14.1" />
      <path d="M32 15.4c4.9.3 9.4 2.6 11.9 6.2 2.3 3.4 2.5 7.7.6 11.2-1.8 3.4-5.2 6.1-9.4 7.1-4.2 1-8.8.4-12.2-1.7-3.5-2.2-5.5-5.9-5.4-9.7" />
      <path d="M32.4 24.2c2.6.2 5 1.4 6.3 3.3 1.2 1.8 1.3 4.1.3 5.9" />
    </svg>
  );
}
