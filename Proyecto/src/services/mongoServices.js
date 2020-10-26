const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const DBUser = process.env.DB_USER;
const DBPass = process.env.DB_PASS;
const DBName = process.env.DB_NAME;
const DBCollection = process.env.DB_COLLECTION;
const uri = `mongodb+srv://${DBUser}:${DBPass}@cluster0.n7uir.gcp.mongodb.net/${DBName}?retryWrites=true&w=majority`;

const createMeeting = async (meetingData) => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  client.connect(async (err) => {
    if (err) {
      throw new Error(err.message);
    }
    const collection = client.db(DBName).collection(DBCollection);
    const meetingDoc = {
      name: meetingData.name,
      date: meetingData.date,
      participants: 0,
    };
    await collection.insertOne(meetingDoc);
    client.close();
  });
};

const addParticipant = async (id) => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const clientConnected = await client.connect();
  const db = clientConnected.db(DBName);
  const collection = db.collection(DBCollection);
  const query = {
    _id: ObjectId(id),
  };
  const resp = await collection.updateOne(query, {
    $inc: { participants: 1 },
  });
  clientConnected.close();
  if (resp.result.nModified == 0) {
    const error = new Error("ID incorrecto");
    error.type = "validation";
    throw error;
  }
};

module.exports = { createMeeting, addParticipant };
