const Total = ({ parts }) => {
  return (
    <p>
      <b>
        total of{" "}
        {parts.reduce((total, i) => {
          return total + i.exercises;
        }, 0)}{" "}
        exercises
      </b>
    </p>
  );
};

export default Total;
