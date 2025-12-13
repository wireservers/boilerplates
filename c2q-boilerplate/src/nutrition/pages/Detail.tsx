import React from 'react';
import { nutritionItems } from '../data/mockData';
import { NutrientBar } from '../components/NutritionCard';

interface NutritionDetailProps {
  itemId: string;
  onBack: () => void;
}

export const NutritionDetail: React.FC<NutritionDetailProps> = ({
  itemId,
  onBack,
}) => {
  const item = nutritionItems.find((i) => i.id === itemId);

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Item not found</h2>
          <button
            onClick={onBack}
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  const nutrientData = [
    { name: 'Protein', value: item.nutrients.protein, unit: 'g', dailyValue: 50 },
    { name: 'Carbohydrates', value: item.nutrients.carbs, unit: 'g', dailyValue: 300 },
    { name: 'Fat', value: item.nutrients.fat, unit: 'g', dailyValue: 78 },
    { name: 'Fiber', value: item.nutrients.fiber, unit: 'g', dailyValue: 25 },
    { name: 'Sugar', value: item.nutrients.sugar, unit: 'g', dailyValue: 50 },
    { name: 'Sodium', value: item.nutrients.sodium, unit: 'mg', dailyValue: 2300 },
    { name: 'Calcium', value: item.nutrients.calcium, unit: 'mg', dailyValue: 1300 },
    { name: 'Iron', value: item.nutrients.iron, unit: 'mg', dailyValue: 18 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={onBack}
            className="text-blue-600 hover:text-blue-700 font-semibold mb-4 flex items-center gap-2"
          >
            <span>←</span> Back
          </button>
          <h1 className="text-4xl font-bold text-gray-900">{item.name}</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2">
            {/* Image */}
            <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-96 object-cover"
              />
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                {item.description}
              </p>
              <div className="flex items-center gap-2 text-gray-600">
                <span className="font-semibold">Category:</span>
                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">
                  {item.category}
                </span>
              </div>
            </div>

            {/* Ingredients */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Ingredients</h2>
              <div className="space-y-3">
                {item.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-center justify-between pb-3 border-b border-gray-200 last:border-b-0">
                    <span className="text-gray-700 font-medium">{ingredient.name}</span>
                    <span className="text-gray-600">
                      {ingredient.quantity} {ingredient.unit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Serving Info */}
            <div className="bg-linear-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white mb-8">
              <p className="text-blue-100 text-sm mb-2">Serving Size</p>
              <p className="text-3xl font-bold mb-4">{item.servingSize}</p>
              <div className="border-t border-blue-400 pt-4">
                <p className="text-blue-100 text-sm mb-1">Calories per serving</p>
                <p className="text-4xl font-bold">{item.calories}</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="font-bold text-gray-900 mb-4">Macros</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Protein</span>
                  <span className="font-bold text-gray-900">{item.nutrients.protein}g</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Carbs</span>
                  <span className="font-bold text-gray-900">{item.nutrients.carbs}g</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Fat</span>
                  <span className="font-bold text-gray-900">{item.nutrients.fat}g</span>
                </div>
              </div>
            </div>

            {/* Tags */}
            {item.tags.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-bold text-gray-900 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Full Nutrients Table */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Complete Nutrition Facts</h2>
          <div className="space-y-4">
            {nutrientData.map((nutrient) => (
              <NutrientBar
                key={nutrient.name}
                name={nutrient.name}
                value={nutrient.value}
                dailyValue={nutrient.dailyValue}
                unit={nutrient.unit}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
