import { defineArrayMember, defineField, defineType } from 'sanity';

export const gallery = defineType({
  name: 'gallery', title: 'Gallery', type: 'document',
  fields: [defineField({
    name: 'photos', title: 'Photos', type: 'array',
    description: 'Upload photos and drag them into order. Publish to apply all changes to the website. Remove all photos to leave the gallery empty.',
    of: [defineArrayMember({
      type: 'image', name: 'photo', title: 'Photo', options: { hotspot: true },
      validation: rule => rule.required().assetRequired(),
      fields: [defineField({ name: 'alt', title: 'Image description', type: 'string',
        description: 'Briefly describe what is visible for people who cannot see the image.',
        validation: rule => rule.required().custom(value => value?.trim() ? true : 'Enter an image description.'),
      })],
      preview: { select: { title: 'alt', media: 'asset' }, prepare: ({title, media}) => ({ title: title || 'Add an image description', media }) },
    })],
  })],
  preview: { prepare: () => ({ title: 'Gallery' }) },
});

export const announcement = defineType({
  name: 'announcement', title: 'Announcement', type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', description: 'A short heading for this update.', validation: rule => rule.required().custom(value => value?.trim() ? true : 'Enter a title.') }),
    defineField({ name: 'message', title: 'Message', type: 'text', rows: 6, description: 'Plain text. Line breaks are preserved on the website.', validation: rule => rule.required().custom(value => value?.trim() ? true : 'Enter a message.') }),
    defineField({ name: 'date', title: 'Announcement date', type: 'date', description: 'Controls order; the newest three active posts appear first. This does not schedule publication.',
      initialValue: () => new Intl.DateTimeFormat('sv-SE', { timeZone: 'America/Los_Angeles' }).format(new Date()), validation: rule => rule.required() }),
    defineField({ name: 'showThrough', title: 'Show through', type: 'date', description: 'Optional. Visible through the end of this date in California, then hidden after the website refreshes. The post stays here for future editing.' }),
  ],
  orderings: [{ title: 'Newest announcement first', name: 'dateDesc', by: [{field:'date',direction:'desc'}] }],
  preview: { select: { title: 'title', subtitle: 'date' } },
});
