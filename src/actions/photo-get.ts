'use server';

import apiError from '@/functions/api-error';
import { photoGetUrl } from '@/functions/api-requests';
import { Photo } from './photos-get';

export type Comment = {
  comment_ID: string;
  comment_post_ID: string;
  comment_author: string;
  comment_author_email: string;
  comment_author_url: string;
  comment_date: string;
  comment_content: string;
  comment_approved: string;
};

export type PhotoData = {
  photo: Photo;
  comments: Comment[];
};

export default async function photoGet(id: string) {
  try {
    const url = photoGetUrl(id);
    const response = await fetch(url, {
      next: { revalidate: 60, tags: ['photos', 'comments'] },
    });

    if (!response.ok) throw new Error('Erro ao obter foto.');

    const data = (await response.json()) as PhotoData;
    return { data, ok: true, error: '' };
  } catch (error) {
    return apiError(error);
  }
}
