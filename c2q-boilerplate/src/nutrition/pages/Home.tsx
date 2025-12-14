import React, { useState } from 'react';
import { nutritionItems, blogPosts } from '../data/mockData';
import { NutritionCard } from '../components/NutritionCard';

interface NutritionHomeProps {
  onSelectItem: (id: string) => void;
  onNavigate: (page: string) => void;
}

export const NutritionHome: React.FC<NutritionHomeProps> = ({
  onSelectItem,
  onNavigate,
}) => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(nutritionItems.map((item) => item.category)));
  const recentItems = nutritionItems.slice(-3).reverse();
  const featuredBlog = blogPosts[0];

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-4">
                Nourish Your Body
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Discover nutrient-rich meals and learn about healthy eating habits with our comprehensive nutrition guide.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => onNavigate('browser')}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition"
                >
                  Browse Foods
                </button>
                <button
                  onClick={() => onNavigate('blog')}
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-3 px-6 rounded-lg transition"
                >
                  Read Blog
                </button>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=500&fit=crop"
                alt="Healthy Food"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Browse Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onNavigate('browser')}
                onMouseEnter={() => setHoveredCategory(category)}
                onMouseLeave={() => setHoveredCategory(null)}
                className={`p-6 rounded-lg font-semibold transition-all text-center ${
                  hoveredCategory === category
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Items */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Additions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectItem(item.id)}
                className="cursor-pointer"
              >
                <NutritionCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Blog */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-linear-to-r from-blue-600 to-indigo-600">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <img
              src={featuredBlog.image}
              alt={featuredBlog.title}
              className="rounded-lg shadow-lg"
            />
            <div className="text-white">
              <span className="text-blue-200 font-semibold">Featured Article</span>
              <h2 className="text-3xl font-bold mb-4">{featuredBlog.title}</h2>
              <p className="text-blue-100 mb-6">{featuredBlog.excerpt}</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{featuredBlog.author}</p>
                  <p className="text-blue-200">{new Date(featuredBlog.date).toLocaleDateString()}</p>
                </div>
                <button
                  onClick={() => onNavigate('blog')}
                  className="bg-white text-blue-600 font-bold py-2 px-6 rounded-lg hover:bg-blue-50 transition"
                >
                  Read More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-blue-600">{nutritionItems.length}</p>
              <p className="text-gray-600 mt-2">Nutrition Items</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600">{categories.length}</p>
              <p className="text-gray-600 mt-2">Categories</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600">{blogPosts.length}</p>
              <p className="text-gray-600 mt-2">Blog Posts</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600">100%</p>
              <p className="text-gray-600 mt-2">Organic Data</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
