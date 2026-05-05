export default function CardResumo({ title, value, detail, icon: Icon, tone = 'blue' }) {
  return (
    <article className={`summary-card tone-${tone}`}>
      <div className="summary-icon">{Icon && <Icon size={22} />}</div>
      <div>
        <p>{title}</p>
        <strong>{value}</strong>
        {detail && <span>{detail}</span>}
      </div>
    </article>
  );
}
