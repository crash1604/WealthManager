import React from 'react';
import Card from '../../components/card/Card'

const Overview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <Card title="Overall Summary">
        {/* Add content for Overall Summary */}
      </Card>
      <Card title="Total Investment">
        {/* Add content for Total Investment */}
      </Card>
      <Card title="Investment Distribution">
        {/* Add a pie chart for investments here */}
      </Card>
      <div className="col-span-1 md:col-span-2 xl:col-span-3">
        <Card title="Recent Activity">
          {/* Add content for Recent Activity */}
        </Card>
      </div>
    </div>
  );
}

export default Overview;
