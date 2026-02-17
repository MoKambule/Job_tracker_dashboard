import { supabase } from "../supabaseClient";

export const updateJobStatus = async (jobId, newStatus, setJobs) => {
  const { data, error } = await supabase
    .from("jobs")
    .update({ status: newStatus })
    .eq("id", jobId);

  if (error) {
    console.error("Update failed:", error);
    alert("Could not update status");
  } else {
    if (newStatus === "Rejected") {
     
      setJobs(prev => prev.filter(job => job.id !== jobId));
      
      navigate("/rejected");
    }
    
    else {
    
      setJobs(prev =>
        prev.map(job => (job.id === jobId ? { ...job, status: newStatus } : job))
      );
    }
  }
};