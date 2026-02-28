export default function SectionTitle({ children }) {
  return (
    <div className="flex items-center gap-4 mb-12">
      <h2 className="text-2xl sm:text-3xl font-bold whitespace-nowrap">
        <span className="font-mono text-primary">#</span> {children}
      </h2>
      <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
    </div>
  );
}
