type Person = {
  // type alias - custom type shape
  name: string;
};

export function getPerson(): Promise<Person> {
  return new Promise((resolve) => setTimeout(() => resolve({ name: 'Bob' }), 3000));
}
