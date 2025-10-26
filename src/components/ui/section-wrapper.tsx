// Section wrapper component
const SectionWrapper: React.FC<{
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}> = ({ title, subtitle, children }) => (
  <section
    id={title}
    className="mb-8 p-6 bg-white/80 border border-slate-300 rounded-2xl shadow-lg backdrop-blur-sm"
  >
    <header className="mb-4">
      <h2 className="text-2xl font-bold text-green-700">{title}</h2>
      {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
    </header>
    {children}
  </section>
);

export default SectionWrapper;
