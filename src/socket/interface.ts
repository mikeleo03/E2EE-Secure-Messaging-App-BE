export interface ServerToClientEvents {
  matched: (roomId: string) => void;
  revealName: (payload: {
    username1: string;
    name1: string;
    username2: string;
    name2: string;
  }) => void;
  messageReceive: (payload: { encrypted: string }) => Promise<void>;
  messageFail: (payload: {error: string}) => void;
  endChat: (message: string) => void;
  onlineUsers: (onlineUsers: number) => void;
  quotaExceeded: () => void;
  continueMatch: () => void;
  finishLoading: () => void;
  handshakeClient: (publicKey: string) => void;
}

export interface ClientToServerEvents {
  matchmaking: (topicId: string) => Promise<void>;
  matchNotFound: (topicId: string) => void;
  revealName: () => void;
  message: (payload: { encrypted: string }) => Promise<void>;
  endChat: () => void;
  getOnlineUsers: () => void;
  leaveRoom: () => void;
  handshakeServer: (publicKey: string) => void;
}

export interface SocketData {
  username: string;
  roomId: string;
  name: string;
}
