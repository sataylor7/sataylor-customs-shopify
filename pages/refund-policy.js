import React from 'react';

export default function RefundPolicy() {
  return (
    <div>
      <div className='bg-slate-100'>
        <div className='max-w-2xl mx-auto px-4 py-8 sm:px-6 lg:max-w-7xl lg:px-8'>
          <h1 className='text-3xl pt-8'>Refund Policy</h1>
          <h2 className='text-sm uppercase'>(For non custom orders only)</h2>
        </div>
      </div>
      <div className='max-w-2xl mx-auto px-4 py-8 sm:px-6 lg:max-w-7xl lg:px-8 gap-y-4 flex flex-col'>
        <h2 className='text-xl font-semibold border-b-[1px] border-slate-200 pb-2 mb-2 uppercase'>
          Returns
        </h2>
        <p>
          Our policy lasts 30 days. If 30 days have gone by since your item is
          received, unfortunately we can’t offer you a refund or exchange.
        </p>
        <p>
          To be eligible for a return, your item must be unused and in the same
          condition that you received it. It must also be in the original
          packaging.
        </p>
        <h2 className='text-xl font-semibold border-b-[1px] border-slate-200 pb-2 mb-2 uppercase'>
          Additional non-returnable items:
        </h2>
        <ul>
          <li>Gift cards</li>
          <li>Downloadable software products</li>
        </ul>
        <p>
          To complete your return, we require a receipt or proof of purchase.
        </p>
        <p>
          There are certain situations where only partial refunds are granted
          (if applicable) Any item not in its original condition, is damaged or
          missing parts for reasons not due to our error Any item that is
          returned more than 30 days after delivery
        </p>
        <h2 className='text-xl font-semibold border-b-[1px] border-slate-200 pb-2 mb-2 uppercase'>
          Refunds (if applicable)
        </h2>
        <p>
          Once your return is received and inspected, we will send you an email
          to notify you that we have received your returned item. We will also
          notify you of the approval or rejection of your refund. If you are
          approved, then your refund will be processed, and a credit will
          automatically be applied to your credit card or original method of
          payment, within a certain amount of days.
        </p>
        <h2 className='text-xl font-semibold border-b-[1px] border-slate-200 pb-2 mb-2 uppercase'>
          Late or missing refunds (if applicable)
        </h2>
        <p>
          If you haven’t received a refund yet, first check your bank account
          again. Then contact your credit card company, it may take some time
          before your refund is officially posted. Next contact your bank. There
          is often some processing time before a refund is posted. If you’ve
          done all of this and you still have not received your refund yet,
          please contact us at info@sataylorcustoms.com or
          sataylorcustoms@gmail.com.
        </p>
        <h2 className='text-xl font-semibold border-b-[1px] border-slate-200 pb-2 mb-2 uppercase'>
          Sale items (if applicable)
        </h2>
        <p>
          Only regular priced items may be refunded, unfortunately sale items
          cannot be refunded.
        </p>
        <h2 className='text-xl font-semibold border-b-[1px] border-slate-200 pb-2 mb-2 uppercase'>
          Exchanges (if applicable)
        </h2>
        <p>
          We only replace items if they are defective or damaged. If you need to
          exchange it for the same item, send us an email at
          info@sataylorcustoms.com or sataylorcustoms@gmail.com and send your
          item to:
        </p>
        <address>
          <p>P.O.BOX #165</p>
          <p>5960 W. Parker RD #278-165</p>

          <p>Plano, TX 75093</p>
        </address>
        <h2 className='text-xl font-semibold border-b-[1px] border-slate-200 pb-2 mb-2 uppercase'>
          Shipping
        </h2>
        <p>To return your product, you should mail your product to:</p>
        <address>
          <p>P.O.BOX #165</p>
          <p>5960 W. Parker RD #278-165</p>

          <p>Plano, TX 75093</p>
        </address>
        <p>
          You will be responsible for paying for your own shipping costs for
          returning your item. Shipping costs are non-refundable. If you receive
          a refund, the cost of return shipping will be deducted from your
          refund.
        </p>
        <p>
          Depending on where you live, the time it may take for your exchanged
          product to reach you, may vary.
        </p>
        <p>
          If you are shipping an item over $75, you should consider using a
          trackable shipping service or purchasing shipping insurance. We don’t
          guarantee that we will receive your returned item.
        </p>
      </div>
    </div>
  );
}
