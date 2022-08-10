export interface ServerToClientEvents {
  matched: (roomId: string) => void;
  revealName: (payload: {
    username1: string;
    name1: string;
    username2: string;
    name2: string;
  }) => void;
  message: (payload: {content: string; from: string}) => void;
  messageFail: (payload: {error: string}) => void;
}

export interface ClientToServerEvents {
  matchmaking: (topicId: string) => Promise<void>;
  matchNotFound: (topicId: string) => void;
  revealName: () => void;
  message: (payload: {content: string}) => Promise<void>;
}

export interface SocketData {
  username: string;
  roomId: string;
  name: string;
}
