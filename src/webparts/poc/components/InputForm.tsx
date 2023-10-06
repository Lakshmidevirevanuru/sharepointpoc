import * as React from "react";
import { useState } from "react";
import "./Poccss.scss";
import { SPHttpClient, SPHttpClientResponse ,ISPHttpClientOptions} from '@microsoft/sp-http';
import { WebPartContext } from "@microsoft/sp-webpart-base";

const InputForm : React.FC<{listName: string,context: WebPartContext,onChangeName: (newName: string) => void}> = ({listName,context,onChangeName})=>{
    const [title, setTitle]=useState("");
    const [feedback, setFeedback]=useState("");


    const handleSubmit=async (e:React.FormEvent) => {
        e.preventDefault();

        try{
            let item = {
                Title: title,
                Feedback: feedback
              };

              const spOpts: ISPHttpClientOptions = {
                body: JSON.stringify(item)
              };
              context.spHttpClient.post(
                `${context.pageContext.web.absoluteUrl}/sites/SpinversePOC/_api/web/lists/getbytitle('${listName}')/items`,
                SPHttpClient.configurations.v1,spOpts
                
              )
              .then((response: SPHttpClientResponse) => {
                // Handle the response
                onChangeName("added");
              });
              
              
            
            
        }catch (error){
            console.log(error)
        }
    };

    return(
        <form onSubmit={handleSubmit} className="container">
            <div className="container">
                <label htmlFor="title">Title : </label>
                <input
                type="text"
                id="title"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                required
                />
            </div>
            <div className="container">
            <label htmlFor="feedback">Feedback : </label>
                <input
                type="text"
                id="feedback"
                value={feedback}
                onChange={(e)=>setFeedback(e.target.value)}
                required
                />
            </div>
            <button type="submit">Submit Feedback</button>
        </form>
    )


}

export default InputForm;