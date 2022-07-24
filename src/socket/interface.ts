export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  revealName: (payload: object) => void;
}

export interface ClientToServerEvents {
  hello: () => void;
  revealName: () => void;
  dummyMatch: (roomId: string) => void;
}

export interface SocketData {
  roomId: string;
}
