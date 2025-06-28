import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  Bot, 
  Users, 
  Zap, 
  BarChart3, 
  RefreshCw, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Coins, 
  FileText, 
  Search, 
  Filter, 
  ArrowRight, 
  ArrowUpRight, 
  ArrowDownRight, 
  Activity, 
  PieChart, 
  Award, 
  Star, 
  MessageSquare, 
  Play, 
  Pause, 
  Sparkles, 
  Target, 
  Lightbulb, 
  Layers
} from 'lucide-react';
import { 
  AIAgentsService, 
  initializeAIAgentsService, 
  AIAgent, 
  AgentTask, 
  AgentPerformanceMetrics, 
  AgentType, 
  AgentCapability 
} from '../lib/aiagents';

interface AIAgentsDashboardProps {
  onBack: () => void;
}

const AIAgentsDashboard: React.FC<AIAgentsDashboardProps> = ({ onBack }) => {
  const [aiAgentsService, setAIAgentsService] = useState<AIAgentsService | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'agents' | 'tasks' | 'analytics'>('overview');
  
  // AI Agents data states
  const [availableAgents, setAvailableAgents] = useState<AIAgent[]>([]);
  const [agentTasks, setAgentTasks] = useState<AgentTask[]>([]);
  const [performanceMetrics, setPerformanceMetrics] = useState<AgentPerformanceMetrics | null>(null);
  
  // Task execution states
  const [selectedAgentId, setSelectedAgentId] = useState<string>('');
  const [taskParameters, setTaskParameters] = useState<any>({});
  const [taskLoading, setTaskLoading] = useState(false);
  const [taskResult, setTaskResult] = useState<any>(null);
  
  // DeFi analysis parameters
  const [defiAnalysisParams, setDefiAnalysisParams] = useState({
    assets: ['ETH', 'BTC', 'LINK'],
    timeframe: '7d',
    metrics: ['price', 'volume', 'sentiment']
  });
  
  // Yield optimization parameters
  const [yieldOptimizationParams, setYieldOptimizationParams] = useState({
    initialAmount: 10000,
    riskTolerance: 'medium' as 'low' | 'medium' | 'high',
    timeHorizon: '6 months',
    preferredAssets: ['ETH', 'USDC']
  });
  
  // Multi-agent analysis parameters
  const [multiAgentParams, setMultiAgentParams] = useState({
    projectId: 'project-123',
    projectData: {
      title: 'AI-Powered FinTech Platform',
      description: 'Revolutionary payment processing system with AI fraud detection and cross-border capabilities',
      category: 'Fintech',
      founderName: 'Sarah Johnson',
      teamSize: 5,
      githubRepo: 'sarahjohnson/fintech-ai',
      demoLink: 'https://demo.fintech-ai.com'
    },
    analysisType: 'comprehensive' as 'comprehensive' | 'technical' | 'financial' | 'market',
    agentCount: 5
  });

  useEffect(() => {
    initializeServices();
  }, []);

  const initializeServices = async () => {
    try {
      setIsLoading(true);
      const service = initializeAIAgentsService();
      setAIAgentsService(service);
      
      // Load initial data
      await loadAIAgentsData(service);
      
    } catch (error) {
      console.error('Error initializing AI Agents services:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadAIAgentsData = async (service: AIAgentsService) => {
    try {
      const [agents, tasks, metrics] = await Promise.all([
        service.getAvailableAgents(),
        service.getAgentTasksHistory(),
        service.getAgentPerformanceMetrics()
      ]);
      
      setAvailableAgents(agents);
      setAgentTasks(tasks);
      setPerformanceMetrics(metrics);
      
      // Set default selected agent
      if (agents.length > 0 && !selectedAgentId) {
        setSelectedAgentId(agents[0].id);
      }
      
    } catch (error) {
      console.error('Error loading AI agents data:', error);
    }
  };

  const refreshData = async () => {
    if (!aiAgentsService) return;
    await loadAIAgentsData(aiAgentsService);
  };

  const executeDeFiAnalysis = async () => {
    if (!aiAgentsService) return;
    
    try {
      setTaskLoading(true);
      setTaskResult(null);
      
      const result = await aiAgentsService.executeDeFiAnalysisTask(defiAnalysisParams);
      
      setTaskResult(result);
    } catch (error) {
      console.error('Error executing DeFi analysis:', error);
    } finally {
      setTaskLoading(false);
    }
  };

  const executeYieldOptimization = async () => {
    if (!aiAgentsService) return;
    
    try {
      setTaskLoading(true);
      setTaskResult(null);
      
      const result = await aiAgentsService.executeYieldOptimizationTask(yieldOptimizationParams);
      
      setTaskResult(result);
    } catch (error) {
      console.error('Error executing yield optimization:', error);
    } finally {
      setTaskLoading(false);
    }
  };

  const executeMultiAgentAnalysis = async () => {
    if (!aiAgentsService) return;
    
    try {
      setTaskLoading(true);
      setTaskResult(null);
      
      const result = await aiAgentsService.executeMultiAgentAnalysis(multiAgentParams);
      
      setTaskResult(result);
    } catch (error) {
      console.error('Error executing multi-agent analysis:', error);
    } finally {
      setTaskLoading(false);
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getAgentTypeLabel = (type: AgentType) => {
    switch (type) {
      case AgentType.DEFI:
        return 'DeFi';
      case AgentType.PRODUCTIVITY:
        return 'Productivity';
      case AgentType.MULTI_AGENT:
        return 'Multi-Agent';
      default:
        return type;
    }
  };

  const getAgentTypeColor = (type: AgentType) => {
    switch (type) {
      case AgentType.DEFI:
        return 'text-primary';
      case AgentType.PRODUCTIVITY:
        return 'text-success';
      case AgentType.MULTI_AGENT:
        return 'text-secondary';
      default:
        return 'text-text-primary';
    }
  };

  const getAgentTypeBgColor = (type: AgentType) => {
    switch (type) {
      case AgentType.DEFI:
        return 'bg-primary/10';
      case AgentType.PRODUCTIVITY:
        return 'bg-success/10';
      case AgentType.MULTI_AGENT:
        return 'bg-secondary/10';
      default:
        return 'bg-gray-100';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-light-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Brain size={32} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">Initializing AI Agents</h2>
          <p className="text-text-secondary">Connecting to ElizaOS...</p>
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
              <Brain size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-text-primary">AI Agents Platform</h1>
              <p className="text-text-secondary text-lg">Powered by ElizaOS</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3 mb-2">
                <Bot size={20} className="text-primary" />
                <span className="font-semibold text-text-primary">Available Agents</span>
              </div>
              <div className="text-2xl font-bold text-primary">
                {availableAgents.length}
              </div>
              <div className="text-sm text-text-secondary">Specialized AI agents</div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3 mb-2">
                <Activity size={20} className="text-success" />
                <span className="font-semibold text-text-primary">Tasks Completed</span>
              </div>
              <div className="text-2xl font-bold text-success">
                {performanceMetrics ? performanceMetrics.totalTasksCompleted.toLocaleString() : '--'}
              </div>
              <div className="text-sm text-text-secondary">Total executions</div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3 mb-2">
                <Award size={20} className="text-secondary" />
                <span className="font-semibold text-text-primary">Success Rate</span>
              </div>
              <div className="text-2xl font-bold text-secondary">
                {performanceMetrics ? formatPercentage(performanceMetrics.successRate) : '--'}
              </div>
              <div className="text-sm text-text-secondary">Task completion rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Agent Categories */}
      <div className="bg-white rounded-2xl border border-light-border p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Layers size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text-primary">Agent Categories</h2>
              <p className="text-text-secondary">Specialized AI agents by domain</p>
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* DeFi Agents */}
          <div className="bg-light-card rounded-xl p-6 border border-light-border">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Coins size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-text-primary text-lg">DeFi Agents</h3>
                <p className="text-text-secondary text-sm">Financial analysis & automation</p>
              </div>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Available Agents:</span>
                <span className="font-medium">{availableAgents.filter(a => a.type === AgentType.DEFI).length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Tasks Completed:</span>
                <span className="font-medium">{performanceMetrics?.performanceByType[AgentType.DEFI].tasksCompleted.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Avg. Performance:</span>
                <span className="font-medium text-success">{formatPercentage(performanceMetrics?.performanceByType[AgentType.DEFI].averagePerformance || 0)}</span>
              </div>
            </div>
            
            <button 
              onClick={() => {
                setActiveTab('agents');
                setSelectedAgentId(availableAgents.find(a => a.type === AgentType.DEFI)?.id || '');
              }}
              className="flex items-center space-x-2 text-primary font-medium"
            >
              <span>View DeFi Agents</span>
              <ArrowRight size={16} />
            </button>
          </div>
          
          {/* Productivity Agents */}
          <div className="bg-light-card rounded-xl p-6 border border-light-border">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                <Zap size={24} className="text-success" />
              </div>
              <div>
                <h3 className="font-bold text-text-primary text-lg">Productivity Agents</h3>
                <p className="text-text-secondary text-sm">Task & workflow automation</p>
              </div>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Available Agents:</span>
                <span className="font-medium">{availableAgents.filter(a => a.type === AgentType.PRODUCTIVITY).length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Tasks Completed:</span>
                <span className="font-medium">{performanceMetrics?.performanceByType[AgentType.PRODUCTIVITY].tasksCompleted.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Avg. Performance:</span>
                <span className="font-medium text-success">{formatPercentage(performanceMetrics?.performanceByType[AgentType.PRODUCTIVITY].averagePerformance || 0)}</span>
              </div>
            </div>
            
            <button 
              onClick={() => {
                setActiveTab('agents');
                setSelectedAgentId(availableAgents.find(a => a.type === AgentType.PRODUCTIVITY)?.id || '');
              }}
              className="flex items-center space-x-2 text-success font-medium"
            >
              <span>View Productivity Agents</span>
              <ArrowRight size={16} />
            </button>
          </div>
          
          {/* Multi-Agent Systems */}
          <div className="bg-light-card rounded-xl p-6 border border-light-border">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                <Users size={24} className="text-secondary" />
              </div>
              <div>
                <h3 className="font-bold text-text-primary text-lg">Multi-Agent Systems</h3>
                <p className="text-text-secondary text-sm">Collaborative agent networks</p>
              </div>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Available Systems:</span>
                <span className="font-medium">{availableAgents.filter(a => a.type === AgentType.MULTI_AGENT).length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Tasks Completed:</span>
                <span className="font-medium">{performanceMetrics?.performanceByType[AgentType.MULTI_AGENT].tasksCompleted.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Avg. Performance:</span>
                <span className="font-medium text-success">{formatPercentage(performanceMetrics?.performanceByType[AgentType.MULTI_AGENT].averagePerformance || 0)}</span>
              </div>
            </div>
            
            <button 
              onClick={() => {
                setActiveTab('agents');
                setSelectedAgentId(availableAgents.find(a => a.type === AgentType.MULTI_AGENT)?.id || '');
              }}
              className="flex items-center space-x-2 text-secondary font-medium"
            >
              <span>View Multi-Agent Systems</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Agent Tasks */}
      <div className="bg-white rounded-2xl border border-light-border p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
              <Target size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text-primary">Execute Agent Tasks</h2>
              <p className="text-text-secondary">Run AI agents for specific use cases</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* DeFi Market Analysis */}
          <div className="bg-light-card rounded-xl p-6 border border-light-border">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <BarChart3 size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-text-primary text-lg">DeFi Market Analysis</h3>
                <p className="text-text-secondary text-sm">Analyze market trends and assets</p>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Assets to Analyze
                </label>
                <select
                  multiple
                  value={defiAnalysisParams.assets}
                  onChange={(e) => setDefiAnalysisParams({
                    ...defiAnalysisParams,
                    assets: Array.from(e.target.selectedOptions, option => option.value)
                  })}
                  className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary"
                  size={3}
                >
                  <option value="ETH">Ethereum (ETH)</option>
                  <option value="BTC">Bitcoin (BTC)</option>
                  <option value="LINK">Chainlink (LINK)</option>
                  <option value="AAVE">Aave (AAVE)</option>
                  <option value="UNI">Uniswap (UNI)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Timeframe
                </label>
                <select
                  value={defiAnalysisParams.timeframe}
                  onChange={(e) => setDefiAnalysisParams({
                    ...defiAnalysisParams,
                    timeframe: e.target.value
                  })}
                  className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary"
                >
                  <option value="24h">24 Hours</option>
                  <option value="7d">7 Days</option>
                  <option value="30d">30 Days</option>
                  <option value="90d">90 Days</option>
                </select>
              </div>
            </div>
            
            <button
              onClick={executeDeFiAnalysis}
              disabled={taskLoading}
              className="w-full py-3 bg-primary text-white rounded-xl font-medium hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center space-x-2"
            >
              {taskLoading ? (
                <>
                  <RefreshCw size={18} className="animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Play size={18} />
                  <span>Run Analysis</span>
                </>
              )}
            </button>
          </div>
          
          {/* Yield Optimization */}
          <div className="bg-light-card rounded-xl p-6 border border-light-border">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                <Zap size={24} className="text-success" />
              </div>
              <div>
                <h3 className="font-bold text-text-primary text-lg">Yield Optimization</h3>
                <p className="text-text-secondary text-sm">Optimize investment strategies</p>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Initial Amount (USD)
                </label>
                <input
                  type="number"
                  value={yieldOptimizationParams.initialAmount}
                  onChange={(e) => setYieldOptimizationParams({
                    ...yieldOptimizationParams,
                    initialAmount: parseInt(e.target.value)
                  })}
                  className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-success/20 focus:border-success/50 text-text-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Risk Tolerance
                </label>
                <select
                  value={yieldOptimizationParams.riskTolerance}
                  onChange={(e) => setYieldOptimizationParams({
                    ...yieldOptimizationParams,
                    riskTolerance: e.target.value as 'low' | 'medium' | 'high'
                  })}
                  className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-success/20 focus:border-success/50 text-text-primary"
                >
                  <option value="low">Low Risk</option>
                  <option value="medium">Medium Risk</option>
                  <option value="high">High Risk</option>
                </select>
              </div>
            </div>
            
            <button
              onClick={executeYieldOptimization}
              disabled={taskLoading}
              className="w-full py-3 bg-success text-white rounded-xl font-medium hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center space-x-2"
            >
              {taskLoading ? (
                <>
                  <RefreshCw size={18} className="animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Play size={18} />
                  <span>Optimize Yield</span>
                </>
              )}
            </button>
          </div>
          
          {/* Multi-Agent Analysis */}
          <div className="bg-light-card rounded-xl p-6 border border-light-border">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                <Users size={24} className="text-secondary" />
              </div>
              <div>
                <h3 className="font-bold text-text-primary text-lg">Multi-Agent Analysis</h3>
                <p className="text-text-secondary text-sm">Collaborative project evaluation</p>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Analysis Type
                </label>
                <select
                  value={multiAgentParams.analysisType}
                  onChange={(e) => setMultiAgentParams({
                    ...multiAgentParams,
                    analysisType: e.target.value as 'comprehensive' | 'technical' | 'financial' | 'market'
                  })}
                  className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary/50 text-text-primary"
                >
                  <option value="comprehensive">Comprehensive Analysis</option>
                  <option value="technical">Technical Analysis</option>
                  <option value="financial">Financial Analysis</option>
                  <option value="market">Market Analysis</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Number of Agents
                </label>
                <input
                  type="number"
                  min="3"
                  max="8"
                  value={multiAgentParams.agentCount}
                  onChange={(e) => setMultiAgentParams({
                    ...multiAgentParams,
                    agentCount: parseInt(e.target.value)
                  })}
                  className="w-full px-4 py-3 bg-white border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary/50 text-text-primary"
                />
              </div>
            </div>
            
            <button
              onClick={executeMultiAgentAnalysis}
              disabled={taskLoading}
              className="w-full py-3 bg-secondary text-white rounded-xl font-medium hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center space-x-2"
            >
              {taskLoading ? (
                <>
                  <RefreshCw size={18} className="animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Play size={18} />
                  <span>Run Multi-Agent Analysis</span>
                </>
              )}
            </button>
          </div>
        </div>
        
        {/* Task Result */}
        {taskResult && (
          <div className="mt-8 bg-white rounded-xl p-6 border border-light-border">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Sparkles size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-text-primary text-lg">Task Result</h3>
                <p className="text-text-secondary text-sm">Task ID: {taskResult.taskId}</p>
              </div>
              <div className="ml-auto">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  taskResult.status === 'completed' ? 'bg-success/20 text-success' :
                  taskResult.status === 'pending' ? 'bg-warning/20 text-warning' :
                  'bg-error/20 text-error'
                }`}>
                  {taskResult.status.toUpperCase()}
                </span>
              </div>
            </div>
            
            {taskResult.status === 'completed' && taskResult.result && (
              <div className="space-y-4">
                {/* DeFi Analysis Result */}
                {taskResult.result.marketTrend && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-text-primary">
                      <BarChart3 size={18} className="text-primary" />
                      <span className="font-medium">Market Trend: </span>
                      <span className={`font-bold ${
                        taskResult.result.marketTrend === 'bullish' ? 'text-success' : 'text-error'
                      }`}>
                        {taskResult.result.marketTrend.toUpperCase()}
                      </span>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-text-primary mb-2">Asset Analysis</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {taskResult.result.assetAnalysis.map((asset: any, index: number) => (
                          <div key={index} className="bg-light-card rounded-lg p-3 border border-light-border">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-text-primary">{asset.asset}</span>
                              <span className={`font-medium ${
                                asset.priceChange > 0 ? 'text-success' : 'text-error'
                              }`}>
                                {asset.priceChange > 0 ? '+' : ''}{asset.priceChange.toFixed(2)}%
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-text-secondary">Price: ${asset.price.toLocaleString()}</span>
                              <span className="text-text-secondary">Recommendation: {asset.recommendation}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-light-card rounded-lg p-4 border border-light-border">
                      <h4 className="font-medium text-text-primary mb-2">Summary</h4>
                      <p className="text-text-secondary">{taskResult.result.summary}</p>
                    </div>
                  </div>
                )}
                
                {/* Yield Optimization Result */}
                {taskResult.result.recommendedStrategies && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-text-primary">
                        <Zap size={18} className="text-success" />
                        <span className="font-medium">Estimated APY: </span>
                        <span className="font-bold text-success">
                          {formatPercentage(taskResult.result.totalEstimatedAPY)}
                        </span>
                      </div>
                      <div className="text-text-primary">
                        <span className="font-medium">Estimated Annual Yield: </span>
                        <span className="font-bold text-success">
                          {formatCurrency(taskResult.result.totalEstimatedYield)}
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-text-primary mb-2">Recommended Strategies</h4>
                      <div className="space-y-3">
                        {taskResult.result.recommendedStrategies.map((strategy: any, index: number) => (
                          <div key={index} className="bg-light-card rounded-lg p-4 border border-light-border">
                            <div className="flex items-center justify-between mb-2">
                              <div className="font-medium text-text-primary">
                                {strategy.protocol} - {strategy.asset}
                              </div>
                              <div className="font-medium text-success">
                                {formatPercentage(strategy.apy)} APY
                              </div>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <div className="text-text-secondary">
                                Chain: {strategy.chain}
                              </div>
                              <div className="text-text-secondary">
                                Risk: {strategy.risk.toUpperCase()}
                              </div>
                              <div className="text-text-secondary">
                                Allocation: {strategy.allocation}%
                              </div>
                              <div className="text-text-secondary">
                                Est. Yield: {formatCurrency(strategy.estimatedYield)}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-light-card rounded-lg p-4 border border-light-border">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-text-primary">Additional Information</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          taskResult.result.riskAssessment === 'low' ? 'bg-success/20 text-success' :
                          taskResult.result.riskAssessment === 'medium' ? 'bg-warning/20 text-warning' :
                          'bg-error/20 text-error'
                        }`}>
                          {taskResult.result.riskAssessment.toUpperCase()} RISK
                        </span>
                      </div>
                      <div className="text-text-secondary">
                        <p>Rebalance Frequency: {taskResult.result.rebalanceFrequency}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Multi-Agent Analysis Result */}
                {taskResult.result.consensusScore && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-text-primary">
                        <Target size={18} className="text-primary" />
                        <span className="font-medium">Consensus Score: </span>
                        <span className={`font-bold ${
                          taskResult.result.consensusScore > 80 ? 'text-success' :
                          taskResult.result.consensusScore > 60 ? 'text-warning' :
                          'text-error'
                        }`}>
                          {taskResult.result.consensusScore}/100
                        </span>
                      </div>
                      <div className="text-text-primary">
                        <span className="font-medium">Confidence Level: </span>
                        <span className="font-bold text-primary">
                          {taskResult.result.confidenceLevel}%
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-text-primary mb-2">Individual Agent Scores</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {taskResult.result.individualScores.map((score: any, index: number) => (
                          <div key={index} className="bg-light-card rounded-lg p-3 border border-light-border">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-text-primary">{score.agentName}</span>
                              <span className={`font-medium ${
                                score.score > 80 ? 'text-success' :
                                score.score > 60 ? 'text-warning' :
                                'text-error'
                              }`}>
                                {score.score}/100
                              </span>
                            </div>
                            <div className="text-sm text-text-secondary">
                              {score.reasoning}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-light-card rounded-lg p-4 border border-light-border">
                        <h4 className="font-medium text-text-primary mb-2">Strengths & Weaknesses</h4>
                        <div className="space-y-3">
                          <div>
                            <div className="text-sm font-medium text-success mb-1">Strengths:</div>
                            <ul className="text-sm text-text-secondary space-y-1">
                              {taskResult.result.strengthsWeaknesses.strengths.map((strength: string, i: number) => (
                                <li key={i} className="flex items-start space-x-2">
                                  <CheckCircle size={14} className="text-success mt-0.5 flex-shrink-0" />
                                  <span>{strength}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-error mb-1">Weaknesses:</div>
                            <ul className="text-sm text-text-secondary space-y-1">
                              {taskResult.result.strengthsWeaknesses.weaknesses.map((weakness: string, i: number) => (
                                <li key={i} className="flex items-start space-x-2">
                                  <AlertTriangle size={14} className="text-error mt-0.5 flex-shrink-0" />
                                  <span>{weakness}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-light-card rounded-lg p-4 border border-light-border">
                        <h4 className="font-medium text-text-primary mb-2">Opportunities & Threats</h4>
                        <div className="space-y-3">
                          <div>
                            <div className="text-sm font-medium text-primary mb-1">Opportunities:</div>
                            <ul className="text-sm text-text-secondary space-y-1">
                              {taskResult.result.strengthsWeaknesses.opportunities.map((opportunity: string, i: number) => (
                                <li key={i} className="flex items-start space-x-2">
                                  <Lightbulb size={14} className="text-primary mt-0.5 flex-shrink-0" />
                                  <span>{opportunity}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-warning mb-1">Threats:</div>
                            <ul className="text-sm text-text-secondary space-y-1">
                              {taskResult.result.strengthsWeaknesses.threats.map((threat: string, i: number) => (
                                <li key={i} className="flex items-start space-x-2">
                                  <AlertTriangle size={14} className="text-warning mt-0.5 flex-shrink-0" />
                                  <span>{threat}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-light-card rounded-lg p-4 border border-light-border">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-text-primary">Recommendation</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          taskResult.result.investmentRisk === 'low' ? 'bg-success/20 text-success' :
                          taskResult.result.investmentRisk === 'medium' ? 'bg-warning/20 text-warning' :
                          'bg-error/20 text-error'
                        }`}>
                          {taskResult.result.investmentRisk.toUpperCase()} RISK
                        </span>
                      </div>
                      <p className="text-text-secondary">{taskResult.result.recommendation}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
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
                  <Brain size={24} className="text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-text-primary">AI Agents Platform</h1>
                  <p className="text-text-secondary text-lg">Powered by ElizaOS</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-4 py-2 bg-success/10 rounded-xl text-success">
                <CheckCircle size={16} />
                <span className="text-sm font-medium">ElizaOS Connected</span>
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
              { id: 'agents', label: 'Agents', icon: Bot },
              { id: 'tasks', label: 'Tasks', icon: Target },
              { id: 'analytics', label: 'Analytics', icon: Activity }
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
        {activeTab === 'agents' && (
          <div className="text-center py-16 bg-white rounded-2xl border border-light-border">
            <Bot size={64} className="mx-auto mb-6 text-text-muted opacity-50" />
            <h3 className="text-2xl font-bold text-text-primary mb-3">Agents Directory Coming Soon</h3>
            <p className="text-text-secondary mb-8 max-w-md mx-auto">
              We're working on bringing a detailed agents directory to the platform. Check back soon!
            </p>
          </div>
        )}
        {activeTab === 'tasks' && (
          <div className="text-center py-16 bg-white rounded-2xl border border-light-border">
            <Target size={64} className="mx-auto mb-6 text-text-muted opacity-50" />
            <h3 className="text-2xl font-bold text-text-primary mb-3">Tasks History Coming Soon</h3>
            <p className="text-text-secondary mb-8 max-w-md mx-auto">
              We're working on bringing a detailed tasks history view to the platform. Check back soon!
            </p>
          </div>
        )}
        {activeTab === 'analytics' && (
          <div className="text-center py-16 bg-white rounded-2xl border border-light-border">
            <Activity size={64} className="mx-auto mb-6 text-text-muted opacity-50" />
            <h3 className="text-2xl font-bold text-text-primary mb-3">Analytics Dashboard Coming Soon</h3>
            <p className="text-text-secondary mb-8 max-w-md mx-auto">
              We're working on bringing detailed analytics for AI agents to the platform. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAgentsDashboard;