const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://siu_admin:VeXC80POfjzxSFIl@ac-duen7sj-shard-00-00.bwfkhxp.mongodb.net:27017,ac-duen7sj-shard-00-01.bwfkhxp.mongodb.net:27017,ac-duen7sj-shard-00-02.bwfkhxp.mongodb.net:27017/siu_talenthunt?ssl=true&replicaSet=atlas-10dyvw-shard-0&authSource=admin&retryWrites=true&w=majority";

const schema = new mongoose.Schema({}, { strict: false });
const Registration = mongoose.model('Registration', schema);

async function run() {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(MONGO_URI);
    console.log('Database connected.');

    const res = await Registration.deleteOne({ appId: 'TEST999' });
    console.log(`Deleted ${res.deletedCount} test candidate entries from Registration collection (appId: TEST999).`);
    console.log('Done.');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Database disconnected.');
  }
}

run();
