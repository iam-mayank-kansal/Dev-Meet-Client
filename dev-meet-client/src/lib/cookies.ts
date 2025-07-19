// NOT async
import Cookies from 'js-cookie';

export default async function getCookies(tokenName: string) {
  const token = Cookies.get(tokenName);
  return token;
}
