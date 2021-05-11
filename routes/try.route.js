const bodyParser = require('body-parser');
const amqp = require('amqplib/callback_api');
const option = { credentials: require('amqplib').credentials.plain(process.env.RABBITMQ_USER, process.env.RABBITMQ_PASSWD) };

module.exports = function (app) {

    app.get('/api', async (req, res) => {
        res.status(200).json({ message: "Welcome to CodeBench-API"});
    });

    app.post('/api/try', bodyParser.json(), async (req, res) => {
        let data = req.body;

        amqp.connect(process.env.RABBITMQ_URL, option, (error0, connection) => {
            if (error0) {
                res.status(500).json({ message: "Failed to connect to message broker" });
            }
            connection.createChannel(function(error1, channel) {
                if (error1) {
                    res.status(500).json({ message: "Failed to send code your code for execution" });
                }
                const queue = process.env.RABBITMQ_QUEUE;

                channel.assertQueue(queue, {
                    durable: true
                });
                channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)), {
                    persistent: true
                });
            });
            setTimeout(function() {
                connection.close();
                res.status(200).json({ message: "Code successfully sent to message broker" });
            }, 10);
        });
    });
}
