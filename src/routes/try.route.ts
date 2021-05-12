import express from 'express';
import amqp = require('amqplib');

import bodyParser = require('body-parser');
import { v4 as uuidv4 } from 'uuid';

const option = {
    credentials: require('amqplib').credentials.plain(
        process.env.RABBITMQ_USER,
        process.env.RABBITMQ_PASSWD
    ),
};

module.exports = function (app: express.Application) {
    app.get('/api', async (req, res) => {
        res.status(200).json({ message: 'Welcome to CodeBench-API' });
    });

    app.post('/api/try', bodyParser.json(), async (req, res) => {
        const job = req.body;
        job.id = uuidv4();
        const amqpEndpint = process.env.RABBITMQ_URL || 'amqp://127.0.0.1:5672';

        try {
            const conn = await amqp.connect(amqpEndpint, option);
            const chan = await conn.createChannel();
            const queue = process.env.RABBITMQ_QUEUE || 'jobs';

            // Prepare status channel/queue/exchange/whatever
            const chan_status = await conn.createChannel();
            chan_status.assertExchange('job_status', 'direct', {
                durable: false,
            });

            const status_queue = await chan_status.assertQueue('job_status', {
                durable: true,
            });

            chan_status.bindQueue(status_queue.queue, 'job_status', job.id);

            // Send job to RabbitMQ
            await chan.assertQueue(queue, {
                durable: true,
            });

            await chan.sendToQueue(
                queue,
                Buffer.from(JSON.stringify(req.body)),
                {
                    persistent: true,
                }
            );

            await chan.close();

            let msg = await chan_status.get(status_queue.queue, {});
            if (msg != false) {
                console.log(msg.content.toString());
                chan_status.ack(msg);
                let parsedRes = JSON.parse(msg.content.toString());
                while (parsedRes.status != 'done') {
                    msg = await chan_status.get(status_queue.queue, {});
                    if (msg != false) {
                        console.log(msg.content.toString());
                        chan_status.ack(msg);
                        parsedRes = JSON.parse(msg.content.toString());
                    }
                }

                await chan_status.unbindQueue(
                    status_queue.queue,
                    'job_status',
                    job.id
                );

                res.status(200).json({
                    message: 'Code successfully sent to message broker',
                    id: job.id,
                    stderr: parsedRes.stderr,
                    stdout: parsedRes.stdout,
                });
            }
            // chan_status.prefetch(1)
            // Wait for job to be processed by getting status from queue
            // await chan_status.consume(status_queue.queue, async (msg) => {
            //     if (msg != null) {
            //         console.log(msg.content.toString());
            //         chan_status.ack(msg);
            //         // await new Promise((r) => setTimeout(r, 1000));
            //         // setTimeout(function () {}, 1000);
            //         const parsedRes = JSON.parse(msg.content.toString());
            //         if (parsedRes.status == 'done') {
            //             res.status(200).json({
            //                 message: 'Code successfully sent to message broker',
            //                 id: job.id,
            //                 stderr: parsedRes.stderr,
            //                 stdout: parsedRes.stdout,
            //             });
            //             await chan_status.close();
            //             return;
            //         }
            //         if (parsedRes.status == 'failed') {
            //             res.status(500).json({
            //                 message:
            //                     'Failed to send code your code for execution',
            //             });
            //             await chan_status.close();

            //             return;
            //         }
            //     }
            //     await new Promise((r) => setTimeout(r, 5000));
            //     // setTimeout(function () {}, 1000);
            // });

            await chan_status.close();
            await conn.close();
        } catch (e) {
            console.error(e);
            res.status(500).json({
                message: 'Failed to send code your code for execution',
            });
        }
    });
};
