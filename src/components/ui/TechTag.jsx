export default function TechTag({ label }) {
  return (
    <span className="inline-block px-3 py-1 text-xs font-mono text-primary bg-primary-light border border-primary-border rounded-full">
      {label}
    </span>
  );
}
