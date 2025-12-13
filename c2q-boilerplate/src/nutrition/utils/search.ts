import { NutritionItem } from '../data/mockData';

export const searchItems = (
  items: NutritionItem[],
  query: string
): NutritionItem[] => {
  if (!query.trim()) return items;
  
  const lowerQuery = query.toLowerCase();
  return items.filter(
    (item) =>
      item.name.toLowerCase().includes(lowerQuery) ||
      item.description.toLowerCase().includes(lowerQuery) ||
      item.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
};

export const filterByCategory = (
  items: NutritionItem[],
  category: string
): NutritionItem[] => {
  if (!category) return items;
  return items.filter((item) => item.category === category);
};

export const filterByTags = (
  items: NutritionItem[],
  tags: string[]
): NutritionItem[] => {
  if (tags.length === 0) return items;
  return items.filter((item) =>
    tags.every((tag) => item.tags.includes(tag))
  );
};

export const filterByCalories = (
  items: NutritionItem[],
  minCalories: number,
  maxCalories: number
): NutritionItem[] => {
  return items.filter(
    (item) => item.calories >= minCalories && item.calories <= maxCalories
  );
};

export const filterByProtein = (
  items: NutritionItem[],
  minProtein: number
): NutritionItem[] => {
  return items.filter((item) => item.nutrients.protein >= minProtein);
};

export const sortByCalories = (
  items: NutritionItem[],
  order: 'asc' | 'desc' = 'asc'
): NutritionItem[] => {
  return [...items].sort((a, b) =>
    order === 'asc'
      ? a.calories - b.calories
      : b.calories - a.calories
  );
};

export const sortByProtein = (
  items: NutritionItem[],
  order: 'asc' | 'desc' = 'desc'
): NutritionItem[] => {
  return [...items].sort((a, b) =>
    order === 'asc'
      ? a.nutrients.protein - b.nutrients.protein
      : b.nutrients.protein - a.nutrients.protein
  );
};

export const getUniqueCategories = (items: NutritionItem[]): string[] => {
  return Array.from(new Set(items.map((item) => item.category)));
};

export const getAllTags = (items: NutritionItem[]): string[] => {
  const tagSet = new Set<string>();
  items.forEach((item) => item.tags.forEach((tag) => tagSet.add(tag)));
  return Array.from(tagSet).sort();
};

export const formatNutrientValue = (
  value: number,
  unit: string
): string => {
  return `${value.toFixed(1)}${unit}`;
};

export const calculateNutrientPercentage = (
  value: number,
  dailyValue: number
): number => {
  return Math.round((value / dailyValue) * 100);
};
