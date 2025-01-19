import { Coins } from "lucide-react";

interface TokenCounterProps {
  tokens: number;
}

export const TokenCounter = ({ tokens }: TokenCounterProps) => {
  return (
    <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full">
      <Coins className="w-4 h-4 text-yellow-500" />
      <span className="text-sm font-medium text-yellow-700">{tokens}</span>
    </div>
  );
};