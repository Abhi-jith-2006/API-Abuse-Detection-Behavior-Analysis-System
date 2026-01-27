ALTER TABLE request_metrics_5m
ADD COLUMN api_key TEXT NOT NULL DEFAULT 'unknown';


CREATE INDEX idx_request_metrics_5m_api_key
ON request_metrics_5m (api_key);
