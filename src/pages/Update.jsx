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

    if (setJobs) {
      setJobs((prevJobs) =>
        prevJobs.map((j) => (j.id === jobId ? { ...j, status: newStatus } : j))
      );
    }
  }
};