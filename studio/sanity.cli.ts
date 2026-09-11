import { defineCliConfig } from 'sanity/cli';
export default defineCliConfig({
  deployment: { appId: 'k3f3smvrteb729iypm6fammp' },
  api: { projectId: process.env.SANITY_STUDIO_PROJECT_ID, dataset: process.env.SANITY_STUDIO_DATASET || 'production' },
});
