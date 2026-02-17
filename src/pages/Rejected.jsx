import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

function Rejected() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchRejectedJobs = async () => {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("status", "Rejected") // only rejected jobs
        .order("applied_date", { ascending: false });

      if (error) console.error("Could not fetch rejected jobs", error);
      else setJobs(data);
    };

    fetchRejectedJobs();
  }, []);

  return (
    <div className="jobs-container">
      <h2 className="heading">Rejected Jobs:</h2>
      {jobs.length === 0 ? (
        <p>No rejected jobs yet.</p>
      ) : (
        <div className="cards-wrapper">
          {jobs.map((job) => (
            <div key={job.id} className="job-card">
              <h3 className="company">{job.company}</h3>
              <p>Position: {job.position}</p>
              <p>Applied: {job.applied_date}</p>
              <div className="status">{job.status}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Rejected;