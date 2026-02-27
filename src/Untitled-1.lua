

useEffect hook - 'manage component side-effects'. 

                 when something happens outside of the component 
                 the component wants to react(run some local function or code )

        useEffect( ()=>{},[array of dependencies]); 

            conditions for the effect function to run : 

                  - the first time the component gets loaded/launched 

                  - when any dependency goes through the state change 

