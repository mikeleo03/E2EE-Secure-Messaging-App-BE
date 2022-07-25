export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  matched: () => void;
}

export interface ClientToServerEvents {
  hello: () => void;
  matchmaking: (topicId: string) => void;
}

export interface SocketData {
  username: string;
}
