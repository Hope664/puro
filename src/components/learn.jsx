import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>{count}</h1>

      <button onClick={() =>
       setCount(count + 1)
      
      }
      >
      increase
      </button>

      <button onClick={() =>{
        if(count>0){
              setCount(count - 1)
        }else{ 
            console.log("limit reached");

        }
       
    }
      }
        >
        Decrease
      </button>
    </div>
  );
}

export default Counter;