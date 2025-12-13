import React, { useState, useMemo } from 'react';
import { nutritionItems } from '../data/mockData';
import { NutritionCard, SearchBar } from '../components/NutritionCard';
import {
  searchItems,
  filterByCategory,
  filterByCalories,
  sortByCalories,
  sortByProtein,
  getUniqueCategories,
  getAllTags,
} from '../utils/search';

interface NutritionBrowserProps {
  onSelectItem: (id: string) => void;
}

export const NutritionBrowser: React.FC<NutritionBrowserProps> = ({
  onSelectItem,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'calories' | 'protein' | 'none'>('none');
  const [calorieRange, setCalorieRange] = useState<[number, number]>([0, 1000]);

  const categories = getUniqueCategories(nutritionItems);
  const allTags = getAllTags(nutritionItems);

  const filteredItems = useMemo(() => {
    let items = nutritionItems;

    // Apply search
    items = searchItems(items, searchQuery);

    // Apply category filter
    if (selectedCategory) {
      items = filterByCategory(items, selectedCategory);
    }

    // Apply calorie filter
    items = filterByCalories(items, calorieRange[0], calorieRange[1]);

    // Apply tag filters
    if (selectedTags.length > 0) {
      items = items.filter((item) =>
        selectedTags.some((tag) => item.tags.includes(tag))
      );
    }

    // Apply sorting
    if (sortBy === 'calories') {
      items = sortByCalories(items, 'asc');
    } else if (sortBy === 'protein') {
      items = sortByProtein(items, 'desc');
    }

    return items;
  }, [searchQuery, selectedCategory, selectedTags, calorieRange, sortBy]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedTags([]);
    setSortBy('none');
    setCalorieRange([0, 1000]);
  };

  const hasActiveFilters =
    searchQuery ||
    selectedCategory ||
    selectedTags.length > 0 ||
    sortBy !== 'none' ||
    calorieRange[0] > 0 ||
    calorieRange[1] < 1000;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Browse Foods</h1>
          <SearchBar onSearch={setSearchQuery} />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Sort */}
              <div className="mb-6">
                <label htmlFor="sort-select" className="text-sm font-semibold text-gray-900 mb-3 block">Sort By</label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="none">Relevance</option>
                  <option value="calories">Calories (Low to High)</option>
                  <option value="protein">Protein (High to Low)</option>
                </select>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Category</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory('')}
                    className={`block w-full text-left px-3 py-2 rounded ${
                      !selectedCategory
                        ? 'bg-blue-100 text-blue-900 font-semibold'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    All
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`block w-full text-left px-3 py-2 rounded ${
                        selectedCategory === category
                          ? 'bg-blue-100 text-blue-900 font-semibold'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Calorie Range */}
              <div className="mb-6">
                <label htmlFor="calorie-range" className="text-sm font-semibold text-gray-900 mb-3 block">
                  Calories: {calorieRange[0]} - {calorieRange[1]}
                </label>
                <input
                  id="calorie-range"
                  type="range"
                  min="0"
                  max="1000"
                  value={calorieRange[1]}
                  onChange={(e) =>
                    setCalorieRange([calorieRange[0], parseInt(e.target.value)])
                  }
                  className="w-full"
                />
              </div>

              {/* Tags */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Tags</h3>
                <div className="space-y-2">
                  {allTags.map((tag) => (
                    <label key={tag} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedTags.includes(tag)}
                        onChange={() => toggleTag(tag)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{tag}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Results Info */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing <span className="font-semibold">{filteredItems.length}</span> of{' '}
                <span className="font-semibold">{nutritionItems.length}</span> items
              </p>
            </div>

            {/* Grid */}
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onSelectItem(item.id)}
                    className="cursor-pointer"
                  >
                    <NutritionCard item={item} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">No items found</h3>
                <p className="mt-2 text-gray-600">
                  Try adjusting your filters or search terms
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-4 text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
