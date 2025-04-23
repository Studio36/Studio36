import { setRequestLocale } from "next-intl/server"
import PhotosetClientComponent from "../../components/photoset/PhotosetClientComponent"
import { getPhotoset } from "../../actions/photosetActions";
import { Metadata } from "next";
import { use } from "react";

type Props = {
  params: Promise<{ id: string, locale: string }>
}

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const { id } = await params;
  const photoset = await getPhotoset(id);

  return {
    title: photoset?.title,
    description: photoset?.description
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