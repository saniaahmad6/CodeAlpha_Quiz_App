import { postServerData } from "../components/helper/helper";
import * as Action from "../redux/result_reducer"


export const PushAnswer = (result) => async (dispatch) =>{
    try{
        await dispatch (Action.pushResultAction(result))
    }catch (err){
        console.log(err);
    }
}

export const updateResult = (index) => async(dispatch) => {
    try{
        dispatch(Action.updateResultAction(index))
    }
    catch (err){
        console.log(err)
    }
}

export const usePublishResult =(resultData) => {
    const { result , username} =resultData;
    (async ()=> {
        try{
            if (result!==[] && !username) throw new Error("couldn't get result");
            await postServerData("http://localhost:8080/api/result",resultData, (data)=> data)
        }catch(err){
            console.log(err);
        }
    })();
}