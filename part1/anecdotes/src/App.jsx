import { useState } from 'react';

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  'The only way to go fast, is to go well.',
];

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const AnecdoteOfTheDay = ({ selected, votes, onVote, onNext }) => {
  const selectedAnecdote = anecdotes[selected];
  const selectedVotes = votes[selected];

  return (
    <>
      <h2>Anecdote of the day</h2>
      <p>{selectedAnecdote}</p>
      <p>has {selectedVotes} votes</p>
      <Button onClick={onVote} text="Vote" />
      <Button onClick={onNext} text="Next anecdote" />
    </>
  );
};

const AnecdoteWithMostVotes = ({ votes }) => {
  let indexMostVoted = 0;

  for (let i = 1; i < votes.length; i++) {
    if (votes[i] > votes[indexMostVoted]) indexMostVoted = i;
  }

  return (
    <>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[indexMostVoted]}</p>
    </>
  );
};

const App = () => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const selectRandomAnecdote = () =>
    setSelected(Math.floor(Math.random() * anecdotes.length));

  const voteAnecdote = () => {
    const updatedVotes = [...votes];
    updatedVotes[selected] += 1;
    setVotes(updatedVotes);
  };

  return (
    <div>
      <h1>anecdotes</h1>
      <AnecdoteOfTheDay
        selected={selected}
        votes={votes}
        onVote={voteAnecdote}
        onNext={selectRandomAnecdote}
      />
      <AnecdoteWithMostVotes votes={votes} />
    </div>
  );
};

export default App;
