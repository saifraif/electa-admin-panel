import React, { useEffect, useMemo, useState } from "react";
import {
  createIngestJob,
  listIngestJobs,
  getIngestJob,
  approveExtracted,
  IngestJob,
} from "../services/ingest";

const IngestPage: React.FC = () => {
  const [url, setUrl] = useState("");
  const [jobs, setJobs] = useState<IngestJob[]>([]);
  const [selectedJob, setSelectedJob] = useState<IngestJob | null>(null);
  const [loading, setLoading] = useState(false);

  const refresh = async () => {
    const list = await listIngestJobs();
    setJobs(list);
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
    try {
      const job = await createIngestJob(url);
      setSelectedJob(job);
      setUrl("");
      await refresh();
    } finally {
      setLoading(false);
    }
  };

  const openJob = async (id: string) => {
    const job = await getIngestJob(id);
    setSelectedJob(job);
  };

  const parties = useMemo(
    () => selectedJob?.result?.entities?.parties ?? [],
    [selectedJob]
  );
  const candidates = useMemo(
    () => selectedJob?.result?.entities?.candidates ?? [],
    [selectedJob]
  );

  const approve = async (kind: "party" | "candidate", index: number) => {
    if (!selectedJob) return;
    await approveExtracted(kind, index, selectedJob.id);
    alert(`Approved ${kind} #${index}`);
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Web Ingestion</h2>

      <form
        onSubmit={handleCreate}
        style={{ display: "flex", gap: 8, marginBottom: 16 }}
      >
        <input
          type="url"
          placeholder="Paste a public URL to crawl (press Enter)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ flex: 1 }}
          required
        />
        <button disabled={loading} type="submit">
          Create Job
        </button>
        <button type="button" onClick={refresh}>
          Refresh
        </button>
      </form>

      <div
        style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 16 }}
      >
        <aside style={{ borderRight: "1px solid #ddd", paddingRight: 12 }}>
          <h3>Jobs</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {jobs.map((j) => (
              <li key={j.id} style={{ marginBottom: 8 }}>
                <button
                  onClick={() => openJob(j.id)}
                  style={{ width: "100%", textAlign: "left" }}
                >
                  <div>
                    <strong>{j.status.toUpperCase()}</strong>
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      opacity: 0.8,
                      wordBreak: "break-all",
                    }}
                  >
                    {j.url}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <main>
          {!selectedJob ? (
            <div>Select a job to view details</div>
          ) : (
            <div>
              <h3>Job #{selectedJob.id.slice(0, 8)}</h3>
              <p>
                <b>Status:</b> {selectedJob.status}
              </p>
              <p>
                <b>URL:</b> {selectedJob.url}
              </p>
              {selectedJob.error && (
                <pre style={{ color: "crimson" }}>{selectedJob.error}</pre>
              )}

              {selectedJob.status === "success" && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 16,
                  }}
                >
                  <section>
                    <h4>Parties ({parties.length})</h4>
                    <ul>
                      {parties.map((p: any, idx: number) => (
                        <li key={idx} style={{ marginBottom: 8 }}>
                          <div>
                            <b>Name:</b> {p.name || <i>(unknown)</i>}
                          </div>
                          <div>
                            <b>Abbrev:</b> {p.abbrev || "-"}
                          </div>
                          <button onClick={() => approve("party", idx)}>
                            Approve
                          </button>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section>
                    <h4>Candidates ({candidates.length})</h4>
                    <ul>
                      {candidates.map((c: any, idx: number) => (
                        <li key={idx} style={{ marginBottom: 8 }}>
                          <div>
                            <b>Name:</b> {c.full_name}
                          </div>
                          <div>
                            <b>Party (guess):</b> {c.party_guess || "-"}
                          </div>
                          <div>
                            <b>Constituency (guess):</b>{" "}
                            {c.constituency_guess || "-"}
                          </div>
                          <button onClick={() => approve("candidate", idx)}>
                            Approve
                          </button>
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default IngestPage;
