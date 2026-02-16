import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import "./Create.css";

function Create() {
    const [company, setCompany] = useState("")
    const [position, setPosition] = useState("")
    const [status, setStatus] = useState("Applied")
    const [applied_date, setAppliedDate] = useState("")
    const navigate = useNavigate()

    const addJob = async (e) => {
        e.preventDefault()

        if (!company || !position || !status || !applied_date) {
            alert("all fields are required")
            return
        }

        const {data, error} = await supabase
        .from("jobs")
        .insert([{company, position, status, applied_date}])
        .select()

         if (error) {
            console.error("Insert error:", error)
            alert(error.message)
        } else {
            console.log("Inserted:", data)
            // Redirect to home to see the new list
            navigate("/")
        }
    }
    return (
        <div>
            <h2>
                Add new job
            </h2>
            <form onSubmit={addJob}>
                <label >Company name:</label>
                <input type="text" placeholder="Company name" value={company} onChange={(e) => setCompany(e.target.value)} required/>
                <label>Position applied for:</label>
                <input type="text" placeholder="Position" value={position} onChange={(e) => setPosition(e.target.value)} required/>
                <label>Status:</label>
                <input type="text" placeholder="Status" value={status} onChange={(e) => setStatus(e.target.value)} required/>
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="Applied">Applied</option>
                        <option value="Interview">Interview</option>
                        <option value="Offer">Offer</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                <label>Applied on:</label>
                <input type="text" placeholder="Applied_Date" value={applied_date} onChange={(e) => setAppliedDate(e.target.value)} required/>
                <button type="submit">Add Job</button>
            </form>
        </div>
    )
}

export default Create