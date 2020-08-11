import * as React from 'react';
import styled from 'styled-components';
import {Layer, Rect, Stage, Group} from 'react-konva';
import { deepcopy } from './Util';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { Button } from '@material-ui/core';

export interface IObject {
    state: string;
    color: string;
    x: number;
    i: number;
    j: number
}

const Gamediv = styled.div`
    width:801px;
    height:401px;
    background-color:white;
    border-color: black;
    border-style: solid;
    margin:auto;
`

interface IGameOfLifeProps {
    
}
const useStyles = makeStyles({
    root: {
      width: 300,
      margin:"auto",
    },
  });

  const useStyles2 = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

  function valuetext(value: any) {
    return `${value}°C`;
  }

const GameOfLife: React.FC<IGameOfLifeProps> =({}) => {
    const [count, setCount] = React.useState(0);
    const classes = useStyles();
    const classes2 = useStyles2();
    const [count2, setCount2] = React.useState(0);
    const [speed, setSpeed] = React.useState(200);
    let engine=React.useRef(0 as number)
    const myObject = {
                        state:'inactive', 
                        color:'white', 
                        x: 0, 
                        i: 1, 
                        j: 1} as IObject
    const [themyObjects,setObjects]=React.useState(new Array<typeof myObject>());
    let objectsPack=new Array<Object>()
    const [rect2, setRect2]=  React.useState(new Array<JSX.Element>());
    var x=0;
    const themyObjectsRef = React.useRef(new Array<typeof myObject>())
    themyObjectsRef.current = themyObjects;
    let someArray = [] as IObject[]
    React.useEffect(() => {
        // Update the document title using the browser API
        var x=0;
        
        for (var i = 1, j=1; j<=400;i+10){
            x=x+1; 
                someArray.push({state: 'inactive',
                                color: 'white',
                                x: x,
                                i: i,
                                j: j})            
            i=i+10
            if(i===801){
                i=1;
                j=j+10
                if(j>399 && themyObjects.length===0){
                    setObjects(someArray)
                }
            }
        }
    });

    

    const setObj = React.useCallback((x:any, thesetObjects: any)=>{
        const myRef = themyObjectsRef.current
        if(myRef.length>0){
            myRef[x.x-1].state='inactive'
            if(myRef[x.x-1].color=='black'){
                myRef[x.x-1].color='white'
            }
            else{
                myRef[x.x-1].color='black'
            }            
            setObjects(myRef)        
            setCount(count + 1)
        }        
    }, [themyObjects, setObjects, setCount, count])

    function Go(){
        engine.current = setInterval(()=>{executeStep()},speed)
        //setCount(count + 1)
    }
    
    const executeStep = React.useCallback(()=>{
        const myRef = themyObjectsRef.current
        let newView = deepcopy(someArray)
        newView.map((object,index)=>{
            let counterBlack = 0
            if(index>=1 && index<3199){
                try{
                    if(myRef[index-1].color=='black'){
                        counterBlack=counterBlack+1
                    }
                    if(myRef[index+1].color=='black'){
                        counterBlack=counterBlack+1
                    }
                    if(index-80>=0 && myRef[index-80].color=='black'){
                        counterBlack=counterBlack+1
                    }
                    if(index-81>=0 && myRef[index-81].color=='black'){
                        counterBlack=counterBlack+1
                    }
                    if(index-79>=0 && myRef[index-79].color=='black'){
                        counterBlack=counterBlack+1
                    }
                    if(index+81<3200 && myRef[index+81].color=='black'){
                        counterBlack=counterBlack+1
                    }
                    if(index+80<3200 && myRef[index+80].color=='black'){
                        counterBlack=counterBlack+1
                    }
                    if(index+79<3200 && myRef[index+79].color=='black'){
                        counterBlack=counterBlack+1
                    }
                }
                catch{
                    alert('fasfasfas')
                }
                
                if(counterBlack==3){
                    newView[index].color='black'
                }
                else if(myRef[index].color=='black' && counterBlack==2){
                    newView[index].color='black'
                }
                else{
                    newView[index].color='white'
                }
            }
        })
        setObjects(newView)
        setCount2(count2 => count2 + 1)
    }, [themyObjects, setObjects, setCount2, count2])
    function stopEngine(){
        clearInterval(engine.current);
    }
    function Clear(){
        let newView = someArray
        setObjects(newView)
        setCount(count + 1)
    }

    const setStep = React.useCallback((val:any)=>{
        setSpeed(val)
    },[])
    
    return (
        <section>
            <h1>Game Of Life</h1>
            {/* <button onClick={()=>Generate(rect2)}/> */}
            <Gamediv>
                <Stage width={800} height={400}>
                    <Layer>
                        {themyObjects.map((object)=>{
                            return <Rect number={object.x} key={object.x} x={object.i} y={object.j} width={10} height={10} fill={object.color} shadowBlur={6} onClick={(e)=>(setObj(object,themyObjects))}/>                            
                        })}
                    </Layer>
                </Stage>
            </Gamediv>
            <div className={classes2.root}>
                <Button onClick={() => Go()} variant="contained" color="primary">GO</Button>
                <Button onClick={() => Clear()} variant="contained" color="primary">Clear</Button>
                <Button onClick={() => stopEngine()} variant="contained" color="primary">Stop Engine</Button>
            </div>
            
            <div className={classes.root}>
                <Typography style={{marginTop:"50px"}} id="discrete-slider-small-steps" gutterBottom>
                    Change Speed
                </Typography>
                <Slider
                    defaultValue={200}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-small-steps"
                    step={100}
                    marks
                    min={100}
                    max={1000}
                    valueLabelDisplay="auto"
                    onChange={(e, val)=>{setStep(val)}}
                />
            </div>
        </section>
    )
    
}

export default GameOfLife