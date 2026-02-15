import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient"; 

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
        <div>
            <h2>jobs Applied to</h2>
            {jobs.length === 0 ? (
                <p>No jobs applied to yet</p>
            ): (
                jobs.map((job) => (
                    <div key={job.id}>
                        <h3>Company: {job.company}</h3>
                        <p>position: {job.position}</p>
                        <p>status: {job.status}</p>
                        <p>applied_date: {job.applied_date}</p>
                    </div>
                ))
            )}
        </div>


    )
}

export default Home