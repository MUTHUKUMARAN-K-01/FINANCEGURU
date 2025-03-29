
import { useState } from "react";
import { nanoid } from "nanoid";
import { apiRequest } from "../lib/queryClient";

export type AIModel = 'openai' | 'deepseek' | 'huggingface' | 'local';

export function useChat() {
  const [messages, setMessages] = useState<{ id: string; text: string; isUser: boolean; }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<AIModel>('local');

  // Using a default user ID of 4 for demonstration (user that was created in the database)
  const userId = 4;

  const sendMessage = async (text: string) => {
    // Optimistically add user message to state
    const userMessageId = nanoid();
    setMessages((prev) => [
      ...prev,
      { id: userMessageId, text, isUser: true }
    ]);

    setIsLoading(true);

    try {
      const response = await apiRequest('POST', '/api/chat', {
        userId,
        message: text,
        isUserMessage: 1,
        modelType: selectedModel // Include the selected model type
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();

      // Add AI response to messages
      setMessages((prev) => [
        ...prev,
        { id: nanoid(), text: data.aiMessage.message, isUser: false }
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to change the AI model
  const changeModel = (model: AIModel) => {
    setSelectedModel(model);
  };

  return {
    messages,
    isLoading,
    sendMessage,
    selectedModel,
    changeModel
  };
}
