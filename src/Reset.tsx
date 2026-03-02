import { memo } from 'react';

type Props = {
  onProp: () => void;
};

// without memo() function
/* export function Reset({ onProp }: Props) {
  console.log('reset component invoked');

  return <button>reset</button>;
}
 */

//with memo() function - avoids re-rendering of child components
export const Reset = memo(({ onProp }: Props) => {
  console.log('reset component invoked');
  return <button onClick={onProp}>reset</button>;
});

Reset.displayName = 'Reset component';
