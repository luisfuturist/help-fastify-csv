# help-fastify-csv

Minimal Fastify server that accepts CSV file uploads and returns the parsed rows as JSON.

## Endpoint

`POST /upload-csv` - multipart form upload (field name `image`), streams the file through `csv-parser` and responds with `{ "success": true, "rows": [...] }`.

## Run

```bash
pnpm install
pnpm start          # node index.js, listens on :3000
```

## Test

```bash
./post.sh           # curl -X POST -F "image=@data.csv" http://localhost:3000/upload-csv
```
