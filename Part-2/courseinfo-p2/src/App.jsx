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
  console.log(parts);
  return (
    <>
      {parts.map((item) => (
        <Part name={item.name} exercises={item.exercises} key={item.id} />
      ))}
    </>
  );
};

const Part = (props) => {
  console.log(props);
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  );
};

// const Total = (props) => <p>Number of exercises {props.total}</p>;

export default App;
