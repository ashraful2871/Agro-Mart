import React, { forwardRef } from "react";

const OrderInvoice = forwardRef(({ order }, ref) => {
  return (
    <div ref={ref} className="p-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">INVOICE</h1>
        <p className="text-sm text-gray-500">Thank you for your business</p>
      </div>

      <div className="mb-8">
        <div className="text-right">
          <h2 className="text-xl font-semibold">INVOICE #{order.invoiceNo}</h2>
          <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
          <p>Status: <span className={`font-semibold ${order.status === 'Delivered' ? 'text-green-600' : order.status === 'Pending' ? 'text-yellow-600' : 'text-blue-600'}`}>
            {order.status}
          </span></p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Bill To:</h3>
        <p>{order.shippingAddress?.name || 'N/A'}</p>
        <p>{order.email}</p>
        <p>{order.shippingAddress?.address || 'N/A'}</p>
        <p>{order.shippingAddress?.city}, {order.shippingAddress?.postalCode}</p>
      </div>

      <table className="w-full mb-8">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Item</th>
            <th className="text-right py-2">Price</th>
            <th className="text-right py-2">Quantity</th>
            <th className="text-right py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {order.orderItems?.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="py-2">{item.name}</td>
              <td className="text-right py-2">${item.price.toFixed(2)}</td>
              <td className="text-right py-2">{item.quantity}</td>
              <td className="text-right py-2">${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" className="text-right font-semibold py-2">Subtotal:</td>
            <td className="text-right py-2">${order.itemsPrice?.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan="3" className="text-right font-semibold py-2">Shipping:</td>
            <td className="text-right py-2">${order.shippingPrice?.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan="3" className="text-right font-semibold py-2">Tax:</td>
            <td className="text-right py-2">${order.taxPrice?.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan="3" className="text-right font-semibold py-2">Total:</td>
            <td className="text-right py-2 font-bold">${order.totalAmount?.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>

      <div className="text-center mt-12 text-sm text-gray-500">
        <p>Thank you for your purchase!</p>
        <p>Please contact us if you have any questions about your order</p>
      </div>
    </div>
  );
});

OrderInvoice.displayName = "OrderInvoice";

export default OrderInvoice;
