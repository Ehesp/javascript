import './loadEnv';

import type { StrictAuthProp } from '@clerk/clerk-sdk-node';
import type { Application, Request, Response, NextFunction } from 'express';

import * as express from 'express';
import { privateRoutes, publicRoutes } from './routes';

const port = process.env.PORT || 3000;
const app: Application = express();

declare global {
  namespace Express {
    interface Request extends StrictAuthProp {}
  }
}

app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use(publicRoutes);
app.use(privateRoutes);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(401).send('Unauthenticated!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
