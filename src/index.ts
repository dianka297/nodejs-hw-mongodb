import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/constants';
import { initMongoDB } from './db/initMongoConnection';
import { setupServer } from './server';
import { createDirlfNotExist } from './types/createDirlfNotExist';

await initMongoDB();

await createDirlfNotExist(TEMP_UPLOAD_DIR);
await createDirlfNotExist(UPLOAD_DIR);

setupServer();


