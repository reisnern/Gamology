const express = require('express');
const mongoose = require('mongoose');

'use strict';
const {google} = require('googleapis');
const compute = google.compute('v1');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./routes'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/gameology', {
    useFindandModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.set('debug', true);

// Get the appropriate type of credential client, depending upon the runtime environment.
async function main() {
    // The `getClient` method will choose a service based authentication model
    const auth = new google.auth.GoogleAuth({
      // Scopes can be specified either as an array or as a single, space-delimited string.
      scopes: ['https://www.googleapis.com/auth/compute'],
    });
  
    // Obtain the current project Id
    const project = await auth.getProjectId();
  
    // Get the list of available compute zones for your project
    const res = await compute.zones.list({project, auth});
    console.log(res.data);
  }
  
  main().catch(console.error);

app.listen(PORT, () => console.log(` Connected on localhost:${PORT}`));