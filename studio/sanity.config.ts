import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { gallery, announcement } from './schemaTypes';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
if (!projectId) throw new Error('Set SANITY_STUDIO_PROJECT_ID in studio/.env.local.');

export default defineConfig({
  name: 'cajj', title: 'The Collaborative', projectId,
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  tasks: { enabled: false },
  scheduledDrafts: { enabled: false },
  releases: { enabled: false },
  plugins: [structureTool({ structure: S => S.list().title('Website content').items([
    S.listItem().title('Gallery').id('gallery').child(S.document().schemaType('gallery').documentId('gallery').title('Gallery')),
    S.documentTypeListItem('announcement').title('Announcements'),
  ]) })],
  schema: { types: [gallery, announcement], templates: templates => templates.filter(t => t.schemaType !== 'gallery') },
  document: {
    actions: (actions, context) => context.schemaType === 'gallery'
      ? actions.filter(action => action.action !== 'duplicate' && action.action !== 'delete') : actions,
    newDocumentOptions: options => options.filter(option => option.templateId !== 'gallery'),
  },
});
