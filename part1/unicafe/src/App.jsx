import { useState } from 'react';

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const FeedbackCategory = ({ category, number }) => (
  <p>
    {category}: {number}
  </p>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>unicafe</h1>
      <h2>Give feedback</h2>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <h2>Statistics</h2>
      <FeedbackCategory category={'Good'} number={good} />
      <FeedbackCategory category={'Neutral'} number={neutral} />
      <FeedbackCategory category={'Bad'} number={bad} />
    </div>
  );
};

export default App;
