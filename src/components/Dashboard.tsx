import React, { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  DollarSign,
  Play,
  UserCheck,
  BarChart3,
  Target,
  Award,
  Heart,
  Eye,
  Crown,
  ShoppingCart
} from 'lucide-react';
import { Scene3D, Scene3DCanvas } from './3d/Scene3D';
import { Rings } from './3d/animations/Rings';
import { Loop } from './3d/animations/Loop';
import { Coins } from './3d/animations/Coins';
import { Core } from './3d/animations/Core';
import { Pulse } from './3d/animations/Pulse';
import { Pie } from './3d/animations/Pie';

interface DashboardProps {
  onNavigate: (page: 'dashboard' | 'marketplace' | 'investment-stream' | 'user-profile' | 'analytics' | 'about') => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const stats = [
    {
      title: 'Active Projects',
      value: '156',
      change: '+23.1%',
      trend: 'up',
      icon: Users,
      color: 'text-primary',
      bgColor: 'bg-accent',
      animation: Rings
    },
    {
      title: 'Marketplace Volume',
      value: '$2.4M',
      change: '+18.7%',
      trend: 'up',
      icon: ShoppingBag,
      color: 'text-primary',
      bgColor: 'bg-secondary',
      animation: Loop
    },
    {
      title: 'Total Investments',
      value: '$5.8M',
      change: '+15.3%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-primary',
      bgColor: 'bg-accent',
      animation: Coins
    },
    {
      title: 'Success Rate',
      value: '94.2%',
      change: '+2.1%',
      trend: 'up',
      icon: Activity,
      color: 'text-primary',
      bgColor: 'bg-secondary',
      animation: Core
    },
  ];

  const featuredProjects = [
    { 
      name: 'AI-Powered Analytics Platform', 
      founder: 'Sarah Johnson', 
      category: 'AI/ML',
      valuation: '$2.5M',
      shares: '15%',
      price: '$50K',
      status: 'Available',
      likes: 89,
      views: 1240,
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&dpr=2',
      animation: Pulse
    },
    { 
      name: 'Sustainable Energy Tracker', 
      founder: 'Michael Chen', 
      category: 'Cleantech',
      valuation: '$1.8M',
      shares: '20%',
      price: '$36K',
      status: 'Available',
      likes: 67,
      views: 890,
      image: 'https://images.pexels.com/photos/9800029/pexels-photo-9800029.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&dpr=2',
      animation: Pie
    },
    { 
      name: 'FinTech Payment Solution', 
      founder: 'Emma Davis', 
      category: 'Fintech',
      valuation: '$3.2M',
      shares: '12%',
      price: '$64K',
      status: 'Hot',
      likes: 124,
      views: 1560,
      image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&dpr=2',
      animation: Rings
    },
    { 
      name: 'Healthcare Data Platform', 
      founder: 'David Wilson', 
      category: 'Healthtech',
      valuation: '$2.1M',
      shares: '18%',
      price: '$42K',
      status: 'Available',
      likes: 78,
      views: 1120,
      image: 'https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&dpr=2',
      animation: Loop
    },
    { 
      name: 'EdTech Learning Assistant', 
      founder: 'Lisa Rodriguez', 
      category: 'Edtech',
      valuation: '$1.5M',
      shares: '25%',
      price: '$30K',
      status: 'New',
      likes: 45,
      views: 670,
      image: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&dpr=2',
      animation: Coins
    },
    { 
      name: 'Blockchain Security Protocol', 
      founder: 'James Park', 
      category: 'Blockchain',
      valuation: '$4.0M',
      shares: '10%',
      price: '$80K',
      status: 'Premium',
      likes: 156,
      views: 2340,
      image: 'https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&dpr=2',
      animation: Core
    },
  ];

  const marketplaceHighlights = [
    { title: 'New Project Listings', value: '12', description: 'This week', icon: ShoppingCart, color: 'text-primary' },
    { title: 'Active Investors', value: '2.4K', description: 'Monthly active', icon: Users, color: 'text-primary' },
    { title: 'Avg. Investment', value: '$45K', description: 'Per project', icon: DollarSign, color: 'text-primary' },
    { title: 'Success Stories', value: '89', description: 'Funded projects', icon: Award, color: 'text-primary' },
  ];

  const topLikedProjects = featuredProjects
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-light-bg text-text-primary fade-in relative">
      {/* 3D Canvas */}
      <Scene3DCanvas />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 relative z-20">
        {/* Header */}
        <div className="mb-8 lg:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-3 lg:mb-4">
            Welcome to <span className="text-primary">Seedster</span>
          </h1>
          <p className="text-text-secondary text-lg lg:text-xl max-w-3xl">
            Discover innovative projects, connect with founders, and invest in the future of technology.
          </p>
        </div>

        {/* Stats Grid with 3D Animations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12 lg:mb-16">
          {stats.map((stat, index) => (
            <div key={stat.title} className={`neo-card ${stat.bgColor} p-6 lg:p-8 stagger-item relative overflow-hidden`} style={{ animationDelay: `${index * 0.1}s` }}>
              {/* 3D Animation */}
              <div className="absolute top-2 right-2 w-16 h-16 opacity-20">
                <Scene3D>
                  <stat.animation />
                </Scene3D>
              </div>
              
              <div className="flex items-center justify-between mb-6 relative z-10">
                <div className={`p-4 rounded-xl bg-white border border-light-border`}>
                  <stat.icon className={`w-6 h-6 lg:w-8 h-8 ${stat.color}`} />
                </div>
                <div className={`flex items-center space-x-2 text-sm font-semibold px-3 py-1 rounded-full ${
                  stat.trend === 'up' ? 'text-success bg-white' : 'text-error bg-white'
                }`}>
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl lg:text-3xl font-bold text-text-primary mb-2">{stat.value}</h3>
                <p className="text-text-secondary font-medium">{stat.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Access to Marketplace */}
        <div className="neo-card bg-accent p-8 lg:p-10 mb-12 lg:mb-16 relative overflow-hidden">
          {/* 3D Animation Background */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
            <Scene3D>
              <Pulse />
            </Scene3D>
          </div>
          
          <div className="relative flex flex-col lg:flex-row lg:items-center justify-between space-y-6 lg:space-y-0 z-10">
            <div className="flex items-center space-x-6">
              <div className="neo-btn w-16 h-16 lg:w-20 h-20 bg-primary flex items-center justify-center">
                <ShoppingBag size={32} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold text-text-primary mb-2">IP Marketplace</h3>
                <p className="text-text-secondary text-lg">Browse and purchase innovative registered projects from talented developers</p>
              </div>
            </div>
            <button 
              onClick={() => onNavigate('marketplace')}
              className="neo-btn flex items-center justify-center space-x-3 px-8 py-4 bg-secondary text-white font-semibold hover:bg-secondary"
            >
              <ShoppingBag size={20} />
              <span>Browse Marketplace</span>
            </button>
          </div>
        </div>

        {/* Marketplace Highlights */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {marketplaceHighlights.map((highlight, index) => (
            <div key={highlight.title} className="neo-card bg-white p-6 text-center stagger-item relative overflow-hidden" style={{ animationDelay: `${index * 0.1}s` }}>
              {/* Small 3D Animation */}
              <div className="absolute top-1 right-1 w-8 h-8 opacity-20">
                <Scene3D>
                  <Rings />
                </Scene3D>
              </div>
              
              <div className={`w-12 h-12 bg-accent rounded-xl flex items-center justify-center mx-auto mb-4 border border-light-border relative z-10`}>
                <highlight.icon size={24} className={highlight.color} />
              </div>
              <div className="text-2xl font-bold text-primary mb-2 relative z-10">{highlight.value}</div>
              <div className="text-sm font-medium text-text-primary mb-1 relative z-10">{highlight.title}</div>
              <div className="text-xs text-text-muted relative z-10">{highlight.description}</div>
            </div>
          ))}
        </div>

        {/* Top Liked Projects Section */}
        <div className="neo-card bg-white p-8 lg:p-10 mb-12 relative overflow-hidden">
          {/* 3D Animation Background */}
          <div className="absolute top-4 right-4 w-24 h-24 opacity-10">
            <Scene3D>
              <Pie />
            </Scene3D>
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 lg:mb-10 relative z-10">
            <div className="flex items-center space-x-6 mb-6 lg:mb-0">
              <div className="neo-btn w-16 h-16 bg-error flex items-center justify-center">
                <Heart size={32} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-2">Most Liked Projects</h2>
                <p className="text-text-secondary text-lg">Community favorites in the marketplace</p>
              </div>
            </div>
            <button 
              onClick={() => onNavigate('marketplace')}
              className="neo-btn flex items-center justify-center space-x-3 px-8 py-4 bg-secondary text-white font-semibold hover:bg-secondary"
            >
              <Crown size={20} />
              <span>View Leaderboard</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {topLikedProjects.map((project, index) => (
              <div 
                key={index} 
                className="neo-card bg-white overflow-hidden cursor-pointer group stagger-item relative" 
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => onNavigate('marketplace')}
              >
                {/* Rank Badge */}
                <div className={`absolute top-3 left-3 z-10 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                  index === 0 ? 'bg-secondary' :
                  index === 1 ? 'bg-text-muted' :
                  'bg-warning'
                }`}>
                  {index + 1}
                </div>

                {/* 3D Animation in corner */}
                <div className="absolute top-2 right-2 w-12 h-12 opacity-30 z-10">
                  <Scene3D>
                    <project.animation />
                  </Scene3D>
                </div>

                <div className="relative">
                  <img 
                    src={project.image} 
                    alt={project.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.status === 'Hot' ? 'bg-error text-white' :
                      project.status === 'New' ? 'bg-success text-white' :
                      project.status === 'Premium' ? 'bg-primary text-white' :
                      'bg-accent text-text-primary'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 text-white">
                    <span className="text-sm font-medium bg-black/50 backdrop-blur-sm px-2 py-1 rounded">
                      {project.category}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 flex items-center space-x-2">
                    <div className="bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                      <Eye size={10} />
                      <span>{project.views}</span>
                    </div>
                    <div className="bg-error/90 backdrop-blur-sm text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                      <Heart size={10} className="fill-current" />
                      <span>{project.likes}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h4 className="font-semibold text-lg text-text-primary mb-2">
                    {project.name}
                  </h4>
                  <p className="text-text-secondary text-sm mb-4">by {project.founder}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Valuation:</span>
                      <span className="font-semibold text-text-primary">{project.valuation}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Likes:</span>
                      <span className="font-semibold text-error flex items-center space-x-1">
                        <Heart size={12} className="fill-current" />
                        <span>{project.likes}</span>
                      </span>
                    </div>
                  </div>

                  <button className="neo-btn w-full py-3 bg-secondary text-white font-medium hover:bg-secondary">
                    View in Marketplace
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Projects */}
        <div className="neo-card bg-white p-8 lg:p-10 relative overflow-hidden">
          {/* 3D Animation Background */}
          <div className="absolute top-4 right-4 w-24 h-24 opacity-10">
            <Scene3D>
              <Core />
            </Scene3D>
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 lg:mb-10 relative z-10">
            <div className="flex items-center space-x-6 mb-6 lg:mb-0">
              <div className="neo-btn w-16 h-16 bg-secondary flex items-center justify-center">
                <Star size={32} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-2">Featured Projects</h2>
                <p className="text-text-secondary text-lg">Top-rated projects available for investment</p>
              </div>
            </div>
            <button 
              onClick={() => onNavigate('marketplace')}
              className="neo-btn flex items-center justify-center space-x-3 px-8 py-4 bg-secondary text-white font-semibold hover:bg-secondary"
            >
              <TrendingUp size={20} />
              <span>View All Projects</span>
            </button>
          </div>
          
          {/* Project Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 relative z-10">
            {featuredProjects.map((project, index) => (
              <div 
                key={index} 
                className="neo-card bg-white overflow-hidden cursor-pointer group stagger-item relative" 
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => onNavigate('marketplace')}
              >
                {/* 3D Animation in corner */}
                <div className="absolute top-2 right-2 w-12 h-12 opacity-30 z-10">
                  <Scene3D>
                    <project.animation />
                  </Scene3D>
                </div>

                <div className="relative">
                  <img 
                    src={project.image} 
                    alt={project.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.status === 'Hot' ? 'bg-error text-white' :
                      project.status === 'New' ? 'bg-success text-white' :
                      project.status === 'Premium' ? 'bg-primary text-white' :
                      'bg-accent text-text-primary'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 text-white">
                    <span className="text-sm font-medium bg-black/50 backdrop-blur-sm px-2 py-1 rounded">
                      {project.category}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 flex items-center space-x-2">
                    <div className="bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                      <Eye size={10} />
                      <span>{project.views}</span>
                    </div>
                    <div className="bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                      <Heart size={10} className={project.likes > 100 ? 'fill-current text-error' : ''} />
                      <span>{project.likes}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h4 className="font-semibold text-lg text-text-primary mb-2">
                    {project.name}
                  </h4>
                  <p className="text-text-secondary text-sm mb-4">by {project.founder}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Valuation:</span>
                      <span className="font-semibold text-text-primary">{project.valuation}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Shares:</span>
                      <span className="font-semibold text-primary">{project.shares}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Min. Investment:</span>
                      <span className="font-semibold text-secondary">{project.price}</span>
                    </div>
                  </div>

                  <button className="neo-btn w-full py-3 bg-secondary text-white font-medium hover:bg-secondary">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <button 
            onClick={() => onNavigate('user-profile')}
            className="neo-card bg-white p-8 text-left group relative overflow-hidden"
          >
            {/* 3D Animation */}
            <div className="absolute top-2 right-2 w-12 h-12 opacity-20">
              <Scene3D>
                <Rings />
              </Scene3D>
            </div>
            <UserCheck className="w-10 h-10 text-primary mb-4 relative z-10" />
            <h4 className="font-semibold text-xl text-text-primary mb-3 relative z-10">Register Your Project</h4>
            <p className="text-text-secondary relative z-10">Protect your IP and showcase your innovation to investors</p>
          </button>
          
          <button 
            onClick={() => onNavigate('marketplace')}
            className="neo-card bg-white p-8 text-left group relative overflow-hidden"
          >
            {/* 3D Animation */}
            <div className="absolute top-2 right-2 w-12 h-12 opacity-20">
              <Scene3D>
                <Loop />
              </Scene3D>
            </div>
            <ShoppingBag className="w-10 h-10 text-secondary mb-4 relative z-10" />
            <h4 className="font-semibold text-xl text-text-primary mb-3 relative z-10">Explore Marketplace</h4>
            <p className="text-text-secondary relative z-10">Discover and invest in promising registered projects</p>
          </button>
          
          <button 
            onClick={() => onNavigate('analytics')}
            className="neo-card bg-white p-8 text-left group relative overflow-hidden"
          >
            {/* 3D Animation */}
            <div className="absolute top-2 right-2 w-12 h-12 opacity-20">
              <Scene3D>
                <Pulse />
              </Scene3D>
            </div>
            <BarChart3 className="w-10 h-10 text-accent mb-4 relative z-10" />
            <h4 className="font-semibold text-xl text-text-primary mb-3 relative z-10">View Analytics</h4>
            <p className="text-text-secondary relative z-10">Track performance and market insights</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;