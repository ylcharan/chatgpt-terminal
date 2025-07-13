import openai from "./config/open-ai.js";
import readlineSync from "readline-sync";
import colors from "colors";

const main = async () => {
  console.log(colors.bold.green("Welcome to Terminal GPT!"));
  console.log(
    colors.bold.green(
      "You can ask me anything, and I will do my best to answer."
    )
  );

  const chatHistory = [];

  while (true) {
    const userInput = readlineSync.question(colors.bold.cyan("You: "));

    try {
      const messages = chatHistory.map(([role, content]) => ({
        role,
        content,
      }));

      messages.push({ role: "user", content: userInput });

      if (userInput.toLowerCase() === "exit") {
        console.log(colors.bold.red("Exiting Terminal GPT. Goodbye!"));
        break;
      }

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
      });
      const completionText = completion.choices[0].message.content;

      console.log(colors.bold.magenta("GPT: "), completionText);
      chatHistory.push(["user", userInput]);
      chatHistory.push(["assistant", completionText]);
    } catch (error) {
      console.error(colors.red("Error: ", error.message));
    }
  }
};

main();
