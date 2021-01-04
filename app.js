const { App } = require('@slack/bolt');

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});
// console.log(process.env.SLACK_BOT_TOKEN)
// console.log(process.env.SLACK_SIGNING_SECRET)

// Listens to incoming messages that contain "hello"
app.message('hello', async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  console.log('message', JSON.stringify(message))
  await say(`Hey there <@${message.user}>!`);
});

app.command('/echo', async ({ command, ack, say }) => {
  // Acknowledge command request
  await ack();
  await say(`${command.text}`);
});

async function main () {
  // Start your app
  await app.start(process.env.PORT || 3001);

  console.log('⚡️ Bolt app is running!');
}

main()
