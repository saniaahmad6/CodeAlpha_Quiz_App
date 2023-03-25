import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'


/** Custom Hook */
import { useFetchQuestion } from '../hooks/fetchQuestion'
import { updateResult} from '../hooks/setResult'


export default function Questions({ onChecked }) {

    const [checked, setChecked] = useState(undefined)
    

    const questions = useSelector(state => state.questions.queue[state.questions.trace]);
    useEffect (()=>{
    //   console.log(questions)
    })
    const { trace } = useSelector(state => state.questions);
    const result = useSelector(state => state.result.result);
    const [{ Loading, apiData, serverError}] = useFetchQuestion() 
    
    // const questions = useSelector(state => state.questions.queue[state.questions.trace])
    const dispatch = useDispatch()

    useEffect(() => {
        console.log({ trace, checked})
        dispatch(updateResult({ trace, checked}))
    },[checked])
    
    function onSelect(i){
        onChecked(i)
        setChecked(i)
        dispatch(updateResult({ trace, checked}))
    }
    
    if(Loading) return <h3 className='text-light'>isLoading</h3>
    if(serverError) return <h3 className='text-light'>{serverError || "Unknown Error"}</h3>

  return (
    <div className='questions'>
        <h2 className='text-light'>{questions?.question}</h2>

        <ul key={questions?.id}>
            {
                questions?.options.map((option,i) =>(
                    
                    <li key={i}>
                        <input 
                            type="radio"
                            value={true}
                            name="options"
                            id={`q${i}-option`}
                            onChange={()=> onSelect(i)}
                        />

                        <label className='text-primary' htmlFor={`q${i}-option`}>{option}</label>
                        <div className={`check ${result[trace]===i ? 'checked' : ''}`}></div>
                    </li>
                
                    
                ))
            }
                
                    
            
        </ul>
    </div>
  )
}