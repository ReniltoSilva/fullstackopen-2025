const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
};

let countGood = 0;
let countOk = 0;
let countBad = 0;

const counterReducer = (state = initialState, action) => {
  const testObj = {
    good: countGood,
    ok: countOk,
    bad: countBad,
  };

  switch (action.type) {
    case "GOOD":
      countGood++;
      return { ...testObj, good: countGood };
    case "OK":
      countOk++;
      return { ...testObj, ok: countOk };
    case "BAD":
      countBad++;
      return { ...testObj, bad: countBad };
    case "RESET":
      return {
        ...testObj,
        good: (countGood = 0),
        ok: (countOk = 0),
        bad: (countBad = 0),
      };
    default:
      return state;
  }
};

export default counterReducer;
