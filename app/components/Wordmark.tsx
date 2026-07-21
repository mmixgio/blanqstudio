/* Logotipo testuale di BlanqStudio: contrasto di peso (semibold vs light)
   e di colore (foreground vs tertiary), nessuna palette nuova. */
export default function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-semibold tracking-tight ${className}`}>
      Blanq
      <span className="font-light text-text-tertiary">Studio</span>
    </span>
  );
}
