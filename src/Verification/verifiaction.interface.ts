export interface IVerification {
  userId: string;
  target: string;
  type: string;
  code?: string;
  hash?: string;
  status?: string;
  createdAt?: string;
  sentAt?: string;
  verifiedAt?: string;
}
