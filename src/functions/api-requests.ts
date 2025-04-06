function getUrl(path: string) {
  let urlBaseApi = process.env.API_URL;

  if (urlBaseApi?.endsWith('/'))
    urlBaseApi = urlBaseApi.substring(0, urlBaseApi.length - 1);

  if (path.startsWith('/')) path = path.substring(1);

  return `${urlBaseApi}/${path}`;
}

const tokenPostUrl = getUrl('/jwt-auth/v1/token');
const userPostUrl = getUrl('/api/user');
const passwordLostUrl = getUrl('/api/password/lost');
const passwordResetUrl = getUrl('/api/password/reset');

export { tokenPostUrl, userPostUrl, passwordLostUrl, passwordResetUrl };
