import React, { useState, useEffect } from 'react';
import { 
  Coins, 
  TrendingUp, 
  DollarSign, 
  BarChart3, 
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Clock,
  Layers,
  Zap,
  Globe,
  Activity,
  PieChart,
  Wallet,
  ArrowRight,
  Plus,
  Minus,
  Percent,
  CreditCard,
  Lock,
  Unlock,
  Repeat
} from 'lucide-react';
import { 
  DeFiService, 
  initializeDeFiService, 
  LendingPoolData, 
  DEXLiquidityData, 
  YieldStrategy, 
  DerivativesData 
} from '../lib/defi';

interface DeFiDashboardProps {
  onBack: () => void;
}

const DeFiDashboard: React.FC<DeFiDashboardProps> = ({ onBack }) => {
  const [defiService, setDeFiService] = useState<DeFiService | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'lending' | 'dex' | 'yield' | 'derivatives'>('overview');
  
  // DeFi data states
  const [lendingData, setLendingData] = useState<LendingPoolData | null>(null);
  const [dexData, setDexData] = useState<DEXLiquidityData | null>(null);
  const [yieldStrategies, setYieldStrategies] = useState<YieldStrategy[]>([]);
  const [derivativesData, setDerivativesData] = useState<DerivativesData | null>(null);
  
  // Transaction states
  const [depositAmount, setDepositAmount] = useState('');
  const [depositAsset, setDepositAsset] = useState('ETH');
  const [depositLoading, setDepositLoading] = useState(false);
  const [depositResult, setDepositResult] = useState<any>(null);
  
  const [swapAmount, setSwapAmount] = useState('');
  const [fromToken, setFromToken] = useState('ETH');
  const [toToken, setToToken] = useState('USDC');
  const [swapLoading, setSwapLoading] = useState(false);
  const [swapResult, setSwapResult] = useState<any>(null);
  
  const [yieldAmount, setYieldAmount] = useState('');
  const [selectedStrategy, setSelectedStrategy] = useState('');
  const [yieldLoading, setYieldLoading] = useState(false);
  const [yieldResult, setYieldResult] = useState<any>(null);
  
  const [positionSize, setPositionSize] = useState('');
  const [selectedMarket, setSelectedMarket] = useState('ETH-PERP');
  const [isLong, setIsLong] = useState(true);
  const [leverage, setLeverage] = useState(5);
  const [positionLoading, setPositionLoading] = useState(false);
  const [positionResult, setPositionResult] = useState<any>(null);

  useEffect(() => {
    initializeServices();
  }, []);

  const initializeServices = async () => {
    try {
      setIsLoading(true);
      const service = await initializeDeFiService();
      setDeFiService(service);
      
      // Load initial data
      await loadDeFiData(service);
      
    } catch (error) {
      console.error('Error initializing DeFi services:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadDeFiData = async (service: DeFiService) => {
    try {
      const [lendingPoolData, dexLiquidityData, yieldStrategiesData, derivativesData] = await Promise.all([
        service.getLendingPoolData(),
        service.getDEXLiquidity(),
        service.getYieldStrategies(),
        service.getDerivativesData()
      ]);
      
      setLendingData(lendingPoolData);
      setDexData(dexLiquidityData);
      setYieldStrategies(yieldStrategiesData);
      setDerivativesData(derivativesData);
      
    } catch (error) {
      console.error('Error loading DeFi data:', error);
    }
  };

  const refreshData = async () => {
    if (!defiService) return;
    await loadDeFiData(defiService);
  };

  const handleDeposit = async () => {
    if (!defiService || !depositAmount || parseFloat(depositAmount) <= 0) return;
    
    try {
      setDepositLoading(true);
      setDepositResult(null);
      
      const amount = parseFloat(depositAmount);
      const result = await defiService.simulateDeposit(depositAsset, amount);
      
      setDepositResult(result);
    } catch (error) {
      console.error('Error making deposit:', error);
    } finally {
      setDepositLoading(false);
    }
  };

  const handleSwap = async () => {
    if (!defiService || !swapAmount || parseFloat(swapAmount) <= 0) return;
    
    try {
      setSwapLoading(true);
      setSwapResult(null);
      
      const amount = parseFloat(swapAmount);
      const result = await defiService.simulateSwap(fromToken, toToken, amount);
      
      setSwapResult(result);
    } catch (error) {
      console.error('Error making swap:', error);
    } finally {
      setSwapLoading(false);
    }
  };

  const handleYieldInvestment = async () => {
    if (!defiService || !yieldAmount || parseFloat(yieldAmount) <= 0 || !selectedStrategy) return;
    
    try {
      setYieldLoading(true);
      setYieldResult(null);
      
      const amount = parseFloat(yieldAmount);
      const result = await defiService.simulateYieldInvestment(selectedStrategy, amount);
      
      setYieldResult(result);
    } catch (error) {
      console.error('Error making yield investment:', error);
    } finally {
      setYieldLoading(false);
    }
  };

  const handleOpenPosition = async () => {
    if (!defiService || !positionSize || parseFloat(positionSize) <= 0) return;
    
    try {
      setPositionLoading(true);
      setPositionResult(null);
      
      const size = parseFloat(positionSize);
      const result = await defiService.simulateOpenPosition(selectedMarket, size, isLong, leverage);
      
      setPositionResult(result);
    } catch (error) {
      console.error('Error opening position:', error);
    } finally {
      setPositionLoading(false);
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
            <Coins size={32} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">Initializing DeFi Services</h2>
          <p className="text-text-secondary">Connecting to protocols and loading data...</p>
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
              <Coins size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-text-primary">DeFi Integration</h1>
              <p className="text-text-secondary text-lg">Decentralized finance for your investments</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3 mb-2">
                <CreditCard size={20} className="text-primary" />
                <span className="font-semibold text-text-primary">Lending</span>
              </div>
              <div className="text-2xl font-bold text-primary">
                {lendingData ? formatPercentage(lendingData.supplyAPY) : '--'}
              </div>
              <div className="text-sm text-text-secondary">Supply APY</div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3 mb-2">
                <Repeat size={20} className="text-success" />
                <span className="font-semibold text-text-primary">DEX</span>
              </div>
              <div className="text-2xl font-bold text-success">
                {dexData ? formatCurrency(dexData.volume24h) : '--'}
              </div>
              <div className="text-sm text-text-secondary">24h Volume</div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3 mb-2">
                <Zap size={20} className="text-secondary" />
                <span className="font-semibold text-text-primary">Yield</span>
              </div>
              <div className="text-2xl font-bold text-secondary">
                {yieldStrategies.length > 0 ? formatPercentage(Math.max(...yieldStrategies.map(s => s.apy))) : '--'}
              </div>
              <div className="text-sm text-text-secondary">Best APY</div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3 mb-2">
                <Activity size={20} className="text-accent" />
                <span className="font-semibold text-text-primary">Derivatives</span>
              </div>
              <div className="text-2xl font-bold text-accent">
                {derivativesData ? formatCurrency(derivativesData.openInterest) : '--'}
              </div>
              <div className="text-sm text-text-secondary">Open Interest</div>
            </div>
          </div>
        </div>
      </div>

      {/* DeFi Protocols Overview */}
      <div className="bg-white rounded-2xl border border-light-border p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Globe size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text-primary">DeFi Protocols</h2>
              <p className="text-text-secondary">Integrated financial protocols</p>
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Aave */}
          <div className="bg-light-card rounded-xl p-6 border border-light-border">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <img src="https://cryptologos.cc/logos/aave-aave-logo.png" alt="Aave" className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-text-primary">Aave</h3>
                  <p className="text-text-muted text-sm">Lending Protocol</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-text-primary">4.2%</div>
                <div className="flex items-center space-x-1 text-success text-xs">
                  <ArrowUpRight size={12} />
                  <span>+0.3%</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">TVL:</span>
              <span className="font-medium">$5.8B</span>
            </div>
          </div>
          
          {/* Uniswap */}
          <div className="bg-light-card rounded-xl p-6 border border-light-border">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <img src="https://cryptologos.cc/logos/uniswap-uni-logo.png" alt="Uniswap" className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-text-primary">Uniswap</h3>
                  <p className="text-text-muted text-sm">DEX</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-text-primary">$2.4B</div>
                <div className="flex items-center space-x-1 text-success text-xs">
                  <ArrowUpRight size={12} />
                  <span>+5.2%</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">24h Volume:</span>
              <span className="font-medium">$1.2B</span>
            </div>
          </div>
          
          {/* Curve */}
          <div className="bg-light-card rounded-xl p-6 border border-light-border">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <img src="https://cryptologos.cc/logos/curve-dao-token-crv-logo.png" alt="Curve" className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-text-primary">Curve</h3>
                  <p className="text-text-muted text-sm">Stablecoin DEX</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-text-primary">$3.8B</div>
                <div className="flex items-center space-x-1 text-error text-xs">
                  <ArrowDownRight size={12} />
                  <span>-1.8%</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">24h Volume:</span>
              <span className="font-medium">$850M</span>
            </div>
          </div>
          
          {/* GMX */}
          <div className="bg-light-card rounded-xl p-6 border border-light-border">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <img src="https://cryptologos.cc/logos/gmx-gmx-logo.png" alt="GMX" className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-text-primary">GMX</h3>
                  <p className="text-text-muted text-sm">Derivatives</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-text-primary">$1.2B</div>
                <div className="flex items-center space-x-1 text-success text-xs">
                  <ArrowUpRight size={12} />
                  <span>+3.5%</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">Open Interest:</span>
              <span className="font-medium">$580M</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <button 
          onClick={() => setActiveTab('lending')}
          className="bg-white rounded-xl border border-light-border p-6 text-left hover:shadow-lg transition-all duration-300"
        >
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
            <CreditCard size={24} className="text-primary" />
          </div>
          <h3 className="font-bold text-text-primary text-lg mb-2">Lending & Borrowing</h3>
          <p className="text-text-secondary text-sm">Supply assets to earn interest or borrow against your collateral</p>
          <div className="flex items-center space-x-2 mt-4 text-primary">
            <span className="text-sm font-medium">Explore</span>
            <ArrowRight size={16} />
          </div>
        </button>
        
        <button 
          onClick={() => setActiveTab('dex')}
          className="bg-white rounded-xl border border-light-border p-6 text-left hover:shadow-lg transition-all duration-300"
        >
          <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
            <Repeat size={24} className="text-secondary" />
          </div>
          <h3 className="font-bold text-text-primary text-lg mb-2">Decentralized Exchange</h3>
          <p className="text-text-secondary text-sm">Swap tokens with low fees and high liquidity across multiple chains</p>
          <div className="flex items-center space-x-2 mt-4 text-secondary">
            <span className="text-sm font-medium">Explore</span>
            <ArrowRight size={16} />
          </div>
        </button>
        
        <button 
          onClick={() => setActiveTab('yield')}
          className="bg-white rounded-xl border border-light-border p-6 text-left hover:shadow-lg transition-all duration-300"
        >
          <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center mb-4">
            <Zap size={24} className="text-success" />
          </div>
          <h3 className="font-bold text-text-primary text-lg mb-2">Yield Optimization</h3>
          <p className="text-text-secondary text-sm">Maximize returns with AI-powered yield strategies across DeFi</p>
          <div className="flex items-center space-x-2 mt-4 text-success">
            <span className="text-sm font-medium">Explore</span>
            <ArrowRight size={16} />
          </div>
        </button>
        
        <button 
          onClick={() => setActiveTab('derivatives')}
          className="bg-white rounded-xl border border-light-border p-6 text-left hover:shadow-lg transition-all duration-300"
        >
          <div className="w-12 h-12 bg-warning/10 rounded-xl flex items-center justify-center mb-4">
            <Activity size={24} className="text-warning" />
          </div>
          <h3 className="font-bold text-text-primary text-lg mb-2">Derivatives & Perps</h3>
          <p className="text-text-secondary text-sm">Trade perpetual futures with up to 50x leverage on major assets</p>
          <div className="flex items-center space-x-2 mt-4 text-warning">
            <span className="text-sm font-medium">Explore</span>
            <ArrowRight size={16} />
          </div>
        </button>
      </div>
    </div>
  );

  const renderLending = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-light-border p-8 shadow-sm">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
            <CreditCard size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-text-primary">Lending & Borrowing</h2>
            <p className="text-text-secondary">Supply assets to earn interest or borrow against your collateral</p>
          </div>
        </div>

        {lendingData && (
          <div className="space-y-6">
            {/* Lending Pool Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-light-card rounded-xl p-6 border border-light-border">
                <h3 className="font-bold text-text-primary mb-2">Total Supplied</h3>
                <div className="text-2xl font-bold text-primary">{formatCurrency(lendingData.totalSupplied)}</div>
                <div className="flex items-center space-x-1 text-success text-sm mt-1">
                  <ArrowUpRight size={14} />
                  <span>+5.2% this week</span>
                </div>
              </div>
              
              <div className="bg-light-card rounded-xl p-6 border border-light-border">
                <h3 className="font-bold text-text-primary mb-2">Total Borrowed</h3>
                <div className="text-2xl font-bold text-secondary">{formatCurrency(lendingData.totalBorrowed)}</div>
                <div className="flex items-center space-x-1 text-success text-sm mt-1">
                  <ArrowUpRight size={14} />
                  <span>+3.8% this week</span>
                </div>
              </div>
              
              <div className="bg-light-card rounded-xl p-6 border border-light-border">
                <h3 className="font-bold text-text-primary mb-2">Supply APY</h3>
                <div className="text-2xl font-bold text-success">{formatPercentage(lendingData.supplyAPY)}</div>
                <div className="flex items-center space-x-1 text-success text-sm mt-1">
                  <ArrowUpRight size={14} />
                  <span>+0.3% this week</span>
                </div>
              </div>
              
              <div className="bg-light-card rounded-xl p-6 border border-light-border">
                <h3 className="font-bold text-text-primary mb-2">Borrow APY</h3>
                <div className="text-2xl font-bold text-warning">{formatPercentage(lendingData.borrowAPY)}</div>
                <div className="flex items-center space-x-1 text-error text-sm mt-1">
                  <ArrowUpRight size={14} />
                  <span>+0.5% this week</span>
                </div>
              </div>
            </div>

            {/* Supply Assets */}
            <div className="bg-light-card rounded-xl p-6 border border-light-border">
              <h3 className="font-bold text-text-primary mb-4">Supply Assets</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Asset
                  </label>
                  <select
                    value={depositAsset}
                    onChange={(e) => setDepositAsset(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary"
                  >
                    <option value="ETH">ETH</option>
                    <option value="USDC">USDC</option>
                    <option value="BTC">BTC</option>
                    <option value="LINK">LINK</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Amount
                  </label>
                  <input
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    placeholder="0.0"
                    className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-6">
                <div className="text-sm text-text-secondary">
                  <span>Estimated APY: </span>
                  <span className="font-medium text-success">{depositAsset === 'ETH' ? '3.8%' : depositAsset === 'USDC' ? '4.2%' : depositAsset === 'BTC' ? '3.5%' : '4.0%'}</span>
                </div>
                <div className="text-sm text-text-secondary">
                  <span>Available Liquidity: </span>
                  <span className="font-medium">{formatCurrency(lendingData.availableLiquidity)}</span>
                </div>
              </div>
              
              <button
                onClick={handleDeposit}
                disabled={!depositAmount || parseFloat(depositAmount) <= 0 || depositLoading}
                className="w-full py-3 bg-primary text-white rounded-xl font-medium hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center space-x-2"
              >
                {depositLoading ? (
                  <>
                    <RefreshCw size={18} className="animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Plus size={18} />
                    <span>Supply {depositAsset}</span>
                  </>
                )}
              </button>
              
              {depositResult && (
                <div className={`mt-4 p-4 rounded-xl ${
                  depositResult.status === 'confirmed' ? 'bg-success/10 border border-success/20' : 'bg-error/10 border border-error/20'
                }`}>
                  <div className="flex items-center space-x-2 mb-2">
                    {depositResult.status === 'confirmed' ? (
                      <CheckCircle size={18} className="text-success" />
                    ) : (
                      <AlertTriangle size={18} className="text-error" />
                    )}
                    <span className="font-medium">
                      {depositResult.status === 'confirmed' ? 'Deposit Successful' : 'Deposit Failed'}
                    </span>
                  </div>
                  {depositResult.status === 'confirmed' && (
                    <div className="text-sm text-text-secondary">
                      <p>Transaction Hash: {depositResult.txHash.slice(0, 10)}...{depositResult.txHash.slice(-8)}</p>
                      <p>Estimated APY: {formatPercentage(depositResult.estimatedAPY)}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Asset Market */}
            <div className="overflow-hidden rounded-xl border border-light-border">
              <table className="w-full">
                <thead className="bg-light-card">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Asset</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Market Size</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Supply APY</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Borrow APY</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Utilization</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-light-border">
                  {[
                    { asset: 'ETH', icon: '🔷', marketSize: '$1.2B', supplyAPY: '3.8%', borrowAPY: '5.2%', utilization: '68%' },
                    { asset: 'USDC', icon: '💵', marketSize: '$2.5B', supplyAPY: '4.2%', borrowAPY: '5.8%', utilization: '72%' },
                    { asset: 'BTC', icon: '🔶', marketSize: '$950M', supplyAPY: '3.5%', borrowAPY: '4.9%', utilization: '65%' },
                    { asset: 'LINK', icon: '🔗', marketSize: '$350M', supplyAPY: '4.0%', borrowAPY: '5.5%', utilization: '70%' },
                    { asset: 'AAVE', icon: '👻', marketSize: '$180M', supplyAPY: '4.5%', borrowAPY: '6.2%', utilization: '75%' }
                  ].map((asset, index) => (
                    <tr key={index} className="bg-white hover:bg-light-hover transition-colors duration-300">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-xl">{asset.icon}</span>
                          <span className="font-medium">{asset.asset}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-text-secondary">{asset.marketSize}</td>
                      <td className="px-6 py-4 text-success font-medium">{asset.supplyAPY}</td>
                      <td className="px-6 py-4 text-warning font-medium">{asset.borrowAPY}</td>
                      <td className="px-6 py-4">
                        <div className="w-full bg-light-border rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full"
                            style={{ width: asset.utilization }}
                          ></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderDEX = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-light-border p-8 shadow-sm">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
            <Repeat size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-text-primary">Decentralized Exchange</h2>
            <p className="text-text-secondary">Swap tokens with low fees and high liquidity</p>
          </div>
        </div>

        {dexData && (
          <div className="space-y-6">
            {/* DEX Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-light-card rounded-xl p-6 border border-light-border">
                <h3 className="font-bold text-text-primary mb-2">Total Liquidity</h3>
                <div className="text-2xl font-bold text-primary">{formatCurrency(dexData.totalLiquidity)}</div>
                <div className="flex items-center space-x-1 text-success text-sm mt-1">
                  <ArrowUpRight size={14} />
                  <span>+8.3% this week</span>
                </div>
              </div>
              
              <div className="bg-light-card rounded-xl p-6 border border-light-border">
                <h3 className="font-bold text-text-primary mb-2">24h Volume</h3>
                <div className="text-2xl font-bold text-secondary">{formatCurrency(dexData.volume24h)}</div>
                <div className="flex items-center space-x-1 text-success text-sm mt-1">
                  <ArrowUpRight size={14} />
                  <span>+12.5% this week</span>
                </div>
              </div>
              
              <div className="bg-light-card rounded-xl p-6 border border-light-border">
                <h3 className="font-bold text-text-primary mb-2">24h Fees</h3>
                <div className="text-2xl font-bold text-success">{formatCurrency(dexData.fees24h)}</div>
                <div className="flex items-center space-x-1 text-success text-sm mt-1">
                  <ArrowUpRight size={14} />
                  <span>+10.2% this week</span>
                </div>
              </div>
            </div>

            {/* Swap Interface */}
            <div className="bg-light-card rounded-xl p-6 border border-light-border">
              <h3 className="font-bold text-text-primary mb-4">Swap Tokens</h3>
              
              <div className="space-y-4 mb-6">
                <div className="bg-white rounded-xl p-4 border border-light-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-text-secondary">From</span>
                    <span className="text-sm text-text-secondary">Balance: 1.5 ETH</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <input
                      type="number"
                      value={swapAmount}
                      onChange={(e) => setSwapAmount(e.target.value)}
                      placeholder="0.0"
                      className="w-2/3 bg-transparent border-none focus:outline-none text-xl font-medium text-text-primary"
                    />
                    <select
                      value={fromToken}
                      onChange={(e) => setFromToken(e.target.value)}
                      className="w-1/3 bg-light-card border border-light-border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary"
                    >
                      <option value="ETH">ETH</option>
                      <option value="USDC">USDC</option>
                      <option value="BTC">BTC</option>
                      <option value="LINK">LINK</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <button className="p-2 bg-light-card rounded-full border border-light-border">
                    <ArrowDownRight size={20} className="text-text-secondary" />
                  </button>
                </div>
                
                <div className="bg-white rounded-xl p-4 border border-light-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-text-secondary">To</span>
                    <span className="text-sm text-text-secondary">Balance: 2,500 USDC</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="w-2/3 text-xl font-medium text-text-primary">
                      {swapAmount && parseFloat(swapAmount) > 0 ? 
                        (fromToken === 'ETH' && toToken === 'USDC' ? parseFloat(swapAmount) * 3200 :
                         fromToken === 'USDC' && toToken === 'ETH' ? parseFloat(swapAmount) / 3200 :
                         fromToken === 'BTC' && toToken === 'USDC' ? parseFloat(swapAmount) * 65000 :
                         fromToken === 'USDC' && toToken === 'BTC' ? parseFloat(swapAmount) / 65000 :
                         parseFloat(swapAmount)).toFixed(6) : 
                        '0.0'
                      }
                    </div>
                    <select
                      value={toToken}
                      onChange={(e) => setToToken(e.target.value)}
                      className="w-1/3 bg-light-card border border-light-border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary"
                    >
                      <option value="USDC">USDC</option>
                      <option value="ETH">ETH</option>
                      <option value="BTC">BTC</option>
                      <option value="LINK">LINK</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-6 text-sm text-text-secondary">
                <span>Slippage Tolerance: 0.5%</span>
                <span>Fee: 0.3%</span>
              </div>
              
              <button
                onClick={handleSwap}
                disabled={!swapAmount || parseFloat(swapAmount) <= 0 || fromToken === toToken || swapLoading}
                className="w-full py-3 bg-secondary text-white rounded-xl font-medium hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center space-x-2"
              >
                {swapLoading ? (
                  <>
                    <RefreshCw size={18} className="animate-spin" />
                    <span>Processing Swap...</span>
                  </>
                ) : (
                  <>
                    <Repeat size={18} />
                    <span>Swap {fromToken} to {toToken}</span>
                  </>
                )}
              </button>
              
              {swapResult && (
                <div className={`mt-4 p-4 rounded-xl ${
                  swapResult.status === 'confirmed' ? 'bg-success/10 border border-success/20' : 'bg-error/10 border border-error/20'
                }`}>
                  <div className="flex items-center space-x-2 mb-2">
                    {swapResult.status === 'confirmed' ? (
                      <CheckCircle size={18} className="text-success" />
                    ) : (
                      <AlertTriangle size={18} className="text-error" />
                    )}
                    <span className="font-medium">
                      {swapResult.status === 'confirmed' ? 'Swap Successful' : 'Swap Failed'}
                    </span>
                  </div>
                  {swapResult.status === 'confirmed' && (
                    <div className="text-sm text-text-secondary">
                      <p>Transaction Hash: {swapResult.txHash.slice(0, 10)}...{swapResult.txHash.slice(-8)}</p>
                      <p>Output Amount: {swapResult.outputAmount.toFixed(6)} {toToken}</p>
                      <p>Price Impact: {swapResult.priceImpact.toFixed(2)}%</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Top Pairs */}
            <div className="overflow-hidden rounded-xl border border-light-border">
              <table className="w-full">
                <thead className="bg-light-card">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Pair</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Liquidity</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Volume (24h)</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Fees (24h)</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">APR</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-light-border">
                  {dexData.topPairs.map((pair, index) => (
                    <tr key={index} className="bg-white hover:bg-light-hover transition-colors duration-300">
                      <td className="px-6 py-4">
                        <div className="font-medium text-text-primary">{pair.pair}</div>
                      </td>
                      <td className="px-6 py-4 text-text-secondary">{formatCurrency(pair.liquidity)}</td>
                      <td className="px-6 py-4 text-text-secondary">{formatCurrency(pair.volume24h)}</td>
                      <td className="px-6 py-4 text-text-secondary">{formatCurrency(pair.fee)}</td>
                      <td className="px-6 py-4 text-success font-medium">
                        {formatPercentage((pair.fee / pair.liquidity) * 365 * 100)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderYield = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-light-border p-8 shadow-sm">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-success rounded-xl flex items-center justify-center">
            <Zap size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-text-primary">Yield Optimization</h2>
            <p className="text-text-secondary">Maximize returns with AI-powered yield strategies</p>
          </div>
        </div>

        {yieldStrategies.length > 0 && (
          <div className="space-y-6">
            {/* Yield Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-light-card rounded-xl p-6 border border-light-border">
                <h3 className="font-bold text-text-primary mb-2">Best APY</h3>
                <div className="text-2xl font-bold text-success">{formatPercentage(Math.max(...yieldStrategies.map(s => s.apy)))}</div>
                <div className="text-sm text-text-secondary mt-1">
                  {yieldStrategies.find(s => s.apy === Math.max(...yieldStrategies.map(s => s.apy)))?.name}
                </div>
              </div>
              
              <div className="bg-light-card rounded-xl p-6 border border-light-border">
                <h3 className="font-bold text-text-primary mb-2">Total Value Locked</h3>
                <div className="text-2xl font-bold text-primary">{formatCurrency(yieldStrategies.reduce((sum, s) => sum + s.tvl, 0))}</div>
                <div className="flex items-center space-x-1 text-success text-sm mt-1">
                  <ArrowUpRight size={14} />
                  <span>+15.2% this month</span>
                </div>
              </div>
              
              <div className="bg-light-card rounded-xl p-6 border border-light-border">
                <h3 className="font-bold text-text-primary mb-2">Average APY</h3>
                <div className="text-2xl font-bold text-secondary">
                  {formatPercentage(yieldStrategies.reduce((sum, s) => sum + s.apy, 0) / yieldStrategies.length)}
                </div>
                <div className="flex items-center space-x-1 text-success text-sm mt-1">
                  <ArrowUpRight size={14} />
                  <span>+2.1% this month</span>
                </div>
              </div>
            </div>

            {/* Yield Investment Interface */}
            <div className="bg-light-card rounded-xl p-6 border border-light-border">
              <h3 className="font-bold text-text-primary mb-4">Invest in Yield Strategy</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Strategy
                  </label>
                  <select
                    value={selectedStrategy}
                    onChange={(e) => setSelectedStrategy(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary"
                  >
                    <option value="">Select a strategy</option>
                    {yieldStrategies.map((strategy, index) => (
                      <option key={index} value={strategy.name}>
                        {strategy.name} ({formatPercentage(strategy.apy)} APY)
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Amount
                  </label>
                  <input
                    type="number"
                    value={yieldAmount}
                    onChange={(e) => setYieldAmount(e.target.value)}
                    placeholder="0.0"
                    className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary"
                  />
                </div>
              </div>
              
              {selectedStrategy && (
                <div className="bg-white rounded-xl p-4 border border-light-border mb-6">
                  <h4 className="font-medium text-text-primary mb-3">Strategy Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Protocol:</span>
                      <span className="font-medium">
                        {yieldStrategies.find(s => s.name === selectedStrategy)?.protocol}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Chain:</span>
                      <span className="font-medium">
                        {yieldStrategies.find(s => s.name === selectedStrategy)?.chain}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">APY:</span>
                      <span className="font-medium text-success">
                        {formatPercentage(yieldStrategies.find(s => s.name === selectedStrategy)?.apy || 0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Risk Level:</span>
                      <span className={`font-medium ${
                        yieldStrategies.find(s => s.name === selectedStrategy)?.risk === 'low' ? 'text-success' :
                        yieldStrategies.find(s => s.name === selectedStrategy)?.risk === 'medium' ? 'text-warning' :
                        'text-error'
                      }`}>
                        {yieldStrategies.find(s => s.name === selectedStrategy)?.risk.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              )}
              
              <button
                onClick={handleYieldInvestment}
                disabled={!yieldAmount || parseFloat(yieldAmount) <= 0 || !selectedStrategy || yieldLoading}
                className="w-full py-3 bg-success text-white rounded-xl font-medium hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center space-x-2"
              >
                {yieldLoading ? (
                  <>
                    <RefreshCw size={18} className="animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Zap size={18} />
                    <span>Invest in Strategy</span>
                  </>
                )}
              </button>
              
              {yieldResult && (
                <div className={`mt-4 p-4 rounded-xl ${
                  yieldResult.status === 'confirmed' ? 'bg-success/10 border border-success/20' : 'bg-error/10 border border-error/20'
                }`}>
                  <div className="flex items-center space-x-2 mb-2">
                    {yieldResult.status === 'confirmed' ? (
                      <CheckCircle size={18} className="text-success" />
                    ) : (
                      <AlertTriangle size={18} className="text-error" />
                    )}
                    <span className="font-medium">
                      {yieldResult.status === 'confirmed' ? 'Investment Successful' : 'Investment Failed'}
                    </span>
                  </div>
                  {yieldResult.status === 'confirmed' && (
                    <div className="text-sm text-text-secondary">
                      <p>Transaction Hash: {yieldResult.txHash.slice(0, 10)}...{yieldResult.txHash.slice(-8)}</p>
                      <p>Estimated APY: {formatPercentage(yieldResult.estimatedAPY)}</p>
                      <p>Estimated Daily Yield: {formatCurrency(yieldResult.estimatedDailyYield)}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Yield Strategies */}
            <div className="overflow-hidden rounded-xl border border-light-border">
              <table className="w-full">
                <thead className="bg-light-card">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Strategy</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Protocol</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Chain</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">TVL</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">APY</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Risk</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-light-border">
                  {yieldStrategies.map((strategy, index) => (
                    <tr key={index} className="bg-white hover:bg-light-hover transition-colors duration-300">
                      <td className="px-6 py-4">
                        <div className="font-medium text-text-primary">{strategy.name}</div>
                      </td>
                      <td className="px-6 py-4 text-text-secondary">{strategy.protocol}</td>
                      <td className="px-6 py-4 text-text-secondary">{strategy.chain}</td>
                      <td className="px-6 py-4 text-text-secondary">{formatCurrency(strategy.tvl)}</td>
                      <td className="px-6 py-4 text-success font-medium">{formatPercentage(strategy.apy)}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          strategy.risk === 'low' ? 'bg-success/20 text-success' :
                          strategy.risk === 'medium' ? 'bg-warning/20 text-warning' :
                          'bg-error/20 text-error'
                        }`}>
                          {strategy.risk.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderDerivatives = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-light-border p-8 shadow-sm">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-warning rounded-xl flex items-center justify-center">
            <Activity size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-text-primary">Derivatives & Perpetuals</h2>
            <p className="text-text-secondary">Trade with leverage on major assets</p>
          </div>
        </div>

        {derivativesData && (
          <div className="space-y-6">
            {/* Derivatives Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-light-card rounded-xl p-6 border border-light-border">
                <h3 className="font-bold text-text-primary mb-2">Open Interest</h3>
                <div className="text-2xl font-bold text-primary">{formatCurrency(derivativesData.openInterest)}</div>
                <div className="flex items-center space-x-1 text-success text-sm mt-1">
                  <ArrowUpRight size={14} />
                  <span>+12.8% this week</span>
                </div>
              </div>
              
              <div className="bg-light-card rounded-xl p-6 border border-light-border">
                <h3 className="font-bold text-text-primary mb-2">24h Volume</h3>
                <div className="text-2xl font-bold text-secondary">{formatCurrency(derivativesData.volume24h)}</div>
                <div className="flex items-center space-x-1 text-success text-sm mt-1">
                  <ArrowUpRight size={14} />
                  <span>+18.5% this week</span>
                </div>
              </div>
              
              <div className="bg-light-card rounded-xl p-6 border border-light-border">
                <h3 className="font-bold text-text-primary mb-2">Long/Short Ratio</h3>
                <div className="text-2xl font-bold text-warning">{derivativesData.longShortRatio.toFixed(2)}</div>
                <div className="flex items-center space-x-1 text-success text-sm mt-1">
                  <ArrowUpRight size={14} />
                  <span>+0.3 this week</span>
                </div>
              </div>
            </div>

            {/* Trading Interface */}
            <div className="bg-light-card rounded-xl p-6 border border-light-border">
              <h3 className="font-bold text-text-primary mb-4">Open Position</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Market
                  </label>
                  <select
                    value={selectedMarket}
                    onChange={(e) => setSelectedMarket(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary"
                  >
                    {derivativesData.topMarkets.map((market, index) => (
                      <option key={index} value={market.market}>
                        {market.market}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Position Size (USD)
                  </label>
                  <input
                    type="number"
                    value={positionSize}
                    onChange={(e) => setPositionSize(e.target.value)}
                    placeholder="0.0"
                    className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Position Type
                  </label>
                  <div className="flex">
                    <button
                      onClick={() => setIsLong(true)}
                      className={`flex-1 py-3 rounded-l-xl font-medium transition-all duration-300 ${
                        isLong ? 'bg-success text-white' : 'bg-white border border-light-border text-text-secondary'
                      }`}
                    >
                      Long
                    </button>
                    <button
                      onClick={() => setIsLong(false)}
                      className={`flex-1 py-3 rounded-r-xl font-medium transition-all duration-300 ${
                        !isLong ? 'bg-error text-white' : 'bg-white border border-light-border text-text-secondary'
                      }`}
                    >
                      Short
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Leverage: {leverage}x
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={leverage}
                    onChange={(e) => setLeverage(parseInt(e.target.value))}
                    className="w-full h-2 bg-light-border rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-text-muted mt-1">
                    <span>1x</span>
                    <span>10x</span>
                    <span>25x</span>
                    <span>50x</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 border border-light-border mb-6">
                <h4 className="font-medium text-text-primary mb-3">Position Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Entry Price:</span>
                    <span className="font-medium">
                      {selectedMarket === 'ETH-PERP' ? '$3,245.75' :
                       selectedMarket === 'BTC-PERP' ? '$65,432.18' :
                       selectedMarket === 'SOL-PERP' ? '$118.45' :
                       '$18.32'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Margin:</span>
                    <span className="font-medium">
                      {positionSize && parseFloat(positionSize) > 0 ? 
                        formatCurrency(parseFloat(positionSize) / leverage) : 
                        '$0'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Fees:</span>
                    <span className="font-medium">
                      {positionSize && parseFloat(positionSize) > 0 ? 
                        formatCurrency(parseFloat(positionSize) * 0.001) : 
                        '$0'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Funding Rate:</span>
                    <span className={`font-medium ${
                      derivativesData.topMarkets.find(m => m.market === selectedMarket)?.fundingRate! > 0 ? 
                        'text-success' : 'text-error'
                    }`}>
                      {formatPercentage(derivativesData.topMarkets.find(m => m.market === selectedMarket)?.fundingRate! * 100)}
                    </span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleOpenPosition}
                disabled={!positionSize || parseFloat(positionSize) <= 0 || positionLoading}
                className={`w-full py-3 ${
                  isLong ? 'bg-success' : 'bg-error'
                } text-white rounded-xl font-medium hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center space-x-2`}
              >
                {positionLoading ? (
                  <>
                    <RefreshCw size={18} className="animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    {isLong ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
                    <span>{isLong ? 'Open Long Position' : 'Open Short Position'}</span>
                  </>
                )}
              </button>
              
              {positionResult && (
                <div className={`mt-4 p-4 rounded-xl ${
                  positionResult.status === 'confirmed' ? 'bg-success/10 border border-success/20' : 'bg-error/10 border border-error/20'
                }`}>
                  <div className="flex items-center space-x-2 mb-2">
                    {positionResult.status === 'confirmed' ? (
                      <CheckCircle size={18} className="text-success" />
                    ) : (
                      <AlertTriangle size={18} className="text-error" />
                    )}
                    <span className="font-medium">
                      {positionResult.status === 'confirmed' ? 'Position Opened Successfully' : 'Failed to Open Position'}
                    </span>
                  </div>
                  {positionResult.status === 'confirmed' && (
                    <div className="text-sm text-text-secondary">
                      <p>Transaction Hash: {positionResult.txHash.slice(0, 10)}...{positionResult.txHash.slice(-8)}</p>
                      <p>Liquidation Price: ${positionResult.liquidationPrice.toFixed(2)}</p>
                      <p>Margin: {formatCurrency(positionResult.margin)}</p>
                      <p>Funding Rate: {formatPercentage(positionResult.fundingRate * 100)}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Top Markets */}
            <div className="overflow-hidden rounded-xl border border-light-border">
              <table className="w-full">
                <thead className="bg-light-card">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Market</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Price</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">24h Change</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Open Interest</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Volume (24h)</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Funding Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-light-border">
                  {derivativesData.topMarkets.map((market, index) => {
                    const price = market.market === 'ETH-PERP' ? 3245.75 :
                                 market.market === 'BTC-PERP' ? 65432.18 :
                                 market.market === 'SOL-PERP' ? 118.45 :
                                 18.32;
                    
                    const change = market.market === 'ETH-PERP' ? 2.8 :
                                  market.market === 'BTC-PERP' ? -1.2 :
                                  market.market === 'SOL-PERP' ? 5.4 :
                                  1.5;
                    
                    return (
                      <tr key={index} className="bg-white hover:bg-light-hover transition-colors duration-300">
                        <td className="px-6 py-4">
                          <div className="font-medium text-text-primary">{market.market}</div>
                        </td>
                        <td className="px-6 py-4 text-text-primary font-medium">${price.toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <div className={`flex items-center space-x-1 ${change > 0 ? 'text-success' : 'text-error'}`}>
                            {change > 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                            <span className="font-medium">{Math.abs(change).toFixed(2)}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-text-secondary">{formatCurrency(market.openInterest)}</td>
                        <td className="px-6 py-4 text-text-secondary">{formatCurrency(market.volume24h)}</td>
                        <td className="px-6 py-4">
                          <div className={`flex items-center space-x-1 ${market.fundingRate > 0 ? 'text-success' : 'text-error'}`}>
                            <span className="font-medium">{formatPercentage(market.fundingRate * 100)}</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
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
                  <Coins size={24} className="text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-text-primary">DeFi Integration</h1>
                  <p className="text-text-secondary text-lg">Decentralized finance for your investments</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-4 py-2 bg-success/10 rounded-xl text-success">
                <CheckCircle size={16} />
                <span className="text-sm font-medium">All Protocols Connected</span>
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
              { id: 'lending', label: 'Lending', icon: CreditCard },
              { id: 'dex', label: 'DEX', icon: Repeat },
              { id: 'yield', label: 'Yield', icon: Zap },
              { id: 'derivatives', label: 'Derivatives', icon: Activity }
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
        {activeTab === 'lending' && renderLending()}
        {activeTab === 'dex' && renderDEX()}
        {activeTab === 'yield' && renderYield()}
        {activeTab === 'derivatives' && renderDerivatives()}
      </div>
    </div>
  );
};

export default DeFiDashboard;