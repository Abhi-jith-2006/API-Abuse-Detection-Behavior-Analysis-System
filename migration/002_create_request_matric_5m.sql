CREATE TABLE IF NOT EXISTS request_metrics_5m (
  window_start TIMESTAMPTZ NOT NULL,
  path TEXT NOT NULL,
  method TEXT NOT NULL,

  request_count INT NOT NULL,
  error_count INT NOT NULL,
  avg_latency_ms INT NOT NULL,

  PRIMARY KEY (window_start, path, method)
);
