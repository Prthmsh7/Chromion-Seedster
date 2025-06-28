import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Link, 
  ArrowRight, 
  RefreshCw, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Zap, 
  BarChart3, 
  Layers, 
  Wallet, 
  Send, 
  ArrowRightLeft, 
  Coins, 
  DollarSign, 
  Percent, 
  Users, 
  Activity
} from 'lucide-react';
import { 
  CrossChainService, 
  initializeCrossChainService, 
  CrossChainTransaction, 
  CrossChainLiquidityPool, 
  CrossChainNFTBridge, 
  SUPPORTED_CHAINS 
} from '../lib/crosschain';

interface CrossChainDashboardProps {
  onBack: () => void;
}

const CrossChainDashboard: React.FC<CrossChainDashboardProps> = ({ onBack }) => {
  const [crossChainService, setCrossChainService] = useState<CrossChainService | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'liquidity' | 'nft-bridge'>('overview');
  
  // Cross-chain data states
  const [transactions, setTransactions] = useState<CrossChainTransaction[]>([]);
  const [liquidityPools, setLiquidityPools] = useState<CrossChainLiquidityPool[]>([]);
  const [nftBridges, setNftBridges] = useState<CrossChainNFTBridge[]>([]);
  const [supportedChains, setSupportedChains] = useState<any[]>([]);
  
  // Form states
  const [transferForm, setTransferForm] = useState({
    sourceChain: 'ethereum',
    destinationChain: 'polygon',
    token: 'USDC',
    amount: '',
    receiver: '0x...'
  });
  const [transferLoading, setTransferLoading] = useState(false);
  const [transferResult, setTransferResult] = useState<any>(null);
  
  const [nftBridgeForm, setNftBridgeForm] = useState({
    sourceChain: 'ethereum',
    destinationChain: 'polygon',
    nftContract: '0x...',
    tokenId: ''
  });
  const [nftBridgeLoading, setNftBridgeLoading] = useState(false);
  const [nftBridgeResult, setNftBridgeResult] = useState<any>(null);
  
  const [liquidityForm, setLiquidityForm] = useState({
    sourceChain: 'ethereum',
    destinationChain: 'polygon',
    token: 'USDC',
    amount: ''
  });
  const [liquidityLoading, setLiquidityLoading] = useState(false);
  const [liquidityResult, setLiquidityResult] = useState<any>(null);

  useEffect(() => {
    initializeServices();
  }, []);

  const initializeServices = async () => {
    try {
      setIsLoading(true);
      const service = await initializeCrossChainService();
      setCrossChainService(service);
      
      // Load initial data
      await loadCrossChainData(service);
      
    } catch (error) {
      console.error('Error initializing Cross-Chain services:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadCrossChainData = async (service: CrossChainService) => {
    try {
      const [txs, pools, bridges] = await Promise.all([
        service.getCrossChainTransactions(),
        service.getCrossChainLiquidityPools(),
        service.getCrossChainNFTBridges()
      ]);
      
      setTransactions(txs);
      setLiquidityPools(pools);
      setNftBridges(bridges);
      setSupportedChains(service.getSupportedChains());
      
    } catch (error) {
      console.error('Error loading cross-chain data:', error);
    }
  };

  const refreshData = async () => {
    if (!crossChainService) return;
    await loadCrossChainData(crossChainService);
  };

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!crossChainService || !transferForm.amount || parseFloat(transferForm.amount) <= 0) return;
    
    try {
      setTransferLoading(true);
      setTransferResult(null);
      
      const result = await crossChainService.simulateCrossChainTransfer(
        transferForm.sourceChain,
        transferForm.destinationChain,
        transferForm.token,
        parseFloat(transferForm.amount),
        transferForm.receiver
      );
      
      setTransferResult(result);
    } catch (error) {
      console.error('Error making cross-chain transfer:', error);
    } finally {
      setTransferLoading(false);
    }
  };

  const handleNFTBridge = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!crossChainService || !nftBridgeForm.tokenId) return;
    
    try {
      setNftBridgeLoading(true);
      setNftBridgeResult(null);
      
      const result = await crossChainService.simulateCrossChainNFTBridge(
        nftBridgeForm.sourceChain,
        nftBridgeForm.destinationChain,
        nftBridgeForm.nftContract,
        nftBridgeForm.tokenId
      );
      
      setNftBridgeResult(result);
    } catch (error) {
      console.error('Error bridging NFT:', error);
    } finally {
      setNftBridgeLoading(false);
    }
  };

  const handleAddLiquidity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!crossChainService || !liquidityForm.amount || parseFloat(liquidityForm.amount) <= 0) return;
    
    try {
      setLiquidityLoading(true);
      setLiquidityResult(null);
      
      const result = await crossChainService.simulateAddLiquidity(
        liquidityForm.sourceChain,
        liquidityForm.destinationChain,
        liquidityForm.token,
        parseFloat(liquidityForm.amount)
      );
      
      setLiquidityResult(result);
    } catch (error) {
      console.error('Error adding liquidity:', error);
    } finally {
      setLiquidityLoading(false);
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

  const getChainName = (chainId: string) => {
    const chain = supportedChains.find(c => c.id === chainId);
    return chain ? chain.name : chainId;
  };

  const getChainIcon = (chainId: string) => {
    const chain = supportedChains.find(c => c.id === chainId);
    return chain ? chain.icon : '🔗';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-light-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Globe size={32} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">Initializing Cross-Chain Services</h2>
          <p className="text-text-secondary">Connecting to multiple blockchains...</p>
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
              <Globe size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-text-primary">Cross-Chain Integration</h1>
              <p className="text-text-secondary text-lg">Seamless interoperability across blockchains</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3 mb-2">
                <Send size={20} className="text-primary" />
                <span className="font-semibold text-text-primary">Transactions</span>
              </div>
              <div className="text-2xl font-bold text-primary">
                {transactions.length}
              </div>
              <div className="text-sm text-text-secondary">Cross-chain messages</div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3 mb-2">
                <Coins size={20} className="text-success" />
                <span className="font-semibold text-text-primary">Liquidity</span>
              </div>
              <div className="text-2xl font-bold text-success">
                {liquidityPools.length > 0 ? formatCurrency(liquidityPools.reduce((sum, pool) => sum + pool.totalLiquidity, 0)) : '--'}
              </div>
              <div className="text-sm text-text-secondary">Total locked value</div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3 mb-2">
                <Layers size={20} className="text-secondary" />
                <span className="font-semibold text-text-primary">NFT Bridge</span>
              </div>
              <div className="text-2xl font-bold text-secondary">
                {nftBridges.length > 0 ? nftBridges.reduce((sum, bridge) => sum + bridge.totalBridged, 0).toLocaleString() : '--'}
              </div>
              <div className="text-sm text-text-secondary">Total NFTs bridged</div>
            </div>
          </div>
        </div>
      </div>

      {/* Supported Chains */}
      <div className="bg-white rounded-2xl border border-light-border p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Link size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text-primary">Supported Chains</h2>
              <p className="text-text-secondary">Connected blockchain networks</p>
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
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {supportedChains.map((chain, index) => (
            <div key={index} className="bg-light-card rounded-xl p-6 border border-light-border text-center">
              <div className="text-3xl mb-3">{chain.icon}</div>
              <h3 className="font-bold text-text-primary mb-1">{chain.name}</h3>
              <p className="text-text-muted text-sm">Chain ID: {chain.chainId}</p>
              <div className="mt-3 flex items-center justify-center space-x-2 text-success text-sm">
                <CheckCircle size={14} />
                <span>Connected</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cross-Chain Transfer */}
      <div className="bg-white rounded-2xl border border-light-border p-8 shadow-sm">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
            <ArrowRightLeft size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-text-primary">Cross-Chain Transfer</h2>
            <p className="text-text-secondary">Send tokens across different blockchains</p>
          </div>
        </div>
        
        <form onSubmit={handleTransfer} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Source Chain
              </label>
              <select
                value={transferForm.sourceChain}
                onChange={(e) => setTransferForm({...transferForm, sourceChain: e.target.value})}
                className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary"
              >
                {supportedChains.map((chain, index) => (
                  <option key={index} value={chain.id}>
                    {chain.icon} {chain.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Destination Chain
              </label>
              <select
                value={transferForm.destinationChain}
                onChange={(e) => setTransferForm({...transferForm, destinationChain: e.target.value})}
                className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary"
              >
                {supportedChains
                  .filter(chain => chain.id !== transferForm.sourceChain)
                  .map((chain, index) => (
                    <option key={index} value={chain.id}>
                      {chain.icon} {chain.name}
                    </option>
                  ))
                }
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Token
              </label>
              <select
                value={transferForm.token}
                onChange={(e) => setTransferForm({...transferForm, token: e.target.value})}
                className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary"
              >
                <option value="USDC">USDC</option>
                <option value="ETH">ETH</option>
                <option value="LINK">LINK</option>
                <option value="AVAX">AVAX</option>
                <option value="MATIC">MATIC</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Amount
              </label>
              <input
                type="number"
                value={transferForm.amount}
                onChange={(e) => setTransferForm({...transferForm, amount: e.target.value})}
                placeholder="0.0"
                className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary"
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Receiver Address
              </label>
              <input
                type="text"
                value={transferForm.receiver}
                onChange={(e) => setTransferForm({...transferForm, receiver: e.target.value})}
                placeholder="0x..."
                className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary"
                required
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm text-text-secondary mb-6">
            <div>Estimated Fee: {transferForm.sourceChain === 'ethereum' ? '0.015' : transferForm.sourceChain === 'polygon' ? '0.008' : '0.01'} ETH</div>
            <div>Estimated Time: {transferForm.destinationChain === 'ethereum' ? '30' : transferForm.destinationChain === 'polygon' ? '20' : '15'} minutes</div>
          </div>
          
          <button
            type="submit"
            disabled={!transferForm.amount || parseFloat(transferForm.amount) <= 0 || transferForm.sourceChain === transferForm.destinationChain || transferLoading}
            className="w-full py-3 bg-primary text-white rounded-xl font-medium hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center space-x-2"
          >
            {transferLoading ? (
              <>
                <RefreshCw size={18} className="animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Send size={18} />
                <span>Send {transferForm.token} to {getChainName(transferForm.destinationChain)}</span>
              </>
            )}
          </button>
        </form>
        
        {transferResult && (
          <div className={`mt-4 p-4 rounded-xl ${
            transferResult.status !== 'failed' ? 'bg-success/10 border border-success/20' : 'bg-error/10 border border-error/20'
          }`}>
            <div className="flex items-center space-x-2 mb-2">
              {transferResult.status !== 'failed' ? (
                <CheckCircle size={18} className="text-success" />
              ) : (
                <AlertTriangle size={18} className="text-error" />
              )}
              <span className="font-medium">
                {transferResult.status !== 'failed' ? 'Transfer Initiated Successfully' : 'Transfer Failed'}
              </span>
            </div>
            {transferResult.status !== 'failed' && (
              <div className="text-sm text-text-secondary">
                <p>Message ID: {transferResult.messageId.slice(0, 10)}...{transferResult.messageId.slice(-8)}</p>
                <p>Transaction Hash: {transferResult.txHash.slice(0, 10)}...{transferResult.txHash.slice(-8)}</p>
                <p>Estimated Delivery Time: {transferResult.estimatedTime} minutes</p>
                <p>Fee: {transferResult.fee} ETH</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-2xl border border-light-border p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-success rounded-xl flex items-center justify-center">
              <Activity size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text-primary">Recent Transactions</h2>
              <p className="text-text-secondary">Latest cross-chain activity</p>
            </div>
          </div>
          <button 
            onClick={() => setActiveTab('transactions')}
            className="flex items-center space-x-2 text-primary font-medium"
          >
            <span>View All</span>
            <ArrowRight size={16} />
          </button>
        </div>
        
        <div className="overflow-hidden rounded-xl border border-light-border">
          <table className="w-full">
            <thead className="bg-light-card">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Source</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Destination</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Token</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-light-border">
              {transactions.slice(0, 5).map((tx, index) => (
                <tr key={index} className="bg-white hover:bg-light-hover transition-colors duration-300">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{getChainIcon(tx.sourceChain.toLowerCase())}</span>
                      <span className="font-medium text-text-primary">{tx.sourceChain}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{getChainIcon(tx.destinationChain.toLowerCase())}</span>
                      <span className="font-medium text-text-primary">{tx.destinationChain}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-text-primary">{tx.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-text-secondary">{tx.token}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      tx.status === 'completed' ? 'bg-success/20 text-success' :
                      tx.status === 'pending' ? 'bg-warning/20 text-warning' :
                      'bg-error/20 text-error'
                    }`}>
                      {tx.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-text-muted text-sm">
                    {new Date(tx.timestamp).toLocaleTimeString()}
                  </td>
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
                  <Globe size={24} className="text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-text-primary">Cross-Chain Integration</h1>
                  <p className="text-text-secondary text-lg">Seamless interoperability across blockchains</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-4 py-2 bg-success/10 rounded-xl text-success">
                <CheckCircle size={16} />
                <span className="text-sm font-medium">{supportedChains.length} Chains Connected</span>
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
              { id: 'transactions', label: 'Transactions', icon: Send },
              { id: 'liquidity', label: 'Liquidity', icon: Coins },
              { id: 'nft-bridge', label: 'NFT Bridge', icon: Layers }
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
        {activeTab === 'transactions' && (
          <div className="text-center py-16 bg-white rounded-2xl border border-light-border">
            <Send size={64} className="mx-auto mb-6 text-text-muted opacity-50" />
            <h3 className="text-2xl font-bold text-text-primary mb-3">Transactions View Coming Soon</h3>
            <p className="text-text-secondary mb-8 max-w-md mx-auto">
              We're working on bringing a detailed transactions view to the platform. Check back soon!
            </p>
          </div>
        )}
        {activeTab === 'liquidity' && (
          <div className="text-center py-16 bg-white rounded-2xl border border-light-border">
            <Coins size={64} className="mx-auto mb-6 text-text-muted opacity-50" />
            <h3 className="text-2xl font-bold text-text-primary mb-3">Liquidity Pools Coming Soon</h3>
            <p className="text-text-secondary mb-8 max-w-md mx-auto">
              We're working on bringing cross-chain liquidity pools to the platform. Check back soon!
            </p>
          </div>
        )}
        {activeTab === 'nft-bridge' && (
          <div className="text-center py-16 bg-white rounded-2xl border border-light-border">
            <Layers size={64} className="mx-auto mb-6 text-text-muted opacity-50" />
            <h3 className="text-2xl font-bold text-text-primary mb-3">NFT Bridge Coming Soon</h3>
            <p className="text-text-secondary mb-8 max-w-md mx-auto">
              We're working on bringing a cross-chain NFT bridge to the platform. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CrossChainDashboard;