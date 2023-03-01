import React from 'react';

export default function RefundPolicy() {
  return (
    <div>
      <div className='bg-slate-100'>
        <div className='max-w-2xl mx-auto px-4 py-8 sm:px-6 lg:max-w-7xl lg:px-8'>
          <h1 className='text-3xl pt-8'>Return Policy</h1>
          <h2 className='text-sm uppercase'>(For non custom orders only)</h2>
        </div>
      </div>
      <div className='wrapper'>
        <h2 className='policies-headers uppercase'>Returns</h2>
        <p>
          S.A.Taylor Customs handmade items are backed by a limited one-year
          warranty. Any damage not caused by normal wear and tear or negligence
          of the buyer is eligible to be repaired at no cost. The buyer assumes
          the cost of shipping item to S.A.Taylor Customs. S.A.Taylor Customs
          will pay to ship the item back to you once the repairs are complete.
          Any other repairs are covered on a case-by-case basis, at the
          discretion of S.A.Taylor Customs, and the buyer assumes responsibility
          for all shipping costs.
        </p>
        <p>
          If a package is <strong>marked as delivered</strong> and is not
          received please contact your local post office to locate the package.
          Unfortunately, we are <strong>unable</strong> to offer a refund if the
          package is not located.
        </p>

        <h2 className='policies-headers uppercase'>Shipping</h2>
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
          If you are shipping an item over $75, you should consider using a
          trackable shipping service or purchasing shipping insurance. We don’t
          guarantee that we will receive your returned item.
        </p>
      </div>
    </div>
  );
}
