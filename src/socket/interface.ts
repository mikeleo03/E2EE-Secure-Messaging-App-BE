export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  matched: () => void;
  revealName: (payload: object) => void;
  message: (payload: {content: string; from: string}) => void;
}

export interface ClientToServerEvents {
  hello: () => void;
  matchmaking: (topicId: string) => Promise<void>;
  revealName: () => void;
  dummyMatch: (roomId: string) => void;
  message: (payload: {content: string}) => void;
}

export interface SocketData {
  username: string;
  roomId: string;
}
