"use client";
import "./App.css";
import React, { useState, FormEvent } from "react";

const App = () => {
  const [sin, setSin] = useState("");
  const [message, setMessage] = useState("");

  const validateSIN = (sin: string) => {
    if (!/^[0-9]{9}$/.test(sin)) {
      return "Invalid SIN. Please enter exactly 9 digits.";
    }

    const digits = sin.split("").map(Number);
    let sum = 0;
    let isSecond = false;

    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = digits[i];
      if (isSecond) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      isSecond = !isSecond;
    }

    return sum % 10 === 0
      ? "Valid SIN"
      : "Invalid SIN. Failed checksum validation.";
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(validateSIN(sin));
  };

  return (
    <div className="home-container">
      <h1>SIN Validation</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <div>
          <label htmlFor="sin">Enter your SIN :</label>
          <input
            type="text"
            id="sin"
            name="sin"
            value={sin}
            onChange={(e) => setSin(e.target.value)}
            placeholder="123456789"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default App;
