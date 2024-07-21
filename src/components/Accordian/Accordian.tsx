import { useEffect, useState } from "react"
import data from "./data"


export default function Accordian(){
    const [expandedQues, setExpandedQues] = useState <string | null>(null)
    const [multiSelect, setMultiSelect] = useState <boolean>(false)
    const [multipleSelected, setMultipleSelected] = useState <string []>([])
    useEffect(()=>{
        setMultipleSelected([])
    },[multiSelect])
    
    function toggleSelect(){
        setMultiSelect(multiSelect => !multiSelect)
    }

    function handleSingleSelection(id: string){
        expandedQues == id? setExpandedQues(null) : setExpandedQues(id)
    }

    function handleMultiSelection(id: string){
        let questions = [...multipleSelected]
        const quesIndex = questions.indexOf(id) 
        if(quesIndex == -1){
            questions.push(id)
        }
        else{
            questions.splice(quesIndex,1)
        }
        setMultipleSelected(questions)

    }

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="flex flex-col">
                <div className="flex justify-center my-2">
                    <button className="bg-green-800 text-slate-200 p-3" onClick={toggleSelect}>{multiSelect? "Disable": "Enable"} multiple selection</button>
                </div>
                <div>
                    {data.map(problem => {
                        return (
                            <div key={problem.id}>
                                <div className="bg-green-800 text-slate-200 p-4 my-1" onClick={()=>{
                                        multiSelect? handleMultiSelection(problem.id): handleSingleSelection(problem.id)
                                        }}>
                                    <button>
                                        <h3>Q. {problem.question}</h3>
                                        <div className="flex">
                                        {
                                            expandedQues == problem.id || multipleSelected.includes(problem.id)?  <h5>A. {problem.answer}</h5> : null
                                        }
                                        </div>
                                        
                                    
                                    </button>
                                </div>
                                
                            </div>
                    )})}
                </div>
            </div>
            
        </div>
    )
}

