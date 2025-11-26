import { useState, useRef, useContext, useMemo, useCallback } from "react"
import { UserContext } from "../src/App";

export default function Hooks(){
    const [count, setCount] = useState(0)
    const [obj,setObj] = useState({
        name: "vipul",
        age: 21,
        TechStack: "MERN",
    })
    const [arr,setArr] = useState(["apple","mango","orange"]);
    const myInfo = useContext(UserContext);

    // variable whose value persist across re-renders but on the same side variable doesn't cause the re-renders unlike state variables
    // then we can use the useRef() hook
    const refObject = useRef(0);
    console.log(refObject);
    console.log(refObject.current)
    // Normal variable doesn't store dom 'references'
    const nodeRef = useRef();
    console.log(nodeRef.current);

    //useMemo - //whenever the count changes the expensive calculation happens again
    const expensiveResult = useMemo(()=>{
        //expensive operation
        let sum = 0;
        console.log("calculating...");
        for(let i=0;i<100000;i++){
            sum = sum+i;
        }
        console.log("sum is ",sum);
        return sum;
    },[count]);

    return <div>
        <button onClick={()=>setCount(prevCount=>prevCount+1)}>Click to increase the count {count}</button>
        <button onClick={()=>setObj(prev=>({...prev, age:22}))}>Click to set the vipul's correct age: {obj.age}</button>
        <br />
        {
            arr.map((item,index)=>{
                return <span key={index}>{item},</span>
            })
        }
        <br />
        <button onClick={()=>setArr(prev=>[...prev,"cheeku"])}>Add cheeku in the list</button>

        <div ref={nodeRef}>This is the node</div>

        {/* using value from UserContext */}
        <div>{myInfo.name} from UserContext which was created in App.jsx</div>

        {/* usig useCallback */}
        <Child fxn={fxn}/>

    </div>
}

function Parent(){
    let fxn = useCallback(()=>{
        // we are inside a function that is performing some operations
    },[])
}

function Child(props){
    props.fxn();
}