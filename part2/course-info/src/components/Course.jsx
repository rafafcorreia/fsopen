const Header = ({ text }) => <h2>{text}</h2>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) =>
  parts.map((part) => <Part key={part.id} part={part} />);

const Total = ({ parts }) => {
  const total = parts.reduce((p, c) => ({
    exercises: p.exercises + c.exercises,
  }));

  return (
    <strong>
      <p>total of {total.exercises} exercises</p>
    </strong>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header text={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
