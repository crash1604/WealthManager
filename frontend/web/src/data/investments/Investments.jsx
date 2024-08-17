import React from 'react';
import Card from '../../components/card/Card';

const Investments = () => {
  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
          <Card title="Hedge Funds">
            {/* Add content for Recent Activity */}
          </Card>
          <Card title="Index Funds">
            {/* Add content for Recent Activity */}
          </Card>
          <Card title="Chart">
            {/* Add content for Recent Activity */}
          </Card>
          <div className="col-span-1 md:col-span-2 xl:col-span-3">
              <Card title="Investments">
                {/* Add content for Recent Activity */}
              </Card>
          </div>
        </div>
      
    </div>
  );
}

export default Investments;
