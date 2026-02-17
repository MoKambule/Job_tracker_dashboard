import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient"; 
import Create from "./create";
import { updateJobStatus } from "./Update";

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

    const handleStatusChange = async (e, job) => {
    const newStatus = e.target.value;

    const { data, error } = await supabase
      .from("jobs")
      .update({ status: newStatus })
      .eq("id", job.id);

    if (error) {
      console.error("Update failed:", error);
      alert("Could not update status");
    } else {
      if (newStatus === "rejected") {
      
        setJobs(prev => prev.filter(j => j.id !== job.id));
       
        navigate("/rejected");
      } else {
       
        setJobs(prev =>
          prev.map(j => (j.id === job.id ? { ...j, status: newStatus } : j))
        );
      }
    }
  };
    return (
<div className="jobs-container">
  <div className="main-layout">
   
    <div className="form-wrapper">
      <Create />
    </div>

   
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

             
              <select className="status" value={job.status} onChange={(e) =>updateJobStatus(job.id, e.target.value, setJobs, navigate) }>
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
              </select>
              
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