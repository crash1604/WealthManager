import React from 'react';
import Card from '../../components/card/Card';

const Analytics = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
      <div className="col-span-1 md:col-span-2 xl:col-span-3">
        <Card title="Analytics">
          {/* Add content for Recent Activity */}
        </Card>
      </div>
      <div className="col-span-1 md:col-span-2 xl:col-span-3">
        <Card title="Reports">
          {/* Add content for Recent Activity */}
        </Card>
      </div>
    </div>
  );
}

export default Analytics;
