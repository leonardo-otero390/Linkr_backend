/* eslint-disable no-console */

import './setup.js';
import app from './app.js';

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}.
  Server running at ${process.env.NODE_ENV} mode`);
});
