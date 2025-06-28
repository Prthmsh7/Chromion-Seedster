import React, { useState, useEffect } from 'react';
import { 
  Gavel, 
  Clock, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Crown, 
  Zap, 
  Timer,
  Heart,
  Eye,
  Award,
  Sparkles,
  ArrowUpRight,
  Target,
  Flame,
  Hexagon,
  Shuffle
} from 'lucide-react';
import { demoProjects } from '../data/demoProjects';

interface AuctionItem {
  id: string;
  title: string;
  description: string;
  founder_name: string;
  category: string;
  thumbnail_url: string;
  current_bid: number;
  min_bid: number;
  bid_count: number;
  time_remaining: number;
  likes_count: number;
  views_count: number;
  is_featured: boolean;
  highest_bidder?: string;
  nounId: number;
}

interface AuctionSystemProps {
  onBid: (itemId: string, amount: number) => void;
  onViewItem: (item: any) => void;
}

const AuctionSystem: React.FC<AuctionSystemProps> = ({ onBid, onViewItem }) => {
  const [currentAuction, setCurrentAuction] = useState<AuctionItem | null>(null);
  const [upcomingAuctions, setUpcomingAuctions] = useState<AuctionItem[]>([]);
  const [pastAuctions, setPastAuctions] = useState<AuctionItem[]>([]);
  const [bidAmount, setBidAmount] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [nounSvg, setNounSvg] = useState<React.ReactNode | null>(null);

  // Mock auction data - in real app this would come from your backend
  useEffect(() => {
    // Get top projects by likes for auctions
    const topProjects = [...demoProjects].sort((a, b) => b.likes_count - a.likes_count);
    
    const mockCurrentAuction: AuctionItem = {
      id: topProjects[0].id,
      title: topProjects[0].title,
      description: topProjects[0].description,
      founder_name: topProjects[0].founder_name,
      category: topProjects[0].category,
      thumbnail_url: topProjects[0].thumbnail_url,
      current_bid: 10,
      min_bid: 10,
      bid_count: 23,
      time_remaining: 3600, // 1 hour in seconds
      likes_count: topProjects[0].likes_count,
      views_count: topProjects[0].views_count,
      is_featured: true,
      highest_bidder: 'investor_xyz',
      nounId: 1
    };

    const mockUpcoming: AuctionItem[] = [
      {
        id: topProjects[1].id,
        title: topProjects[1].title,
        description: topProjects[1].description,
        founder_name: topProjects[1].founder_name,
        category: topProjects[1].category,
        thumbnail_url: topProjects[1].thumbnail_url,
        current_bid: 0,
        min_bid: 10,
        bid_count: 0,
        time_remaining: 86400, // 24 hours
        likes_count: topProjects[1].likes_count,
        views_count: topProjects[1].views_count,
        is_featured: false,
        nounId: 2
      },
      {
        id: topProjects[2].id,
        title: topProjects[2].title,
        description: topProjects[2].description,
        founder_name: topProjects[2].founder_name,
        category: topProjects[2].category,
        thumbnail_url: topProjects[2].thumbnail_url,
        current_bid: 0,
        min_bid: 10,
        bid_count: 0,
        time_remaining: 172800, // 48 hours
        likes_count: topProjects[2].likes_count,
        views_count: topProjects[2].views_count,
        is_featured: true,
        nounId: 3
      }
    ];

    const mockPast: AuctionItem[] = [
      {
        id: topProjects[3].id,
        title: topProjects[3].title,
        description: topProjects[3].description,
        founder_name: topProjects[3].founder_name,
        category: topProjects[3].category,
        thumbnail_url: topProjects[3].thumbnail_url,
        current_bid: 15,
        min_bid: 10,
        bid_count: 8,
        time_remaining: 0,
        likes_count: topProjects[3].likes_count,
        views_count: topProjects[3].views_count,
        is_featured: false,
        highest_bidder: 'investor_abc',
        nounId: 0
      },
      {
        id: topProjects[4].id,
        title: topProjects[4].title,
        description: topProjects[4].description,
        founder_name: topProjects[4].founder_name,
        category: topProjects[4].category,
        thumbnail_url: topProjects[4].thumbnail_url,
        current_bid: 12,
        min_bid: 10,
        bid_count: 5,
        time_remaining: 0,
        likes_count: topProjects[4].likes_count,
        views_count: topProjects[4].views_count,
        is_featured: true,
        highest_bidder: 'investor_def',
        nounId: -1
      }
    ];

    setCurrentAuction(mockCurrentAuction);
    setUpcomingAuctions(mockUpcoming);
    setPastAuctions(mockPast);
    setTimeLeft(mockCurrentAuction.time_remaining);
    generateNounSvg(mockCurrentAuction.nounId);
  }, []);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Auction ended - in real app, trigger new auction
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    }
    return `${minutes}m ${secs}s`;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleBid = () => {
    if (!currentAuction || !bidAmount) return;
    
    const amount = parseFloat(bidAmount);
    if (amount <= currentAuction.current_bid) {
      alert('Bid must be higher than current bid');
      return;
    }

    onBid(currentAuction.id, amount);
    setBidAmount('');
  };

  const getMinimumBid = () => {
    if (!currentAuction) return 0;
    return currentAuction.current_bid > 0 
      ? currentAuction.current_bid + 1 
      : currentAuction.min_bid;
  };

  // Generate random Noun SVG (simplified for demo)
  const generateNounSvg = (nounId: number) => {
    const colors = ['#D5D7E1', '#E1D7D5', '#D5E1D7', '#E1D5E1', '#D7E1D5'];
    const bgColor = colors[Math.abs(nounId) % colors.length];
    
    setNounSvg(
      <div className="w-full h-full bg-white rounded-2xl overflow-hidden">
        <div style={{ backgroundColor: bgColor }} className="w-full h-full flex items-center justify-center">
          <Hexagon size={64} className="text-primary" />
        </div>
      </div>
    );
  };

  if (!currentAuction) return null;

  return (
    <div className="space-y-8">
      {/* Current Auction - Hero Section */}
      <div className="bg-accent rounded-3xl border border-light-border p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full -translate-y-32 translate-x-32"></div>
        
        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center shadow-lg">
              <Gavel size={32} className="text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-text-primary">Nouns-Style Auction</h2>
              <p className="text-text-secondary text-lg">Today's featured innovation share</p>
            </div>
            <div className="ml-auto flex items-center space-x-3">
              <div className="bg-error text-white px-4 py-2 rounded-full text-sm font-bold flex items-center space-x-2 animate-pulse">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>LIVE</span>
              </div>
              {currentAuction.is_featured && (
                <div className="bg-secondary text-white px-4 py-2 rounded-full text-sm font-bold flex items-center space-x-2">
                  <Crown size={16} />
                  <span>FEATURED</span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Auction Item */}
            <div className="space-y-6">
              <div className="flex items-center space-x-6">
                <div className="w-32 h-32 relative">
                  {nounSvg}
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    #{currentAuction.nounId}
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-text-primary mb-2">Noun #{currentAuction.nounId}</h3>
                  <p className="text-text-secondary mb-2">Representing: <span className="font-semibold">{currentAuction.title}</span></p>
                  <div className="flex items-center space-x-2 text-text-muted text-sm">
                    <span>by {currentAuction.founder_name}</span>
                    <span>•</span>
                    <span>{currentAuction.category}</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <img 
                  src={currentAuction.thumbnail_url}
                  alt={currentAuction.title}
                  className="w-full h-64 object-cover rounded-2xl shadow-lg"
                />
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                  {currentAuction.category}
                </div>
                <div className="absolute bottom-4 right-4 flex items-center space-x-2">
                  <div className="bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded text-sm flex items-center space-x-1">
                    <Eye size={12} />
                    <span>{currentAuction.views_count}</span>
                  </div>
                  <div className="bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded text-sm flex items-center space-x-1">
                    <Heart size={12} className="fill-current text-error" />
                    <span>{currentAuction.likes_count}</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-text-secondary mb-4">{currentAuction.description}</p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users size={16} className="text-primary" />
                    </div>
                    <span className="text-text-primary font-medium">{currentAuction.founder_name}</span>
                  </div>
                  <button
                    onClick={() => onViewItem(currentAuction)}
                    className="text-primary hover:text-primary-dark font-medium transition-colors duration-300"
                  >
                    View Details →
                  </button>
                </div>
              </div>
            </div>

            {/* Bidding Section */}
            <div className="space-y-6">
              {/* Timer */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-bold text-text-primary">Time Remaining</h4>
                  <Timer className="text-error" size={24} />
                </div>
                <div className="text-4xl font-bold text-error mb-2">
                  {formatTime(timeLeft)}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-error h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.max(10, (timeLeft / currentAuction.time_remaining) * 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Current Bid */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-bold text-text-primary">Current Bid</h4>
                  <TrendingUp className="text-success" size={24} />
                </div>
                <div className="text-4xl font-bold text-success mb-2">
                  {formatCurrency(currentAuction.current_bid)}
                </div>
                <div className="flex items-center justify-between text-sm text-text-muted">
                  <span>{currentAuction.bid_count} bids</span>
                  {currentAuction.highest_bidder && (
                    <span>by {currentAuction.highest_bidder}</span>
                  )}
                </div>
              </div>

              {/* Place Bid */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h4 className="text-lg font-bold text-text-primary mb-4">Place Your Bid</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Bid Amount (minimum: {formatCurrency(getMinimumBid())})
                    </label>
                    <input
                      type="number"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      placeholder={getMinimumBid().toString()}
                      min={getMinimumBid()}
                      className="w-full px-4 py-3 border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary font-mono text-lg"
                    />
                  </div>
                  <button
                    onClick={handleBid}
                    disabled={!bidAmount || parseFloat(bidAmount) < getMinimumBid() || timeLeft <= 0}
                    className="w-full py-4 bg-primary text-white rounded-xl font-bold hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 transition-all duration-300 shadow-lg text-lg flex items-center justify-center space-x-2"
                  >
                    <Gavel size={20} />
                    <span>Place Bid</span>
                  </button>
                </div>
              </div>

              {/* Nouns DAO Info */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center space-x-3 mb-4">
                  <Hexagon size={24} className="text-primary" />
                  <h4 className="text-lg font-bold text-text-primary">Nouns DAO Style</h4>
                </div>
                <p className="text-text-secondary text-sm mb-4">
                  This auction follows the Nouns DAO model where one Noun is auctioned every day. 
                  Each Noun represents a top project from our marketplace and gives the owner 
                  governance rights in the platform.
                </p>
                <div className="flex items-center justify-between text-sm">
                  <button className="text-primary font-medium">Learn More</button>
                  <div className="flex items-center space-x-1">
                    <Shuffle size={14} className="text-text-muted" />
                    <span className="text-text-muted">Auction #{currentAuction.nounId}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Auctions */}
      <div className="bg-white rounded-2xl border border-light-border p-8 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Clock size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-text-primary">Upcoming Auctions</h3>
              <p className="text-text-secondary">Next innovation shares to be auctioned</p>
            </div>
          </div>
          <div className="text-sm text-text-muted">
            {upcomingAuctions.length} upcoming
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingAuctions.map((item, index) => (
            <div 
              key={item.id}
              className="bg-light-card border border-light-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group"
              onClick={() => onViewItem(item)}
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-light-hover rounded-xl overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <Hexagon size={32} className="text-primary" />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-text-primary group-hover:text-primary transition-colors duration-300">
                    Noun #{item.nounId}
                  </h4>
                  <p className="text-text-muted text-sm">Starts in {formatTime(item.time_remaining)}</p>
                </div>
              </div>

              <div className="relative mb-4">
                <img 
                  src={item.thumbnail_url}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-primary text-white px-2 py-1 rounded-full text-xs font-medium">
                  Starts in {formatTime(item.time_remaining)}
                </div>
                {item.is_featured && (
                  <div className="absolute top-3 right-3 bg-secondary text-white px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                    <Crown size={10} />
                    <span>FEATURED</span>
                  </div>
                )}
                <div className="absolute bottom-3 right-3 flex items-center space-x-2">
                  <div className="bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                    <Heart size={10} className="fill-current text-error" />
                    <span>{item.likes_count}</span>
                  </div>
                </div>
              </div>

              <h4 className="font-bold text-lg text-text-primary mb-2 group-hover:text-primary transition-colors duration-300">
                {item.title}
              </h4>
              <p className="text-text-secondary text-sm mb-3 line-clamp-2">{item.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users size={12} className="text-primary" />
                  </div>
                  <span className="text-text-primary text-sm font-medium">{item.founder_name}</span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-primary">{formatCurrency(item.min_bid)}</div>
                  <div className="text-xs text-text-muted">Starting bid</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Past Auctions */}
      <div className="bg-white rounded-2xl border border-light-border p-8 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Gavel size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-text-primary">Past Auctions</h3>
              <p className="text-text-secondary">Previously auctioned innovation shares</p>
            </div>
          </div>
          <button className="text-primary hover:text-primary-dark font-medium">
            View All →
          </button>
        </div>

        <div className="overflow-hidden rounded-xl border border-light-border">
          <table className="w-full">
            <thead className="bg-light-card">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Noun</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Project</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Founder</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Final Bid</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Winner</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-light-border">
              {pastAuctions.map((auction, index) => (
                <tr key={auction.id} className="bg-white hover:bg-light-hover transition-colors duration-300">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Hexagon size={16} className="text-primary" />
                      </div>
                      <span className="font-medium">#{Math.abs(auction.nounId)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-text-primary">{auction.title}</div>
                  </td>
                  <td className="px-6 py-4 text-text-secondary">{auction.founder_name}</td>
                  <td className="px-6 py-4 font-bold text-primary">{formatCurrency(auction.current_bid)}</td>
                  <td className="px-6 py-4 text-text-secondary">{auction.highest_bidder}</td>
                  <td className="px-6 py-4 text-text-muted">
                    {new Date(Date.now() - Math.abs(auction.nounId) * 86400000).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AuctionSystem;