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

export default Course;
