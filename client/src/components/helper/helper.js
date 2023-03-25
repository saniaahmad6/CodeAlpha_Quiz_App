import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import axios from "axios";
export function attempts_Number(result){
    return result.filter( r => r!== undefined).length;
}

export function earnPoints_Number(result,answers,points){
    return result.map( (element,i) => answers[i]===element).filter( i=> i).map(i => points).reduce((prev,curr) =>  prev+curr ,0);
}

export function flagResult(total,userspnts){
    return (total * 50 /100) <userspnts ;
}
export function CheckUserExists({children}){
    const auth =useSelector(state => state.result.userId)
    return auth ? children : <Navigate to={'/'} replace={true}></Navigate>
}

export async function getServerData(url,callback){
    const data = await (await axios.get(url))?.data;
    return callback ? callback(data) : data ;
}

export async function postServerData(url,result,callback){
    const data = await (await axios.post(url,result))?.data;
    return callback ? callback(data) : data ;
}

