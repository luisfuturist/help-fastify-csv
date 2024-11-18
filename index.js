import Fastify from 'fastify';
import fastifyMultipart from '@fastify/multipart';
import csv from 'csv-parser';

const fastify = Fastify();

await fastify.register(fastifyMultipart);

fastify.post('/upload-csv', async (req, reply) => {
  try {
    const data = [];

    const file = await req.file();

    if (!file) {
      return reply.code(400).send({ error: 'No file uploaded' });
    }

    return new Promise((resolve, reject) => {
      file.file
        .pipe(csv())
        .on('data', (row) => {
          data.push(row);
        })
        .on('end', () => {
          resolve(reply.send({ success: true, rows: data }));
        })
        .on('error', (err) => {
          reject(reply.code(500).send({ error: err.message }));
        });
    });
  } catch (error) {
    reply.code(500).send({ error: 'An unexpected error occurred', details: error.message });
  }
});

const startServer = async () => {
  try {
    const address = await fastify.listen({ port: 3000 });
    console.log(`Server running at ${address}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

startServer();
