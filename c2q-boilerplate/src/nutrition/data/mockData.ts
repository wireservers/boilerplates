export interface Nutrient {
  id: string;
  name: string;
  unit: string;
  dailyValue?: number;
}

export interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
}

export interface NutritionItem {
  id: string;
  name: string;
  category: string;
  servingSize: string;
  calories: number;
  ingredients: Ingredient[];
  nutrients: {
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sugar: number;
    sodium: number;
    calcium: number;
    iron: number;
  };
  image: string;
  description: string;
  tags: string[];
  dateAdded: string;
}

export const nutrients: Nutrient[] = [
  { id: '1', name: 'Protein', unit: 'g', dailyValue: 50 },
  { id: '2', name: 'Carbohydrates', unit: 'g', dailyValue: 300 },
  { id: '3', name: 'Fat', unit: 'g', dailyValue: 78 },
  { id: '4', name: 'Fiber', unit: 'g', dailyValue: 25 },
  { id: '5', name: 'Sugar', unit: 'g', dailyValue: 50 },
  { id: '6', name: 'Sodium', unit: 'mg', dailyValue: 2300 },
  { id: '7', name: 'Calcium', unit: 'mg', dailyValue: 1300 },
  { id: '8', name: 'Iron', unit: 'mg', dailyValue: 18 },
];

export const ingredients: Ingredient[] = [
  { id: '1', name: 'Chicken Breast', quantity: 150, unit: 'g' },
  { id: '2', name: 'Broccoli', quantity: 200, unit: 'g' },
  { id: '3', name: 'Brown Rice', quantity: 150, unit: 'g' },
  { id: '4', name: 'Olive Oil', quantity: 1, unit: 'tbsp' },
  { id: '5', name: 'Salmon', quantity: 150, unit: 'g' },
  { id: '6', name: 'Sweet Potato', quantity: 200, unit: 'g' },
  { id: '7', name: 'Almonds', quantity: 30, unit: 'g' },
  { id: '8', name: 'Spinach', quantity: 100, unit: 'g' },
];

export const nutritionItems: NutritionItem[] = [
  {
    id: '1',
    name: 'Grilled Chicken & Broccoli Bowl',
    category: 'Main Course',
    servingSize: '350g',
    calories: 450,
    ingredients: [
      { id: '1', name: 'Chicken Breast', quantity: 150, unit: 'g' },
      { id: '2', name: 'Broccoli', quantity: 200, unit: 'g' },
      { id: '4', name: 'Olive Oil', quantity: 1, unit: 'tbsp' },
    ],
    nutrients: {
      protein: 45,
      carbs: 30,
      fat: 12,
      fiber: 6,
      sugar: 2,
      sodium: 450,
      calcium: 120,
      iron: 2.5,
    },
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
    description: 'Lean protein with nutrient-dense vegetables',
    tags: ['high-protein', 'low-carb', 'gluten-free', 'quick'],
    dateAdded: '2024-01-15',
  },
  {
    id: '2',
    name: 'Salmon & Sweet Potato',
    category: 'Main Course',
    servingSize: '400g',
    calories: 520,
    ingredients: [
      { id: '5', name: 'Salmon', quantity: 150, unit: 'g' },
      { id: '6', name: 'Sweet Potato', quantity: 200, unit: 'g' },
      { id: '4', name: 'Olive Oil', quantity: 1, unit: 'tbsp' },
    ],
    nutrients: {
      protein: 35,
      carbs: 45,
      fat: 18,
      fiber: 5,
      sugar: 8,
      sodium: 380,
      calcium: 45,
      iron: 2.8,
    },
    image: 'https://images.unsplash.com/photo-1580959375944-abd7e991f971?w=400&h=300&fit=crop',
    description: 'Rich in omega-3 fatty acids with complex carbs',
    tags: ['omega-3', 'balanced', 'gluten-free', 'heart-healthy'],
    dateAdded: '2024-01-20',
  },
  {
    id: '3',
    name: 'Greek Salad with Grilled Chicken',
    category: 'Salad',
    servingSize: '300g',
    calories: 350,
    ingredients: [
      { id: '1', name: 'Chicken Breast', quantity: 100, unit: 'g' },
      { id: '8', name: 'Spinach', quantity: 150, unit: 'g' },
      { id: '4', name: 'Olive Oil', quantity: 1, unit: 'tbsp' },
    ],
    nutrients: {
      protein: 40,
      carbs: 15,
      fat: 14,
      fiber: 4,
      sugar: 3,
      sodium: 520,
      calcium: 200,
      iron: 3.2,
    },
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop',
    description: 'Fresh greens with lean protein',
    tags: ['salad', 'low-cal', 'vegetarian-option', 'fresh'],
    dateAdded: '2024-01-25',
  },
  {
    id: '4',
    name: 'Almond & Berry Smoothie Bowl',
    category: 'Breakfast',
    servingSize: '300g',
    calories: 380,
    ingredients: [
      { id: '7', name: 'Almonds', quantity: 30, unit: 'g' },
      { id: '8', name: 'Spinach', quantity: 50, unit: 'g' },
    ],
    nutrients: {
      protein: 12,
      carbs: 35,
      fat: 16,
      fiber: 7,
      sugar: 18,
      sodium: 120,
      calcium: 250,
      iron: 2.1,
    },
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=300&fit=crop',
    description: 'Nutrient-packed breakfast bowl',
    tags: ['breakfast', 'vegan', 'high-fiber', 'antioxidants'],
    dateAdded: '2024-02-01',
  },
  {
    id: '5',
    name: 'Quinoa & Roasted Vegetables',
    category: 'Main Course',
    servingSize: '350g',
    calories: 420,
    ingredients: [
      { id: '3', name: 'Brown Rice', quantity: 150, unit: 'g' },
      { id: '2', name: 'Broccoli', quantity: 150, unit: 'g' },
      { id: '4', name: 'Olive Oil', quantity: 1, unit: 'tbsp' },
    ],
    nutrients: {
      protein: 15,
      carbs: 52,
      fat: 12,
      fiber: 8,
      sugar: 4,
      sodium: 280,
      calcium: 80,
      iron: 3.5,
    },
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
    description: 'Complete plant-based meal',
    tags: ['vegan', 'high-fiber', 'gluten-free', 'sustainable'],
    dateAdded: '2024-02-05',
  },
];

export const blogPosts = [
  {
    id: '1',
    title: 'Understanding Macronutrients: A Guide to Balanced Eating',
    excerpt:
      'Learn about proteins, carbohydrates, and fats, and how to balance them for optimal health.',
    content: `Macronutrients are the nutrients your body needs in large amounts. They consist of proteins, carbohydrates, and fats.

Proteins are essential for building and repairing tissues. They also help create enzymes and hormones. Good sources include chicken, fish, legumes, and nuts.

Carbohydrates provide energy for your body and brain. Choose complex carbs like whole grains, vegetables, and fruits for sustained energy.

Fats are crucial for hormone production and nutrient absorption. Focus on healthy fats from olive oil, avocados, and fatty fish.

The ideal balance depends on your goals and lifestyle. Generally, aim for 40% carbs, 30% protein, and 30% fat.`,
    author: 'Dr. Jane Smith',
    date: '2024-02-10',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=400&fit=crop',
    tags: ['nutrition', 'macros', 'health'],
  },
  {
    id: '2',
    title: 'Plant-Based Protein: Everything You Need to Know',
    excerpt:
      'Discover how to get enough protein on a vegetarian or vegan diet.',
    content: `Plant-based proteins are excellent alternatives to animal proteins. They provide all the amino acids your body needs.

Legumes like chickpeas, lentils, and beans are protein powerhouses. A cup of cooked lentils contains about 18g of protein.

Nuts and seeds, including almonds, chia, and hemp seeds, are great protein sources. They also provide healthy fats and fiber.

Whole grains like quinoa, amaranth, and buckwheat are complete proteins, meaning they contain all amino acids.

Combining different plant proteins throughout the day ensures you get all amino acids. For example, rice and beans together form a complete protein.`,
    author: 'John Doe',
    date: '2024-02-12',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=400&fit=crop',
    tags: ['vegan', 'protein', 'plant-based'],
  },
  {
    id: '3',
    title: '5 Foods That Boost Your Energy Naturally',
    excerpt:
      'Say goodbye to energy crashes with these nutrient-dense foods.',
    content: `Maintaining steady energy throughout the day doesn't require caffeine or sugar. These 5 foods provide sustained energy.

1. Oats: Rich in complex carbs and fiber, oats provide steady glucose release for sustained energy.

2. Salmon: Packed with omega-3s and protein, salmon stabilizes blood sugar and supports brain function.

3. Berries: High in antioxidants and fiber, berries prevent energy crashes while boosting focus.

4. Nuts: A handful of almonds or walnuts provides healthy fats and protein for lasting energy.

5. Dark Leafy Greens: Spinach and kale contain iron and magnesium, essential for energy production.

Combine these foods with water and regular exercise for optimal energy levels.`,
    author: 'Sarah Johnson',
    date: '2024-02-14',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=400&fit=crop',
    tags: ['energy', 'foods', 'health-tips'],
  },
];
