export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  matched: () => void;
  revealName: (payload: object) => void;
}

export interface ClientToServerEvents {
  hello: () => void;
  matchmaking: (topicId: string) => void;
  revealName: () => void;
  dummyMatch: (roomId: string) => void;
}

export interface SocketData {
  username: string;
  roomId: string;
}
