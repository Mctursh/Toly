// types/chat.ts
export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  isLoading?: boolean;
  reactions?: Reaction[];
  editedAt?: Date;
}

export interface Reaction {
  emoji: string;
  count: number;
  users: string[];
}

export interface EmojiSuggestion {
  id: string;
  native: string;
  name: string;
}

export interface Coordinates {
  top: number;
  left: number;
}

export interface DeleteMessageConfirmation {
  messageId: string | null;
  isOpen: boolean;
}
  
  export interface Conversation {
    id: string;
    threadId: string;
    updatedAt: Date;
    createdAt: Date;
    messages: Message[];
    isActive: boolean;
    lastMessage: {
      content: string
    }
  }

  export interface ChatState {
    messages: Message[];
    isLoading: boolean;
    error: string | null;
  }
  
  export interface AIResponse {
    result: [
      { supervisor: null },
      {
        TransactionExplorer: {
          messages: [
            {
              content: string;
              type: 'human';
              name: 'TransactionExplorer';
              id: string;
            }
          ]
        }
      },
      { supervisor: null }
    ]
  }

  export type CookieAuthData = {
    isAuthenticated: boolean
  }