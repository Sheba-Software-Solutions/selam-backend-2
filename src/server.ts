import app from './app';
import { config } from './infra/config';
import { connectMongo } from './infra/mongoose';

const PORT = config.PORT || 8080;

connectMongo()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });
