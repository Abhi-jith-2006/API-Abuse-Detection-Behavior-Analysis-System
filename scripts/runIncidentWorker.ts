import { runIncidentDetectionWorker } from '../src/workers/incidentDetection.worker';

async function main() {
  await runIncidentDetectionWorker();
  console.log('Incident detection run completed');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
