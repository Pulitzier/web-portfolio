// server.js
const express = require("express");
const bodyParser = require("body-parser");
const dialogflow = require("dialogflow");

const app = express();
app.use(bodyParser.json());

const projectId = "a8d95508-54d9-416b-8100-c853084c995e";
const sessionId = "975a4820-ab95-4feb-b463-1cc5d9241483";
const languageCode = "en-US";

const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

app.post("/webhook", async (req, res) => {
  try {
    const { message } = req.body;
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: message,
          languageCode: languageCode,
        },
      },
    };
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    res.json({ fulfillmentText: result.fulfillmentText });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to process request" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
