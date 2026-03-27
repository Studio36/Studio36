import { setRequestLocale } from "next-intl/server"
import PhotosetClientComponent from "../../components/photoset/PhotosetClientComponent"
import { getPhotoset } from "../../actions/photosetActions";
import { Metadata } from "next";
import { use } from "react";

type Props = {
  params: Promise<{ id: string, locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, locale } = await params;
  const photoset = await getPhotoset(id);

  const title = photoset?.title ?? 'Photoset';
  const ogImages = photoset?.images?.[0]
    ? [{ url: photoset.images[0], width: 1200, height: 800, alt: title }]
    : [];

  return {
    title,
    alternates: {
      canonical: locale === 'ro' ? `/ro/fotoset/${id}` : `/en/photoset/${id}`,
      languages: {
        en: `/en/photoset/${id}`,
        ro: `/ro/fotoset/${id}`,
      },
    },
    openGraph: {
      title,
      type: 'article',
      siteName: 'Studio 36',
      images: ogImages,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      images: photoset?.images?.[0] ? [photoset.images[0]] : [],
    },
  };
}

export default function PhotosetPage({params}: Props) {
  const {locale, id} = use(params);
 
  // Enable static rendering
  setRequestLocale(locale);

  return (
    <PhotosetClientComponent id={id}/>
  )
}