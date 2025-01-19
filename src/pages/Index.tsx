import { useState } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { OptionButton } from "@/components/OptionButton";
import { ProgressBar } from "@/components/ProgressBar";
import { StreakCounter } from "@/components/StreakCounter";
import { TokenCounter } from "@/components/TokenCounter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { generateQuestion } from "@/services/questionService";
import { useQuery } from "@tanstack/react-query";

interface Message {
  content: string;
  isAI: boolean;
}

interface Option {
  text: string;
  correct: boolean;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [streak, setStreak] = useState(3);
  const [progress, setProgress] = useState(60);
  const [userInput, setUserInput] = useState("");
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [tokens, setTokens] = useState(100);

  const { data: currentQuestion, refetch: refetchQuestion } = useQuery({
    queryKey: ["question"],
    queryFn: generateQuestion,
    enabled: messages.length === 0,
  });

  if (messages.length === 0 && currentQuestion) {
    setMessages([{ content: currentQuestion.question, isAI: true }]);
  }

  const handleOptionClick = (index: number) => {
    const option = currentQuestion?.options[index];
    if (!option) return;
    
    setSelectedOption(index);
    setMessages((prev) => [...prev, { content: option.text, isAI: false }]);
    
    setTimeout(() => {
      const responseMessage = option.correct
        ? "Correct! Well done! 🎉 +10 tokens"
        : "That's not quite right. The correct answer was: " + 
          currentQuestion?.options.find(opt => opt.correct)?.text;
      
      setMessages((prev) => [...prev, { content: responseMessage, isAI: true }]);
      
      if (option.correct) {
        setStreak((prev) => prev + 1);
        setProgress((prev) => Math.min(prev + 20, 100));
        setTokens((prev) => prev + 10);
      } else {
        setStreak(0);
      }
    }, 1000);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setMessages((prev) => [...prev, { content: userInput, isAI: false }]);
    setUserInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          content: "Interesting answer! The correct answer was: " + 
                   currentQuestion?.options.find(opt => opt.correct)?.text,
          isAI: true,
        },
      ]);
    }, 1000);
  };

  return (
    <div className="min-h-screen max-w-lg mx-auto p-4 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <StreakCounter streak={streak} />
        <TokenCounter tokens={tokens} />
      </div>
      <div className="mb-4">
        <ProgressBar current={progress} total={100} />
      </div>

      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        <div className="space-y-2">
          {messages.map((message, i) => (
            <ChatMessage
              key={i}
              content={message.content}
              isAI={message.isAI}
              animate={i === messages.length - 1}
            />
          ))}
        </div>
      </div>

      {selectedOption === null && currentQuestion && (
        <div className="grid grid-cols-2 gap-2 mb-4 h-[40vh]">
          {currentQuestion.options.map((option, index) => (
            <OptionButton
              key={index}
              option={option.text}
              onClick={() => handleOptionClick(index)}
              disabled={selectedOption !== null}
              isCorrect={
                selectedOption === null
                  ? null
                  : index === selectedOption
                  ? option.correct
                  : null
              }
            />
          ))}
        </div>
      )}

      <form onSubmit={handleCustomSubmit} className="flex gap-2">
        <Input
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Or type your own answer..."
          className="flex-1"
        />
        <Button type="submit" size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default Index;