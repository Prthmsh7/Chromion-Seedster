import React, { useState, useEffect } from 'react';
import { 
  Layers, 
  Building, 
  Leaf, 
  Gamepad, 
  FileText, 
  Landmark, 
  BarChart3, 
  RefreshCw, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  DollarSign, 
  ArrowRight, 
  Plus, 
  MapPin, 
  Calendar, 
  Percent, 
  Home, 
  Globe, 
  Award, 
  Briefcase, 
  ShoppingBag, 
  Truck, 
  Package,
  Code,
  Lightbulb,
  Users,
  Zap,
  Shield
} from 'lucide-react';
import { 
  TokenizationService, 
  initializeTokenizationService, 
  RealEstateToken, 
  CarbonCredit, 
  GameAsset, 
  InvoiceFactoring, 
  Commodity 
} from '../lib/tokenization';

interface TokenizationDashboardProps {
  onBack: () => void;
}

const TokenizationDashboard: React.FC<TokenizationDashboardProps> = ({ onBack }) => {
  const [tokenizationService, setTokenizationService] = useState<TokenizationService | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'ip-tokens' | 'real-estate' | 'carbon-credits' | 'game-assets' | 'invoice-factoring' | 'commodities'>('overview');
  
  // Tokenization data states
  const [realEstateTokens, setRealEstateTokens] = useState<RealEstateToken[]>([]);
  const [carbonCredits, setCarbonCredits] = useState<CarbonCredit[]>([]);
  const [gameAssets, setGameAssets] = useState<GameAsset[]>([]);
  const [invoiceFactoring, setInvoiceFactoring] = useState<InvoiceFactoring[]>([]);
  const [commodities, setCommodities] = useState<Commodity[]>([]);
  
  // IP Tokenization data
  const [ipTokens, setIpTokens] = useState<any[]>([
    {
      id: 'ip-1',
      name: 'AI Analytics Platform',
      description: 'Advanced analytics platform with machine learning capabilities',
      category: 'AI/ML',
      creator: 'Sarah Johnson',
      totalShares: 1000,
      availableShares: 650,
      pricePerShare: 75,
      valuation: 75000,
      fundingGoal: 50000,
      fundingRaised: 26250,
      githubRepo: 'sarahjohnson/ai-analytics',
      ipfsHash: 'QmXyZ...',
      createdAt: '2024-05-15T10:30:00Z'
    },
    {
      id: 'ip-2',
      name: 'Blockchain Security Protocol',
      description: 'Next-generation security protocol for blockchain applications',
      category: 'Blockchain',
      creator: 'James Park',
      totalShares: 1000,
      availableShares: 800,
      pricePerShare: 90,
      valuation: 90000,
      fundingGoal: 70000,
      fundingRaised: 18000,
      githubRepo: 'jamespark/blockchain-security',
      ipfsHash: 'QmAbc...',
      createdAt: '2024-05-10T14:15:00Z'
    },
    {
      id: 'ip-3',
      name: 'FinTech Payment Solution',
      description: 'Revolutionary payment processing system with fraud detection',
      category: 'Fintech',
      creator: 'Emma Davis',
      totalShares: 1000,
      availableShares: 700,
      pricePerShare: 65,
      valuation: 65000,
      fundingGoal: 45000,
      fundingRaised: 19500,
      githubRepo: 'emmadavis/fintech-payment',
      ipfsHash: 'QmDef...',
      createdAt: '2024-05-05T09:45:00Z'
    },
    {
      id: 'ip-4',
      name: 'Healthcare Data Platform',
      description: 'HIPAA-compliant healthcare data management platform',
      category: 'Healthtech',
      creator: 'Dr. Michael Chen',
      totalShares: 1000,
      availableShares: 850,
      pricePerShare: 80,
      valuation: 80000,
      fundingGoal: 60000,
      fundingRaised: 12000,
      githubRepo: 'michaelchen/healthcare-data',
      ipfsHash: 'QmGhi...',
      createdAt: '2024-04-25T11:20:00Z'
    }
  ]);
  
  // Form states
  const [ipTokenForm, setIpTokenForm] = useState({
    name: '',
    description: '',
    category: 'AI/ML',
    totalShares: '1000',
    pricePerShare: '',
    githubRepo: ''
  });
  const [ipTokenLoading, setIpTokenLoading] = useState(false);
  const [ipTokenResult, setIpTokenResult] = useState<any>(null);
  
  const [propertyForm, setPropertyForm] = useState({
    propertyId: '',
    value: '',
    location: '',
    totalShares: '1000'
  });
  const [propertyLoading, setPropertyLoading] = useState(false);
  const [propertyResult, setPropertyResult] = useState<any>(null);

  useEffect(() => {
    initializeServices();
  }, []);

  const initializeServices = async () => {
    try {
      setIsLoading(true);
      const service = await initializeTokenizationService();
      setTokenizationService(service);
      
      // Load initial data
      await loadTokenizationData(service);
      
    } catch (error) {
      console.error('Error initializing Tokenization services:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadTokenizationData = async (service: TokenizationService) => {
    try {
      const [realEstate, carbon, game, invoice, commodity] = await Promise.all([
        service.getRealEstateTokens(),
        service.getCarbonCredits(),
        service.getGameAssets(),
        service.getInvoiceFactoring(),
        service.getCommodities()
      ]);
      
      setRealEstateTokens(realEstate);
      setCarbonCredits(carbon);
      setGameAssets(game);
      setInvoiceFactoring(invoice);
      setCommodities(commodity);
      
    } catch (error) {
      console.error('Error loading tokenization data:', error);
    }
  };

  const refreshData = async () => {
    if (!tokenizationService) return;
    await loadTokenizationData(tokenizationService);
  };

  const handleTokenizeIP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ipTokenForm.name || !ipTokenForm.description || !ipTokenForm.pricePerShare) return;
    
    try {
      setIpTokenLoading(true);
      setIpTokenResult(null);
      
      // Simulate tokenization process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newToken = {
        id: `ip-${ipTokens.length + 1}`,
        name: ipTokenForm.name,
        description: ipTokenForm.description,
        category: ipTokenForm.category,
        creator: 'Current User',
        totalShares: parseInt(ipTokenForm.totalShares),
        availableShares: parseInt(ipTokenForm.totalShares),
        pricePerShare: parseFloat(ipTokenForm.pricePerShare),
        valuation: parseInt(ipTokenForm.totalShares) * parseFloat(ipTokenForm.pricePerShare),
        fundingGoal: Math.round(parseInt(ipTokenForm.totalShares) * parseFloat(ipTokenForm.pricePerShare) * 0.7),
        fundingRaised: 0,
        githubRepo: ipTokenForm.githubRepo,
        ipfsHash: `QmRandom${Math.random().toString(36).substring(2, 8)}`,
        createdAt: new Date().toISOString()
      };
      
      setIpTokens([newToken, ...ipTokens]);
      
      setIpTokenResult({
        status: 'confirmed',
        tokenId: newToken.id,
        ipfsHash: newToken.ipfsHash,
        txHash: `0x${Math.random().toString(36).substring(2, 66)}`
      });
      
      // Reset form
      setIpTokenForm({
        name: '',
        description: '',
        category: 'AI/ML',
        totalShares: '1000',
        pricePerShare: '',
        githubRepo: ''
      });
      
    } catch (error) {
      console.error('Error tokenizing IP:', error);
      setIpTokenResult({
        status: 'failed',
        error: 'Failed to tokenize IP. Please try again.'
      });
    } finally {
      setIpTokenLoading(false);
    }
  };

  const handleTokenizeProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenizationService || !propertyForm.propertyId || !propertyForm.value || !propertyForm.location) return;
    
    try {
      setPropertyLoading(true);
      setPropertyResult(null);
      
      const result = await tokenizationService.simulateTokenizeProperty(
        propertyForm.propertyId,
        parseInt(propertyForm.value),
        propertyForm.location,
        parseInt(propertyForm.totalShares)
      );
      
      setPropertyResult(result);
    } catch (error) {
      console.error('Error tokenizing property:', error);
    } finally {
      setPropertyLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-light-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Layers size={32} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">Initializing Tokenization Services</h2>
          <p className="text-text-secondary">Connecting to tokenization platforms...</p>
        </div>
      </div>
    );
  }

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-accent rounded-3xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full -translate-y-32 translate-x-32"></div>
        
        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
              <Layers size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-text-primary">Tokenization Platform</h1>
              <p className="text-text-secondary text-lg">Tokenize your IP and real-world assets for funding</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3 mb-2">
                <Shield size={20} className="text-primary" />
                <span className="font-semibold text-text-primary">IP Tokens</span>
              </div>
              <div className="text-2xl font-bold text-primary">
                {ipTokens.length}
              </div>
              <div className="text-sm text-text-secondary">Developer projects</div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3 mb-2">
                <Building size={20} className="text-success" />
                <span className="font-semibold text-text-primary">Real Estate</span>
              </div>
              <div className="text-2xl font-bold text-success">
                {realEstateTokens.length}
              </div>
              <div className="text-sm text-text-secondary">Properties</div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3 mb-2">
                <Leaf size={20} className="text-secondary" />
                <span className="font-semibold text-text-primary">Carbon Credits</span>
              </div>
              <div className="text-2xl font-bold text-secondary">
                {carbonCredits.length}
              </div>
              <div className="text-sm text-text-secondary">Projects</div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3 mb-2">
                <Gamepad size={20} className="text-error" />
                <span className="font-semibold text-text-primary">Game Assets</span>
              </div>
              <div className="text-2xl font-bold text-error">
                {gameAssets.length}
              </div>
              <div className="text-sm text-text-secondary">Assets</div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3 mb-2">
                <FileText size={20} className="text-warning" />
                <span className="font-semibold text-text-primary">Invoices</span>
              </div>
              <div className="text-2xl font-bold text-warning">
                {invoiceFactoring.length}
              </div>
              <div className="text-sm text-text-secondary">Factored</div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3 mb-2">
                <Package size={20} className="text-primary" />
                <span className="font-semibold text-text-primary">Commodities</span>
              </div>
              <div className="text-2xl font-bold text-primary">
                {commodities.length}
              </div>
              <div className="text-sm text-text-secondary">Tokenized</div>
            </div>
          </div>
        </div>
      </div>

      {/* IP Tokenization */}
      <div className="bg-white rounded-2xl border border-light-border p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Shield size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text-primary">IP Tokenization</h2>
              <p className="text-text-secondary">Tokenize your intellectual property for funding</p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('ip-tokens')}
            className="flex items-center space-x-2 text-primary font-medium"
          >
            <span>View Details</span>
            <ArrowRight size={16} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ipTokens.slice(0, 4).map((token, index) => (
            <div key={token.id} className="bg-light-card rounded-xl overflow-hidden border border-light-border hover:shadow-lg transition-all duration-300">
              <div className="h-32 bg-primary/10 flex items-center justify-center">
                {token.category === 'AI/ML' ? (
                  <Brain size={48} className="text-primary/50" />
                ) : token.category === 'Blockchain' ? (
                  <Code size={48} className="text-primary/50" />
                ) : token.category === 'Fintech' ? (
                  <DollarSign size={48} className="text-primary/50" />
                ) : (
                  <Lightbulb size={48} className="text-primary/50" />
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded-lg text-xs font-medium">
                    {token.category}
                  </span>
                  <span className="text-xs text-text-muted">
                    {new Date(token.createdAt).toLocaleDateString()}
                  </span>
                </div>
                
                <h3 className="font-bold text-text-primary text-lg mb-2">{token.name}</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-text-secondary text-sm">
                    <Users size={14} className="flex-shrink-0" />
                    <span>Creator: {token.creator}</span>
                  </div>
                  {token.githubRepo && (
                    <div className="flex items-center space-x-2 text-text-secondary text-sm">
                      <Code size={14} className="flex-shrink-0" />
                      <span>{token.githubRepo}</span>
                    </div>
                  )}
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-text-secondary">Funding Progress:</span>
                    <span className="font-medium text-text-primary">
                      {formatPercentage((token.fundingRaised / token.fundingGoal) * 100)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${Math.min(100, (token.fundingRaised / token.fundingGoal) * 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-text-muted mt-1">
                    <span>{formatCurrency(token.fundingRaised)}</span>
                    <span>Goal: {formatCurrency(token.fundingGoal)}</span>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <div className="text-text-secondary text-sm">
                    <span className="font-medium">Price per Share:</span>
                  </div>
                  <div className="text-primary font-bold">
                    {formatCurrency(token.pricePerShare)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Real Estate */}
      <div className="bg-white rounded-2xl border border-light-border p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-success rounded-xl flex items-center justify-center">
              <Building size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text-primary">Real Estate Tokenization</h2>
              <p className="text-text-secondary">Fractional ownership of properties</p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('real-estate')}
            className="flex items-center space-x-2 text-success font-medium"
          >
            <span>View Details</span>
            <ArrowRight size={16} />
          </button>
        </div>
        
        {realEstateTokens.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {realEstateTokens.slice(0, 3).map((property, index) => (
              <div key={index} className="bg-light-card rounded-xl overflow-hidden border border-light-border hover:shadow-lg transition-all duration-300">
                <div className="h-48 bg-success/10 flex items-center justify-center">
                  <Building size={64} className="text-success/50" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-text-primary text-lg">{property.assetType}</h3>
                    <span className="px-2 py-1 bg-success/10 text-success rounded-lg text-xs font-medium">
                      {property.availableShares}/{property.totalShares} Shares
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-text-secondary text-sm">
                      <MapPin size={14} className="flex-shrink-0" />
                      <span>{property.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-text-secondary text-sm">
                      <DollarSign size={14} className="flex-shrink-0" />
                      <span>Value: {formatCurrency(property.value)}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-text-secondary text-sm">
                      <Percent size={14} className="flex-shrink-0" />
                      <span>Annual Yield: {formatPercentage(property.annualYield)}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <div className="text-text-secondary text-sm">
                      <span className="font-medium">Price per Share:</span>
                    </div>
                    <div className="text-success font-bold">
                      {formatCurrency(property.pricePerShare)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Other Asset Classes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Carbon Credits */}
        <div className="bg-white rounded-xl border border-light-border p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
              <Leaf size={24} className="text-secondary" />
            </div>
            <div>
              <h3 className="font-bold text-text-primary text-lg">Carbon Credits</h3>
              <p className="text-text-secondary text-sm">Tokenized environmental impact</p>
            </div>
          </div>
          
          <div className="space-y-3 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Projects:</span>
              <span className="font-medium">{carbonCredits.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Total Credits:</span>
              <span className="font-medium">{carbonCredits.reduce((sum, credit) => sum + credit.amount, 0).toLocaleString()} tons</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Avg. Price:</span>
              <span className="font-medium">${Math.round(carbonCredits.reduce((sum, credit) => sum + credit.pricePerTon, 0) / carbonCredits.length)}/ton</span>
            </div>
          </div>
          
          <button 
            onClick={() => setActiveTab('carbon-credits')}
            className="flex items-center space-x-2 text-secondary font-medium"
          >
            <span>View Carbon Credits</span>
            <ArrowRight size={16} />
          </button>
        </div>
        
        {/* Game Assets */}
        <div className="bg-white rounded-xl border border-light-border p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-error/10 rounded-xl flex items-center justify-center">
              <Gamepad size={24} className="text-error" />
            </div>
            <div>
              <h3 className="font-bold text-text-primary text-lg">Game Assets</h3>
              <p className="text-text-secondary text-sm">Tokenized in-game items</p>
            </div>
          </div>
          
          <div className="space-y-3 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Assets:</span>
              <span className="font-medium">{gameAssets.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Total Value:</span>
              <span className="font-medium">${gameAssets.reduce((sum, asset) => sum + (asset.price * asset.availableUnits), 0).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Games:</span>
              <span className="font-medium">{new Set(gameAssets.map(asset => asset.game)).size}</span>
            </div>
          </div>
          
          <button 
            onClick={() => setActiveTab('game-assets')}
            className="flex items-center space-x-2 text-error font-medium"
          >
            <span>View Game Assets</span>
            <ArrowRight size={16} />
          </button>
        </div>
        
        {/* Invoice Factoring */}
        <div className="bg-white rounded-xl border border-light-border p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-warning/10 rounded-xl flex items-center justify-center">
              <FileText size={24} className="text-warning" />
            </div>
            <div>
              <h3 className="font-bold text-text-primary text-lg">Invoice Factoring</h3>
              <p className="text-text-secondary text-sm">Tokenized invoice financing</p>
            </div>
          </div>
          
          <div className="space-y-3 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Invoices:</span>
              <span className="font-medium">{invoiceFactoring.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Total Value:</span>
              <span className="font-medium">${invoiceFactoring.reduce((sum, invoice) => sum + invoice.amount, 0).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Avg. Return:</span>
              <span className="font-medium">{formatPercentage(invoiceFactoring.reduce((sum, invoice) => sum + invoice.expectedReturn, 0) / invoiceFactoring.length)}</span>
            </div>
          </div>
          
          <button 
            onClick={() => setActiveTab('invoice-factoring')}
            className="flex items-center space-x-2 text-warning font-medium"
          >
            <span>View Invoice Factoring</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  const renderIPTokens = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-light-border p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Shield size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text-primary">IP Tokenization</h2>
              <p className="text-text-secondary">Tokenize your intellectual property for funding</p>
            </div>
          </div>
          <button
            onClick={refreshData}
            className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-xl hover:scale-105 transition-all duration-300"
          >
            <RefreshCw size={18} />
            <span>Refresh</span>
          </button>
        </div>

        {/* IP Tokenization Form */}
        <div className="bg-light-card rounded-xl p-6 border border-light-border mb-8">
          <h3 className="font-bold text-text-primary mb-4">Tokenize Your Project</h3>
          
          <form onSubmit={handleTokenizeIP} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Project Name
                </label>
                <input
                  type="text"
                  value={ipTokenForm.name}
                  onChange={(e) => setIpTokenForm({...ipTokenForm, name: e.target.value})}
                  placeholder="e.g., AI Analytics Platform"
                  className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Category
                </label>
                <select
                  value={ipTokenForm.category}
                  onChange={(e) => setIpTokenForm({...ipTokenForm, category: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary"
                >
                  <option value="AI/ML">AI/ML</option>
                  <option value="Blockchain">Blockchain</option>
                  <option value="Fintech">Fintech</option>
                  <option value="Healthtech">Healthtech</option>
                  <option value="Edtech">Edtech</option>
                  <option value="IoT">IoT</option>
                  <option value="Gaming">Gaming</option>
                  <option value="E-commerce">E-commerce</option>
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Project Description
                </label>
                <textarea
                  value={ipTokenForm.description}
                  onChange={(e) => setIpTokenForm({...ipTokenForm, description: e.target.value})}
                  placeholder="Describe your project and its unique value proposition..."
                  rows={3}
                  className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary resize-none"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  GitHub Repository
                </label>
                <input
                  type="text"
                  value={ipTokenForm.githubRepo}
                  onChange={(e) => setIpTokenForm({...ipTokenForm, githubRepo: e.target.value})}
                  placeholder="e.g., username/repository"
                  className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Price Per Share (USD)
                </label>
                <input
                  type="number"
                  value={ipTokenForm.pricePerShare}
                  onChange={(e) => setIpTokenForm({...ipTokenForm, pricePerShare: e.target.value})}
                  placeholder="e.g., 50"
                  className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Total Shares
                </label>
                <input
                  type="number"
                  value={ipTokenForm.totalShares}
                  onChange={(e) => setIpTokenForm({...ipTokenForm, totalShares: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary"
                  required
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="text-text-secondary text-sm">
                  <span className="font-medium">Project Valuation:</span>
                </div>
                <div className="text-primary font-bold">
                  {ipTokenForm.pricePerShare && ipTokenForm.totalShares
                    ? formatCurrency(parseFloat(ipTokenForm.pricePerShare) * parseInt(ipTokenForm.totalShares))
                    : '$0'}
                </div>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={!ipTokenForm.name || !ipTokenForm.description || !ipTokenForm.pricePerShare || ipTokenLoading}
              className="w-full py-3 bg-primary text-white rounded-xl font-medium hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center space-x-2"
            >
              {ipTokenLoading ? (
                <>
                  <RefreshCw size={18} className="animate-spin" />
                  <span>Tokenizing...</span>
                </>
              ) : (
                <>
                  <Layers size={18} />
                  <span>Tokenize Project</span>
                </>
              )}
            </button>
          </form>
          
          {ipTokenResult && (
            <div className={`mt-4 p-4 rounded-xl ${
              ipTokenResult.status === 'confirmed' ? 'bg-success/10 border border-success/20' : 'bg-error/10 border border-error/20'
            }`}>
              <div className="flex items-center space-x-2 mb-2">
                {ipTokenResult.status === 'confirmed' ? (
                  <CheckCircle size={18} className="text-success" />
                ) : (
                  <AlertTriangle size={18} className="text-error" />
                )}
                <span className="font-medium">
                  {ipTokenResult.status === 'confirmed' ? 'Project Tokenized Successfully' : 'Tokenization Failed'}
                </span>
              </div>
              {ipTokenResult.status === 'confirmed' && (
                <div className="text-sm text-text-secondary">
                  <p>Token ID: {ipTokenResult.tokenId}</p>
                  <p>IPFS Hash: {ipTokenResult.ipfsHash}</p>
                  <p>Transaction Hash: {ipTokenResult.txHash.slice(0, 10)}...{ipTokenResult.txHash.slice(-8)}</p>
                  <p className="mt-2 text-success font-medium">Your project is now available for investment in the marketplace!</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* IP Tokens List */}
        <div className="overflow-hidden rounded-xl border border-light-border">
          <table className="w-full">
            <thead className="bg-light-card">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Project</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Category</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Valuation</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Share Price</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Available</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Funding</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-light-border">
              {ipTokens.map((token, index) => (
                <tr key={token.id} className="bg-white hover:bg-light-hover transition-colors duration-300">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        {token.category === 'AI/ML' ? (
                          <Brain size={20} className="text-primary" />
                        ) : token.category === 'Blockchain' ? (
                          <Code size={20} className="text-primary" />
                        ) : token.category === 'Fintech' ? (
                          <DollarSign size={20} className="text-primary" />
                        ) : (
                          <Lightbulb size={20} className="text-primary" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-text-primary">{token.name}</div>
                        <div className="text-xs text-text-muted">{token.creator}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-lg text-xs font-medium">
                      {token.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-text-primary">{formatCurrency(token.valuation)}</td>
                  <td className="px-6 py-4 font-medium text-primary">{formatCurrency(token.pricePerShare)}</td>
                  <td className="px-6 py-4 text-text-secondary">{token.availableShares}/{token.totalShares}</td>
                  <td className="px-6 py-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${Math.min(100, (token.fundingRaised / token.fundingGoal) * 100)}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-text-muted mt-1">
                      {formatPercentage((token.fundingRaised / token.fundingGoal) * 100)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-text-muted">{new Date(token.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderRealEstate = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-light-border p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-success rounded-xl flex items-center justify-center">
              <Building size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text-primary">Real Estate Tokenization</h2>
              <p className="text-text-secondary">Fractional ownership of properties</p>
            </div>
          </div>
          <button
            onClick={refreshData}
            className="flex items-center space-x-2 px-4 py-2 bg-success text-white rounded-xl hover:scale-105 transition-all duration-300"
          >
            <RefreshCw size={18} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Property Tokenization Form */}
        <div className="bg-light-card rounded-xl p-6 border border-light-border mb-8">
          <h3 className="font-bold text-text-primary mb-4">Tokenize a Property</h3>
          
          <form onSubmit={handleTokenizeProperty} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Property ID
                </label>
                <input
                  type="text"
                  value={propertyForm.propertyId}
                  onChange={(e) => setPropertyForm({...propertyForm, propertyId: e.target.value})}
                  placeholder="e.g., NYC-APT-123"
                  className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-success/20 focus:border-success/50 text-text-primary"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={propertyForm.location}
                  onChange={(e) => setPropertyForm({...propertyForm, location: e.target.value})}
                  placeholder="e.g., New York, NY"
                  className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-success/20 focus:border-success/50 text-text-primary"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Property Value (USD)
                </label>
                <input
                  type="number"
                  value={propertyForm.value}
                  onChange={(e) => setPropertyForm({...propertyForm, value: e.target.value})}
                  placeholder="e.g., 1000000"
                  className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-success/20 focus:border-success/50 text-text-primary"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Total Shares
                </label>
                <input
                  type="number"
                  value={propertyForm.totalShares}
                  onChange={(e) => setPropertyForm({...propertyForm, totalShares: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-success/20 focus:border-success/50 text-text-primary"
                  required
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="text-text-secondary text-sm">
                <span className="font-medium">Price per Share:</span>
              </div>
              <div className="text-success font-bold">
                {propertyForm.value && propertyForm.totalShares
                  ? formatCurrency(parseInt(propertyForm.value) / parseInt(propertyForm.totalShares))
                  : '$0'}
              </div>
            </div>
            
            <button
              type="submit"
              disabled={!propertyForm.propertyId || !propertyForm.location || !propertyForm.value || propertyLoading}
              className="w-full py-3 bg-success text-white rounded-xl font-medium hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center space-x-2"
            >
              {propertyLoading ? (
                <>
                  <RefreshCw size={18} className="animate-spin" />
                  <span>Tokenizing...</span>
                </>
              ) : (
                <>
                  <Building size={18} />
                  <span>Tokenize Property</span>
                </>
              )}
            </button>
          </form>
          
          {propertyResult && (
            <div className={`mt-4 p-4 rounded-xl ${
              propertyResult.status === 'confirmed' ? 'bg-success/10 border border-success/20' : 'bg-error/10 border border-error/20'
            }`}>
              <div className="flex items-center space-x-2 mb-2">
                {propertyResult.status === 'confirmed' ? (
                  <CheckCircle size={18} className="text-success" />
                ) : (
                  <AlertTriangle size={18} className="text-error" />
                )}
                <span className="font-medium">
                  {propertyResult.status === 'confirmed' ? 'Property Tokenized Successfully' : 'Tokenization Failed'}
                </span>
              </div>
              {propertyResult.status === 'confirmed' && (
                <div className="text-sm text-text-secondary">
                  <p>Transaction Hash: {propertyResult.txHash.slice(0, 10)}...{propertyResult.txHash.slice(-8)}</p>
                  <p>Token ID: {propertyResult.tokenId}</p>
                  <p>Price per Share: {formatCurrency(propertyResult.pricePerShare)}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Real Estate Tokens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {realEstateTokens.map((property, index) => (
            <div key={index} className="bg-light-card rounded-xl overflow-hidden border border-light-border hover:shadow-lg transition-all duration-300">
              <div className="h-48 bg-success/10 flex items-center justify-center">
                <Building size={64} className="text-success/50" />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-text-primary text-lg">{property.assetType}</h3>
                  <span className="px-2 py-1 bg-success/10 text-success rounded-lg text-xs font-medium">
                    {property.availableShares}/{property.totalShares} Shares
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-text-secondary text-sm">
                    <MapPin size={14} className="flex-shrink-0" />
                    <span>{property.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-text-secondary text-sm">
                    <DollarSign size={14} className="flex-shrink-0" />
                    <span>Value: {formatCurrency(property.value)}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-text-secondary text-sm">
                    <Percent size={14} className="flex-shrink-0" />
                    <span>Annual Yield: {formatPercentage(property.annualYield)}</span>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <div className="text-text-secondary text-sm">
                    <span className="font-medium">Price per Share:</span>
                  </div>
                  <div className="text-success font-bold">
                    {formatCurrency(property.pricePerShare)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCarbonCredits = () => (
    <div className="text-center py-16 bg-white rounded-2xl border border-light-border">
      <Leaf size={64} className="mx-auto mb-6 text-text-muted opacity-50" />
      <h3 className="text-2xl font-bold text-text-primary mb-3">Carbon Credits Interface Coming Soon</h3>
      <p className="text-text-secondary mb-8 max-w-md mx-auto">
        We're working on bringing a comprehensive carbon credits interface to the platform. Check back soon!
      </p>
    </div>
  );

  const renderGameAssets = () => (
    <div className="text-center py-16 bg-white rounded-2xl border border-light-border">
      <Gamepad size={64} className="mx-auto mb-6 text-text-muted opacity-50" />
      <h3 className="text-2xl font-bold text-text-primary mb-3">Game Assets Interface Coming Soon</h3>
      <p className="text-text-secondary mb-8 max-w-md mx-auto">
        We're working on bringing a comprehensive game assets interface to the platform. Check back soon!
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-light-bg">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-light-border sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="p-3 bg-white border border-light-border rounded-xl hover:bg-light-hover transition-all duration-300 shadow-sm hover:shadow-md"
              >
                ←
              </button>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                  <Layers size={24} className="text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-text-primary">Tokenization Platform</h1>
                  <p className="text-text-secondary text-lg">Tokenize your IP and real-world assets for funding</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-4 py-2 bg-success/10 rounded-xl text-success">
                <CheckCircle size={16} />
                <span className="text-sm font-medium">Connected to Tokenization</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-light-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'ip-tokens', label: 'IP Tokens', icon: Shield },
              { id: 'real-estate', label: 'Real Estate', icon: Building },
              { id: 'carbon-credits', label: 'Carbon Credits', icon: Leaf },
              { id: 'game-assets', label: 'Game Assets', icon: Gamepad },
              { id: 'invoice-factoring', label: 'Invoice Factoring', icon: FileText },
              { id: 'commodities', label: 'Commodities', icon: Package }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-6 py-4 font-medium text-base transition-colors duration-300 whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'text-primary border-b-2 border-primary' 
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <tab.icon size={18} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'ip-tokens' && renderIPTokens()}
        {activeTab === 'real-estate' && renderRealEstate()}
        {activeTab === 'carbon-credits' && renderCarbonCredits()}
        {activeTab === 'game-assets' && renderGameAssets()}
        {activeTab === 'invoice-factoring' && (
          <div className="text-center py-16 bg-white rounded-2xl border border-light-border">
            <FileText size={64} className="mx-auto mb-6 text-text-muted opacity-50" />
            <h3 className="text-2xl font-bold text-text-primary mb-3">Invoice Factoring Interface Coming Soon</h3>
            <p className="text-text-secondary mb-8 max-w-md mx-auto">
              We're working on bringing a comprehensive invoice factoring interface to the platform. Check back soon!
            </p>
          </div>
        )}
        {activeTab === 'commodities' && (
          <div className="text-center py-16 bg-white rounded-2xl border border-light-border">
            <Package size={64} className="mx-auto mb-6 text-text-muted opacity-50" />
            <h3 className="text-2xl font-bold text-text-primary mb-3">Commodities Interface Coming Soon</h3>
            <p className="text-text-secondary mb-8 max-w-md mx-auto">
              We're working on bringing a comprehensive commodities tokenization interface to the platform. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TokenizationDashboard;