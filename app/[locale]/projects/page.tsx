import { ProjectsPageDataType } from '@/app/utils/Types';
import { Link } from '@/i18n/navigation';
import {routing} from '@/i18n/routing';
import { getLocale, setRequestLocale } from "next-intl/server";
import { use } from "react";

// export function generateStaticParams() {
//   return routing.locales.map((locale) => ({locale}));
// }

// {params}:{ params: Promise<{ locale: string }>}
export default async function Page() {
  // const {locale} = use(params);

  // setRequestLocale(locale);

  const locale = await getLocale();

  // setRequestLocale(locale);

  async function getProjectsPageData(locale: string): Promise<ProjectsPageDataType> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getAllProjects`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        lang: locale,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch Project Page data");
    }

    return res.json();
  }

  const { data } = await getProjectsPageData(locale);

  return (
    <section className="relative bg-white pt-[6rem] pb-[64px] md:pb-[100px] md:pt-[36px] lg:pt-[8rem] xl:pt-[9.4rem]">
      <div className="max-w-[1400px] mx-auto">
        {/* <!-- Section Header --> */}
        <div className="text-center mb-[29px] md:mb-[52px] px-[15px] md:px-0">
          <h2 className="text-[24px] md:text-[40px] font-bold text-black mb-[16px]">{data?.title}</h2>
          <p className="text-[14px] md:text-[18px] text-[#232323] md:text-[#4A4A4A] font-medium leading-relaxed max-w-4xl mx-auto">
            {data?.desc}
          </p>
        </div>

        {/* <!-- Projects Grid --> */}
        <div className="space-y-6 px-[15px] 2xl:px-0">
          {/* <!-- Row 1 --> */}
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 items-start gap-x-[17px] gap-y-[26px] md:gap-[32px]">
            {data?.projects && data?.projects?.map(project => {
              return (
                <div
                  key={project.id}
                  style={{ backgroundImage: `url(${project?.image_url}` }}
                  className="h-[312px] md:h-[426px] bg-no-repeat bg-cover bg-bottom rounded-lg p-8 px-4 md:px-8 inset-project-grid-item-shadow"
                >
                  {/* w-[235px] */}
                  <div className="h-[270px]  md:w-full md:h-[374px] flex flex-col items-start justify-end project-card">
                    <section className="w-full">
                      <h3 className="text-[16px] md:text-[24px] font-medium text-white">{project?.title}</h3>
                      <section className="mt-[12px] md:mt-[14px] flex flex-col gap-[8px] md:flex-row md:items-center md:justify-between w-full">
                        <section className="flex items-center w-[265px] md:w-[400px] gap-[13px]">
                          {/* md:w-[111px] md:px-0 w-full */}
                          <h4 className="flex justify-center  items-center gap-[8px] px-2 md:px-5  w-[150px] md:w-[250px] h-[28px] md:h-[40px] bg-[#FFFFFF33] backdrop-blur-md rounded-[8px] text-[12px] md:text-[16px] text-white">
                            <img className="h-[14.5px] md:h-[23px]" src="/person-icon.svg" alt="person icon" />
                            {project?.owner_name}
                          </h4>

                          {/* md:w-[235.5px] */}
                          <h4 className="flex justify-center items-center gap-[8px] px-2 md:px-0 w-full  h-[28px] md:h-[40px] bg-[#FFFFFF33] backdrop-blur-md rounded-[8px] text-[12px] md:text-[16px] text-white">
                            <img className="h-[14.5px] md:h-[23px]" src="/location-icon.svg" alt="location icon" />
                            {project?.country_name}
                          </h4>
                        </section>
                      </section>
               
                      <section className='w-full'>
                        <p dangerouslySetInnerHTML={{__html: project?.short_description }} className="hidden md:block mt-[18px] text-white text-[16px]">
                          {/* {project?.description} */}
                        </p>
                        <p className="block md:hidden mt-[12px] text-white text-[12px]">
                          {project?.short_description}
                        </p>
                      </section>
                    </section>

                    <div className="mt-[16px] see-more-button">
                      <Link
                        href={`/projects/${project?.id}`}
                        className="bg-[#EDA133] flex items-center justify-center gap-2 hover:bg-[#D1912A] w-full md:w-[172px] h-[28px] md:h-[48px] text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 "
                      >
                        <span className="text-[14px] md:text-[16px] font-normal">رؤية المزيد</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M7.77734 0.5C8.09709 0.5 8.3623 0.777097 8.3623 1.11133C8.36775 1.27819 8.29593 1.43354 8.19141 1.54297C8.08666 1.65246 7.94273 1.72168 7.77734 1.72168H2.66016L11.0195 10.459C11.2452 10.6952 11.2452 11.087 11.0195 11.3232C10.7935 11.5595 10.4184 11.5594 10.1924 11.3232L1.66895 2.41309V8.10645C1.66895 8.44068 1.40471 8.71777 1.08496 8.71777C0.765217 8.71777 0.500977 8.44067 0.500977 8.10645V1.11133C0.500977 0.777101 0.765217 0.500006 1.08496 0.5H7.77734Z" fill="#FCF4E9"/>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}

            {/* <div
              style={{ backgroundImage: "url('/previous-project-img-2.png'" }}
              className="h-[312px] md:h-[426px] bg-no-repeat bg-cover bg-bottom rounded-lg p-8 px-4 md:px-8 inset-project-grid-item-shadow"
            >
              <div className="h-[270px] w-[235px] md:w-full md:h-[374px] flex flex-col items-start justify-end project-card">
                <section className="w-full">
                  <h3 className="text-[16px] md:text-[24px] font-medium text-white">رينتال الاعمال</h3>
                  <section className="mt-[12px] md:mt-[14px] flex flex-col gap-[8px] md:flex-row md:items-center md:justify-between w-full">
                    <section className="flex items-center gap-[13px]">
                      <h4 className="flex justify-center items-center gap-[8px] px-2 md:px-0 md:w-[111px] h-[28px] md:h-[40px] bg-[#FFFFFF33] backdrop-blur-md rounded-[8px] text-[12px] md:text-[16px] text-white">
                        <img className="h-[14.5px] md:h-[23px]" src="/person-icon.svg" alt="person icon" />
                        رينتال
                      </h4>

                      <h4 className="flex justify-center items-center gap-[8px] px-2 md:px-0 md:w-[235.5px] h-[28px] md:h-[40px] bg-[#FFFFFF33] backdrop-blur-md rounded-[8px] text-[12px] md:text-[16px] text-white">
                        <img className="h-[14.5px] md:h-[23px]" src="/location-icon.svg" alt="location icon" />
                        المملكة العربية السعودية
                      </h4>
                    </section>
                  </section>
                  <p className="hidden md:block mt-[18px] text-white text-[16px]">
                    "رينتال" هو المنصة السعودية الأولى المتخصصة في تأجير معدات التصوير الاحترافية بكل سهولة وسرعة. سواء
                    كنت مصور فوتوغرافي، صانع محتوى، مخرج، أو صاحب مشروع تصوير......
                  </p>
                  <p className="block md:hidden mt-[12px] text-white text-[12px]">
                    "رينتال" هو المنصة السعودية الأولى المتخصصة في تأجير معدات التصوير الاحترافية ...
                  </p>
                </section>

                <div className="mt-[16px] see-more-button">
                  <a
                    href="project-details.html"
                    className="bg-[#EDA133] flex items-center justify-center gap-2 hover:bg-[#D1912A] w-full md:w-[172px] h-[28px] md:h-[48px] text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 "
                  >
                    <span className="text-[14px] md:text-[16px] font-normal">رؤية المزيد</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M7.77734 0.5C8.09709 0.5 8.3623 0.777097 8.3623 1.11133C8.36775 1.27819 8.29593 1.43354 8.19141 1.54297C8.08666 1.65246 7.94273 1.72168 7.77734 1.72168H2.66016L11.0195 10.459C11.2452 10.6952 11.2452 11.087 11.0195 11.3232C10.7935 11.5595 10.4184 11.5594 10.1924 11.3232L1.66895 2.41309V8.10645C1.66895 8.44068 1.40471 8.71777 1.08496 8.71777C0.765217 8.71777 0.500977 8.44067 0.500977 8.10645V1.11133C0.500977 0.777101 0.765217 0.500006 1.08496 0.5H7.77734Z" fill="#FCF4E9"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div
              style={{ backgroundImage: "url('/previous-project-img-3.png'" }}
              className="h-[312px] md:h-[426px] bg-no-repeat bg-cover bg-bottom rounded-lg p-8 px-4 md:px-8 inset-project-grid-item-shadow"
            >
              <div className="h-[270px] w-[235px] md:w-full md:h-[374px] flex flex-col items-start justify-end project-card">
                <section className="w-full">
                  <h3 className="text-[16px] md:text-[24px] font-medium text-white">رينتال الاعمال</h3>
                  <section className="mt-[12px] md:mt-[14px] flex flex-col gap-[8px] md:flex-row md:items-center md:justify-between w-full">
                    <section className="flex items-center gap-[13px]">
                      <h4 className="flex justify-center items-center gap-[8px] px-2 md:px-0 md:w-[111px] h-[28px] md:h-[40px] bg-[#FFFFFF33] backdrop-blur-md rounded-[8px] text-[12px] md:text-[16px] text-white">
                        <img className="h-[14.5px] md:h-[23px]" src="/person-icon.svg" alt="person icon" />
                        رينتال
                      </h4>

                      <h4 className="flex justify-center items-center gap-[8px] px-2 md:px-0 md:w-[235.5px] h-[28px] md:h-[40px] bg-[#FFFFFF33] backdrop-blur-md rounded-[8px] text-[12px] md:text-[16px] text-white">
                        <img className="h-[14.5px] md:h-[23px]" src="/location-icon.svg" alt="location icon" />
                        المملكة العربية السعودية
                      </h4>
                    </section>
                  </section>
                  <p className="hidden md:block mt-[18px] text-white text-[16px]">
                    "رينتال" هو المنصة السعودية الأولى المتخصصة في تأجير معدات التصوير الاحترافية بكل سهولة وسرعة. سواء
                    كنت مصور فوتوغرافي، صانع محتوى، مخرج، أو صاحب مشروع تصوير......
                  </p>
                  <p className="block md:hidden mt-[12px] text-white text-[12px]">
                    "رينتال" هو المنصة السعودية الأولى المتخصصة في تأجير معدات التصوير الاحترافية ...
                  </p>
                </section>

                <div className="mt-[16px] see-more-button">
                  <a
                    href="project-details.html"
                    className="bg-[#EDA133] flex items-center justify-center gap-2 hover:bg-[#D1912A] w-full md:w-[172px] h-[28px] md:h-[48px] text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 "
                  >
                    <span className="text-[14px] md:text-[16px] font-normal">رؤية المزيد</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M7.77734 0.5C8.09709 0.5 8.3623 0.777097 8.3623 1.11133C8.36775 1.27819 8.29593 1.43354 8.19141 1.54297C8.08666 1.65246 7.94273 1.72168 7.77734 1.72168H2.66016L11.0195 10.459C11.2452 10.6952 11.2452 11.087 11.0195 11.3232C10.7935 11.5595 10.4184 11.5594 10.1924 11.3232L1.66895 2.41309V8.10645C1.66895 8.44068 1.40471 8.71777 1.08496 8.71777C0.765217 8.71777 0.500977 8.44067 0.500977 8.10645V1.11133C0.500977 0.777101 0.765217 0.500006 1.08496 0.5H7.77734Z" fill="#FCF4E9"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div
              style={{ backgroundImage: "url('/previous-project-img.png'" }}
              className="h-[312px] md:h-[426px] bg-no-repeat bg-cover bg-bottom rounded-lg p-8 px-4 md:px-8 inset-project-grid-item-shadow"
            >
              <div className="h-[270px] w-[235px] md:w-full md:h-[374px] flex flex-col items-start justify-end project-card">
                <section className="w-full">
                  <h3 className="text-[16px] md:text-[24px] font-medium text-white">رينتال الاعمال</h3>
                  <section className="mt-[12px] md:mt-[14px] flex flex-col gap-[8px] md:flex-row md:items-center md:justify-between w-full">
                    <section className="flex items-center gap-[13px]">
                      <h4 className="flex justify-center items-center gap-[8px] px-2 md:px-0 md:w-[111px] h-[28px] md:h-[40px] bg-[#FFFFFF33] backdrop-blur-md rounded-[8px] text-[12px] md:text-[16px] text-white">
                        <img className="h-[14.5px] md:h-[23px]" src="/person-icon.svg" alt="person icon" />
                        رينتال
                      </h4>

                      <h4 className="flex justify-center items-center gap-[8px] px-2 md:px-0 md:w-[235.5px] h-[28px] md:h-[40px] bg-[#FFFFFF33] backdrop-blur-md rounded-[8px] text-[12px] md:text-[16px] text-white">
                        <img className="h-[14.5px] md:h-[23px]" src="/location-icon.svg" alt="location icon" />
                        المملكة العربية السعودية
                      </h4>
                    </section>
                  </section>
                  <p className="hidden md:block mt-[18px] text-white text-[16px]">
                    "رينتال" هو المنصة السعودية الأولى المتخصصة في تأجير معدات التصوير الاحترافية بكل سهولة وسرعة. سواء
                    كنت مصور فوتوغرافي، صانع محتوى، مخرج، أو صاحب مشروع تصوير......
                  </p>
                  <p className="block md:hidden mt-[12px] text-white text-[12px]">
                    "رينتال" هو المنصة السعودية الأولى المتخصصة في تأجير معدات التصوير الاحترافية ...
                  </p>
                </section>

                <div className="mt-[16px] see-more-button">
                  <a
                    href="project-details.html"
                    className="bg-[#EDA133] flex items-center justify-center gap-2 hover:bg-[#D1912A] w-full md:w-[172px] h-[28px] md:h-[48px] text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 "
                  >
                    <span className="text-[14px] md:text-[16px] font-normal">رؤية المزيد</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M7.77734 0.5C8.09709 0.5 8.3623 0.777097 8.3623 1.11133C8.36775 1.27819 8.29593 1.43354 8.19141 1.54297C8.08666 1.65246 7.94273 1.72168 7.77734 1.72168H2.66016L11.0195 10.459C11.2452 10.6952 11.2452 11.087 11.0195 11.3232C10.7935 11.5595 10.4184 11.5594 10.1924 11.3232L1.66895 2.41309V8.10645C1.66895 8.44068 1.40471 8.71777 1.08496 8.71777C0.765217 8.71777 0.500977 8.44067 0.500977 8.10645V1.11133C0.500977 0.777101 0.765217 0.500006 1.08496 0.5H7.77734Z" fill="#FCF4E9"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div
              style={{ backgroundImage: "url('/previous-project-img-2.png'" }}
              className="h-[312px] md:h-[426px] bg-no-repeat bg-cover bg-bottom rounded-lg p-8 px-4 md:px-8 inset-project-grid-item-shadow"
            >
              <div className="h-[270px] w-[235px] md:w-full md:h-[374px] flex flex-col items-start justify-end project-card">
                <section className="w-full">
                  <h3 className="text-[16px] md:text-[24px] font-medium text-white">رينتال الاعمال</h3>
                  <section className="mt-[12px] md:mt-[14px] flex flex-col gap-[8px] md:flex-row md:items-center md:justify-between w-full">
                    <section className="flex items-center gap-[13px]">
                      <h4 className="flex justify-center items-center gap-[8px] px-2 md:px-0 md:w-[111px] h-[28px] md:h-[40px] bg-[#FFFFFF33] backdrop-blur-md rounded-[8px] text-[12px] md:text-[16px] text-white">
                        <img className="h-[14.5px] md:h-[23px]" src="/person-icon.svg" alt="person icon" />
                        رينتال
                      </h4>

                      <h4 className="flex justify-center items-center gap-[8px] px-2 md:px-0 md:w-[235.5px] h-[28px] md:h-[40px] bg-[#FFFFFF33] backdrop-blur-md rounded-[8px] text-[12px] md:text-[16px] text-white">
                        <img className="h-[14.5px] md:h-[23px]" src="/location-icon.svg" alt="location icon" />
                        المملكة العربية السعودية
                      </h4>
                    </section>
                  </section>
                  <p className="hidden md:block mt-[18px] text-white text-[16px]">
                    "رينتال" هو المنصة السعودية الأولى المتخصصة في تأجير معدات التصوير الاحترافية بكل سهولة وسرعة. سواء
                    كنت مصور فوتوغرافي، صانع محتوى، مخرج، أو صاحب مشروع تصوير......
                  </p>
                  <p className="block md:hidden mt-[12px] text-white text-[12px]">
                    "رينتال" هو المنصة السعودية الأولى المتخصصة في تأجير معدات التصوير الاحترافية ...
                  </p>
                </section>

                <div className="mt-[16px] see-more-button">
                  <a
                    href="project-details.html"
                    className="bg-[#EDA133] flex items-center justify-center gap-2 hover:bg-[#D1912A] w-full md:w-[172px] h-[28px] md:h-[48px] text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 "
                  >
                    <span className="text-[14px] md:text-[16px] font-normal">رؤية المزيد</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M7.77734 0.5C8.09709 0.5 8.3623 0.777097 8.3623 1.11133C8.36775 1.27819 8.29593 1.43354 8.19141 1.54297C8.08666 1.65246 7.94273 1.72168 7.77734 1.72168H2.66016L11.0195 10.459C11.2452 10.6952 11.2452 11.087 11.0195 11.3232C10.7935 11.5595 10.4184 11.5594 10.1924 11.3232L1.66895 2.41309V8.10645C1.66895 8.44068 1.40471 8.71777 1.08496 8.71777C0.765217 8.71777 0.500977 8.44067 0.500977 8.10645V1.11133C0.500977 0.777101 0.765217 0.500006 1.08496 0.5H7.77734Z" fill="#FCF4E9"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div
              style={{ backgroundImage: "url('/previous-project-img-3.png'" }}
              className="h-[312px] md:h-[426px] bg-no-repeat bg-cover bg-bottom rounded-lg p-8 px-4 md:px-8 inset-project-grid-item-shadow"
            >
              <div className="h-[270px] w-[235px] md:w-full md:h-[374px] flex flex-col items-start justify-end project-card">
                <section className="w-full">
                  <h3 className="text-[16px] md:text-[24px] font-medium text-white">رينتال الاعمال</h3>
                  <section className="mt-[12px] md:mt-[14px] flex flex-col gap-[8px] md:flex-row md:items-center md:justify-between w-full">
                    <section className="flex items-center gap-[13px]">
                      <h4 className="flex justify-center items-center gap-[8px] px-2 md:px-0 md:w-[111px] h-[28px] md:h-[40px] bg-[#FFFFFF33] backdrop-blur-md rounded-[8px] text-[12px] md:text-[16px] text-white">
                        <img className="h-[14.5px] md:h-[23px]" src="/person-icon.svg" alt="person icon" />
                        رينتال
                      </h4>

                      <h4 className="flex justify-center items-center gap-[8px] px-2 md:px-0 md:w-[235.5px] h-[28px] md:h-[40px] bg-[#FFFFFF33] backdrop-blur-md rounded-[8px] text-[12px] md:text-[16px] text-white">
                        <img className="h-[14.5px] md:h-[23px]" src="/location-icon.svg" alt="location icon" />
                        المملكة العربية السعودية
                      </h4>
                    </section>
                  </section>
                  <p className="hidden md:block mt-[18px] text-white text-[16px]">
                    "رينتال" هو المنصة السعودية الأولى المتخصصة في تأجير معدات التصوير الاحترافية بكل سهولة وسرعة. سواء
                    كنت مصور فوتوغرافي، صانع محتوى، مخرج، أو صاحب مشروع تصوير......
                  </p>
                  <p className="block md:hidden mt-[12px] text-white text-[12px]">
                    "رينتال" هو المنصة السعودية الأولى المتخصصة في تأجير معدات التصوير الاحترافية ...
                  </p>
                </section>

                <div className="mt-[16px] see-more-button">
                  <a
                    href="project-details.html"
                    className="bg-[#EDA133] flex items-center justify-center gap-2 hover:bg-[#D1912A] w-full md:w-[172px] h-[28px] md:h-[48px] text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 "
                  >
                    <span className="text-[14px] md:text-[16px] font-normal">رؤية المزيد</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M7.77734 0.5C8.09709 0.5 8.3623 0.777097 8.3623 1.11133C8.36775 1.27819 8.29593 1.43354 8.19141 1.54297C8.08666 1.65246 7.94273 1.72168 7.77734 1.72168H2.66016L11.0195 10.459C11.2452 10.6952 11.2452 11.087 11.0195 11.3232C10.7935 11.5595 10.4184 11.5594 10.1924 11.3232L1.66895 2.41309V8.10645C1.66895 8.44068 1.40471 8.71777 1.08496 8.71777C0.765217 8.71777 0.500977 8.44067 0.500977 8.10645V1.11133C0.500977 0.777101 0.765217 0.500006 1.08496 0.5H7.77734Z" fill="#FCF4E9"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div
              style={{ backgroundImage: "url('/previous-project-img.png'" }}
              className="h-[312px] md:h-[426px] bg-no-repeat bg-cover bg-bottom rounded-lg p-8 px-4 md:px-8 inset-project-grid-item-shadow"
            >
              <div className="h-[270px] w-[235px] md:w-full md:h-[374px] flex flex-col items-start justify-end project-card">
                <section className="w-full">
                  <h3 className="text-[16px] md:text-[24px] font-medium text-white">رينتال الاعمال</h3>
                  <section className="mt-[12px] md:mt-[14px] flex flex-col gap-[8px] md:flex-row md:items-center md:justify-between w-full">
                    <section className="flex items-center gap-[13px]">
                      <h4 className="flex justify-center items-center gap-[8px] px-2 md:px-0 md:w-[111px] h-[28px] md:h-[40px] bg-[#FFFFFF33] backdrop-blur-md rounded-[8px] text-[12px] md:text-[16px] text-white">
                        <img className="h-[14.5px] md:h-[23px]" src="/person-icon.svg" alt="person icon" />
                        رينتال
                      </h4>

                      <h4 className="flex justify-center items-center gap-[8px] px-2 md:px-0 md:w-[235.5px] h-[28px] md:h-[40px] bg-[#FFFFFF33] backdrop-blur-md rounded-[8px] text-[12px] md:text-[16px] text-white">
                        <img className="h-[14.5px] md:h-[23px]" src="/location-icon.svg" alt="location icon" />
                        المملكة العربية السعودية
                      </h4>
                    </section>
                  </section>
                  <p className="hidden md:block mt-[18px] text-white text-[16px]">
                    "رينتال" هو المنصة السعودية الأولى المتخصصة في تأجير معدات التصوير الاحترافية بكل سهولة وسرعة. سواء
                    كنت مصور فوتوغرافي، صانع محتوى، مخرج، أو صاحب مشروع تصوير......
                  </p>
                  <p className="block md:hidden mt-[12px] text-white text-[12px]">
                    "رينتال" هو المنصة السعودية الأولى المتخصصة في تأجير معدات التصوير الاحترافية ...
                  </p>
                </section>

                <div className="mt-[16px] see-more-button">
                  <a
                    href="project-details.html"
                    className="bg-[#EDA133] flex items-center justify-center gap-2 hover:bg-[#D1912A] w-full md:w-[172px] h-[28px] md:h-[48px] text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 "
                  >
                    <span className="text-[14px] md:text-[16px] font-normal">رؤية المزيد</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M7.77734 0.5C8.09709 0.5 8.3623 0.777097 8.3623 1.11133C8.36775 1.27819 8.29593 1.43354 8.19141 1.54297C8.08666 1.65246 7.94273 1.72168 7.77734 1.72168H2.66016L11.0195 10.459C11.2452 10.6952 11.2452 11.087 11.0195 11.3232C10.7935 11.5595 10.4184 11.5594 10.1924 11.3232L1.66895 2.41309V8.10645C1.66895 8.44068 1.40471 8.71777 1.08496 8.71777C0.765217 8.71777 0.500977 8.44067 0.500977 8.10645V1.11133C0.500977 0.777101 0.765217 0.500006 1.08496 0.5H7.77734Z" fill="#FCF4E9"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div
              style={{ backgroundImage: "url('/previous-project-img-2.png'" }}
              className="h-[312px] md:h-[426px] bg-no-repeat bg-cover bg-bottom rounded-lg p-8 px-4 md:px-8 inset-project-grid-item-shadow"
            >
              <div className="h-[270px] w-[235px] md:w-full md:h-[374px] flex flex-col items-start justify-end project-card">
                <section className="w-full">
                  <h3 className="text-[16px] md:text-[24px] font-medium text-white">رينتال الاعمال</h3>
                  <section className="mt-[12px] md:mt-[14px] flex flex-col gap-[8px] md:flex-row md:items-center md:justify-between w-full">
                    <section className="flex items-center gap-[13px]">
                      <h4 className="flex justify-center items-center gap-[8px] px-2 md:px-0 md:w-[111px] h-[28px] md:h-[40px] bg-[#FFFFFF33] backdrop-blur-md rounded-[8px] text-[12px] md:text-[16px] text-white">
                        <img className="h-[14.5px] md:h-[23px]" src="/person-icon.svg" alt="person icon" />
                        رينتال
                      </h4>

                      <h4 className="flex justify-center items-center gap-[8px] px-2 md:px-0 md:w-[235.5px] h-[28px] md:h-[40px] bg-[#FFFFFF33] backdrop-blur-md rounded-[8px] text-[12px] md:text-[16px] text-white">
                        <img className="h-[14.5px] md:h-[23px]" src="/location-icon.svg" alt="location icon" />
                        المملكة العربية السعودية
                      </h4>
                    </section>
                  </section>
                  <p className="hidden md:block mt-[18px] text-white text-[16px]">
                    "رينتال" هو المنصة السعودية الأولى المتخصصة في تأجير معدات التصوير الاحترافية بكل سهولة وسرعة. سواء
                    كنت مصور فوتوغرافي، صانع محتوى، مخرج، أو صاحب مشروع تصوير......
                  </p>
                  <p className="block md:hidden mt-[12px] text-white text-[12px]">
                    "رينتال" هو المنصة السعودية الأولى المتخصصة في تأجير معدات التصوير الاحترافية ...
                  </p>
                </section>

                <div className="mt-[16px] see-more-button">
                  <a
                    href="project-details.html"
                    className="bg-[#EDA133] flex items-center justify-center gap-2 hover:bg-[#D1912A] w-full md:w-[172px] h-[28px] md:h-[48px] text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 "
                  >
                    <span className="text-[14px] md:text-[16px] font-normal">رؤية المزيد</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M7.77734 0.5C8.09709 0.5 8.3623 0.777097 8.3623 1.11133C8.36775 1.27819 8.29593 1.43354 8.19141 1.54297C8.08666 1.65246 7.94273 1.72168 7.77734 1.72168H2.66016L11.0195 10.459C11.2452 10.6952 11.2452 11.087 11.0195 11.3232C10.7935 11.5595 10.4184 11.5594 10.1924 11.3232L1.66895 2.41309V8.10645C1.66895 8.44068 1.40471 8.71777 1.08496 8.71777C0.765217 8.71777 0.500977 8.44067 0.500977 8.10645V1.11133C0.500977 0.777101 0.765217 0.500006 1.08496 0.5H7.77734Z" fill="#FCF4E9"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div> */}
          </div>
        </div>

        {/* <section className="flex justify-center gap-[12px] w-full mt-[32px]">
          <div className="border border-[#131A27] rounded-[8px] h-[44px] w-[44px] flex justify-center items-center cursor-pointer">
            <img src="/pagination-arrow-right.svg" alt="pagination arrow right" />
          </div>

          <div className="border border-[#131A27] rounded-[8px] p-[19px] hover:text-white hover:bg-[#131A27] cursor-pointer h-[44px] w-[44px] flex justify-center items-center">
            <h3 className="text-[20px] font-medium">1</h3>
          </div>

          <div className="border border-[#131A27] rounded-[8px] p-[19px] hover:text-white hover:bg-[#131A27] cursor-pointer h-[44px] w-[44px] flex justify-center items-center">
            <h3 className="text-[20px] font-medium">2</h3>
          </div>

          <div className="border border-[#131A27] rounded-[8px] p-[19px] hover:text-white hover:bg-[#131A27] cursor-pointer h-[44px] w-[44px] flex justify-center items-center">
            <h3 className="text-[20px] font-medium">3</h3>
          </div>

          <div className="border border-[#131A27] rounded-[8px] p-[19px] hover:text-white hover:bg-[#131A27] cursor-pointer h-[44px] w-[44px] flex justify-center items-center">
            <h3 className="text-[20px] font-medium">...</h3>
          </div>

          <div className="border border-[#131A27] rounded-[8px] h-[44px] w-[44px] cursor-pointer flex justify-center items-center">
            <img src="/pagination-arrow-left.svg" alt="pagination arrow left" />
          </div>
        </section> */}
      </div>
    </section>
  );
}
