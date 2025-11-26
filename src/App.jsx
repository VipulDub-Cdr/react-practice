import { useState, useEffect, useLayoutEffect } from 'react'
import Hooks from '../components/hooks';
import { createContext } from 'react';

export const UserContext = createContext();

function App() {

  const dataInParent = "hello"

  //after paint
  useEffect(()=>{
    console.log("componentDidMount used for the first time render and componentDidUpdate for the update or re-renders");
    //cleanup runs only at and after the first time the re-render happens
    return ()=>{
      console.log("cleanup function executes! - componentDidUnmount")
    }
  },[])
 //before paint
 //  useLayoutEffect(()=>{
    
 //  },[])

 function handleClick(e){
  console.log(e); // synthetic event
  console.log(e.target); //gives the real dom element - <button onClick={handleClick}>Understanding syntehtic events</button>
 }


  function handleChildData(name){
    console.log(name);
  }

  // don't create like this
  const fruitList = ['apple','banana','orange','mango'];
  // create the list like this
  const fruitListCorrect = [
    {id: "123", name:'apple'},
    {id: "124", name:'banana'},
    {id: "125", name:'orange'},
    {id: "126", name:'mango'},
  ]

  return <>
    <Greet name="vipul" age={22}/>
    <DefaultFunctionProp age={22}/>
    <Fxn name={dataInParent}/>
    <Fxn2/>
    <ChildComponent handleChildData={handleChildData}/>
    {/* wrong way of listing the things */}
    {
      fruitList.map((item,index)=>{
        return <span style={{color:"red"}} key={index}>{item}, </span>
      })
    }
    <br />
    {
      fruitListCorrect.map((item)=>{
        return <span style={{color: "blue"}} key={item.id}>{item.name}, </span>
      })
    }
    {/* when parent re-render child also re-render check */}

    <Parent/>

    {/* synthetic event */}
    <button onClick={handleClick}>Understanding synthetic events</button>
    <button onClick={handleClick}>synthetic event 2</button>

    {/* bubbling */}
    <div onClick={()=>console.log("event triggering by the parent") }>
      <button onClick={()=>console.log("event triggering by the child")}>bubbling</button>
    </div>

    {/* stop event bubbling */}
    <div onClick={()=>console.log("Outer")}>
      <div onClick={()=>console.log("Inner")}>
        <button onClick={(e)=>{e.stopPropagation(); 
          console.log("button")}}>Stop bubbling</button>
      </div>
    </div>

    {/* event capturing - You can stop the event before it reaches the child. */}
    <div onClickCapture={()=>console.log("Outer")}>
      <div onClickCapture={()=>console.log("Inner")}>
        <button onClick={()=>{console.log("button")}}>capturing</button>
      </div>
    </div>

    {/* stop event capturing ??????*/}
    <div onClickCapture={()=>console.log("Outer")}>
      <div onClickCapture={()=>console.log("Inner")}>
        <button onClick={(e)=>{e.stopPropagation();console.log("button")}}>stop capturing</button>
      </div>
    </div>

    {/* prevent default */}
    <a href="https://www.google.com" onClick={(e)=>e.preventDefault()}>prevent default</a>
    <div onContextMenu={(e)=>e.preventDefault()}>Sample div which doesn't let you open context menu ( try by right clicking)</div>
      
    <UserContext.Provider value={{name:"vipul", age:22}}>
        <Hooks/>
    </UserContext.Provider>

  </>

}


function Parent(){
  const [count, setCount] = useState(0);
  console.log("parent renders");

  return <>
    <Child/>
    <button type="button" onClick={()=>setCount(prevcount=>prevcount+1)}>Click me</button>
  </>
}
function Child() {
  console.log("Child renders");
  return <div>Child - {Date.now()}</div>;
}


function ChildComponent(props){
    const [name, setName] = useState("data in the child component");
    props.handleChildData(name);
    return (
      <div>Rendering the child component</div>
    )
}

function Greet(props){
  return <div>Hello, {props.name} and your age is: {props.age}</div>
}
function DefaultFunctionProp({age=20}){
  return <div>Hello, Buddy Your age is {age}</div>
}
function Fxn({name="vipul"}){
  return <div>{name}</div>
}
function Fxn2({name="vipul"}){
  return <div>{name}</div>
}
Fxn2.DefaultFunctionProp = {
  name: "vipul"
}

export default App
