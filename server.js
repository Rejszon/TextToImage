import * as dotenv from 'dotenv';
dotenv.config();

import { Configuration, OpenAIApi} from 'openai';

const configuration = new Configuration({
    apiKey: process.env.API_KEY,
})

const openai = new OpenAIApi();

import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/dream', async (req, res) => {
    const prompt = req.body.prompt;

    const apiResponse = await openai.createImage({
        prompt,
        n: 1,
        size: "1024x1024",
    })

    const image = apiResponse.data.data[0].url;
    res.send({ image });
});

app.listen(8080, () => console.log(process.env.API_KEY));