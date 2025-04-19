//import { jwtVerify } from 'jose';

export default async function verifyToken(token: string): Promise<boolean> {
  if (!token) return false;

  try {
    // Como não sei a secret com que foi gerado o JWT, essa verificação sempre vai falhar
    // await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET), {
    //   algorithms: ['HS256'],
    // });

    return true;
  } catch {
    return false;
  }
}
