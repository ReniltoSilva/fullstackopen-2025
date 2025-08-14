const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
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
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <>
      <h1>Web Development Curriculum</h1>
      {courses.map((item) => (
        <Course key={item.id} course={item} />
      ))}
    </>
  );
};

const Course = ({ course }) => {
  // console.log(course);
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total
        total={course.parts
          .map((item) => item.exercises)
          .reduce((a, b) => a + b)}
      />
    </>
  );
};

const Header = ({ name }) => {
  // console.log(name);
  return <h2>{name}</h2>;
};

const Content = ({ parts }) => {
  // console.log("Content:", parts);
  return (
    <>
      {parts.map((item) => (
        <Part key={item.id} name={item.name} exercises={item.exercises} />
      ))}
    </>
  );
};

const Part = ({ name, exercises }) => {
  // console.log(name, exercises);
  return (
    <p>
      {name} {exercises}
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
