/* eslint-disable prettier/prettier */
import { useEffect, useReducer, useRef, useMemo } from 'react';
import { getPerson } from './getPerson';
// import { Reset } from './Reset';

type State = {
  name: string | undefined;
  score: number;
  loading: boolean;
};

type Action =
  | { type: 'initialize'; name: string }
  | {
      type: 'increment';
    }
  | {
      type: 'decrement';
    }
  | {
      type: 'reset';
    };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'initialize':
      return { name: action.name, score: 0, loading: false };
    case 'increment':
      return { ...state, score: state.score + 1 };
    case 'decrement':
      return { ...state, score: state.score - 1 };
    case 'reset':
      return { ...state, score: 0 };
    default:
      return state;
  }
}

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

  //declaring states using useState() hook
  /* const [name, setName] = useState<string | undefined>();
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true); */

  // declaring states with useReducer() hook

  const [{ name, score, loading }, dispatch] = useReducer(reducer, {
    name: undefined,
    score: 0,
    loading: true,
  });

  useEffect(() => {
    getPerson().then(({ name }) => dispatch({ type: 'initialize', name }));
  }, []);

  // use Ref() hook
  const addButtonRef = useRef<HTMLButtonElement>(null); //

  // function cpuIntensiveFunction(){}

  /*   useEffect(() => {
    getPerson().then((person) => {
      setLoading(false); // modify the loading state -- false
      setName(person.name); // modify the name state  -- 'Bob'
      //console.log('State Values are', loading, name); // state changes are not immediate -- batched before UI render
      //console.log(person.name); //'bob'
    });
  }, []); */

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
  // const handleReset = useCallback(() => setScore(0), []);

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
        /*  onClick={() => {
          setScore(score + 1);
        }} */
        onClick={() => dispatch({ type: 'increment' })}
      >
        add
      </button>
      <button
        /*  onClick={() => {
          setScore(score - 1);
        }} */
        onClick={() => dispatch({ type: 'decrement' })}
      >
        subtract
      </button>
      {
        <button
          /* onClick={() => {
            setScore(0);
          }} */
          onClick={() => dispatch({ type: 'reset' })}
        >
          reset
        </button>
      }
    </div>
  );
}
