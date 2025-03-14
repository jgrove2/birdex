import "./numberCard.css";
export default function NumberCard({
  label,
  number,
  onClick,
}: {
  label: string;
  number: number;
  onClick: () => void;
}) {
  return (
    <button className="number_card_container" onClick={onClick}>
      <span className="number_card_number">{number}</span>
      <span className="number_card_label">{label}</span>
    </button>
  );
}
