//import {Configuration, OpenAIApi} from 'openai' [This is an old version to import which is not supported anymore.]

import OpenAI from 'openai';
import dotenv from 'dotenv'
dotenv.config();

// In previous version we needed to create a configuration object which was passed to openaiapi class to connect with chatgpt.
// const configuration= new Configuration({
//     apiKey: process.env.OpenAI_API_KEY,
// });
// const openai= new OpenAIApi(configuration);

const openai= new OpenAI({
    apiKey: process.env.OpenAI_API_KEY
});

export default openai