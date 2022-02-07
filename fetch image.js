const {google} = require('googleapis');
const path = require('path')
const fs = require('fs')

const CLIENT_ID = '933306665361-iu4am3no44vdkdmf6cggqkrrcm0l4f07.apps.googleusercontent.com'
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'

const REFRESH_TOKEN = '1//046oDnd5EyPP6CgYIARAAGAQSNwF-L9Irql8cWlPsDU_PdAuVYNoKc41Y4sYO2HZcPORN971O8sODaPO_Y0vJZVxitNAmWoJUxro';

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);
oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
})

const filePath = path.join(__dirname, 'Picture 3.jpeg')

async function uploadFile() {
    try {
        const response = await drive.files.create({
            requestBody: {
                name: 'Aamya_Nagpal.jpeg',
                MimeType: 'image/jpeg'
            },
            media: {
                MimeType: 'image/jpeg',
                body: fs.createReadStream(filePath)
            }
        })
        console.log(response.data)
    } catch (error) {
        console.log(error.message)
    }
}
//uploadFile();
async function generatePublicUrl() {
    try {
       const fileID = '1UEDsXurusbHz-fle9AZX0RzvNidwvbmh';
       await drive.permissions.create({
           fileId: fileID,
           requestBody: {
               role: 'reader',
               type: 'anyone'
           }
       })
       const result= await drive.files.get({
           fileId: fileID,
           fields: 'webViewLink, webContentLink'
       })
       console.log(result.data);
    } catch (error) {
        console.log(error.message)
    }
}
generatePublicUrl();