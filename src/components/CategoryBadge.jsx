const CATEGORY_STYLES = {
  Criminal: 'bg-red-100 text-red-700 border-red-200',
  Lawsuit: 'bg-amber-100 text-amber-700 border-amber-200',
  Accusation: 'bg-orange-100 text-orange-700 border-orange-200',
  Controversy: 'bg-purple-100 text-purple-700 border-purple-200',
};

export default function CategoryBadge({ category }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${
        CATEGORY_STYLES[category] || 'bg-gray-100 text-gray-700 border-gray-200'
      }`}
    >
      {category}
    </span>
  );
}
