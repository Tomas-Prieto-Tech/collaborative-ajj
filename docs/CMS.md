# Gallery and announcements

For everyday editing instructions, see the [gym owner’s guide to updating the website](OWNER-GUIDE.md). The rest of this document includes technical setup and handoff notes for the website manager.

The website reads published Sanity content. Only Gallery and Announcements are editable in Studio; other website sections stay in the repository.

## This installation

- Studio: https://collaborative-ajj.sanity.studio/
- Project: **The Collaborative AJJ** (`i5q0pcva`)
- Dataset: **production**, public
- Studio application: `k3f3smvrteb729iypm6fammp`
- Initial nine-photo import completed; local website and Studio environments configured.
- Website hosting still needs the environment values below and deployment of this code. Owner email addresses and invitations remain part of handoff.

```dotenv
SANITY_PROJECT_ID=i5q0pcva
SANITY_DATASET=production
```

## Developer setup

Use Node.js 22.12+ (Node 24 LTS recommended) and npm. The website and `studio/` are separate packages with separate lockfiles.

```sh
npm ci
cp .env.example .env.local
npm ci --prefix studio
cp studio/.env.example studio/.env.local
```

Set `SANITY_PROJECT_ID` in the website environment and `SANITY_STUDIO_PROJECT_ID` in the Studio environment to the same project ID. Both dataset variables are `production`. No website token is needed. Never add tokens to `SANITY_STUDIO_*` variables: those are included in the browser bundle. Local environment files are ignored.

For a new installation, have the administrator log in and create a Sanity project, then create a public `production` dataset:

```sh
cd studio
npx sanity login
npx sanity projects create "The Collaborative AJJ" --dataset production --dataset-visibility public --yes
```

Use the new project ID in both environment files. Alternatively create the project and dataset at https://www.sanity.io/manage. The project above already exists; do not create another project for this installation.

```sh
# Repository root, in separate terminals
npm run dev
npm run dev --prefix studio
# Once the project and public dataset exist:
npm run import:gallery --prefix studio
```

The import publishes the nine existing photos in their original order with image descriptions. It skips when a gallery, gallery draft, or completed-import marker exists. It never merges into or resets owner content, including an intentionally empty or unpublished gallery. Asset uploads are deduplicated by Sanity. Run the initial import before owners begin editing.

## Deployment

```sh
npm run test
npm run typecheck
npm run build
npm run typecheck --prefix studio
npm run build --prefix studio
npm run deploy --prefix studio
```

Sanity deployment prompts for a unique `sanity.studio` hostname. Add `http://localhost:3333` and the final Studio origin as credential-enabled CORS origins in project API settings if needed. Website server reads do not need CORS or credentials.

Configure the website host with `SANITY_PROJECT_ID` and `SANITY_DATASET=production`, then deploy this code once. Use a host that supports the Next.js server runtime and persistent revalidation cache, not static export. Subsequent content changes need no code deployment.

The website uses Sanity's `published` perspective and the direct API (`api.sanity.io`, no additional API CDN). Successful reads are cached for 60 seconds. Expiration is evaluated during cache regeneration before selecting the newest three. Refresh happens on requests after expiry; a triggering request may receive stale content while the background refresh runs. An open browser page needs reloading. The page and content caches can mean a subsequent request is needed before the new content appears; this is not an exact 60-second delivery guarantee.

Failed cache refreshes keep the previous successful content and log the failure. A first-load failure hides announcements and shows a neutral gallery-unavailable message. A published empty gallery stays empty. Previously cached announcements may remain visible during an outage, including after their expiration date, until a successful refresh.

See [Sanity hosting](https://www.sanity.io/docs/studio/deployment), [published perspectives](https://www.sanity.io/docs/content-lake/perspectives), and [Next.js revalidation](https://nextjs.org/docs/app/api-reference/functions/fetch).

## Owner guide

1. Open the Studio address and log in with your invited Sanity account.
2. Select **Gallery**. Add/upload a photo, enter its **Image description**, and use the image menu to replace it or adjust crop and hotspot. Drag photos into the desired order. Click **Publish** when ready; draft changes stay private.
3. Remove a photo from the list and publish to remove it from the site. Removing every photo and publishing leaves an empty gallery. Unpublishing the gallery hides all photos. Existing local photos used on other pages stay unchanged.
4. Select **Announcements**, create a post, and enter its title, plain-text message, and announcement date. Publish it to show it on the website. The date controls ordering, not scheduled publication. Only the newest three non-expired posts appear.
5. **Show through** is optional. A post stays active through the end of that date in `America/Los_Angeles`, including daylight-saving changes. Expiration hides it after the next successful website refresh; it remains in Studio. Clear or extend that date and publish to show it again.
6. Edit and publish to update a post. Use **Unpublish** in its action menu to hide it while keeping it for later. Use **Delete** to remove it entirely. Reload the website after the cache refresh to see changes.

The administrator invites owners in the project's Members settings. Assign a role permitted to create, update, publish, unpublish, and delete documents (typically Editor where available, or Administrator if appropriate). A read-only Viewer cannot manage content. Role availability depends on the project plan. Test access with the owner's account during handoff; never share administrator credentials. Invitations require the owners' email addresses and explicit authorization to send them.

## Acceptance checks

Automated date tests cover California winter/summer midnight, spring-forward and fall-back, expired-before-limit selection, stable tie ordering, empty content, and expiration without a new publication.

Before owner handoff, exercise the following in the deployed Studio and website:

- Upload, replace, crop/hotspot, reorder, and remove photos; verify image descriptions and private drafts. Publish an empty gallery and restore it using document history or a saved draft, not the import.
- Create four active announcements plus an expired newer post. Verify that the newest three active posts show. Edit, unpublish, and delete test posts, checking the website after regeneration.
- Verify no announcements renders no section, and multiline messages fit a narrow mobile viewport.
- Verify the gallery and announcements on desktop and mobile. Tall gallery slots remain at positions one and four; crop/hotspot settings follow the image when reordered.
- In production mode (`npm run build && npm start`), check refresh after 60 seconds and a subsequent request, including date expiration without publishing. Simulate a failed Sanity request after warming the cache and verify old content persists; start with no successful cache and verify neutral fallbacks.

Do not treat a successful local build as proof of owner permissions or deployed editing workflows.

## Verification record

Website and Studio production builds and TypeScript checks passed. Seven automated tests passed for date boundaries, ordering, empty results, future dates, and image crop/hotspot URL generation.

Live verification used temporary content in the new project: nine imported images and descriptions, rerunnable import, gallery draft privacy, announcement draft privacy, publish/edit/unpublish/delete, expired-before-limit newest-three selection, and production refresh without rebuilding. Gallery replacement, reorder, removal, crop/hotspot storage, and published empty-state refresh also passed; the original nine photos were restored with revision protection. Temporary announcements were deleted afterward. Chromium verified the gallery and announcements at 390px and 1280px without horizontal overflow; all nine gallery images loaded. The deployed Studio redirects unauthenticated visitors to Sanity login. A production server with injected API failures retained its previously cached gallery. An unconfigured initial build successfully used neutral CMS fallbacks.

Owner-account interaction with the Studio upload/crop/reorder controls and permissions still needs the owner's login during handoff. California expiration transitions were checked with injected dates in automated tests, not by changing the production server clock.

The final Studio dependency audit reports five moderate findings from the CLI's transitive `typeid-js` / `uuid` chain (including parent-package reports), with no high or critical findings. Compatible overrides address the other reported issues; avoid `npm audit fix --force`, which currently proposes a Sanity downgrade. Recheck when upgrading Studio. The website audit reports no vulnerabilities.
