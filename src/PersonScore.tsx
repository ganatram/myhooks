import { useEffect } from 'react';
import { getPerson } from './getPerson';

export function PersonScore() {
  useEffect(() => {
    getPerson().then((person) => {
      console.log(person.name); //'bob'
    });
  }, []);

  // async await
  /*   useEffect(() => {
    async function getThePerson() {
      const person = await getPerson();
      console.log(person.name);
    }
    getThePerson();
  }, []); */

  return <div>placeholder for person score component </div>;
}
