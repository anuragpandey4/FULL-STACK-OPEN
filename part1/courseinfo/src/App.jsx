export default function App() {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
}

const Header = (props) => {
  return <h1>{props.course.name}</h1>;
};

const Content = (props) => {
  return (
    <>
      {props.course.parts.map((part, index) => {
        return (
          <p key={index}>
            {part.name} {part.exercises}
          </p>
        );
      })}
    </>
  );
};

const Total = (props) => {
  return (
    <p>
      Number of exercises{" "}
      {props.course.parts.reduce((acc, part) => {
        return (acc += part.exercises);
      }, 0)}
    </p>
  );
};
