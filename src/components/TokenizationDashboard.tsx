import React, { useState, useEffect } from 'react';
import { 
  Layers, 
  Building, 
  Leaf, 
  Gamepad, 
  FileText, 
  BarChart3, 
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Clock,
  DollarSign,
  Globe,
  MapPin,
  Calendar,
  ArrowRight,
  Plus,
  Award,
  Coins,
  Package,
  Percent,
  Users,
  Home,
  Zap
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
  const [activeTab, setActiveTab] = useState<'overview' | 'real-estate' | 'carbon-credits' | 'game-assets' | 'invoices' | 'commodities'>('overview');
  
  // Tokenization data states
  const [realEstateTokens, setRealEstateTokens] = useState<RealEstateToken[]>([]);
  const [carbonCredits, setCarbonCredits] = useState<CarbonCredit[]>([]);
  const [gameAssets, setGameAssets] = useState<GameAsset[]>([]);
  const [invoiceFactoring, setInvoiceFactoring] = useState<InvoiceFactoring[]>([]);
  const [commodities, setCommodities] = useState<Commodity[]>([]);
  
  // Form states
  const [propertyForm, setPropertyForm] = useState({
    propertyId: '',
    value: '',
    location: '',
    totalShares: ''
  });
  const [propertyLoading, setPropertyLoading] = useState(false);
  const [propertyResult, setPropertyResult] = useState<any>(null);
  
  const [carbonForm, setCarbonForm] = useState({
    projectId: '',
    amount: '',
    verifier: 'Verra'
  });
  const [carbonLoading, setCarbonLoading] = useState(false);
  const [carbonResult, setCarbonResult] = useState<any>(null);
  
  const [gameAssetForm, setGameAssetForm] = useState({
    assetName: '',
    game: '',
    assetType: '',
    rarity: 'Rare',
    totalUnits: ''
  });
  const [gameAssetLoading, setGameAssetLoading] = useState(false);
  const [gameAssetResult, setGameAssetResult] = useState<any>(null);

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

  const handleTokenizeProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenizationService) return;
    
    try {
      setPropertyLoading(true);
      setPropertyResult(null);
      
      const result = await tokenizationService.simulateTokenizeProperty(
        propertyForm.propertyId,
        parseFloat(propertyForm.value),
        propertyForm.location,
        parseInt(propertyForm.totalShares)
      );
      
      setPropertyResult(result);
      
      if (result.status === 'confirmed') {
        // Reset form after successful tokenization
        setPropertyForm({
          propertyId: '',
          value: '',
          location: '',
          totalShares: ''
        });
        
        // Refresh data after a delay
        setTimeout(refreshData, 1000);
      }
    } catch (error) {
      console.error('Error tokenizing property:', error);
    } finally {
      setPropertyLoading(false);
    }
  };

  const handleMintCarbonCredits = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenizationService) return;
    
    try {
      setCarbonLoading(true);
      setCarbonResult(null);
      
      const result = await tokenizationService.simulateMintCarbonCredits(
        carbonForm.projectId,
        parseInt(carbonForm.amount),
        carbonForm.verifier
      );
      
      setCarbonResult(result);
      
      if (result.status === 'confirmed') {
        // Reset form after successful minting
        setCarbonForm({
          projectId: '',
          amount: '',
          verifier: 'Verra'
        });
        
        // Refresh data after a delay
        setTimeout(refreshData, 1000);
      }
    } catch (error) {
      console.error('Error minting carbon credits:', error);
    } finally {
      setCarbonLoading(false);
    }
  };

  const handleTokenizeGameAsset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenizationService) return;
    
    try {
      setGameAssetLoading(true);
      setGameAssetResult(null);
      
      const result = await tokenizationService.simulateTokenizeGameAsset(
        gameAssetForm.assetName,
        gameAssetForm.game,
        gameAssetForm.assetType,
        gameAssetForm.rarity,
        parseInt(gameAssetForm.totalUnits)
      );
      
      setGameAssetResult(result);
      
      if (result.status === 'confirmed') {
        // Reset form after successful tokenization
        setGameAssetForm({
          assetName: '',
          game: '',
          assetType: '',
          rarity: 'Rare',
          totalUnits: ''
        });
        
        // Refresh data after a delay
        setTimeout(refreshData, 1000);
      }
    } catch (error) {
      console.error('Error tokenizing game asset:', error);
    } finally {
      setGameAssetLoading(false);
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
          <p className="text-text-secondary">Loading tokenized assets...</p>
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
              <h1 className="text-3xl font-bold text-text-primary">Real-World Asset Tokenization</h1>
              <p className="text-text-secondary text-lg">Bringing real-world assets onchain</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3 mb-2">
                <Building size={20} className="text-primary" />
                <span className="font-semibold text-text-primary">Real Estate</span>
              </div>
              <div className="text-2xl font-bold text-primary">
                {realEstateTokens.length > 0 ? formatCurrency(realEstateTokens.reduce((sum, token) => sum + token.value, 0)) : '--'}
              </div>
              <div className="text-sm text-text-secondary">Total Value</div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3 mb-2">
                <Leaf size={20} className="text-success" />
                <span className="font-semibold text-text-primary">Carbon Credits</span>
              </div>
              <div className="text-2xl font-bold text-success">
                {carbonCredits.length > 0 ? carbonCredits.reduce((sum, credit) => sum + credit.amount, 0).toLocaleString() : '--'}
              </div>
              <div className="text-sm text-text-secondary">Total Credits</div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3 mb-2">
                <Gamepad size={20} className="text-secondary" />
                <span className="font-semibold text-text-primary">Game Assets</span>
              </div>
              <div className="text-2xl font-bold text-secondary">
                {gameAssets.length > 0 ? gameAssets.length : '--'}
              </div>
              <div className="text-sm text-text-secondary">Unique Assets</div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3 mb-2">
                <FileText size={20} className="text-warning" />
                <span className="font-semibold text-text-primary">Invoices</span>
              </div>
              <div className="text-2xl font-bold text-warning">
                {invoiceFactoring.length > 0 ? formatCurrency(invoiceFactoring.reduce((sum, invoice) => sum + invoice.amount, 0)) : '--'}
              </div>
              <div className="text-sm text-text-secondary">Total Value</div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3 mb-2">
                <Package size={20} className="text-accent" />
                <span className="font-semibold text-text-primary">Commodities</span>
              </div>
              <div className="text-2xl font-bold text-accent">
                {commodities.length > 0 ? formatCurrency(commodities.reduce((sum, commodity) => sum + commodity.tokenizedValue, 0)) : '--'}
              </div>
              <div className="text-sm text-text-secondary">Total Value</div>
            </div>
          </div>
        </div>
      </div>

      {/* Asset Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Real Estate */}
        <div className="bg-white rounded-xl border border-light-border p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <Building size={24} className="text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-text-primary text-lg">Real Estate</h3>
              <p className="text-text-secondary text-sm">Tokenized properties</p>
            </div>
          </div>
          
          <div className="space-y-3 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Properties:</span>
              <span className="font-medium">{realEstateTokens.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Total Value:</span>
              <span className="font-medium">{formatCurrency(realEstateTokens.reduce((sum, token) => sum + token.value, 0))}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Avg. Annual Yield:</span>
              <span className="font-medium text-success">{formatPercentage(realEstateTokens.reduce((sum, token) => sum + token.annualYield, 0) / realEstateTokens.length)}</span>
            </div>
          </div>
          
          <button 
            onClick={() => setActiveTab('real-estate')}
            className="flex items-center space-x-2 text-primary font-medium"
          >
            <span>View Properties</span>
            <ArrowRight size={16} />
          </button>
        </div>
        
        {/* Carbon Credits */}
        <div className="bg-white rounded-xl border border-light-border p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
              <Leaf size={24} className="text-success" />
            </div>
            <div>
              <h3 className="font-bold text-text-primary text-lg">Carbon Credits</h3>
              <p className="text-text-secondary text-sm">Tokenized carbon offsets</p>
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
              <span className="font-medium">${(carbonCredits.reduce((sum, credit) => sum + credit.pricePerTon, 0) / carbonCredits.length).toFixed(2)}/ton</span>
            </div>
          </div>
          
          <button 
            onClick={() => setActiveTab('carbon-credits')}
            className="flex items-center space-x-2 text-success font-medium"
          >
            <span>View Carbon Credits</span>
            <ArrowRight size={16} />
          </button>
        </div>
        
        {/* Game Assets */}
        <div className="bg-white rounded-xl border border-light-border p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
              <Gamepad size={24} className="text-secondary" />
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
              <span className="font-medium">{formatCurrency(gameAssets.reduce((sum, asset) => sum + asset.price * asset.availableUnits, 0))}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Available Units:</span>
              <span className="font-medium">{gameAssets.reduce((sum, asset) => sum + asset.availableUnits, 0)}</span>
            </div>
          </div>
          
          <button 
            onClick={() => setActiveTab('game-assets')}
            className="flex items-center space-x-2 text-secondary font-medium"
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
              <span className="font-medium">{formatCurrency(invoiceFactoring.reduce((sum, invoice) => sum + invoice.amount, 0))}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Avg. Return:</span>
              <span className="font-medium text-success">{formatPercentage(invoiceFactoring.reduce((sum, invoice) => sum + invoice.expectedReturn, 0) / invoiceFactoring.length)}</span>
            </div>
          </div>
          
          <button 
            onClick={() => setActiveTab('invoices')}
            className="flex items-center space-x-2 text-warning font-medium"
          >
            <span>View Invoices</span>
            <ArrowRight size={16} />
          </button>
        </div>
        
        {/* Commodities */}
        <div className="bg-white rounded-xl border border-light-border p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
              <Package size={24} className="text-accent" />
            </div>
            <div>
              <h3 className="font-bold text-text-primary text-lg">Commodities</h3>
              <p className="text-text-secondary text-sm">Tokenized physical commodities</p>
            </div>
          </div>
          
          <div className="space-y-3 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Commodities:</span>
              <span className="font-medium">{commodities.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Total Value:</span>
              <span className="font-medium">{formatCurrency(commodities.reduce((sum, commodity) => sum + commodity.tokenizedValue, 0))}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Available Units:</span>
              <span className="font-medium">{commodities.reduce((sum, commodity) => sum + commodity.availableUnits, 0)}</span>
            </div>
          </div>
          
          <button 
            onClick={() => setActiveTab('commodities')}
            className="flex items-center space-x-2 text-accent font-medium"
          >
            <span>View Commodities</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Tokenization Benefits */}
      <div className="bg-white rounded-2xl border border-light-border p-8 shadow-sm">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
            <Zap size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-text-primary">Benefits of Tokenization</h2>
            <p className="text-text-secondary">Why tokenize real-world assets</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-light-card rounded-xl p-6 border border-light-border">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
              <Users size={24} className="text-primary" />
            </div>
            <h3 className="font-bold text-text-primary text-lg mb-2">Fractional Ownership</h3>
            <p className="text-text-secondary">Divide high-value assets into affordable shares, enabling broader participation</p>
          </div>
          
          <div className="bg-light-card rounded-xl p-6 border border-light-border">
            <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center mb-4">
              <Globe size={24} className="text-success" />
            </div>
            <h3 className="font-bold text-text-primary text-lg mb-2">Global Accessibility</h3>
            <p className="text-text-secondary">Access investments from anywhere in the world, 24/7, without intermediaries</p>
          </div>
          
          <div className="bg-light-card rounded-xl p-6 border border-light-border">
            <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
              <Zap size={24} className="text-secondary" />
            </div>
            <h3 className="font-bold text-text-primary text-lg mb-2">Instant Liquidity</h3>
            <p className="text-text-secondary">Trade traditionally illiquid assets with ease on secondary markets</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRealEstate = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-light-border p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Building size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text-primary">Real Estate Tokenization</h2>
              <p className="text-text-secondary">Fractional ownership of properties</p>
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

        {/* Tokenize Property Form */}
        <div className="bg-light-card rounded-xl p-6 border border-light-border mb-8">
          <h3 className="font-bold text-text-primary mb-4">Tokenize New Property</h3>
          
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
                  className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary"
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
                  className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary"
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
                  value={propertyForm.totalShares}
                  onChange={(e) => setPropertyForm({...propertyForm, totalShares: e.target.value})}
                  placeholder="e.g., 1000"
                  className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary"
                  required
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={!propertyForm.propertyId || !propertyForm.value || !propertyForm.location || !propertyForm.totalShares || propertyLoading}
              className="w-full py-3 bg-primary text-white rounded-xl font-medium hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center space-x-2"
            >
              {propertyLoading ? (
                <>
                  <RefreshCw size={18} className="animate-spin" />
                  <span>Processing...</span>
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
                  <p>Price Per Share: {formatCurrency(propertyResult.pricePerShare)}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Property Tokens */}
        <div className="overflow-hidden rounded-xl border border-light-border">
          <table className="w-full">
            <thead className="bg-light-card">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Property</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Location</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Value</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Shares</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Price/Share</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Annual Yield</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-light-border">
              {realEstateTokens.map((token, index) => (
                <tr key={index} className="bg-white hover:bg-light-hover transition-colors duration-300">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Home size={20} className="text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-text-primary">{token.propertyId}</div>
                        <div className="text-xs text-text-muted">{token.assetType}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2 text-text-secondary">
                      <MapPin size={14} />
                      <span>{token.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-text-primary">{formatCurrency(token.value)}</td>
                  <td className="px-6 py-4 text-text-secondary">
                    {token.availableShares}/{token.totalShares}
                  </td>
                  <td className="px-6 py-4 font-medium text-primary">{formatCurrency(token.pricePerShare)}</td>
                  <td className="px-6 py-4 font-medium text-success">{formatPercentage(token.annualYield)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderCarbonCredits = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-light-border p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-success rounded-xl flex items-center justify-center">
              <Leaf size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text-primary">Carbon Credit Tokenization</h2>
              <p className="text-text-secondary">Verified carbon offset credits</p>
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

        {/* Mint Carbon Credits Form */}
        <div className="bg-light-card rounded-xl p-6 border border-light-border mb-8">
          <h3 className="font-bold text-text-primary mb-4">Mint Carbon Credits</h3>
          
          <form onSubmit={handleMintCarbonCredits} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Project ID
                </label>
                <input
                  type="text"
                  value={carbonForm.projectId}
                  onChange={(e) => setCarbonForm({...carbonForm, projectId: e.target.value})}
                  placeholder="e.g., FOREST-BRA-001"
                  className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-success/20 focus:border-success/50 text-text-primary"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Amount (tons)
                </label>
                <input
                  type="number"
                  value={carbonForm.amount}
                  onChange={(e) => setCarbonForm({...carbonForm, amount: e.target.value})}
                  placeholder="e.g., 1000"
                  className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-success/20 focus:border-success/50 text-text-primary"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Verifier
                </label>
                <select
                  value={carbonForm.verifier}
                  onChange={(e) => setCarbonForm({...carbonForm, verifier: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-success/20 focus:border-success/50 text-text-primary"
                  required
                >
                  <option value="Verra">Verra</option>
                  <option value="Gold Standard">Gold Standard</option>
                  <option value="American Carbon Registry">American Carbon Registry</option>
                  <option value="Plan Vivo">Plan Vivo</option>
                </select>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={!carbonForm.projectId || !carbonForm.amount || !carbonForm.verifier || carbonLoading}
              className="w-full py-3 bg-success text-white rounded-xl font-medium hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center space-x-2"
            >
              {carbonLoading ? (
                <>
                  <RefreshCw size={18} className="animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Leaf size={18} />
                  <span>Mint Carbon Credits</span>
                </>
              )}
            </button>
          </form>
          
          {carbonResult && (
            <div className={`mt-4 p-4 rounded-xl ${
              carbonResult.status === 'confirmed' ? 'bg-success/10 border border-success/20' : 'bg-error/10 border border-error/20'
            }`}>
              <div className="flex items-center space-x-2 mb-2">
                {carbonResult.status === 'confirmed' ? (
                  <CheckCircle size={18} className="text-success" />
                ) : (
                  <AlertTriangle size={18} className="text-error" />
                )}
                <span className="font-medium">
                  {carbonResult.status === 'confirmed' ? 'Carbon Credits Minted Successfully' : 'Minting Failed'}
                </span>
              </div>
              {carbonResult.status === 'confirmed' && (
                <div className="text-sm text-text-secondary">
                  <p>Transaction Hash: {carbonResult.txHash.slice(0, 10)}...{carbonResult.txHash.slice(-8)}</p>
                  <p>Token ID: {carbonResult.tokenId}</p>
                  <p>Price Per Ton: ${carbonResult.pricePerTon.toFixed(2)}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Carbon Credits */}
        <div className="overflow-hidden rounded-xl border border-light-border">
          <table className="w-full">
            <thead className="bg-light-card">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Project</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Location</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Verifier</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Price/Ton</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Vintage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-light-border">
              {carbonCredits.map((credit, index) => (
                <tr key={index} className="bg-white hover:bg-light-hover transition-colors duration-300">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                        <Leaf size={20} className="text-success" />
                      </div>
                      <div className="font-medium text-text-primary">{credit.projectId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2 text-text-secondary">
                      <MapPin size={14} />
                      <span>{credit.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-text-secondary">{credit.creditType}</td>
                  <td className="px-6 py-4 text-text-secondary">{credit.verifier}</td>
                  <td className="px-6 py-4 font-medium text-text-primary">
                    {credit.availableCredits.toLocaleString()}/{credit.amount.toLocaleString()} tons
                  </td>
                  <td className="px-6 py-4 font-medium text-success">${credit.pricePerTon.toFixed(2)}</td>
                  <td className="px-6 py-4 text-text-secondary">{credit.vintage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderGameAssets = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-light-border p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
              <Gamepad size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text-primary">Game Asset Tokenization</h2>
              <p className="text-text-secondary">Tokenized in-game items and assets</p>
            </div>
          </div>
          <button
            onClick={refreshData}
            className="flex items-center space-x-2 px-4 py-2 bg-secondary text-white rounded-xl hover:scale-105 transition-all duration-300"
          >
            <RefreshCw size={18} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Tokenize Game Asset Form */}
        <div className="bg-light-card rounded-xl p-6 border border-light-border mb-8">
          <h3 className="font-bold text-text-primary mb-4">Tokenize Game Asset</h3>
          
          <form onSubmit={handleTokenizeGameAsset} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Asset Name
                </label>
                <input
                  type="text"
                  value={gameAssetForm.assetName}
                  onChange={(e) => setGameAssetForm({...gameAssetForm, assetName: e.target.value})}
                  placeholder="e.g., Legendary Sword of Truth"
                  className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary/50 text-text-primary"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Game
                </label>
                <input
                  type="text"
                  value={gameAssetForm.game}
                  onChange={(e) => setGameAssetForm({...gameAssetForm, game: e.target.value})}
                  placeholder="e.g., Ethereal Realms"
                  className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary/50 text-text-primary"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Asset Type
                </label>
                <input
                  type="text"
                  value={gameAssetForm.assetType}
                  onChange={(e) => setGameAssetForm({...gameAssetForm, assetType: e.target.value})}
                  placeholder="e.g., Weapon, Land, Vehicle"
                  className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary/50 text-text-primary"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Rarity
                </label>
                <select
                  value={gameAssetForm.rarity}
                  onChange={(e) => setGameAssetForm({...gameAssetForm, rarity: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary/50 text-text-primary"
                  required
                >
                  <option value="Common">Common</option>
                  <option value="Uncommon">Uncommon</option>
                  <option value="Rare">Rare</option>
                  <option value="Epic">Epic</option>
                  <option value="Legendary">Legendary</option>
                  <option value="Mythic">Mythic</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Total Units
                </label>
                <input
                  type="number"
                  value={gameAssetForm.totalUnits}
                  onChange={(e) => setGameAssetForm({...gameAssetForm, totalUnits: e.target.value})}
                  placeholder="e.g., 100"
                  className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary/50 text-text-primary"
                  required
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={!gameAssetForm.assetName || !gameAssetForm.game || !gameAssetForm.assetType || !gameAssetForm.rarity || !gameAssetForm.totalUnits || gameAssetLoading}
              className="w-full py-3 bg-secondary text-white rounded-xl font-medium hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center space-x-2"
            >
              {gameAssetLoading ? (
                <>
                  <RefreshCw size={18} className="animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Gamepad size={18} />
                  <span>Tokenize Game Asset</span>
                </>
              )}
            </button>
          </form>
          
          {gameAssetResult && (
            <div className={`mt-4 p-4 rounded-xl ${
              gameAssetResult.status === 'confirmed' ? 'bg-success/10 border border-success/20' : 'bg-error/10 border border-error/20'
            }`}>
              <div className="flex items-center space-x-2 mb-2">
                {gameAssetResult.status === 'confirmed' ? (
                  <CheckCircle size={18} className="text-success" />
                ) : (
                  <AlertTriangle size={18} className="text-error" />
                )}
                <span className="font-medium">
                  {gameAssetResult.status === 'confirmed' ? 'Game Asset Tokenized Successfully' : 'Tokenization Failed'}
                </span>
              </div>
              {gameAssetResult.status === 'confirmed' && (
                <div className="text-sm text-text-secondary">
                  <p>Transaction Hash: {gameAssetResult.txHash.slice(0, 10)}...{gameAssetResult.txHash.slice(-8)}</p>
                  <p>Token ID: {gameAssetResult.tokenId}</p>
                  <p>Price: {gameAssetResult.price} ETH</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Game Assets */}
        <div className="overflow-hidden rounded-xl border border-light-border">
          <table className="w-full">
            <thead className="bg-light-card">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Asset</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Game</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Rarity</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Price</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Available</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Creator</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-light-border">
              {gameAssets.map((asset, index) => (
                <tr key={index} className="bg-white hover:bg-light-hover transition-colors duration-300">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                        <Gamepad size={20} className="text-secondary" />
                      </div>
                      <div className="font-medium text-text-primary">{asset.assetName}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-text-secondary">{asset.game}</td>
                  <td className="px-6 py-4 text-text-secondary">{asset.assetType}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      asset.rarity === 'Common' ? 'bg-gray-200 text-gray-700' :
                      asset.rarity === 'Uncommon' ? 'bg-green-200 text-green-700' :
                      asset.rarity === 'Rare' ? 'bg-blue-200 text-blue-700' :
                      asset.rarity === 'Epic' ? 'bg-purple-200 text-purple-700' :
                      asset.rarity === 'Legendary' ? 'bg-orange-200 text-orange-700' :
                      'bg-pink-200 text-pink-700'
                    }`}>
                      {asset.rarity}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-secondary">{asset.price} ETH</td>
                  <td className="px-6 py-4 text-text-secondary">{asset.availableUnits} units</td>
                  <td className="px-6 py-4 text-text-secondary">{asset.creator}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
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
                  <h1 className="text-3xl font-bold text-text-primary">RWA Tokenization</h1>
                  <p className="text-text-secondary text-lg">Bringing real-world assets onchain</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-4 py-2 bg-success/10 rounded-xl text-success">
                <CheckCircle size={16} />
                <span className="text-sm font-medium">All Assets Connected</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-light-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'real-estate', label: 'Real Estate', icon: Building },
              { id: 'carbon-credits', label: 'Carbon Credits', icon: Leaf },
              { id: 'game-assets', label: 'Game Assets', icon: Gamepad },
              { id: 'invoices', label: 'Invoices', icon: FileText },
              { id: 'commodities', label: 'Commodities', icon: Package }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-6 py-4 font-medium text-base transition-colors duration-300 ${
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
        {activeTab === 'real-estate' && renderRealEstate()}
        {activeTab === 'carbon-credits' && renderCarbonCredits()}
        {activeTab === 'game-assets' && renderGameAssets()}
        {activeTab === 'invoices' && (
          <div className="text-center py-16 bg-white rounded-2xl border border-light-border">
            <FileText size={64} className="mx-auto mb-6 text-text-muted opacity-50" />
            <h3 className="text-2xl font-bold text-text-primary mb-3">Invoice Factoring Coming Soon</h3>
            <p className="text-text-secondary mb-8 max-w-md mx-auto">
              We're working on bringing tokenized invoice factoring to the platform. Check back soon!
            </p>
          </div>
        )}
        {activeTab === 'commodities' && (
          <div className="text-center py-16 bg-white rounded-2xl border border-light-border">
            <Package size={64} className="mx-auto mb-6 text-text-muted opacity-50" />
            <h3 className="text-2xl font-bold text-text-primary mb-3">Commodities Tokenization Coming Soon</h3>
            <p className="text-text-secondary mb-8 max-w-md mx-auto">
              We're working on bringing tokenized commodities to the platform. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TokenizationDashboard;