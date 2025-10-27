'use client';
import Image from "next/image";
import Video from "../../components/video";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";

const groupList = [
  { slug: "toledo", link: "https://www.instagram.com/rcctoledopr/" },
  { slug: "mur", link: "https://www.instagram.com/murtoledo/" },
  { slug: "utfpr", link: "https://www.instagram.com/gou_filhosdamisericordia" },
  { slug: "pucpr", link: "https://www.instagram.com/goupuc_toledo" },
  { slug: "unioeste", link: "https://www.instagram.com/ruahgou" },
  { slug: "fag", link: "https://www.instagram.com/gou_eadfag" },
]


const Home = () => {
  const params = useParams();
  const slug = params.group as string;

  const findGroup = (slug: string) => {
    const group = groupList.find(g => g.slug === slug);
    return group ? group.link : null;
  };

  const groupLink = findGroup(slug);
  if (!groupLink) {
    redirect("/");
  }

  return (
    <div
      className="flex flex-col justify-center items-center gap-10 bg-[url('/bg-rcc-mobile.svg')] lg:bg-[url('/bg-rcc.svg')] bg-contain lg:bg-cover bg-no-repeat bg-[position:left_43vh] lg:bg-[position:left_25vh] p-5 lg:p-10 pb-5"
    >
      <p className="text-4xl lg:text-6xl text-cyan-900 font-extrabold text-center">
        Assista ao vídeo e<br /> saiba o que Pedro fez…
      </p>
      <Video src="/video/peter.mp4" poster="/poster.png" />
      <div className="flex flex-col justify-center items-center gap-5 w-full">
        <div className="py-5 lg:py-10 flex flex-col justify-center items-center gap-7">
          <p className="text-center font-semibold text-2xl lg:text-4xl">
            Clique no botão abaixo e venha
            <br className="max-md:hidden"/> conhecer o Grupo de Oração Universitário
          </p>
          <Link href={groupLink} className="cursor-pointer bg-cyan-900 text-white font-bold px-10 py-2 rounded text-lg lg:text-2xl">
            Quero conhecer o GOU
          </Link>
        </div>
        <div className="flex flex-col lg:flex-row gap-10 justify-end w-9/12 lg:w-full mt-20">
          <Image src="/mur-logo.png" alt="Logo MUR" width={405} height={120} />
          <Image
            src="/rcc-logo.png"
            alt="Logo RCC Brasil"
            width={315}
            height={130}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
