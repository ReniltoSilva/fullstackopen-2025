const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
      {
        name: "Redux",
        exercises: 11,
        id: 4,
      },
    ],
  };
  return <Course course={course} />;
};

const Course = (props) => {
  return (
    <>
      <Header header={props.course.name} />
      <Content parts={props.course.parts} />
    </>
  );
};

const Header = ({ header }) => {
  return <h1>{header}</h1>;
};

const Content = ({ parts }) => {
  // console.log(parts);
  //Reduce already calculated
  const total = parts.map((item) => item.exercises).reduce((a, b) => a + b);

  return (
    <>
      {parts.map((item) => (
        <Part name={item.name} exercises={item.exercises} key={item.id} />
      ))}
      {<Total total={total} />}
    </>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  );
};

const Total = ({ total }) => {
  return (
    <p>
      <b>Total of {total} exercises</b>
    </p>
  );
};

export default App;
