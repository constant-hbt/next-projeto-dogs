import photosGet from '@/actions/photos-get';
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
const userGetUrl = getUrl('/api/user');
const photoPostUrl = getUrl('/api/photo');
const photoGetUrl = (id: string) => getUrl(`/api/photo/${id}`);
const photoDeleteUrl = (id: string) => getUrl(`/api/photo/${id}`);

const photosGetUrl = ({
  page,
  total,
  user,
}: {
  page: number;
  total: number;
  user: 0 | string;
}) => getUrl(`/api/photo/?_page=${page}&_total=${total}&_user=${user}`);

export {
  tokenPostUrl,
  userPostUrl,
  passwordLostUrl,
  passwordResetUrl,
  userGetUrl,
  photoPostUrl,
  photoGetUrl,
  photoDeleteUrl,
  photosGetUrl,
};
