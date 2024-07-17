import { useEffect } from "react";
import { useState } from "react";

function App () {
    const [x, setX] = useState("Python")
    console.log("App");
    return (
        <div>
            <MyComp1 p={x}></MyComp1>
            <MyComp2 p={x} setP={setX}></MyComp2>
        </div>
    )
}

function MyComp1 ({p}) {
    console.log("one" + p)
    return <div>{p}</div>
}

function MyComp2 ({p, setP}) {
    useEffect(() => {
        setP("javascript"), []
    })
    console.log("two" + p);
    return <div>{p}</div>
}

export default App;