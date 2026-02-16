import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient"; 
import Create from "./create";

function Home(){
    const [jobs, setJobs] = useState([])

    useEffect(() => {
        const fetchJobs = async () => {
            const {data, error} = await supabase
            .from("jobs")
            .select("*")

            if (error){
                console.error("could not fetch jobs")
            }else {
                console.log("jobs: ", data)
                setJobs(data)
            }
        }
        fetchJobs()
    }, [])

    return (
        <div className="jobs-container">
            <div className="form-Wrapper">
                <Create/>
            </div>
            <div className="main-content">
            <h2 className="heading">jobs Applied to:</h2>
            {jobs.length === 0 ? (
                <p>No jobs applied to yet</p>
            ): (
                <div className="cards-wrapper">
                {jobs.map((job) => (
                    <div key={job.id} className="job-card">
                        <h3 className="company">Company: {job.company}</h3>
                        <p>position: {job.position}</p>
                        <p>applied_date: {job.applied_date}</p>
                        <div className="status">
                            <p> {job.status}</p>
                            </div>
                    </div>
                ))}
                </div>
            )}
        </div>

        </div>
    )
}

export default Home