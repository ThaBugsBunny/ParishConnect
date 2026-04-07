import React, { useState } from "react";
import "./MassBooking.css";
import { useNavigate } from "react-router-dom";

const MassBooking = () => {

  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [names, setNames] = useState("");
  const [intentions, setIntentions] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);
  const [errors, setErrors] = useState({});

  const specialMassDays = {
    "2024-03-31": ["6:00 AM", "8:00 AM", "10:30 AM", "6:00 PM"]
  };


  const handleDateChange = (selectedDate) => {

    setDate(selectedDate);
    setTime("");

    if (specialMassDays[selectedDate]) {
      setAvailableTimes(specialMassDays[selectedDate]);
      return;
    }

    const day = new Date(selectedDate).getDay();

    if (day === 0) {
      setAvailableTimes(["6:30 AM", "8:00 AM", "10:30 AM"]);
    }

    else if (day === 6) {
      setAvailableTimes(["6:30 AM", "5:30 PM"]);
    }

    else {
      setAvailableTimes(["6:30 AM"]);
    }

  };


  const validate = () => {

    let newErrors = {};

    if (!date) newErrors.date = "Please select a date";
    if (!time) newErrors.time = "Please select a mass time";
    if (!names) newErrors.names = "Please enter names";
    if (!intentions) newErrors.intentions = "Please enter intentions";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;

  };


  const handleSubmit = () => {

    if (!validate()) return;

    const options = {

      key: "rzp_test_SRSusjYraQKAww",

      amount: 100 * 100,
      currency: "INR",

      name: "ParishConnect",
      description: "Mass Offering",

      handler: function (response) {

        const booking = {

          id: Date.now(),
          name: names,
          intentions: intentions,
          date: date,
          time: time,
          status: "Confirmed",
          paymentId: response.razorpay_payment_id

        };

        const oldBookings =
          JSON.parse(localStorage.getItem("massBookings") || "[]");

        oldBookings.push(booking);

        localStorage.setItem(
          "massBookings",
          JSON.stringify(oldBookings)
        );

        alert("Mass Booking Successful!");

      },

      theme: {
        color: "#6c4ab6"
      }

    };

    const rzp = new window.Razorpay(options);
    rzp.open();

  };


  return (

    <div className="mass-container">

      <div
        className="back-link"
        onClick={() => navigate(-1)}
      >
        ← Back
      </div>


      <div className="mass-card">

        <p className="mass-label">
          MASS INTENTIONS
        </p>

        <h2>Book a Mass</h2>


        <div className="row">

          <div className="field">

            <label>Preferred Date</label>

            <input
              type="date"
              value={date}
              onChange={(e) =>
                handleDateChange(e.target.value)
              }
            />

            {errors.date && (
              <p className="error">{errors.date}</p>
            )}

          </div>


          <div className="field">

            <label>Available Time</label>

            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
            >

              <option value="">
                Select mass time
              </option>

              {availableTimes.map((t, index) => (
                <option key={index}>{t}</option>
              ))}

            </select>

            {errors.time && (
              <p className="error">{errors.time}</p>
            )}

          </div>

        </div>


        <div className="field">

          <label>Intention For (Names)</label>

          <input
            type="text"
            placeholder="e.g., John and Maria D'sa"
            value={names}
            onChange={(e) => setNames(e.target.value)}
          />

          {errors.names && (
            <p className="error">{errors.names}</p>
          )}

        </div>


        <div className="field">

          <label>Type Down Your Intentions</label>

          <textarea
            rows="4"
            placeholder="e.g., In memory of a loved one, Anniversary, Birthday, Health, Thanksgiving..."
            value={intentions}
            onChange={(e) => setIntentions(e.target.value)}
          />

          {errors.intentions && (
            <p className="error">{errors.intentions}</p>
          )}

        </div>


        <div className="total">

          <span>Total Offering</span>
          <strong>₹100</strong>

        </div>


        <button
          className="confirm-btn"
          onClick={handleSubmit}
        >
          Confirm & Pay Offering
        </button>

      </div>

    </div>

  );

};

export default MassBooking;