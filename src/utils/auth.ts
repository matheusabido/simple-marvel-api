import md5 from "md5";

type ApiAuth = {
  ts: number;
  apikey: string;
  hash: string;
};

export function getApiAuth(): ApiAuth {
  const ts = new Date().getTime();
  const publicKey = process.env.MARVEL_PUBLIC_KEY as string;
  const privateKey = process.env.MARVEL_PRIVATE_KEY as string;
  const hash = md5(`${ts}${privateKey}${publicKey}`);
  return {
    ts,
    apikey: publicKey,
    hash,
  };
}
