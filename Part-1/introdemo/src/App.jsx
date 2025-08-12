import { useState } from "react";

//-------------------------------------------------------------------------------------------
// ---------------------- PART 1.D - A more complex state, debugging React apps -------------------- //
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const History = ({ clicks }) => {
  console.log(clicks);

  if (clicks.length === 0) {
    return (
      <>
        <p>The app is used by pressing the buttons </p>
      </>
    );
  }
  return (
    <>
      <p>Buttons clicked: {clicks.join(" ")}</p>
    </>
  );
};

const App = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);
  const [total, setTotal] = useState(0);

  const handleLeftClick = () => {
    setAll(allClicks.concat("L"));
    const updatedLeft = left + 1;
    setLeft(updatedLeft);
    setTotal(updatedLeft + right);
  };

  const handleRightClick = () => {
    setAll(allClicks.concat("R"));
    const updatedRight = right + 1;
    setRight(updatedRight);
    setTotal(updatedRight + left);
  };
  // const [clicks, setClicks] = useState({
  //   right: 0,
  //   left: 0,
  // });

  //   const handleLeftClick = () => {
  //   const newClicks = {
  //     ...clicks,
  //     left: clicks.left + 1
  //   }
  //   setClicks(newClicks)
  // }

  // const handleRightClick = () => {
  //   const newClicks = {
  //     ...clicks,
  //     right: clicks.right + 1
  //   }
  //   setClicks(newClicks)
  // }

  // const handleLeftClick = () => setClicks({ ...clicks, left: clicks.left + 1 });
  // const handleRightClick = () =>
  //   setClicks({ ...clicks, right: clicks.right + 1 });

  return (
    <div>
      <Button onClick={handleLeftClick} text="Left" />
      <Button onClick={handleRightClick} text="Right" />
      <History clicks={allClicks} />
      <p>{total}</p>
    </div>
  );
};

//-------------------------------------------------------------------------------------------
// ---------------------- PART 1.C - Component state, event handlers ------------------------------- //

// const Display = ({ counter }) => <div>{counter}</div>;

// const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

// const App = () => {
//   let [counter, setCounter] = useState(0);
//   console.log("Rendering with counter value", counter);

//   const increaseByOne = () => {
//     setCounter(counter + 1);
//     console.log("Increasing, value before", counter);
//   };
//   const decreaseByOne = () => {
//     setCounter(counter - 1);
//     console.log("Decreasing, value before", counter);
//   };
//   const setToZero = () => {
//     setCounter(0);
//     console.log("Resetting to zero, value before", counter);
//   };

//   return (
//     <div>
//       <Display counter={counter} />
//       <Button onClick={increaseByOne} text="Plus" />
//       <Button onClick={setToZero} text="Zero" />
//       <Button onClick={decreaseByOne} text="Minus" />
//     </div>
//   );
// };

//-------------------------------------------------------------------------------------------
// ---------------------- PART 1.A - Introduction to React ------------------------------- //

// const Hello = ({ name, age }) => {
//   const bornYear = () => new Date().getFullYear() - age;

//   return (
//     <div>
//       <p>
//         Hello {name}, you are {age} years old
//       </p>
//       <p>So you were probably born in {bornYear()}</p>
//     </div>
//   );
// };

// const App = () => {
//   const name = "Peter";
//   const age = 10;
//   return (
//     <>
//       <h1>Greetings</h1>
//       <Hello name="Maya" age={26 + 10} />
//       <Hello name={name} age={age} />
//     </>
//   );
// };
//-----------------------------------------------------------
// const App = () => {
//   const friends = [
//     { name: "Peter", age: 4 },
//     { name: "Maya", age: 10 },
//   ];

//   const arr = ["Peter", "Maya"];
//   return (
//     <>
//       <h1>Greetings</h1>
//       <Hello name={friends[0].name} age={friends[0].age} />
//       <Hello name={friends[1].name} age={friends[1].age} />
//       <p>{arr}</p>
//     </>
//   );
// };

export default App;
