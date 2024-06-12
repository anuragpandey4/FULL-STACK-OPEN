import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const stats = {
    good: good,
    neutral: neutral,
    bad: bad,
  };

  const handleGoodClick = () => {
    const newGood = good + 1;
    setGood(newGood);
  };
  const handleNeutralClick = () => {
    const newNeutral = neutral + 1;
    setNeutral(newNeutral);
  };
  const handleBadClick = () => {
    const newBad = bad + 1;
    setBad(newBad);
  };

  return (
    <>
      <Heading text="give feedback" />
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <Statistics stats={stats} />
    </>
  );
};

export default App;

const Heading = (props) => <h2>{props.text}</h2>;

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const Statistics = (props) => {
  const total = props.stats.good + props.stats.neutral + props.stats.bad;

  if (total === 0) {
    return (
      <>
        <Heading text="statistics" />

        <p>No feedback given</p>
      </>
    );
  }

  return (
    <div>
      <Heading text="statistics" />
      <table>
        <StatisticLine text="good" value={props.stats.good} />
        <StatisticLine text="neutral" value={props.stats.neutral} />
        <StatisticLine text="bad" value={props.stats.bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine
          text="average"
          value={
            (props.stats.neutral * 0 +
              props.stats.good * 1 -
              props.stats.bad * 1) /
            total
          }
        />
        <StatisticLine
          text="positive"
          value={(props.stats.good / total) * 100 + "%"}
        />
      </table>
    </div>
  );
};

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};
