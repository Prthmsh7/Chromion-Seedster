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
  Package
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
  const [activeTab, setActiveTab] = useState<'overview' | 'real-estate' | 'carbon-credits' | 'game-assets' | 'invoice-factoring' | 'commodities'>('overview');
  
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
    totalShares: '1000'
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
    assetType: 'Weapon',
    rarity: 'Rare',
    totalUnits: '100'
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

  const handleMintCarbonCredits = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenizationService || !carbonForm.projectId || !carbonForm.amount) return;
    
    try {
      setCarbonLoading(true);
      setCarbonResult(null);
      
      const result = await tokenizationService.simulateMintCarbonCredits(
        carbonForm.projectId,
        parseInt(carbonForm.amount),
        carbonForm.verifier
      );
      
      setCarbonResult(result);
    } catch (error) {
      console.error('Error minting carbon credits:', error);
    } finally {
      setCarbonLoading(false);
    }
  };

  const handleTokenizeGameAsset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenizationService || !gameAssetForm.assetName || !gameAssetForm.game) return;
    
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
              <h1 className="text-3xl font-bold text-text-primary">Real-World Asset Tokenization</h1>
              <p className="text-text-secondary text-lg">Bringing real assets on-chain for DeFi integration</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3 mb-2">
                <Building size={20} className="text-primary" />
                <span className="font-semibold text-text-primary">Real Estate</span>
              </div>
              <div className="text-2xl font-bold text-primary">
                {realEstateTokens.length}
              </div>
              <div className="text-sm text-text-secondary">Properties</div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3 mb-2">
                <Leaf size={20} className="text-success" />
                <span className="font-semibold text-text-primary">Carbon Credits</span>
              </div>
              <div className="text-2xl font-bold text-success">
                {carbonCredits.length}
              </div>
              <div className="text-sm text-text-secondary">Projects</div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3 mb-2">
                <Gamepad size={20} className="text-secondary" />
                <span className="font-semibold text-text-primary">Game Assets</span>
              </div>
              <div className="text-2xl font-bold text-secondary">
                {gameAssets.length}
              </div>
              <div className="text-sm text-text-secondary">Assets</div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3 mb-2">
                <FileText size={20} className="text-error" />
                <span className="font-semibold text-text-primary">Invoices</span>
              </div>
              <div className="text-2xl font-bold text-error">
                {invoiceFactoring.length}
              </div>
              <div className="text-sm text-text-secondary">Factored</div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3 mb-2">
                <Package size={20} className="text-warning" />
                <span className="font-semibold text-text-primary">Commodities</span>
              </div>
              <div className="text-2xl font-bold text-warning">
                {commodities.length}
              </div>
              <div className="text-sm text-text-secondary">Tokenized</div>
            </div>
          </div>
        </div>
      </div>

      {/* Real Estate */}
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
            onClick={() => setActiveTab('real-estate')}
            className="flex items-center space-x-2 text-primary font-medium"
          >
            <span>View Details</span>
            <ArrowRight size={16} />
          </button>
        </div>
        
        {realEstateTokens.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {realEstateTokens.slice(0, 3).map((property, index) => (
              <div key={index} className="bg-light-card rounded-xl overflow-hidden border border-light-border hover:shadow-lg transition-all duration-300">
                <div className="h-48 bg-primary/10 flex items-center justify-center">
                  <Building size={64} className="text-primary/50" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-text-primary text-lg">{property.assetType}</h3>
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-lg text-xs font-medium">
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
                    <div className="text-primary font-bold">
                      {formatCurrency(property.pricePerShare)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Carbon Credits */}
      <div className="bg-white rounded-2xl border border-light-border p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-success rounded-xl flex items-center justify-center">
              <Leaf size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text-primary">Carbon Credits</h2>
              <p className="text-text-secondary">Tokenized environmental impact</p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('carbon-credits')}
            className="flex items-center space-x-2 text-success font-medium"
          >
            <span>View Details</span>
            <ArrowRight size={16} />
          </button>
        </div>
        
        {carbonCredits.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {carbonCredits.slice(0, 4).map((credit, index) => (
              <div key={index} className="bg-light-card rounded-xl overflow-hidden border border-light-border hover:shadow-lg transition-all duration-300">
                <div className="h-32 bg-success/10 flex items-center justify-center">
                  <Leaf size={48} className="text-success/50" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2 py-1 bg-success/10 text-success rounded-lg text-xs font-medium">
                      {credit.creditType}
                    </span>
                    <span className="text-xs text-text-muted">
                      {credit.vintage}
                    </span>
                  </div>
                  
                  <h3 className="font-bold text-text-primary text-lg mb-2">{credit.projectId}</h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-text-secondary text-sm">
                      <MapPin size={14} className="flex-shrink-0" />
                      <span>{credit.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-text-secondary text-sm">
                      <Award size={14} className="flex-shrink-0" />
                      <span>Verifier: {credit.verifier}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <div className="text-text-secondary text-sm">
                      <span className="font-medium">Price per Ton:</span>
                    </div>
                    <div className="text-success font-bold">
                      ${credit.pricePerTon}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Game Assets */}
      <div className="bg-white rounded-2xl border border-light-border p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
              <Gamepad size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text-primary">Game Assets</h2>
              <p className="text-text-secondary">Tokenized in-game items and collectibles</p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('game-assets')}
            className="flex items-center space-x-2 text-secondary font-medium"
          >
            <span>View Details</span>
            <ArrowRight size={16} />
          </button>
        </div>
        
        {gameAssets.length > 0 && (
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
                        <div>
                          <div className="font-medium text-text-primary">{asset.assetName}</div>
                          <div className="text-xs text-text-muted">by {asset.creator}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-text-secondary">{asset.game}</td>
                    <td className="px-6 py-4 text-text-secondary">{asset.assetType}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        asset.rarity === 'Legendary' ? 'bg-secondary/20 text-secondary' :
                        asset.rarity === 'Epic' ? 'bg-primary/20 text-primary' :
                        asset.rarity === 'Rare' ? 'bg-success/20 text-success' :
                        'bg-text-muted/20 text-text-muted'
                      }`}>
                        {asset.rarity}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-secondary">${asset.price}</td>
                    <td className="px-6 py-4 text-text-secondary">{asset.availableUnits}/{asset.availableUnits + 100}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );

  const renderRealEstate = () => (
    <div className="text-center py-16 bg-white rounded-2xl border border-light-border">
      <Building size={64} className="mx-auto mb-6 text-text-muted opacity-50" />
      <h3 className="text-2xl font-bold text-text-primary mb-3">Real Estate Tokenization Coming Soon</h3>
      <p className="text-text-secondary mb-8 max-w-md mx-auto">
        We're working on bringing a comprehensive real estate tokenization interface to the platform. Check back soon!
      </p>
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
                  <h1 className="text-3xl font-bold text-text-primary">RWA Tokenization</h1>
                  <p className="text-text-secondary text-lg">Real-world assets on-chain</p>
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
          <div className="flex space-x-1">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'real-estate', label: 'Real Estate', icon: Building },
              { id: 'carbon-credits', label: 'Carbon Credits', icon: Leaf },
              { id: 'game-assets', label: 'Game Assets', icon: Gamepad },
              { id: 'invoice-factoring', label: 'Invoice Factoring', icon: FileText },
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