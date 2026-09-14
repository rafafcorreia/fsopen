import { useState } from 'react';

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const StatisticLine = ({ category, value }) => (
  <p>
    {category}: {value}
  </p>
);

const Statistics = ({ good, neutral, bad }) => {
  const totalFeedback = good + neutral + bad;

  if (totalFeedback <= 0) {
    return (
      <>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </>
    );
  }

  const averageScore = (good - bad) / totalFeedback;
  const positivePercentage = (good / totalFeedback) * 100 + '%';

  return (
    <>
      <h2>Statistics</h2>
      <StatisticLine category={'Good'} value={good} />
      <StatisticLine category={'Neutral'} value={neutral} />
      <StatisticLine category={'Bad'} value={bad} />
      <StatisticLine category={'All'} value={totalFeedback} />
      <StatisticLine category={'Average'} value={averageScore} />
      <StatisticLine category={'Positive'} value={positivePercentage} />
    </>
  );
};

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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
