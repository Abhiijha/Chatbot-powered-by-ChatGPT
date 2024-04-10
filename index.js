import openai from "./config/openai.js";
import readlineSync from 'readline-sync';
import colors from 'colors';

async function main(){
    console.log(colors.bold.blue('Welcome to the Chatbot Program'));
    console.log(colors.bold.blue('Start your chat with bot.'));

    const chatHistory=[];
    
    while(true){
        const userInput= readlineSync.question(colors.magenta('You: '));

        try{
            //Construct messages related with the history
            const messages = chatHistory.map(([role, content])=>({role, content}));

            //Add latest userinput
            messages.push({"role": 'user', "content": userInput})


            const completion = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: messages,
            })

            // Get Completion text/content i.e get the answer to the user questions
            // completion is a large object which stores multiple info and the reply/answer is stored in choices-index->message->content.
            const completionText= completion.choices[0].message.content;

            if(userInput.toLowerCase() ==='exit'){
                console.log(colors.green('Bot: ')+ completionText); // Here we can hardcode the goodbye as well but in the written program the exit will be sent to chatgpt and it will come up with own greeting.
                return;
            }

            console.log(colors.green('Bot: ')+ completionText);

            //update history with userinput and chatgpt response
            chatHistory.push(['user', userInput]);
            chatHistory.push(['assistant', completionText]);
        }
        catch(error){
            console.log(colors.red(error));
        }

    }
    
}

main();