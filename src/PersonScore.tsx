import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { getPerson } from './getPerson';
import { Reset } from './Reset';

function sillyExpensiveFunction() {
  console.log('Executing silly expensive function');

  let sum = 0;

  for (let i = 0; i < 10000; i++) {
    // cpu intensive process
    sum += 1;
  }
  return sum;
}

export function PersonScore() {
  // const [state,setState]= useState(inititalValue)

  //declaring states
  const [name, setName] = useState<string | undefined>();
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  // use Ref() hook
  const addButtonRef = useRef<HTMLButtonElement>(null); //

  // function cpuIntensiveFunction(){}

  useEffect(() => {
    getPerson().then((person) => {
      setLoading(false); // modify the loading state -- false
      setName(person.name); // modify the name state  -- 'Bob'
      //console.log('State Values are', loading, name); // state changes are not immediate -- batched before UI render
      //console.log(person.name); //'bob'
    });
  }, []);

  useEffect(() => {
    if (!loading) {
      addButtonRef.current?.focus();
    }
  }, [loading]);

  // const expensiveCalculation = sillyExpensiveFunction();

  const expensiveCalculation = useMemo(() => sillyExpensiveFunction(), []);

  // async await
  /*   useEffect(() => {
    async function getThePerson() {
      const person = await getPerson();
      console.log(person.name);
    }
    getThePerson();
  }, []); */

  // memoize () & need not not be recreated on every render.
  const handleReset = useCallback(() => setScore(0), []);

  if (loading) {
    return <div>loading...</div>;
  }

  /*   function handleReset() {
    setScore(0);
  } */

  /*  const handleReset = () => {
    setScore(0);
  }; */

  return (
    <div>
      <h3>
        {name},{score}
      </h3>
      <p>{expensiveCalculation}</p>
      <button
        ref={addButtonRef}
        onClick={() => {
          setScore(score + 1);
        }}
      >
        add
      </button>
      <button
        onClick={() => {
          setScore(score - 1);
        }}
      >
        subtract
      </button>
      {/* <button
        onClick={() => {
          setScore(0);
        }}
      >
        reset
      </button> */}

      <Reset onProp={handleReset} />
    </div>
  );
}
