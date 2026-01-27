CREATE TABLE incidents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),


  entity_type TEXT NOT NULL CHECK (entity_type IN ('api_key', 'ip', 'user')),
  entity_id TEXT NOT NULL,

  
  incident_type TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),

  
  window_start TIMESTAMPTZ NOT NULL,
  window_end   TIMESTAMPTZ NOT NULL,
  metric_snapshot JSONB NOT NULL,

  
  status TEXT NOT NULL CHECK (status IN ('open', 'acknowledged', 'resolved')),
  detected_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  resolved_at TIMESTAMPTZ,

  UNIQUE (entity_type, entity_id, incident_type, window_start)
);

CREATE INDEX idx_incidents_status ON incidents(status);
CREATE INDEX idx_incidents_entity ON incidents(entity_type, entity_id);
