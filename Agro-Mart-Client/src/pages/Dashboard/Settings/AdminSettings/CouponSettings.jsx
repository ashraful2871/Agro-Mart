import React, { useState } from 'react';
import { RiCouponFill } from 'react-icons/ri';
import { Switch } from '@headlessui/react';

const CouponSettings = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10">
      <h2 className="text-2xl font-bold flex items-center mb-4">
        <RiCouponFill className="text-xl ml-2 text-green-600" />
        <span className="ml-2">Coupon Code Settings</span>
      </h2>

      <div className="flex items-center justify-between">
        <span className="text-lg font-medium">Enable Coupon Code</span>
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={`${
            enabled ? 'bg-green-500' : 'bg-gray-300'
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
        >
          <span
            className={`${
              enabled ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform bg-white rounded-full transition-transform`}
          />
        </Switch>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        {enabled
          ? "Coupon code feature is enabled!"
          : "Coupon code feature is disabled."}
      </div>
    </div>
  );
};

export default CouponSettings;
