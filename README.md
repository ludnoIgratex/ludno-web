# Ludno frontend

## Automatic rebuilds from Strapi

The production site is a static Next.js export. Published Strapi changes trigger
a complete rebuild through GitHub Actions.

Required GitHub repository secrets:

- `STRAPI_REBUILD_SECRET`: a long random value used to authenticate Strapi.
- `REBUILD_DISPATCH_TOKEN`: a fine-grained GitHub token restricted to this
  repository, with `Contents: Read and write` permission (required by GitHub's
  repository dispatch endpoint).

Create a Strapi webhook with:

- URL: `https://ludno.ru/api/strapi-rebuild`
- Header: `X-Rebuild-Secret: <STRAPI_REBUILD_SECRET>`
- Events: entry publish, unpublish and delete. Enable entry update as well only
  when the installed Strapi version updates published records without emitting
  a separate publish event. Media events are optional.

The endpoint accepts the standard Strapi webhook payload, dispatches the
`strapi_content_changed` repository event, and the deploy workflow rebuilds the
Docker image with a unique `BUILD_CACHE_BUSTER`.
