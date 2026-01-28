import express, { Request, request, Response } from 'express';
import { prisma } from './lib/prisma';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.all('/api/auth/{*any}', toNodeHandler(auth));

const main = async () => {
  try {
    await prisma.$connect();
    console.log('Prisma connected successfully');
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(`An error occured in server`, error);
    await prisma.$disconnect();
    process.exit(1);
  }
};
main();
