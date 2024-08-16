import React from "react";
import "./Guarant.scss";

const Guarantee: React.FC = () => {
  return (
    <>
      <div className="guarantee">
        <div className="guarant">
          <h2 className="guarantHeader">Free Delivery</h2>
          <p className="guarantParagraph">
            For all orders over $50, consecteur adipim scing elit
          </p>
        </div>
        <div className="guarant">
          <h2 className="guarantHeader">90 Days Return</h2>
          <p className="guarantParagraph">
            If goods have problems, consecteur adipim scing elit
          </p>
        </div>
        <div className="guarant">
          <h2 className="guarantHeader">Secure Payment</h2>
          <p className="guarantParagraph">
            100% sure payment, consecteur adipim scing elit
          </p>
        </div>
      </div>
    </>
  );
};

export default Guarantee;
