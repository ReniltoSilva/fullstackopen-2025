const Header = (props) => {
  console.log(props);
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  );
};

const Part = (props) => {
  // console.log(props);
  return (
    <>
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    </>
  );
};

const Content = (props) => {
  // console.log(props);
  return (
    <>
      {/* <Part part={props.part1} exercise={props.exercises1} />
      <Part part={props.part2} exercise={props.exercises2} />
      <Part part={props.part3} exercise={props.exercises3} /> */}
      <Part part={props.part1} />
      <Part part={props.part2} />
      <Part part={props.part3} />
    </>
  );
};

const Total = (props) => {
  console.log(props);
  return (
    <>
      <p>
        Number of exercises{" "}
        {props.exercises1.exercises +
          props.exercises2.exercises +
          props.exercises3.exercises}
      </p>
    </>
  );
};

const App = () => {
  const course = "Half Stack application development";

  const part1 = {
    name: "Fundamentals of React",
    exercises: 10,
  };

  const part2 = {
    name: "Using props to pass data",
    exercises: 7,
  };

  const part3 = {
    name: "State of a component",
    exercises: 14,
  };

  return (
    <div>
      <Header course={course} />

      {/* <Content
        part1={part1}
        exercises1={exercises1}
        part2={part2}
        exercises2={exercises2}
        part3={part3}
        exercises3={exercises3}
      /> */}
      <Content part1={part1} part2={part2} part3={part3} />

      <Total exercises1={part1} exercises2={part2} exercises3={part3} />
    </div>
  );
};

export default App;
