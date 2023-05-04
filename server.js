const express = require('express');
const Product = require('./models/Product');
const User = require('./models/User');
const Order = require('./models/Order');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// Connect to database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
mongoose.connection.once('open', () =>
  console.log('Connected to MongoDB database')
);

// GraphQL schema and resolvers
const schema = require('./schema');
const rootValue = require('./resolvers');

// JWT authentication strategy
const { JWT_SECRET } = process.env;
const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = JWT_SECRET;

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload.id);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

// GraphQL endpoint
app.use(
  '/graphql',
  passport.authenticate('jwt', { session: false }),
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
  })
);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));