-- migrations/001_create_request_logs.sql

CREATE TABLE IF NOT EXISTS request_logs (
  id BIGSERIAL PRIMARY KEY,
  request_id TEXT UNIQUE NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL,
  method TEXT NOT NULL,
  path TEXT NOT NULL,
  status_code INT NOT NULL,
  ip TEXT NOT NULL,
  user_agent TEXT,
  user_id TEXT,
  response_time_ms INT NOT NULL
);
