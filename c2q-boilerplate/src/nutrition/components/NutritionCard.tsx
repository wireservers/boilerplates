import React from 'react';
import { NutritionItem } from '../data/mockData';

interface NutritionCardProps {
  item: NutritionItem;
  onClick?: () => void;
}

export const NutritionCard: React.FC<NutritionCardProps> = ({
  item,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
    >
      <div className="relative overflow-hidden bg-gray-200 h-48">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            {item.category}
          </span>
          <span className="text-lg font-bold text-gray-900">{item.calories}</span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">{item.name}</h3>
        <p className="text-sm text-gray-600 mb-3">{item.description}</p>
        
        <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
          <div className="bg-gray-50 p-2 rounded">
            <span className="text-gray-600">Protein</span>
            <p className="font-semibold text-gray-900">{item.nutrients.protein}g</p>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <span className="text-gray-600">Carbs</span>
            <p className="font-semibold text-gray-900">{item.nutrients.carbs}g</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {item.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
          {item.tags.length > 2 && (
            <span className="text-xs text-gray-500">+{item.tags.length - 2}</span>
          )}
        </div>
      </div>
    </div>
  );
};

interface NutrientBarProps {
  name: string;
  value: number;
  dailyValue: number;
  unit: string;
}

export const NutrientBar: React.FC<NutrientBarProps> = ({
  name,
  value,
  dailyValue,
  unit,
}) => {
  const percentage = Math.min((value / dailyValue) * 100, 100);

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-semibold text-gray-700">{name}</span>
        <span className="text-sm font-bold text-gray-900">
          {value}
          {unit} ({Math.round(percentage)}%)
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
          title={`${Math.round(percentage)}% of daily value`}
        />
      </div>
    </div>
  );
};

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Search foods...',
}) => {
  return (
    <div className="relative">
      <input
        type="text"
        onChange={(e) => onSearch(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <svg
        className="w-5 h-5 text-gray-400 absolute left-4 top-3.5"
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
    </div>
  );
};

interface FilterChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export const FilterChip: React.FC<FilterChipProps> = ({
  label,
  selected,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full font-medium transition-colors ${
        selected
          ? 'bg-blue-500 text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );
};

interface TagProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'success';
}

export const Tag: React.FC<TagProps> = ({ label, variant = 'primary' }) => {
  const variants = {
    primary: 'bg-blue-50 text-blue-700',
    secondary: 'bg-gray-100 text-gray-700',
    success: 'bg-green-50 text-green-700',
  };

  return (
    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${variants[variant]}`}>
      {label}
    </span>
  );
};
