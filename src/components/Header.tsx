import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  Home, 
  Package, 
  Tag, 
  Warehouse, 
  ShoppingCart, 
  CreditCard, 
  BarChart2,
  Users,
  Settings,
  LogOut
} from 'lucide-react';

const Header = () => {
  const router = useRouter();
  const currentPath = router.pathname;

  const navItems = [
    { title: 'Dashboard', path: '/dashboard', icon: <Home className="w-5 h-5 mr-2" /> },
    { title: 'Product', path: '/product', icon: <Package className="w-5 h-5 mr-2" /> },
    { title: 'Sales', path: '/sales', icon: <Tag className="w-5 h-5 mr-2" /> },
    { title: 'Inventory', path: '/inventory', icon: <Warehouse className="w-5 h-5 mr-2" /> },
    { title: 'Purchases', path: '/purchases', icon: <ShoppingCart className="w-5 h-5 mr-2" /> },
    { title: 'Payments', path: '/payments', icon: <CreditCard className="w-5 h-5 mr-2" /> },
    { title: 'Report', path: '/report', icon: <BarChart2 className="w-5 h-5 mr-2" /> },
    { title: 'Users', path: '/users', icon: <Users className="w-5 h-5 mr-2" /> },
    { title: 'Settings', path: '/settings', icon: <Settings className="w-5 h-5 mr-2" /> },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Logo and Admin */}
      <div className="bg-green-400 p-4">
        <div className="text-green-700 text-xl font-semibold">
          <span>Logo</span>
        </div>
      </div>
      <div className="p-4 bg-gray-50 border-b">
        <div className="text-gray-600 font-medium">Admin</div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 bg-gray-50">
        {navItems.map((item) => (
          <Link 
            key={item.path} 
            href={item.path}
            className={`flex items-center px-4 py-3 text-gray-600 hover:bg-green-100 ${
              currentPath === item.path ? 'bg-green-500 text-white' : ''
            }`}
          >
            {item.icon}
            <span className="font-medium">{item.title}</span>
          </Link>
        ))}
      </nav>
      
      {/* Logout */}
      <div className="p-4 bg-gray-50 border-t">
        <Link 
          href="/logout"
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <LogOut className="w-5 h-5 mr-2" />
          <span className="font-medium">Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default Header;