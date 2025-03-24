'use client';

import { 
  ShoppingCart, 
  Package, 
  Tag, 
  Wallet, 
  Users 
} from 'lucide-react';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

// Add these interfaces at the top
interface MetricData {
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  details: {
    label: string;
    value: string | number;
  }[];
}

interface DashboardData {
  sales: MetricData;
  stock: MetricData;
  orders: MetricData;
  payments: MetricData;
}

interface AlertNotification {
  id: number;
  type: 'warning' | 'danger' | 'info';
  message: string;
  timestamp: string;
}

// Register Chart.js components
ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// Summary Card Component
const SummaryCard = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  change, 
  onClick,
  alertCount = 0 
}: {
  title: string;
  value: string | number;
  icon: any;
  trend?: 'up' | 'down' | 'neutral';
  change?: number;
  onClick?: () => void;
  alertCount?: number;
}) => (
  <div 
    onClick={onClick}
    className="bg-white p-4 rounded-lg shadow border border-gray-200 hover:border-blue-500 
               transition-colors cursor-pointer relative"
  >
    <div className="flex items-center justify-between">
      <Icon className="w-8 h-8 text-gray-600" />
      {alertCount > 0 && (
        <span className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 
                        flex items-center justify-center text-xs">
          {alertCount}
        </span>
      )}
    </div>
    <div className="mt-2">
      <h3 className="text-sm uppercase text-gray-500">{title}</h3>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      {trend && (
        <div className={`flex items-center mt-1 ${
          trend === 'up' ? 'text-green-500' : 
          trend === 'down' ? 'text-red-500' : 'text-gray-500'
        }`}>
          {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '−'}
          <span className="ml-1">{change}%</span>
        </div>
      )}
    </div>
  </div>
);

// Donut Chart Component
const DonutChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => `${item.label} (${item.value}%)`),
    datasets: [
      {
        data: data.map(item => item.value),
        backgroundColor: data.map(item => item.color),
        borderWidth: 0,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 12,
          padding: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label.split(' ')[0]}: ${context.raw}%`,
        },
      },
    },
    cutout: '70%',
  };

  return <Doughnut data={chartData} options={options} />;
};

// Histogram Chart Component
const HistogramChart = ({ data, colors }) => {
  const chartData = {
    labels: data.map(item => item.month),
    datasets: [
      {
        label: 'Series 1',
        data: data.map(item => item.values[0]),
        backgroundColor: colors[0],
        barThickness: 20,
      },
      {
        label: 'Series 2',
        data: data.map(item => item.values[1]),
        backgroundColor: colors[1],
        barThickness: 20,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
        },
        grid: {
          color: '#D1D5DB', // Darker gray for contrast
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hide legend for cleaner look
      },
      tooltip: {
        callbacks: {
          label: (context: { dataset: { label: any; }; raw: any; }) => `${context.dataset.label}: ${context.raw}%`,
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

const MetricsModal = ({ 
  isOpen, 
  onClose, 
  title, 
  data 
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: MetricData;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[600px]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <span className="sr-only">Close</span>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="space-y-4">
          {data.details.map((detail, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="text-gray-600">{detail.label}</span>
              <span className="font-semibold">{detail.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  // Sample data for the components
  const summaryData = [
    { title: 'Purchases', value: '10%', icon: ShoppingCart },
    { title: 'Stock', value: '70%', icon: Package },
    { title: 'Sales', value: '90%', icon: Tag },
    { title: 'Revenue', value: '1000$', icon: Wallet },
  ];

  const donutData = [
    { label: 'Acquisition', value: 40, color: '#1E88E5' }, // Dark blue
    { label: 'Purchase', value: 35, color: '#64B5F6' },   // Light blue
    { label: 'Retention', value: 25, color: '#FFB74D' },  // Orange
  ];

  const metricsData = [
    { label: 'Abandoned Cart', value: '45', icon: ShoppingCart },
    { label: 'Customers', value: '32', growth: '+24%', icon: Users },
  ];

  const histogramData = [
    { month: 'Jan', values: [60, 80] },
    { month: 'Feb', values: [50, 70] },
    { month: 'Mar', values: [70, 60] },
    { month: 'Apr', values: [80, 90] },
    { month: 'May', values: [60, 70] },
    { month: 'Jun', values: [50, 60] },
  ];

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {summaryData.map((item, index) => (
          <SummaryCard key={index} title={item.title} value={item.value} icon={item.icon} />
        ))}
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Donut Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">MARKETING</h2>
          <DonutChart data={donutData} />
        </div>

        {/* Metrics Box */}
        <div className="bg-green-50 p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">METRICS</h2>
            <select className="bg-white p-2 rounded-md text-gray-600 border border-gray-300">
              <option>This Week</option>
              <option>Last Week</option>
            </select>
          </div>
          {metricsData.map((item, index) => (
            <div key={index} className="flex items-center mb-4">
              <item.icon className="w-6 h-6 mr-3 text-gray-600" />
              <span className="text-3xl font-bold text-gray-800">{item.value}</span>
              {item.growth && <span className="text-green-500 ml-2">{item.growth}</span>}
              <span className="ml-2 text-gray-600">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section: Histogram */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">MONTHLY REPORT</h2>
        <HistogramChart data={histogramData} colors={['#1E88E5', '#FFB74D']} />
      </div>
    </div>
  );
};

export default Dashboard;


