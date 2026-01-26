CREATE TABLE IF NOT EXISTS request_metrics_5m (
  window_start TIMESTAMPTZ NOT NULL,
  path TEXT NOT NULL,
  method TEXT NOT NULL,
  incidents_processed TEXT NOT NULL,

  request_count INT NOT NULL,
  error_count INT NOT NULL,
  avg_latency_ms INT NOT NULL,

  PRIMARY KEY (window_start, path, method)
);

ALTER TABLE request_metrics_5m
ADD COLUMN incidents_processed BOOLEAN NOT NULL DEFAULT false;

CREATE INDEX idx_metric_incident_processed
ON request_metrics_5m (incidents_processed)
WHERE incidents_processed = false;
