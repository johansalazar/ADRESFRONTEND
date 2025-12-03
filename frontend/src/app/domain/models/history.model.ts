export interface History {
  id: string;
  acquisitionId: string;
  action: string;
  timestamp: string;
  payload: string;
  user: string;
  parsedPayload?: any;
}
