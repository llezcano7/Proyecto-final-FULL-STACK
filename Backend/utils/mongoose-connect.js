const connectionMongoDB = process.env.MONGO_URI;

mongoose.connect(connectionMongoDB)
  .then(() => {
    console.log('Connected to MongoDB');
  }).catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });

export default connectionMongoDB;