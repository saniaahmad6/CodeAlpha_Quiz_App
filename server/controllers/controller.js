import Questions from "../models/questionSchema.js"
import Results from "../models/resultSchema.js"
import questions, {answers} from '../database/data.js'
export async function getQuestions(req,res){
    try{
        const q = await Questions.find();
        res.json(q);

    }catch (err){
        res.json({err});
    }
}

export async function addQuestions(req,res){
    try{
        Questions.insertMany({questions: questions,answers : answers})
        .then(result => {
            res.json(result);
        }) 
    }
    catch (error){

    }
}
export async function deleteQuestions(req,res){
    try{
        const q = await Questions.deleteMany();
        res.json(q);

    }catch (err){
        res.json({err});
    }
}



export async function getResult(req,res){
    try{
        const r = await Results.find();
        res.json(r);

    }catch (err){
        res.json({err});
    }
}

export async function storeResult(req,res){
    try{
        const {username,result,attempts,points,achieved} = req.body;
        if (!username && !result) throw new Error ('Data not provided');
        Results.create({username,result,attempts,points,achieved})
        .then( result =>{
            res.json(result)
        }
            
        )
    }
    catch (error){
        res.json({err});
    }
}

export async function delResult(req,res){
    try{
        const r = await Results.deleteMany();
        res.json(r);

    }catch (err){
        res.json({err});
    }
}
