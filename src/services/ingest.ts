import api from "../lib/axios";

export type IngestJob = {
  id: string;
  url: string;
  status: "queued" | "running" | "success" | "error";
  created_at: string;
  updated_at?: string;
  result?: {
    html?: string;
    entities?: {
      parties?: any[];
      candidates?: any[];
      raw_text_sample?: string;
    };
  };
  error?: string | null;
};

export async function createIngestJob(url: string): Promise<IngestJob> {
  const { data } = await api.post("/ingest/jobs", { url });
  return data;
}

export async function listIngestJobs(): Promise<IngestJob[]> {
  const { data } = await api.get("/ingest/jobs");
  return data;
}

export async function getIngestJob(id: string): Promise<IngestJob> {
  const { data } = await api.get(`/ingest/jobs/${id}`);
  return data;
}

export async function approveExtracted(
  kind: "party" | "candidate",
  index: number,
  jobId: string,
  payload?: any
) {
  const { data } = await api.post(
    `/ingest/extracted/${kind}/${index}/approve`,
    { payload, job_id: jobId }
  );
  return data;
}
