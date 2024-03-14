import React, { useEffect, useState } from "react";

export default function App() {
  const [adNumber, setAdNumber] = useState(1);
  const [advice, setAdvice] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`https://api.adviceslip.com/advice`);
        if (!res.ok) {
          throw new Error("Failed to fetch advice");
        }
        const data = await res.json();
        setAdvice(data.slip.advice);
      } catch (error) {
        setError(error.message);
      }
    }
    fetchData();
  }, [adNumber]);

  const handleNewAdvice = () => {
    setAdNumber(adNumber + 1);
  };

  return (
    <div className="app">
      <p className="number">Advice #{adNumber}</p>
      {error ? (
        <p className="error">{error}</p>
      ) : (
        <>
          <q className="advice">{advice}</q>
        </>
      )}
      <img
        className="line"
        src="/images/pattern-divider-desktop.svg"
        alt="line-img"
      />
      <img
        className="dice"
        src="/images/icon-dice.svg"
        alt="dice"
        onClick={handleNewAdvice}
      />
    </div>
  );
}
