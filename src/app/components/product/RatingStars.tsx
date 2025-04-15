interface Props {
  rate: number;
}

const RatingStars: React.FC<Props> = ({ rate }) => (
  <p className="mt-2 text-yellow-500">
    {"★".repeat(Math.round(rate))} <span className="text-sm">({rate})</span>
  </p>
);

export default RatingStars;
