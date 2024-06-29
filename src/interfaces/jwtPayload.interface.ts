export interface JwtPayload {
  exp: number;
  iat: number;
  isAdmin: boolean;
  member_id: string;
  membername: string;
  name: string;
}
