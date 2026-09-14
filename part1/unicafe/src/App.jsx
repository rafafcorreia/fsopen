import { useState } from 'react';

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const FeedbackCategory = ({ category, number }) => (
  <p>
    {category}: {number}
  </p>
);

const TotalFeedback = ({ totalFeedback }) => <p>All: {totalFeedback}</p>;

const AverageScore = ({ good, bad, totalFeedback }) => {
  if (totalFeedback <= 0) return <p>Average: 0</p>;

  const feedbackPoints = good - bad;
  return <p>Average: {feedbackPoints / totalFeedback}</p>;
};

const PositiveFeedback = ({ good, totalFeedback }) => {
  if (totalFeedback <= 0) return <p>Positive: 0%</p>;

  return <p>Positive: {(good / totalFeedback) * 100}%</p>;
};

const Statistics = ({ good, neutral, bad, totalFeedback }) => {
  return (
    <>
      <h2>Statistics</h2>
      <FeedbackCategory category={'Good'} number={good} />
      <FeedbackCategory category={'Neutral'} number={neutral} />
      <FeedbackCategory category={'Bad'} number={bad} />
      <TotalFeedback totalFeedback={totalFeedback} />
      <AverageScore good={good} bad={bad} totalFeedback={totalFeedback} />
      <PositiveFeedback good={good} totalFeedback={totalFeedback} />
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const totalFeedback = good + neutral + bad;

  return (
    <div>
      <h1>unicafe</h1>
      <h2>Give feedback</h2>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        totalFeedback={totalFeedback}
      />
    </div>
  );
};

export default App;
