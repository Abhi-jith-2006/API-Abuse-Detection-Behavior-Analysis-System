Role 1: Request Handling & Enforcement (Critical Path)

Owner: Abhiram Kr

Responsibilities

This role owns everything that happens in the synchronous request path, where performance and correctness are critical.

Key responsibilities include:

API authentication and API key validation

Rate limiting and immediate abuse prevention

Fast allow / block / throttle decisions

Correlation ID generation for traceability

Hand-off of request metadata to async pipelines

Design focus

Low latency and predictable behavior

Safe failure modes (system should degrade, not crash)

Clear separation between enforcement and detection

Ownership guarantee

Changes in this area are reviewed and approved by the owner to prevent regressions in the critical request path.

Role 2: Async Processing, Storage & Observability (System Backbone)

Owner: Abhijith S

Responsibilities

This role owns the asynchronous side of the system, where scalability, retries, and debuggability are handled.

Key responsibilities include:

Request log ingestion pipelines

Message queues and background workers

Aggregation of request metrics over time windows

Database schema design for logs, metrics, and incidents

Observability and incident-query APIs

Design focus

Idempotent consumers and retry safety

Eventual consistency guarantees

Debuggability under partial failures

Ownership guarantee

This role ensures that system behavior can be understood after the fact, even during failures.

Role 3: AI Analysis & Explanation Layer (Advisory Intelligence)

Owner: Midhul B

Responsibilities

This role owns all AI-related components, which are deliberately designed as non-critical, advisory subsystems.

Key responsibilities include:

Feature extraction from aggregated metrics

AI-based anomaly explanation and summarization

Incident explanation generation for humans

Caching and fallback behavior when AI is unavailable

Documentation of AI limitations and failure modes

Design focus

AI must never block or break core system functionality

Outputs must be explainable and reviewable

AI failures must degrade gracefully

Ownership guarantee

AI-related changes are reviewed to ensure they remain optional, explainable, and safe.