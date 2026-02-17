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
            .order("applied_date", { ascending: false });

            if (error){
                console.error("could not fetch jobs")
            }else {
                console.log("jobs: ", data)
                setJobs(data)
            }
        }
        fetchJobs()
    }, [])

    const handleAddJob = (newJob) => {
    setJobs((prev) => [newJob, ...prev]); // add the new job at the top
  };
    return (
<div className="jobs-container">
  <div className="main-layout">
    {/* Left: Form */}
    <div className="form-wrapper">
      <Create />
    </div>

    {/* Right: Jobs cards */}
    <div className="cards-wrapper-container">
      <h2 className="heading">Jobs Applied to:</h2>

      {jobs.length === 0 ? (
        <p>No jobs applied to yet</p>
      ) : (
        <div className="cards-wrapper">
          {jobs.map((job) => (
            <div key={job.id} className="job-card">
              <h3 className="company"> {job.company}</h3>
              <p>Position: {job.position}</p>
              <p>Applied: {job.applied_date}</p>
              <div className="status">
                <p>{job.status}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
</div>
    )
}

export default Home