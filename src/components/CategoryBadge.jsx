const CATEGORY_STYLES = {
  Criminal: 'from-red-500 to-y2k-pink text-white shadow-[0_0_8px_rgba(255,45,149,0.3)]',
  Lawsuit: 'from-y2k-orange to-y2k-yellow text-y2k-darker shadow-[0_0_8px_rgba(255,225,86,0.3)]',
  Accusation: 'from-orange-400 to-amber-300 text-y2k-darker shadow-[0_0_8px_rgba(255,107,53,0.3)]',
  Controversy: 'from-y2k-purple to-fuchsia-400 text-white shadow-[0_0_8px_rgba(178,75,243,0.3)]',
};

export default function CategoryBadge({ category }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-gradient-to-r ${
        CATEGORY_STYLES[category] || 'from-gray-500 to-gray-400 text-white'
      }`}
    >
      {category}
    </span>
  );
}
