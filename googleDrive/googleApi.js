var express = require('express'),
  formidable = require('formidable'),
  fs = require('fs'),
  path = require('path');
const readline = require('readline');
const { google } = require('googleapis');
// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive'];///-----
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token1.json';
var app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

// Upload route.
var generateAuthUrl = function (req, res) {

  // Load client secrets from a local file.
  fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Drive API.
    //   authorize(JSON.parse(content));//------
    credentials = JSON.parse(content);
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
      // if (err) return getAccessToken(oAuth2Client, callback);
      const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
      });
      console.log('Authorize this app by visiting this url:', authUrl);
      res.status(200).send({ AuthURL: authUrl, message: "success" });
      //oAuth2Client.setCredentials(JSON.parse(token));
      //callback(oAuth2Client);
    });
  });
}

var setToken = function (req, res) {
  fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Drive API.
    //   authorize(JSON.parse(content));//------
    credentials = JSON.parse(content);
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

    oAuth2Client.getToken(req.body.code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
        res.send(token);
      });
    });
  });
}


// fs.readFile('credentials.json', (err, content) => {
//   if (err) return console.log('Error loading client secret file:', err);
//   // Authorize a client with credentials, then call the Google Drive API.
//   // authorize(JSON.parse(content), listFiles);
//   // authorize(JSON.parse(content), getFile);
//   authorize(JSON.parse(content), this.uploadFile);
// });
// function authorize(credentials, callback) {
//   const { client_secret, client_id, redirect_uris } = credentials.installed;
//   const oAuth2Client = new google.auth.OAuth2(
//     client_id, client_secret, redirect_uris[0]);

//   // Check if we have previously stored a token.
//   fs.readFile(TOKEN_PATH, (err, token) => {
//     if (err) return getAccessToken(oAuth2Client, callback);
//     oAuth2Client.setCredentials(JSON.parse(token));
//     callback(oAuth2Client);//list files and upload file
//     //callback(oAuth2Client, '0B79LZPgLDaqESF9HV2V3YzYySkE');//get file

//   });
// }

//  module.exports.uploadFile=async(auth)=> {

//   var folderName = "uploads"
//   const drive = google.drive({ version: 'v3', auth });
//   var fileMetadata = {
//     'name': folderName,
//     'mimeType': 'application/vnd.google-apps.folder'
//   };
//   drive.files.create({
//     resource: fileMetadata,
//     fields: 'id'
//   }, function (err, file) {
//     if (err) {
//       // Handle error
//       console.error(err);
//     } else {
//       console.log('Folder Id: ', file.data.id);
//     }

//     const targetFolderId = file.data.id;
//     fs.readdir(folderName, function (err, filenames) {

//       if (filenames) {
//         filenames.forEach(filename => {
//           console.log(filename)

//           const drive = google.drive({ version: 'v3', auth });
//           var fileMetadata = {
//             'name': filename,
//             parents: [targetFolderId]
//           };
//           var media = {
//             mimeType: '*/*',
//             body: fs.createReadStream(folderName + '/' + filename)
//           };
//           drive.files.create({
//             resource: fileMetadata,
//             media: media,
//             fields: 'id'
//           }, function (err, res) {
//             if (err) {
//               // Handle error
//               console.log(err);
//             } else {
//               console.log('File Id: ', res.data.id);
//             }

//           });
//         })
//       }
//     });
//   })

// }


module.exports.generateAuthUrl = generateAuthUrl;
module.exports.setToken = setToken;

