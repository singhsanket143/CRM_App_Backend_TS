export default interface JwtDecodedUser {
    id: string;
    email: string;
    role: string[];
    iat: number;
    exp: number;
}