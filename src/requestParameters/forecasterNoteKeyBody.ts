export interface ForecasterNoteKey {
  id: number;
  taskRunId: string;
}

export interface ForecasterNoteKeysRequest {
  logs: ForecasterNoteKey[];
}
