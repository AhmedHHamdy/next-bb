import ProjectsCarousel from "@/app/components/projects/Projects-Carousel";
import { ProjectDetailsPageDataType } from "@/app/utils/Types";
import { Link } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const locale = await getLocale();

  const {slug} = await params


  async function getProjectDetails(locale: string): Promise<ProjectDetailsPageDataType> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getProjectById`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        lang: locale,
      },
      body: JSON.stringify({
        project_id: slug
      })
    });

    if (!res.ok) {
      throw new Error("Failed to fetch Service Details data");
    }

    return res.json();
  }

  const { data } = await getProjectDetails(locale);
  
  return (
    <>
      <section className="pt-[120px] lg:pt-[140px]">
        <section className="container mx-auto px-4 max-w-[1400px] ">
          <div className="flex flex-col items-center gap-[32px]">
            {/* <!-- Project Image --> */}
            <div className="w-40 h-20">
              <img
                src="/project-hero-image-2ea3a1.png"
                alt="Stylus Medicine Project"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* <!-- Project Title --> */}
            {/* dangerouslySetInnerHTML={{ __html: data.project.description }} */}
            <h1 className="text-center font-bold text-[20px] md:text-[40px] text-black leading-tight max-w-4xl">
              {/* من صفحة ثابتة إلى 45 مليون دولار في تمويل جديد: تحول موقع ستايلس ميديسن */}
              {data?.project?.short_description}
            </h1>
          </div>

          <section className="block md:hidden px-[15px] xl:px-0 w-full mt-[16px]">
            <button className="bg-[#EDA133] text-white font-medium text-base px-4 py-3 rounded-lg hover:bg-[#D8912A] transition-colors flex items-center justify-center gap-2 w-50 h-14">
              <span>تصفح المشروع</span>
            </button>
          </section>

          <section className="relative w-full overflow-hidden mt-[24px] md:mt-[64px] rounded-[8px] h-[211px] md:h-auto xl:h-[567px] px-[15px] 2xl:px-0">
            <img
              src={data?.project?.image_url}
              alt="project gif"
              className="w-full h-full object-cover rounded-[8px]"
            />
          </section>
        </section>
      </section>

      <section className="py-[48px] md:py-[64px] px-[15px] 2xl:px-0">
        <div className="container mx-auto px-4 max-w-[1400px]">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-[32px] md:gap-12">
            {/* <!-- Image --> */}

            {/* <!-- Content --> */}
            <div className="w-full lg:w-2/2 flex flex-col">
              <h2 className="text-[24px] md:text-[40px] font-medium text-black w-full">{data?.project?.title}</h2>

              <hr className="my-[16px] md:my-[23px] text-[#DADADA44]"></hr>

              <div className="flex flex-col w-full gap-[24px] md:gap-[48px]">
                <p dangerouslySetInnerHTML={{ __html: data?.project?.description }}  className="text-[16px] md:text-[18px] font-medium text-[#4A4A4A] leading-relaxed opacity-80">
                  
                </p>

                {/* <p className="text-[16px] md:text-[18px] font-medium text-[#4A4A4A] leading-relaxed opacity-80">
                  على الرغم من حصولهم على 85 مليون دولار في التمويل الأولي، لم يكن موقعهم الثابت يعرض ما يجعل تقنيتهم
                  الطبية مميزة أو تستحق الاستثمار.
                </p>

                <p className="text-[16px] md:text-[18px] font-medium text-[#4A4A4A] leading-relaxed opacity-80">
                  كان لديهم علم رائد لكن موقعًا فشل في سرد قصتهم بفعالية - وهو انفصال كان يكلفهم الفرص.
                </p>

                <p className="text-[16px] md:text-[18px] font-normal text-[#4A4A4A] leading-relaxed opacity-80">
                  هنا جاء دور شوفسكي كشريك تصميم.
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-[48px] md:pb-[64px] px-[15px] 2xl:px-0">
        <ProjectsCarousel previousProjectsData={data?.similar || []} />
      </section>
    </>
  );
}
