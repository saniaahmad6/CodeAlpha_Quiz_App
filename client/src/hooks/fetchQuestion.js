// fetch question hook



import { useState ,useEffect} from "react"
import { useDispatch } from "react-redux"
import { getServerData } from "../components/helper/helper"
// import data, {answer} from "../database/data"
import * as Action from "../redux/question_reducer"


export const useFetchQuestion =() =>{
    const dispatch =useDispatch()
    const [getData, setGetData]= useState({
        Loading: false,
        apiData : [],
        serverError : null
    })

    useEffect(()=>{
        setGetData(prev => ({
            ...prev,
            Loading :true
        }));
        //fetches from backend
        (async () => {
            try {
                
                const [{questions,answers}] = await getServerData("http://localhost:8080/api/questions", (data) => data)
                console.log(questions)
                if (questions.length >0) {
                    setGetData(prev => ({
                        ...prev,
                        Loading :false
                    }));
                    setGetData(prev => ({
                        ...prev,
                        apiData : {questions,answers}
                    }));

                    dispatch(Action.startExamAction({question : questions,answers}))
                }
                else{
                    throw new Error ("No Question Available")
                }
                
            }
            catch (error) {
                setGetData(prev => ({
                    ...prev,
                    Loading :false
                }));
                setGetData(prev => ({
                    ...prev,
                    serverError :error
                }));
            }
        })();
    },[dispatch]);

    return [getData,setGetData]
}


export const MoveNextQuestion = () => async (dispatch) => {
    try{
        dispatch(Action.moveNextAction())
    }
    catch (error){
        console.log("error")
    }

}
export const MovePrevQuestion = () => async (dispatch) => {
    try{
        dispatch(Action.movePrevAction())
    }
    catch (error){
        console.log("error")
    }

}
