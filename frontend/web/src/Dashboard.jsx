import React, {useState} from 'react';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Overview from './data/overview/Overview';
import PortfolioManagement from './data/porfolioManagement/PortfolioManagement';
import Investments from './data/investments/Investments'
import Analytics from './data/analytics/Analytics'
import Strategies from './data/strategies/Strategies'
import Support from './data/support/Support'

const Dashboard = () => {
    const [activeComponent, setActiveComponent] = useState('overview');

    const renderComponent = () => {
        switch (activeComponent) {
        case 'overview':
            return <Overview />;
        case 'portfolio-management':
            return <PortfolioManagement />;
        case 'investments':
            return <Investments />;
        case 'analytics':
            return <Analytics />;
        case 'strategies':
            return <Strategies />;    
        case 'support':
            return <Support />;
        default:
            return <Overview />;
        }
    };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar onMenuSelect={setActiveComponent} />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Header />
        {renderComponent()}
      </div>
    </div>
  );
}

export default Dashboard;
