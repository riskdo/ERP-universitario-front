export default function Select({ label, children, ...props }) {
  return (
    <label className="field">
      <span>{label}</span>
      <select className="input" {...props}>
        {children}
      </select>
    </label>
  );
}
