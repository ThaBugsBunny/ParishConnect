import { useState } from "react";
import { Link } from "react-router-dom";
import "./Donation.css";

function Donation() {
  const [amount, setAmount] = useState(500);
  const [target, setTarget] = useState("To the Church");
  const [error, setError] = useState("");

  const handleAmountChange = (value) => {
    const num = Number(value);
    setAmount(num);

    if (num < 100) {
      setError("Minimum donation amount is ₹100");
    } 
    else if (num > 100000) {
      setError("Maximum donation amount is ₹1,00,000");
    } 
    else {
      setError("");
    }
  };

  const handlePayment = () => {

    if (amount < 100 || amount > 100000) {
      setError("Please enter an amount between ₹100 and ₹1,00,000");
      return;
    }

    const options = {
      key: "rzp_test_SRSusjYraQKAww",
      amount: amount * 100,
      currency: "INR",
      name: "ParishConnect",
      description: `Donation - ${target}`,

      handler: function (response) {
        alert("Payment Successful!");
        console.log(response);
      },

      theme: {
        color: "#6c4ab6"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="donation-page">

      <Link to="/" className="back-btn">← Back</Link>

      <div className="donation-card2">

        <h4>SUPPORT OUR MISSION</h4>
        <h2>Make a Donation</h2>

        <div className="targets">

          <div onClick={() => setTarget("To the Church")} className="option">
            <input type="radio" checked={target==="To the Church"} readOnly />
            <div>
              <strong>To the Church</strong>
              <p>General maintenance.</p>
            </div>
          </div>

          <div onClick={() => setTarget("To Pilar Church")} className="option">
            <input type="radio" checked={target==="To Pilar Church"} readOnly />
            <div>
              <strong>To Pilar Church</strong>
              <p>Sister parish mission.</p>
            </div>
          </div>

          <div onClick={() => setTarget("Good Samaritan Fund")} className="option">
            <input type="radio" checked={target==="Good Samaritan Fund"} readOnly />
            <div>
              <strong>Good Samaritan Fund</strong>
              <p>Assistance for the needy.</p>
            </div>
          </div>

        </div>

        <h4>Select Amount (₹)</h4>

        <div className="amounts">
          {[500,1000,2000,5000].map((amt)=>(
            <button
              key={amt}
              className={amount===amt?"active":""}
              onClick={()=>handleAmountChange(amt)}
            >
              ₹ {amt}
            </button>
          ))}
        </div>

        {/* Custom Amount Input */}

        <div className="custom-amount">
          <label>Enter Custom Amount (₹)</label>

          <input
            type="number"
            min="100"
            max="100000"
            placeholder="₹100 - ₹100000"
            value={amount}
            onChange={(e)=>handleAmountChange(e.target.value)}
          />

          {/* Error message */}
          {error && (
            <p className="amount-error">
              {error}
            </p>
          )}
        </div>

        <button className="pay-btn" onClick={handlePayment}>
          Donate ₹ {amount} to {target}
        </button>

      </div>

    </div>
  );
}

export default Donation;