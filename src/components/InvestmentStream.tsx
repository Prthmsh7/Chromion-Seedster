import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Target,
  Play,
  Filter,
  Search
} from 'lucide-react';

interface InvestmentStreamProps {
  onBack: () => void;
}

const InvestmentStream: React.FC<InvestmentStreamProps> = ({ onBack }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Investments', icon: TrendingUp },
    { id: 'investment', label: 'Investment Opportunities', icon: DollarSign },
    { id: 'analysis', label: 'Market Analysis', icon: Target },
    { id: 'education', label: 'Investment Education', icon: Users }
  ];

  // Page load animation
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`min-h-screen bg-light-bg text-text-primary transition-all duration-1000 ${isLoaded ? 'fade-in' : 'opacity-0'}`}>
      {/* Header - Responsive design */}
      <header className="bg-white border-b border-light-border sticky top-0 z-50 slide-in-left shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-4 sm:py-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <button
                onClick={onBack}
                className="p-3 bg-white border border-light-border rounded-xl hover:bg-light-hover transition-all duration-300 shadow-sm hover:shadow-md"
              >
                ←
              </button>
              <div className="w-8 h-8 sm:w-10 h-10 lg:w-12 h-12 bg-primary rounded-lg lg:rounded-xl flex items-center justify-center pulse-glow morph-shape">
                <TrendingUp size={16} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary">Investment Stream</h1>
                <p className="text-text-secondary text-sm sm:text-base lg:text-lg">Discover investment opportunities through video content</p>
              </div>
            </div>
            
            {/* Search and Filters - Responsive layout */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 lg:space-x-6">
              <div className="relative flex-1 sm:flex-initial">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 sm:h-5 w-5 text-text-muted" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search investments..."
                  className="pl-10 sm:pl-12 pr-4 sm:pr-6 py-2 sm:py-3 bg-white border border-light-border rounded-lg sm:rounded-xl text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/30 text-text-primary placeholder-text-muted w-full sm:w-64 lg:w-80 shadow-sm"
                />
              </div>
              
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Filter size={16} className="sm:w-5 sm:h-5 text-text-muted flex-shrink-0" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-white border border-light-border rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/30 text-text-primary flex-1 sm:min-w-[180px] lg:min-w-[200px] shadow-sm"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id} className="bg-white">
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Play size={32} className="text-white ml-1" />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-4">Investment Stream Coming Soon</h2>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            We're working on bringing you high-quality investment content and opportunities through our video streaming platform.
          </p>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:scale-105 transition-all duration-300"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvestmentStream;