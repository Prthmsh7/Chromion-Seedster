import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Target,
  ArrowRight,
  BarChart3,
  PieChart,
  Activity,
  Star,
  Award,
  Briefcase
} from 'lucide-react';

interface InvestmentStreamProps {
  onBack: () => void;
}

const InvestmentStream: React.FC<InvestmentStreamProps> = ({ onBack }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const investmentOpportunities = [
    {
      id: '1',
      title: 'AI-Powered Analytics Platform',
      company: 'DataMind AI',
      category: 'AI/ML',
      fundingGoal: '$500K',
      currentFunding: '$325K',
      progress: 65,
      investors: 23,
      timeLeft: '15 days',
      description: 'Revolutionary AI platform transforming data into actionable insights.',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&dpr=2'
    },
    {
      id: '2',
      title: 'Blockchain Security Protocol',
      company: 'SecureChain Labs',
      category: 'Blockchain',
      fundingGoal: '$750K',
      currentFunding: '$480K',
      progress: 64,
      investors: 31,
      timeLeft: '22 days',
      description: 'Next-generation security protocol for blockchain applications.',
      image: 'https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&dpr=2'
    },
    {
      id: '3',
      title: 'FinTech Payment Solution',
      company: 'PayFlow Technologies',
      category: 'Fintech',
      fundingGoal: '$400K',
      currentFunding: '$280K',
      progress: 70,
      investors: 18,
      timeLeft: '8 days',
      description: 'Revolutionary payment processing with 60% reduced fees.',
      image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&dpr=2'
    }
  ];

  const stats = [
    { label: 'Total Investments', value: '$2.4M', icon: DollarSign, color: 'bg-success' },
    { label: 'Active Projects', value: '156', icon: TrendingUp, color: 'bg-primary' },
    { label: 'Success Rate', value: '94%', icon: Target, color: 'bg-secondary' },
    { label: 'Investors', value: '1.2K', icon: Users, color: 'bg-accent' }
  ];

  return (
    <div className={`min-h-screen bg-light-bg text-text-primary transition-all duration-1000 ${isLoaded ? 'fade-in' : 'opacity-0'}`}>
      {/* Header */}
      <header className="bg-white border-b border-light-border sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="p-3 bg-white border border-light-border rounded-xl hover:bg-light-hover transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <ArrowRight size={20} className="rotate-180" />
              </button>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                  <TrendingUp size={24} className="text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-text-primary">Investment Stream</h1>
                  <p className="text-text-secondary text-lg">Discover and invest in innovative projects</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={stat.label} className={`bg-white rounded-2xl border border-light-border p-6 hover:shadow-lg transition-all duration-300`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon size={24} className="text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-1">{stat.value}</h3>
              <p className="text-text-secondary text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Investment Opportunities */}
        <div className="bg-white rounded-2xl border border-light-border p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
                <Briefcase size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-text-primary">Investment Opportunities</h2>
                <p className="text-text-secondary">Discover promising projects seeking funding</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {investmentOpportunities.map((opportunity, index) => (
              <div key={opportunity.id} className="bg-white rounded-2xl border border-light-border overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className="relative">
                  <img 
                    src={opportunity.image}
                    alt={opportunity.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">
                      {opportunity.category}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 text-white">
                    <span className="text-sm font-medium bg-black/50 backdrop-blur-sm px-2 py-1 rounded">
                      {opportunity.timeLeft} left
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-text-primary mb-2">{opportunity.title}</h3>
                  <p className="text-text-secondary text-sm mb-2">{opportunity.company}</p>
                  <p className="text-text-muted text-sm mb-4">{opportunity.description}</p>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Goal:</span>
                      <span className="font-semibold text-text-primary">{opportunity.fundingGoal}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Raised:</span>
                      <span className="font-semibold text-success">{opportunity.currentFunding}</span>
                    </div>
                    <div className="w-full bg-light-border rounded-full h-2">
                      <div 
                        className="bg-success h-2 rounded-full transition-all duration-300"
                        style={{ width: `${opportunity.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">{opportunity.progress}% funded</span>
                      <span className="text-text-secondary">{opportunity.investors} investors</span>
                    </div>
                  </div>

                  <button className="w-full py-3 bg-primary text-white rounded-xl font-medium hover:scale-105 transition-all duration-300 shadow-lg">
                    Invest Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentStream;