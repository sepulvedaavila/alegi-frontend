
import { Star } from 'lucide-react';

const FavoritesSection = () => {
  // Favorite cases for demo (would be managed through context in a real app)
  const favoriteCases = [
    { id: 'fav1', title: 'Smith v. Johnson' },
    { id: 'fav2', title: 'Medical Malpractice #429' },
  ];

  return (
    <>
      <div className="text-xs font-medium text-gray-500 mt-4 mb-1">FAVORITES</div>
      {favoriteCases.map(favorite => (
        <div 
          key={favorite.id}
          className="flex items-center py-1 text-sm cursor-pointer text-gray-600 hover:text-gray-900"
        >
          <Star size={14} className="mr-2 text-yellow-400" />
          <span className="truncate">{favorite.title}</span>
        </div>
      ))}
    </>
  );
};

export default FavoritesSection;
