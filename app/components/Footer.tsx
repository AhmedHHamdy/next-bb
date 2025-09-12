'use client';
import { Swiper, SwiperSlide } from "swiper/react";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Link } from "@/i18n/navigation";
import { ApiResponse } from "../utils/Types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

interface FormData {
  email: string;
}
interface ValidationErrors {
  email?: string;
}

export default function Footer() {

  const localeValue = useLocale()

  const t = useTranslations("FooterLinks");

  const [formData, setFormData] = useState<FormData>({
    email: ""
  });

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  const [successText, setSuccessText] = useState("");

  const [errorText, setErrorText] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (validationErrors[name as keyof ValidationErrors]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};

    // Email
    if (!formData.email.trim()) {
      errors.email = t("emailRequired");
    } else {
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = t("emailInvalid");
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const fetchFooter = async (): Promise<ApiResponse> => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/getAppSettings`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          lang: localeValue,
        },
      }
    );    

    if (!res.ok) {
      throw new Error("Failed to website settings");
    }
    return res.json();
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["footer"],
    queryFn: fetchFooter,
  });

  console.log(data)

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/setUserSubscribeInNewsletter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          lang: localeValue
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        // Try to extract error message from API response
        const errorData = await res.json().catch(() => null);
        throw new Error(
          errorData?.message || "فشل في إرسال ألايمل. حاول مرة أخرى."
        );
      }

      return res.json();
    },
    onSuccess: (data) => {
      console.log("✅ Form submitted successfully:", data);
      setFormData({
        email: ""
      })

      setSuccessText("تم إرسال ألايمل بنجاح!");

      setTimeout(() => {
        setSuccessText("");
      }, 3000);
    },
    onError: (error: any) => {
      console.error("❌ Error submitting form:", error);
      console.log(error, "error")

      setErrorText(error.message || "حدث خطأ أثناء إرسال النموذج.");

      setTimeout(() => {
        setErrorText("");
      }, 3000);
    },
  });


  // if (isLoading) {
  //   return (
  //     <section className="py-20 text-center flex items-center justify-center">
  //       <Spin style={{color: "#EDA133"}} />
  //     </section>
  //   );
  // }

  if (isError) {
    return (
      <section className="py-20 text-center">
        <p className="text-red-500">Error Occurred</p>
      </section>
    );
  }


  return (
    <>
    {/* mt-[64px] md:mt-[100px] */}
      <footer className="footer">
      {data?.data?.footer?.home_whatsapp_icon_status && <a
        href={`https://wa.me/${data?.data?.social?.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <section className="fixed bottom-2 right-4 z-[2000]">
          <img src="/whatsapp.svg" alt="whatsapp icon" />
        </section>
      </a>}


        <div
          className="relative py-12 bg-[#131A27] overflow-hidden bg-no-repeat bg-cover bg-center md:bg-top w-full md:h-98"
          style={{
            backgroundImage: `url(${data?.data?.footer.footer_cover_image})`
          }}>
          <div className="absolute inset-0 bg-gradient-to-br from-dark-bg/20 via-dark-bg/50 to-dark-bg/80 bg-blend-overlay">
            <div className="absolute inset-0 bg-black/60"></div>
          </div>

          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-col items-end gap-6 w-full max-w-[729px] mr-0 relative z-10">
              <div className="flex flex-col items-end gap-[24px] w-full px-[15px] 2xl:px-0">
                <h2 className="font-bold text-[24px] md:text-[40px] text-white leading-[1.5] w-full">
                  {data?.data?.footer?.start_your_project_title}
                </h2>
                <p className="font-medium text-[14px] md:text-[18px] text-white leading-[1.5] w-full">
                  {data?.data?.footer?.start_your_project_description}
                </p>
              </div>
              <section className="self-start px-[15px] 2xl:px-0 w-full">
                <Link href="/start-your-project" className="bg-[#EDA133] text-center text-white hover:bg-primary-hover rounded-lg px-4 py-2 flex items-center justify-center gap-2 no-underline transition-all duration-300 w-full md:w-[230px] h-[56px] hover:transform hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/40">
                  <span className=" font-medium text-[16px] leading-normal text-white">{t("startYourProjectNow")}</span>

                  <svg className="rtl:block ltr:hidden" width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12.6123 4.49951C12.9321 4.49951 13.1973 4.77661 13.1973 5.11084C13.2027 5.27771 13.1309 5.43305 13.0264 5.54248C12.9216 5.65197 12.7777 5.72119 12.6123 5.72119H7.49512L15.8545 14.4585C16.0802 14.6947 16.0802 15.0865 15.8545 15.3228C15.6285 15.559 15.2534 15.559 15.0273 15.3228L6.50391 6.4126V12.106C6.50391 12.4402 6.23967 12.7173 5.91992 12.7173C5.60018 12.7173 5.33594 12.4402 5.33594 12.106V5.11084C5.33594 4.77661 5.60018 4.49952 5.91992 4.49951H12.6123Z"
                      fill="#FCF4E9"
                    />
                  </svg>

                  <svg  className="rtl:hidden ltr:block" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.5 7.77686C11.5 8.0966 11.2229 8.36182 10.8887 8.36182C10.7218 8.36726 10.5665 8.29544 10.457 8.19092C10.3475 8.08617 10.2783 7.94224 10.2783 7.77686L10.2783 2.65967L1.54102 11.019C1.30482 11.2448 0.912974 11.2447 0.676757 11.019C0.440512 10.793 0.440555 10.4179 0.676757 10.1919L9.58691 1.66846L3.89355 1.66846C3.55932 1.66846 3.28223 1.40422 3.28223 1.08447C3.28223 0.764729 3.55933 0.500488 3.89355 0.500488L10.8887 0.500488C11.2229 0.500488 11.5 0.764729 11.5 1.08447L11.5 7.77686Z" fill="#FCF4E9"/>
                  </svg>
                </Link>
              </section>
            </div>
          </div>
        </div>

        <div className="bg-[#131A27] pt-[28px] px-[15px] 2xl:px-0">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col items-center">
              <div className="partners-section w-full">
                <section className="flex flex-col-reverse items-center gap-[23px] md:gap-4 md:flex-row xl:gap-0 lg:flex-row md:items-center justify-between">
                  <img
                    className="px-6 w-full md:px-0 md:max-w-[360px] lg:max-w-[480px] xl:max-w-[580px] 2xl:max-w-[680px]"
                    src={data?.data?.footer?.footer_logo_right_image}
                    alt="building logo"
                  />
                  <img
                    className="px-2 w-full md:px-0 md:max-w-[360px] lg:max-w-[480px] xl:max-w-[580px] 2xl:max-w-[680px]"
                    src={data?.data?.footer?.footer_logo_left_image}
                    alt="business logo"
                  />
                </section>
              </div>

              <div className="flex flex-col md:flex-row justify-between w-full gap-8 mt-[32px] md:mt-[47px]">
                <div className="hidden xl:flex flex-wrap gap-[90px] w-full">
                  <div className="">
                    <h4 className=" font-bold text-base leading-normal text-white mb-4">{t("aboutCompanyTitle")}</h4>
                    <ul className="list-none p-0 m-0 space-y-3">
                      <li className="flex items-center gap-4">
                        <svg className="rtl:block ltr:hidden" width="5" height="7" viewBox="0 0 5 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            opacity="0.8"
                            d="M0.601563 3.49511C0.601563 3.36965 0.649581 3.24421 0.745417 3.14856L3.76268 0.138716C3.95462 -0.0527493 4.26581 -0.0527492 4.45767 0.138716C4.64953 0.330105 4.64953 0.640471 4.45767 0.831953L1.78782 3.49511L4.45758 6.15827C4.64943 6.34974 4.64943 6.66008 4.45758 6.85145C4.26572 7.04301 3.95453 7.04301 3.76259 6.85145L0.745324 3.84165C0.649473 3.74595 0.601563 3.62051 0.601563 3.49511Z"
                            fill="#B1B1B1"
                          />
                        </svg>

                        <svg className="rtl:hidden ltr:block" width="4" height="7" viewBox="0 0 4 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path opacity="0.8" d="M4 3.49999C4 3.37453 3.95198 3.2491 3.85615 3.15345L0.838878 0.143599C0.646942 -0.0478665 0.335752 -0.0478664 0.143894 0.143599C-0.0479645 0.334987 -0.0479645 0.645354 0.143894 0.836835L2.81374 3.49999L0.143987 6.16316C-0.047871 6.35462 -0.047871 6.66496 0.143987 6.85633C0.335845 7.04789 0.647036 7.04789 0.838971 6.85633L3.85624 3.84653C3.95209 3.75083 4 3.6254 4 3.49999Z" fill="#B1B1B1"/>
                        </svg>

                        <Link
                          href="/about-us"
                          className="text-gray-300 hover:text-white  font-medium text-sm no-underline transition-colors duration-300"
                        >
                          {t("aboutUs")}
                        </Link>
                      </li>
                      <li className="flex items-center gap-4">
                        <svg className="rtl:block ltr:hidden" width="5" height="7" viewBox="0 0 5 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            opacity="0.8"
                            d="M0.601563 3.49511C0.601563 3.36965 0.649581 3.24421 0.745417 3.14856L3.76268 0.138716C3.95462 -0.0527493 4.26581 -0.0527492 4.45767 0.138716C4.64953 0.330105 4.64953 0.640471 4.45767 0.831953L1.78782 3.49511L4.45758 6.15827C4.64943 6.34974 4.64943 6.66008 4.45758 6.85145C4.26572 7.04301 3.95453 7.04301 3.76259 6.85145L0.745324 3.84165C0.649473 3.74595 0.601563 3.62051 0.601563 3.49511Z"
                            fill="#B1B1B1"
                          />
                        </svg>

                        <svg className="rtl:hidden ltr:block" width="4" height="7" viewBox="0 0 4 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path opacity="0.8" d="M4 3.49999C4 3.37453 3.95198 3.2491 3.85615 3.15345L0.838878 0.143599C0.646942 -0.0478665 0.335752 -0.0478664 0.143894 0.143599C-0.0479645 0.334987 -0.0479645 0.645354 0.143894 0.836835L2.81374 3.49999L0.143987 6.16316C-0.047871 6.35462 -0.047871 6.66496 0.143987 6.85633C0.335845 7.04789 0.647036 7.04789 0.838971 6.85633L3.85624 3.84653C3.95209 3.75083 4 3.6254 4 3.49999Z" fill="#B1B1B1"/>
                        </svg>

                        <Link
                          href="/blogs"
                          className="text-gray-300 hover:text-white  font-medium text-sm no-underline transition-colors duration-300"
                        >
                          {t("blog")}
                        </Link>
                      </li>
                      <li className="flex items-center gap-4">
                        <svg className="rtl:block ltr:hidden" width="5" height="7" viewBox="0 0 5 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            opacity="0.8"
                            d="M0.601563 3.49511C0.601563 3.36965 0.649581 3.24421 0.745417 3.14856L3.76268 0.138716C3.95462 -0.0527493 4.26581 -0.0527492 4.45767 0.138716C4.64953 0.330105 4.64953 0.640471 4.45767 0.831953L1.78782 3.49511L4.45758 6.15827C4.64943 6.34974 4.64943 6.66008 4.45758 6.85145C4.26572 7.04301 3.95453 7.04301 3.76259 6.85145L0.745324 3.84165C0.649473 3.74595 0.601563 3.62051 0.601563 3.49511Z"
                            fill="#B1B1B1"
                          />
                        </svg>

                        <svg className="rtl:hidden ltr:block" width="4" height="7" viewBox="0 0 4 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path opacity="0.8" d="M4 3.49999C4 3.37453 3.95198 3.2491 3.85615 3.15345L0.838878 0.143599C0.646942 -0.0478665 0.335752 -0.0478664 0.143894 0.143599C-0.0479645 0.334987 -0.0479645 0.645354 0.143894 0.836835L2.81374 3.49999L0.143987 6.16316C-0.047871 6.35462 -0.047871 6.66496 0.143987 6.85633C0.335845 7.04789 0.647036 7.04789 0.838971 6.85633L3.85624 3.84653C3.95209 3.75083 4 3.6254 4 3.49999Z" fill="#B1B1B1"/>
                        </svg>

                        <Link
                          href="/career"
                          className="text-gray-300 hover:text-white  font-medium text-sm no-underline transition-colors duration-300"
                        >
                          {t("careers")}
                        </Link>
                      </li>
                      <li className="flex items-center gap-4">
                        <svg className="rtl:block ltr:hidden" width="5" height="7" viewBox="0 0 5 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            opacity="0.8"
                            d="M0.601563 3.49511C0.601563 3.36965 0.649581 3.24421 0.745417 3.14856L3.76268 0.138716C3.95462 -0.0527493 4.26581 -0.0527492 4.45767 0.138716C4.64953 0.330105 4.64953 0.640471 4.45767 0.831953L1.78782 3.49511L4.45758 6.15827C4.64943 6.34974 4.64943 6.66008 4.45758 6.85145C4.26572 7.04301 3.95453 7.04301 3.76259 6.85145L0.745324 3.84165C0.649473 3.74595 0.601563 3.62051 0.601563 3.49511Z"
                            fill="#B1B1B1"
                          />
                        </svg>

                        <svg className="rtl:hidden ltr:block" width="4" height="7" viewBox="0 0 4 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path opacity="0.8" d="M4 3.49999C4 3.37453 3.95198 3.2491 3.85615 3.15345L0.838878 0.143599C0.646942 -0.0478665 0.335752 -0.0478664 0.143894 0.143599C-0.0479645 0.334987 -0.0479645 0.645354 0.143894 0.836835L2.81374 3.49999L0.143987 6.16316C-0.047871 6.35462 -0.047871 6.66496 0.143987 6.85633C0.335845 7.04789 0.647036 7.04789 0.838971 6.85633L3.85624 3.84653C3.95209 3.75083 4 3.6254 4 3.49999Z" fill="#B1B1B1"/>
                        </svg>

                        <Link
                          href="/faq"
                          className="text-gray-300 hover:text-white  font-medium text-sm no-underline transition-colors duration-300"
                        >
                          {t("faq")}
                        </Link>
                      </li>
                      <li className="flex items-center gap-4">
                        <svg className="rtl:block ltr:hidden" width="5" height="7" viewBox="0 0 5 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            opacity="0.8"
                            d="M0.601563 3.49511C0.601563 3.36965 0.649581 3.24421 0.745417 3.14856L3.76268 0.138716C3.95462 -0.0527493 4.26581 -0.0527492 4.45767 0.138716C4.64953 0.330105 4.64953 0.640471 4.45767 0.831953L1.78782 3.49511L4.45758 6.15827C4.64943 6.34974 4.64943 6.66008 4.45758 6.85145C4.26572 7.04301 3.95453 7.04301 3.76259 6.85145L0.745324 3.84165C0.649473 3.74595 0.601563 3.62051 0.601563 3.49511Z"
                            fill="#B1B1B1"
                          />
                        </svg>

                        <svg className="rtl:hidden ltr:block" width="4" height="7" viewBox="0 0 4 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path opacity="0.8" d="M4 3.49999C4 3.37453 3.95198 3.2491 3.85615 3.15345L0.838878 0.143599C0.646942 -0.0478665 0.335752 -0.0478664 0.143894 0.143599C-0.0479645 0.334987 -0.0479645 0.645354 0.143894 0.836835L2.81374 3.49999L0.143987 6.16316C-0.047871 6.35462 -0.047871 6.66496 0.143987 6.85633C0.335845 7.04789 0.647036 7.04789 0.838971 6.85633L3.85624 3.84653C3.95209 3.75083 4 3.6254 4 3.49999Z" fill="#B1B1B1"/>
                        </svg>

                        <Link
                          href="/contact-us"
                          className="text-gray-300 hover:text-white  font-medium text-sm no-underline transition-colors duration-300"
                        >
                          {t("contactUs")}
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="flex-1 min-w-80">
                    <h4 className=" font-bold text-base leading-normal text-white mb-4">{t("ourServicesTitle")}</h4>
                    <div className="flex gap-[85px]">
                      <div className="">
                        <ul className="list-none p-0 m-0 space-y-3">
                          {data?.data?.footer?.services && data?.data?.footer?.services?.slice(0, 5)?.map(service => {
                            return (
                              <li key={service.id} className="flex items-center gap-4">
                                <svg className="rtl:block ltr:hidden" width="5" height="7" viewBox="0 0 5 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path
                                    opacity="0.8"
                                    d="M0.601563 3.49511C0.601563 3.36965 0.649581 3.24421 0.745417 3.14856L3.76268 0.138716C3.95462 -0.0527493 4.26581 -0.0527492 4.45767 0.138716C4.64953 0.330105 4.64953 0.640471 4.45767 0.831953L1.78782 3.49511L4.45758 6.15827C4.64943 6.34974 4.64943 6.66008 4.45758 6.85145C4.26572 7.04301 3.95453 7.04301 3.76259 6.85145L0.745324 3.84165C0.649473 3.74595 0.601563 3.62051 0.601563 3.49511Z"
                                    fill="#B1B1B1"
                                  />
                                </svg>

                                <svg className="rtl:hidden ltr:block" width="4" height="7" viewBox="0 0 4 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path opacity="0.8" d="M4 3.49999C4 3.37453 3.95198 3.2491 3.85615 3.15345L0.838878 0.143599C0.646942 -0.0478665 0.335752 -0.0478664 0.143894 0.143599C-0.0479645 0.334987 -0.0479645 0.645354 0.143894 0.836835L2.81374 3.49999L0.143987 6.16316C-0.047871 6.35462 -0.047871 6.66496 0.143987 6.85633C0.335845 7.04789 0.647036 7.04789 0.838971 6.85633L3.85624 3.84653C3.95209 3.75083 4 3.6254 4 3.49999Z" fill="#B1B1B1"/>
                                </svg>
                                <Link
                                  href={`/services/${service.id}/${service.slug}`}
                                  className="text-gray-300 hover:text-white  font-medium text-sm no-underline transition-colors duration-300"
                                >
                                  {service.name.slice(0, 20)}
                                </Link>
                              </li>
                            )
                          })}
                        </ul>
                      </div>

                      <div className="flex-1">
                        <ul className="list-none p-0 m-0 space-y-3">
                        {data?.data?.footer?.services && data?.data?.footer?.services?.slice(5)?.map(service => {
                            return (
                              <li key={service.id} className="flex items-center gap-4">
                                <svg className="rtl:block ltr:hidden" width="5" height="7" viewBox="0 0 5 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path
                                    opacity="0.8"
                                    d="M0.601563 3.49511C0.601563 3.36965 0.649581 3.24421 0.745417 3.14856L3.76268 0.138716C3.95462 -0.0527493 4.26581 -0.0527492 4.45767 0.138716C4.64953 0.330105 4.64953 0.640471 4.45767 0.831953L1.78782 3.49511L4.45758 6.15827C4.64943 6.34974 4.64943 6.66008 4.45758 6.85145C4.26572 7.04301 3.95453 7.04301 3.76259 6.85145L0.745324 3.84165C0.649473 3.74595 0.601563 3.62051 0.601563 3.49511Z"
                                    fill="#B1B1B1"
                                  />
                                </svg>

                                <svg className="rtl:hidden ltr:block" width="4" height="7" viewBox="0 0 4 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path opacity="0.8" d="M4 3.49999C4 3.37453 3.95198 3.2491 3.85615 3.15345L0.838878 0.143599C0.646942 -0.0478665 0.335752 -0.0478664 0.143894 0.143599C-0.0479645 0.334987 -0.0479645 0.645354 0.143894 0.836835L2.81374 3.49999L0.143987 6.16316C-0.047871 6.35462 -0.047871 6.66496 0.143987 6.85633C0.335845 7.04789 0.647036 7.04789 0.838971 6.85633L3.85624 3.84653C3.95209 3.75083 4 3.6254 4 3.49999Z" fill="#B1B1B1"/>
                                </svg>
                                <Link
                                  href={`/services/${service.id}/${service.slug}`}
                                  className="text-gray-300 hover:text-white  font-medium text-sm no-underline transition-colors duration-300"
                                >
                                  {service.name.slice(0, 20)}
                                </Link>
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="xl:hidden flex flex-row justify-between w-full">
                  <div className="flex-1">
                    <h4 className=" font-bold text-base leading-normal text-white mb-4">{t("ourServicesTitle")}</h4>
                    <div className="flex flex-col gap-[16px]">
                      <div className="">
                        <ul className="list-none p-0 m-0 space-y-3">
                          {data?.data?.footer?.services && data?.data?.footer?.services?.map(service => {
                            return (
                              <li key={service.id} className="flex items-center gap-4">
                                <svg className="rtl:block ltr:hidden" width="5" height="7" viewBox="0 0 5 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path
                                    opacity="0.8"
                                    d="M0.601563 3.49511C0.601563 3.36965 0.649581 3.24421 0.745417 3.14856L3.76268 0.138716C3.95462 -0.0527493 4.26581 -0.0527492 4.45767 0.138716C4.64953 0.330105 4.64953 0.640471 4.45767 0.831953L1.78782 3.49511L4.45758 6.15827C4.64943 6.34974 4.64943 6.66008 4.45758 6.85145C4.26572 7.04301 3.95453 7.04301 3.76259 6.85145L0.745324 3.84165C0.649473 3.74595 0.601563 3.62051 0.601563 3.49511Z"
                                    fill="#B1B1B1"
                                  />
                                </svg>

                                <svg className="rtl:hidden ltr:block" width="4" height="7" viewBox="0 0 4 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path opacity="0.8" d="M4 3.49999C4 3.37453 3.95198 3.2491 3.85615 3.15345L0.838878 0.143599C0.646942 -0.0478665 0.335752 -0.0478664 0.143894 0.143599C-0.0479645 0.334987 -0.0479645 0.645354 0.143894 0.836835L2.81374 3.49999L0.143987 6.16316C-0.047871 6.35462 -0.047871 6.66496 0.143987 6.85633C0.335845 7.04789 0.647036 7.04789 0.838971 6.85633L3.85624 3.84653C3.95209 3.75083 4 3.6254 4 3.49999Z" fill="#B1B1B1"/>
                                </svg>
                                <Link
                                  href={`/services/${service.id}/${service.slug}`}
                                  className="text-[#B1B1B1] hover:text-white  font-medium text-sm no-underline transition-colors duration-300"
                                  >
                                  {service.name.slice(0, 20)}
                                </Link>
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className=" font-bold text-base leading-normal text-white mb-4">{t("aboutCompanyTitle")}</h4>
                    <ul className="list-none p-0 m-0 space-y-3">
                      <li className="flex items-center gap-1">
                        <svg className="rtl:block ltr:hidden" width="5" height="7" viewBox="0 0 5 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            opacity="0.8"
                            d="M0.601563 3.49511C0.601563 3.36965 0.649581 3.24421 0.745417 3.14856L3.76268 0.138716C3.95462 -0.0527493 4.26581 -0.0527492 4.45767 0.138716C4.64953 0.330105 4.64953 0.640471 4.45767 0.831953L1.78782 3.49511L4.45758 6.15827C4.64943 6.34974 4.64943 6.66008 4.45758 6.85145C4.26572 7.04301 3.95453 7.04301 3.76259 6.85145L0.745324 3.84165C0.649473 3.74595 0.601563 3.62051 0.601563 3.49511Z"
                            fill="#B1B1B1"
                          />
                        </svg>

                        <svg className="rtl:hidden ltr:block" width="4" height="7" viewBox="0 0 4 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path opacity="0.8" d="M4 3.49999C4 3.37453 3.95198 3.2491 3.85615 3.15345L0.838878 0.143599C0.646942 -0.0478665 0.335752 -0.0478664 0.143894 0.143599C-0.0479645 0.334987 -0.0479645 0.645354 0.143894 0.836835L2.81374 3.49999L0.143987 6.16316C-0.047871 6.35462 -0.047871 6.66496 0.143987 6.85633C0.335845 7.04789 0.647036 7.04789 0.838971 6.85633L3.85624 3.84653C3.95209 3.75083 4 3.6254 4 3.49999Z" fill="#B1B1B1"/>
                        </svg>
                        <Link
                          href="/about-us"
                          className="text-[#B1B1B1] hover:text-white  font-medium text-sm no-underline transition-colors duration-300"
                        >
                          {t("aboutUs")}
                        </Link>
                      </li>
                      <li className="flex items-center gap-2">
                        <svg className="rtl:block ltr:hidden" width="5" height="7" viewBox="0 0 5 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            opacity="0.8"
                            d="M0.601563 3.49511C0.601563 3.36965 0.649581 3.24421 0.745417 3.14856L3.76268 0.138716C3.95462 -0.0527493 4.26581 -0.0527492 4.45767 0.138716C4.64953 0.330105 4.64953 0.640471 4.45767 0.831953L1.78782 3.49511L4.45758 6.15827C4.64943 6.34974 4.64943 6.66008 4.45758 6.85145C4.26572 7.04301 3.95453 7.04301 3.76259 6.85145L0.745324 3.84165C0.649473 3.74595 0.601563 3.62051 0.601563 3.49511Z"
                            fill="#B1B1B1"
                          />
                        </svg>

                        <svg className="rtl:hidden ltr:block" width="4" height="7" viewBox="0 0 4 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path opacity="0.8" d="M4 3.49999C4 3.37453 3.95198 3.2491 3.85615 3.15345L0.838878 0.143599C0.646942 -0.0478665 0.335752 -0.0478664 0.143894 0.143599C-0.0479645 0.334987 -0.0479645 0.645354 0.143894 0.836835L2.81374 3.49999L0.143987 6.16316C-0.047871 6.35462 -0.047871 6.66496 0.143987 6.85633C0.335845 7.04789 0.647036 7.04789 0.838971 6.85633L3.85624 3.84653C3.95209 3.75083 4 3.6254 4 3.49999Z" fill="#B1B1B1"/>
                        </svg>
                        <Link
                          href="/career"
                          className="text-[#B1B1B1] hover:text-white  font-medium text-sm no-underline transition-colors duration-300"
                        >
                          {t("careers")}
                        </Link>
                      </li>
                      <li className="flex items-center gap-2">
                        <svg className="rtl:block ltr:hidden" width="5" height="7" viewBox="0 0 5 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            opacity="0.8"
                            d="M0.601563 3.49511C0.601563 3.36965 0.649581 3.24421 0.745417 3.14856L3.76268 0.138716C3.95462 -0.0527493 4.26581 -0.0527492 4.45767 0.138716C4.64953 0.330105 4.64953 0.640471 4.45767 0.831953L1.78782 3.49511L4.45758 6.15827C4.64943 6.34974 4.64943 6.66008 4.45758 6.85145C4.26572 7.04301 3.95453 7.04301 3.76259 6.85145L0.745324 3.84165C0.649473 3.74595 0.601563 3.62051 0.601563 3.49511Z"
                            fill="#B1B1B1"
                          />
                        </svg>

                        <svg className="rtl:hidden ltr:block" width="4" height="7" viewBox="0 0 4 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path opacity="0.8" d="M4 3.49999C4 3.37453 3.95198 3.2491 3.85615 3.15345L0.838878 0.143599C0.646942 -0.0478665 0.335752 -0.0478664 0.143894 0.143599C-0.0479645 0.334987 -0.0479645 0.645354 0.143894 0.836835L2.81374 3.49999L0.143987 6.16316C-0.047871 6.35462 -0.047871 6.66496 0.143987 6.85633C0.335845 7.04789 0.647036 7.04789 0.838971 6.85633L3.85624 3.84653C3.95209 3.75083 4 3.6254 4 3.49999Z" fill="#B1B1B1"/>
                        </svg>
                        <Link
                          href="/blogs"
                          className="text-[#B1B1B1] hover:text-white  font-medium text-sm no-underline transition-colors duration-300"
                        >
                          {t("blog")}
                        </Link>
                      </li>
                      <li className="flex items-center gap-2">
                        <svg className="rtl:block ltr:hidden" width="5" height="7" viewBox="0 0 5 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            opacity="0.8"
                            d="M0.601563 3.49511C0.601563 3.36965 0.649581 3.24421 0.745417 3.14856L3.76268 0.138716C3.95462 -0.0527493 4.26581 -0.0527492 4.45767 0.138716C4.64953 0.330105 4.64953 0.640471 4.45767 0.831953L1.78782 3.49511L4.45758 6.15827C4.64943 6.34974 4.64943 6.66008 4.45758 6.85145C4.26572 7.04301 3.95453 7.04301 3.76259 6.85145L0.745324 3.84165C0.649473 3.74595 0.601563 3.62051 0.601563 3.49511Z"
                            fill="#B1B1B1"
                          />
                        </svg>

                        <svg className="rtl:hidden ltr:block" width="4" height="7" viewBox="0 0 4 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path opacity="0.8" d="M4 3.49999C4 3.37453 3.95198 3.2491 3.85615 3.15345L0.838878 0.143599C0.646942 -0.0478665 0.335752 -0.0478664 0.143894 0.143599C-0.0479645 0.334987 -0.0479645 0.645354 0.143894 0.836835L2.81374 3.49999L0.143987 6.16316C-0.047871 6.35462 -0.047871 6.66496 0.143987 6.85633C0.335845 7.04789 0.647036 7.04789 0.838971 6.85633L3.85624 3.84653C3.95209 3.75083 4 3.6254 4 3.49999Z" fill="#B1B1B1"/>
                        </svg>
                        <Link
                          href="/faq"
                          className="text-[#B1B1B1] hover:text-white  font-medium text-sm no-underline transition-colors duration-300"
                        >
                          {t("faq")}
                        </Link>
                      </li>
                      <li className="flex items-center gap-2">
                        <svg className="rtl:block ltr:hidden" width="5" height="7" viewBox="0 0 5 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            opacity="0.8"
                            d="M0.601563 3.49511C0.601563 3.36965 0.649581 3.24421 0.745417 3.14856L3.76268 0.138716C3.95462 -0.0527493 4.26581 -0.0527492 4.45767 0.138716C4.64953 0.330105 4.64953 0.640471 4.45767 0.831953L1.78782 3.49511L4.45758 6.15827C4.64943 6.34974 4.64943 6.66008 4.45758 6.85145C4.26572 7.04301 3.95453 7.04301 3.76259 6.85145L0.745324 3.84165C0.649473 3.74595 0.601563 3.62051 0.601563 3.49511Z"
                            fill="#B1B1B1"
                          />
                        </svg>

                        <svg className="rtl:hidden ltr:block" width="4" height="7" viewBox="0 0 4 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path opacity="0.8" d="M4 3.49999C4 3.37453 3.95198 3.2491 3.85615 3.15345L0.838878 0.143599C0.646942 -0.0478665 0.335752 -0.0478664 0.143894 0.143599C-0.0479645 0.334987 -0.0479645 0.645354 0.143894 0.836835L2.81374 3.49999L0.143987 6.16316C-0.047871 6.35462 -0.047871 6.66496 0.143987 6.85633C0.335845 7.04789 0.647036 7.04789 0.838971 6.85633L3.85624 3.84653C3.95209 3.75083 4 3.6254 4 3.49999Z" fill="#B1B1B1"/>
                        </svg>
                        <Link
                          href="/contact-us"
                          className="text-[#B1B1B1] hover:text-white  font-medium text-sm no-underline transition-colors duration-300"
                        >
                          {t("contactUs")}
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-5 w-full max-w-md mr-0 px-0">
                  <h3 className=" font-bold text-base leading-normal text-white w-full mb-0">
                    {t("newsletterTitle")}
                  </h3>
                  <div className="w-full">
                    <form noValidate onSubmit={(e) => {
                      e.preventDefault();
                      if (validateForm()) {
                        mutation.mutate(formData);
                      }
                    }} className="flex bg-white rounded-lg p-2 pr-4 items-center justify-between gap-3 w-full h-14">
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t("newsletterPlaceholder")}
                        className="border-none outline-none bg-transparent  font-medium text-sm leading-tight text-gray-600 placeholder:text-gray-600 w-full"
                      />
                      <button
                        type="submit"
                        className="bg-[#EDA133] hover:bg-primary-hover border-none rounded px-3 py-2 font-medium text-base leading-normal text-white min-w-26 h-10 cursor-pointer transition-all duration-300"
                      >
                        {successText ? t("newsletterSent") : t("newsletterSubscribe")}
                      </button>
                    </form>
                    {validationErrors.email && (
                      <p className="text-red-500 text-sm mt-5">{validationErrors.email}</p>
                    )}
                    {errorText && (
                        <div className="w-full h-[56px] flex items-center gap-2 rounded-lg border border-red-400 bg-red-50 px-4 py-3 text-red-700 mt-5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-red-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L4.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                          </svg>
                          <p className="font-medium">{errorText}</p>
                        </div>
                      )}

                      {successText && (
                          <div className="w-full h-[56px] flex items-center gap-2 rounded-lg border border-green-400 bg-green-100 px-4 py-3 text-green-700 mt-5">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-green-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            <p className="font-medium">{successText}</p>
                          </div>
                        )}
                  </div>
                  <div className="flex items-center gap-4 w-full">
                    <div className="flex-1">
                      <Link href="/start-your-project" className="bg-[#EDA133] w-full h-[107px] rounded-[8px] text-white text-sm font-medium hover:bg-brand-600 cursor-pointer transition-colors flex items-center justify-evenly md:justify-between">
                        <img className="w-[65px] h-[65px] md:w-32 md:h-[120px]" src="/projects.gif" alt="projects gif" />

                        <section className="flex items-center xl:pe-[17px]">
                          <h1 className="text-[16px] md:text-[20px] ml-3 md:ml-0">{t("startYourProjectNow")}</h1>
                          <svg
                            className="rtl:block ltr:hidden"
                            width="65"
                            height="65"
                            viewBox="0 0 65 65"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              width="45.2405"
                              height="45.2405"
                              rx="22.6202"
                              transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 64.6152 32.5518)"
                              fill="white"
                              fillOpacity="0.15"
                            />
                            <path
                              d="M27.1445 36.0664C27.1445 36.5909 27.568 37.0168 28.0925 37.0198C28.6211 37.0227 29.0511 36.5951 29.0511 36.0664L29.051 30.368L36.7199 38.037C37.1022 38.4193 37.7223 38.4193 38.1046 38.037C38.4871 37.6545 38.487 37.0346 38.1046 36.6522L30.4357 28.9833L36.1284 28.988C36.6575 28.9884 37.0861 28.5588 37.0847 28.0297C37.0833 27.503 36.6559 27.0768 36.1292 27.0768L27.7085 27.0768C27.397 27.0768 27.1445 27.3293 27.1446 27.6408L27.1445 36.0664Z"
                              fill="white"
                              fillOpacity="0.76"
                            />
                          </svg>

                          <svg className="rtl:hidden ltr:block" width="64" height="65" viewBox="0 0 64 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect y="32.2109" width="45.2405" height="45.2405" rx="22.6202" transform="rotate(-45 0 32.2109)" fill="white" fillOpacity="0.15"/>
                            <path d="M37.4708 35.7255C37.4708 36.25 37.0473 36.676 36.5228 36.679C35.9942 36.6819 35.5642 36.2542 35.5642 35.7255L35.5643 30.0272L27.8953 37.6961C27.513 38.0785 26.8929 38.0785 26.5106 37.6961C26.1282 37.3137 26.1283 36.6937 26.5106 36.3114L34.1795 28.6425L28.4868 28.6472C27.9577 28.6476 27.5291 28.218 27.5305 27.6889C27.5319 27.1622 27.9593 26.736 28.486 26.736L36.9067 26.736C37.2182 26.736 37.4708 26.9885 37.4707 27.3L37.4708 35.7255Z" fill="white" fillOpacity="0.76"/>
                          </svg>

                        </section>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full h-px bg-gray-600 mb-[32px] mt-[32px]"></div>

              <div className="w-full">
                <section className="block">
                  <Swiper
                    spaceBetween={25}
                    slidesPerView={1.25}
                    direction="horizontal"
                    breakpoints={{
                      320: {
                        slidesPerView: 1.35,
                        spaceBetween: 25,
                      },
                      768: {
                        spaceBetween: 40,
                        slidesPerView: 2,
                      },
                      1024: {
                        spaceBetween: 48,
                        slidesPerView: 4,
                      },
                      1279: {
                        spaceBetween: 160,
                        slidesPerView: 4,
                      },
                    }}
                  >
                    {data?.data?.footer?.branches.map((branch) => {
                      return (
                        <SwiperSlide key={branch.id}>
                          <div className="bg-darker-bg rounded-lg">
                            <h4 className=" font-bold text-base leading-normal text-white mb-4">{branch.name}</h4>
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <div className="mt-1 flex-shrink-0">
                                  <svg
                                    width="25"
                                    height="24"
                                    viewBox="0 0 25 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <rect
                                      x="0.947896"
                                      y="0.341451"
                                      width="23.3073"
                                      height="23.3073"
                                      rx="11.6537"
                                      stroke="#FCF4E9"
                                      strokeWidth="0.692667"
                                    />
                                    <path
                                      d="M12.4549 18.1436L12.1301 17.7915C12.0243 17.6768 9.52926 14.9709 8.93723 14.2938C8.39757 13.6767 7.91514 12.8228 7.73696 12.169C7.6225 11.7519 7.56445 11.318 7.56445 10.8804C7.56445 8.19074 9.75819 5.99917 12.4546 5.99512C15.1524 5.99917 17.3461 8.19047 17.3461 10.8804C17.3461 11.318 17.2881 11.7519 17.1733 12.1695C16.9951 12.8228 16.5127 13.6767 15.9731 14.2938C15.3808 14.9712 12.886 17.6768 12.7802 17.7915L12.4549 18.1436ZM12.4543 6.87871C10.2457 6.88195 8.44778 8.67695 8.44778 10.8804C8.44778 11.2389 8.49529 11.5939 8.58897 11.9357C8.73313 12.4646 9.14996 13.1948 9.60215 13.7123C10.0676 14.2447 11.7397 16.0635 12.4546 16.8402C13.1697 16.0635 14.8416 14.2447 15.3071 13.7123C15.7595 13.1951 16.1761 12.4646 16.3202 11.9365C16.4142 11.5942 16.4617 11.2392 16.4617 10.8807C16.462 8.67695 14.664 6.88195 12.4543 6.87871Z"
                                      fill="#FCF4E9"
                                    />
                                    <path
                                      d="M12.4533 13.3069C11.0746 13.3069 9.95312 12.1879 9.95312 10.8121C9.95312 9.43639 11.0748 8.31738 12.4533 8.31738C13.8317 8.31738 14.9534 9.43639 14.9534 10.8121C14.9534 12.1879 13.832 13.3069 12.4533 13.3069ZM12.4533 9.20125C11.5618 9.20125 10.8367 9.92395 10.8367 10.8124C10.8367 11.7009 11.5618 12.4236 12.4533 12.4236C13.3447 12.4236 14.0698 11.7009 14.0698 10.8124C14.0698 9.92395 13.3447 9.20125 12.4533 9.20125Z"
                                      fill="#FCF4E9"
                                    />
                                  </svg>
                                </div>
                                <span className=" font-medium text-sm text-[#B1B1B1] md:text-white leading-tight">
                                  {branch.location}
                                </span>
                              </div>
                              <div className="flex items-center gap-3">
                                <svg
                                  width="25"
                                  height="28"
                                  viewBox="0 0 25 28"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    x="0.947896"
                                    y="2.34145"
                                    width="23.3073"
                                    height="23.3073"
                                    rx="11.6537"
                                    stroke="#FCF4E9"
                                    strokeWidth="0.692667"
                                  />
                                  <path
                                    d="M16.4756 15.4073C16.1919 15.112 15.8498 14.9541 15.4873 14.9541C15.1277 14.9541 14.7826 15.1091 14.4873 15.4044L13.5634 16.3254C13.4874 16.2844 13.4114 16.2464 13.3383 16.2084C13.233 16.1558 13.1336 16.1061 13.0488 16.0535C12.1833 15.5038 11.3968 14.7875 10.6425 13.8606C10.277 13.3986 10.0314 13.0097 9.85305 12.615C10.0928 12.3957 10.315 12.1677 10.5314 11.9484C10.6132 11.8665 10.6951 11.7817 10.777 11.6999C11.391 11.0859 11.391 10.2906 10.777 9.67657L9.97875 8.87836C9.88812 8.78772 9.79456 8.69416 9.70684 8.60059C9.53143 8.41931 9.34721 8.23219 9.15716 8.05676C8.87356 7.77607 8.53437 7.62695 8.17768 7.62695C7.82097 7.62695 7.47595 7.77607 7.18357 8.05676C7.18064 8.05968 7.18064 8.05968 7.17772 8.06261L6.18361 9.06548C5.80936 9.43974 5.59592 9.89586 5.54914 10.4251C5.47897 11.2788 5.73042 12.0741 5.92339 12.5946C6.39706 13.8723 7.10463 15.0564 8.16013 16.3254C9.44077 17.8546 10.9817 19.0621 12.7418 19.9129C13.4143 20.2317 14.3119 20.6088 15.3148 20.6731C15.3762 20.6761 15.4405 20.679 15.499 20.679C16.1744 20.679 16.7416 20.4363 17.186 19.9539C17.1889 19.948 17.1948 19.9451 17.1977 19.9393C17.3498 19.7551 17.5252 19.5884 17.7094 19.41C17.8351 19.2902 17.9638 19.1644 18.0895 19.0329C18.379 18.7317 18.531 18.3808 18.531 18.0212C18.531 17.6587 18.376 17.3107 18.0807 17.0183L16.4756 15.4073ZM17.5223 18.4861C17.5193 18.4861 17.5193 18.489 17.5223 18.4861C17.4082 18.6089 17.2913 18.72 17.1656 18.8428C16.9755 19.0241 16.7825 19.2142 16.6013 19.4276C16.306 19.7433 15.958 19.8925 15.5019 19.8925C15.4581 19.8925 15.4113 19.8925 15.3674 19.8896C14.499 19.834 13.692 19.4948 13.0868 19.2054C11.4319 18.4042 9.97875 17.2669 8.77121 15.8254C7.77419 14.6237 7.10755 13.5126 6.66605 12.3197C6.39413 11.5917 6.29472 11.0245 6.33858 10.4894C6.36782 10.1473 6.49939 9.8637 6.74207 9.62101L7.7391 8.62398C7.88237 8.48949 8.03441 8.41639 8.18352 8.41639C8.36772 8.41639 8.51684 8.5275 8.6104 8.62106C8.61334 8.62398 8.61625 8.62691 8.61918 8.62983C8.79753 8.79649 8.96712 8.969 9.14547 9.1532C9.2361 9.24676 9.32967 9.34033 9.42323 9.43681L10.2214 10.235C10.5314 10.5449 10.5314 10.8315 10.2214 11.1414C10.1367 11.2262 10.0548 11.311 9.97 11.3929C9.72438 11.6443 9.49048 11.8782 9.2361 12.1063C9.23026 12.1121 9.22441 12.1151 9.2215 12.1209C8.97003 12.3723 9.01683 12.618 9.06945 12.7846C9.07238 12.7934 9.07529 12.8022 9.07823 12.8109C9.28581 13.3138 9.5782 13.7875 10.0226 14.3518L10.0255 14.3547C10.8325 15.3488 11.6834 16.1236 12.6219 16.7172C12.7418 16.7932 12.8646 16.8546 12.9815 16.9131C13.0868 16.9657 13.1862 17.0154 13.271 17.068C13.2827 17.0739 13.2944 17.0827 13.3061 17.0885C13.4055 17.1382 13.4991 17.1616 13.5956 17.1616C13.8382 17.1616 13.9903 17.0096 14.04 16.9599L15.0399 15.9599C15.1393 15.8605 15.2972 15.7406 15.4814 15.7406C15.6627 15.7406 15.8118 15.8547 15.9025 15.9541C15.9054 15.957 15.9054 15.957 15.9083 15.9599L17.5193 17.571C17.8205 17.8692 17.8205 18.1762 17.5223 18.4861Z"
                                    fill="#FCF4E9"
                                  />
                                  <path
                                    d="M17.5223 18.4861C17.5193 18.4861 17.5193 18.489 17.5223 18.4861ZM17.5223 18.4861C17.4082 18.6089 17.2913 18.72 17.1656 18.8428C16.9755 19.0241 16.7825 19.2142 16.6013 19.4276C16.306 19.7433 15.958 19.8925 15.5019 19.8925C15.4581 19.8925 15.4113 19.8925 15.3674 19.8896C14.499 19.834 13.692 19.4948 13.0868 19.2054C11.4319 18.4042 9.97875 17.2669 8.77121 15.8254C7.77419 14.6237 7.10755 13.5126 6.66605 12.3197C6.39413 11.5917 6.29472 11.0245 6.33858 10.4894C6.36782 10.1473 6.49939 9.8637 6.74207 9.62101L7.7391 8.62398C7.88237 8.48949 8.03441 8.41639 8.18352 8.41639C8.36772 8.41639 8.51684 8.5275 8.6104 8.62106C8.61334 8.62398 8.61625 8.62691 8.61918 8.62983C8.79753 8.79649 8.96712 8.969 9.14547 9.1532C9.2361 9.24676 9.32967 9.34033 9.42323 9.43681L10.2214 10.235C10.5314 10.5449 10.5314 10.8315 10.2214 11.1414C10.1367 11.2262 10.0548 11.311 9.97 11.3929C9.72438 11.6443 9.49048 11.8782 9.2361 12.1063C9.23026 12.1121 9.22441 12.1151 9.2215 12.1209C8.97003 12.3723 9.01683 12.618 9.06945 12.7846C9.07238 12.7934 9.07529 12.8022 9.07823 12.8109C9.28581 13.3138 9.5782 13.7875 10.0226 14.3518L10.0255 14.3547C10.8325 15.3488 11.6834 16.1236 12.6219 16.7172C12.7418 16.7932 12.8646 16.8546 12.9815 16.9131C13.0868 16.9657 13.1862 17.0154 13.271 17.068C13.2827 17.0739 13.2944 17.0827 13.3061 17.0885C13.4055 17.1382 13.4991 17.1616 13.5956 17.1616C13.8382 17.1616 13.9903 17.0096 14.04 16.9599L15.0399 15.9599C15.1393 15.8605 15.2972 15.7406 15.4814 15.7406C15.6627 15.7406 15.8118 15.8547 15.9025 15.9541C15.9054 15.957 15.9054 15.957 15.9083 15.9599L17.5193 17.571C17.8205 17.8692 17.8205 18.1762 17.5223 18.4861ZM16.4756 15.4073C16.1919 15.112 15.8498 14.9541 15.4873 14.9541C15.1277 14.9541 14.7826 15.1091 14.4873 15.4044L13.5634 16.3254C13.4874 16.2844 13.4114 16.2464 13.3383 16.2084C13.233 16.1558 13.1336 16.1061 13.0488 16.0535C12.1833 15.5038 11.3968 14.7875 10.6425 13.8606C10.277 13.3986 10.0314 13.0097 9.85305 12.615C10.0928 12.3957 10.315 12.1677 10.5314 11.9484C10.6132 11.8665 10.6951 11.7817 10.777 11.6999C11.391 11.0859 11.391 10.2906 10.777 9.67657L9.97875 8.87836C9.88812 8.78772 9.79456 8.69416 9.70684 8.60059C9.53143 8.41931 9.34721 8.23219 9.15716 8.05676C8.87356 7.77607 8.53437 7.62695 8.17768 7.62695C7.82097 7.62695 7.47595 7.77607 7.18357 8.05676C7.18064 8.05968 7.18064 8.05968 7.17772 8.06261L6.18361 9.06548C5.80936 9.43974 5.59592 9.89586 5.54914 10.4251C5.47897 11.2788 5.73042 12.0741 5.92339 12.5946C6.39706 13.8723 7.10463 15.0564 8.16013 16.3254C9.44077 17.8546 10.9817 19.0621 12.7418 19.9129C13.4143 20.2317 14.3119 20.6088 15.3148 20.6731C15.3762 20.6761 15.4405 20.679 15.499 20.679C16.1744 20.679 16.7416 20.4363 17.186 19.9539C17.1889 19.948 17.1948 19.9451 17.1977 19.9393C17.3498 19.7551 17.5252 19.5884 17.7094 19.41C17.8351 19.2902 17.9638 19.1644 18.0895 19.0329C18.379 18.7317 18.531 18.3808 18.531 18.0212C18.531 17.6587 18.376 17.3107 18.0807 17.0183L16.4756 15.4073Z"
                                    stroke="#FCF4E9"
                                    strokeWidth="0.277067"
                                  />
                                  <path
                                    d="M13.0143 10.1229C13.7804 10.2515 14.4763 10.6141 15.0318 11.1696C15.5873 11.7251 15.947 12.421 16.0785 13.1871C16.1107 13.38 16.2774 13.5145 16.4674 13.5145C16.4908 13.5145 16.5113 13.5116 16.5346 13.5087C16.751 13.4736 16.8943 13.2689 16.8592 13.0526C16.7013 12.1257 16.2627 11.2807 15.5932 10.6112C14.9236 9.94159 14.0786 9.50302 13.1518 9.34513C12.9354 9.31004 12.7336 9.45331 12.6957 9.66674C12.6576 9.88019 12.798 10.0878 13.0143 10.1229Z"
                                    fill="#FCF4E9"
                                    stroke="#FCF4E9"
                                    strokeWidth="0.277067"
                                  />
                                  <path
                                    d="M19.3662 12.9372C19.106 11.4109 18.3867 10.0221 17.2815 8.91689C16.1763 7.81168 14.7874 7.09241 13.2612 6.83219C13.0478 6.79418 12.846 6.94037 12.808 7.15381C12.7729 7.37018 12.9162 7.57192 13.1325 7.60993C14.4951 7.84092 15.7377 8.48709 16.726 9.47242C17.7142 10.4607 18.3575 11.7033 18.5884 13.0658C18.6206 13.2588 18.7873 13.3933 18.9773 13.3933C19.0007 13.3933 19.0212 13.3904 19.0446 13.3874C19.258 13.3553 19.4042 13.1506 19.3662 12.9372Z"
                                    fill="#FCF4E9"
                                    stroke="#FCF4E9"
                                    strokeWidth="0.277067"
                                  />
                                </svg>
                                <span className=" font-medium text-sm text-[#B1B1B1] md:text-white">{branch.phone}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <svg
                                  width="25"
                                  height="28"
                                  viewBox="0 0 25 28"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    x="0.947896"
                                    y="2.34145"
                                    width="23.3073"
                                    height="23.3073"
                                    rx="11.6537"
                                    stroke="#FCF4E9"
                                    strokeWidth="0.692667"
                                  />
                                  <path
                                    d="M18.1631 8.87891H6.74492C6.0722 8.87891 5.52734 9.42714 5.52734 10.0965V17.402C5.52734 18.0753 6.0762 18.6196 6.74492 18.6196H18.1631C18.8302 18.6196 19.3807 18.0776 19.3807 17.402V10.0965C19.3807 9.42833 18.838 8.87891 18.1631 8.87891ZM17.9926 9.69063C17.7438 9.93807 13.4628 14.1966 13.315 14.3436C13.085 14.5736 12.7792 14.7002 12.454 14.7002C12.1288 14.7002 11.8231 14.5735 11.5923 14.3428C11.4929 14.2439 7.25909 10.0325 6.91544 9.69063H17.9926ZM6.33906 17.2367V10.2622L9.84671 13.7514L6.33906 17.2367ZM6.91595 17.8078L10.4222 14.3238L11.0191 14.9175C11.4024 15.3008 11.912 15.5119 12.454 15.5119C12.996 15.5119 13.5057 15.3008 13.8882 14.9183L14.4858 14.3238L17.9921 17.8078H6.91595ZM18.569 17.2367L15.0613 13.7514L18.569 10.2622V17.2367Z"
                                    fill="#FCF4E9"
                                    stroke="#FCF4E9"
                                    strokeWidth="0.277067"
                                  />
                                </svg>
                                <span className=" font-medium text-sm text-[#B1B1B1] md:text-white">
                                  {branch.email}
                                </span>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      )
                    })}
                  </Swiper>
                </section>
              </div>

              <div className="w-full pb-6 mt-[24px]">
                <div className="w-full h-px bg-gray-600 mb-6"></div>
                <div className="flex flex-col items-start md:flex-row md:justify-between md:items-center">
                  <div className="grid grid-cols-2 justify-items-start md:flex md:items-center gap-6 ps-3 md:ps-0">
                   
                    <Link
                      href={`/terms-conditions/${data?.data?.footer?.pages?.terms?.slug}`}
                      className="text-[#B1B1B1] hover:text-white font-medium text-[14px] md:text-[15px] no-underline transition-colors duration-300"
                    >
                      {data?.data?.footer?.pages?.terms?.title}
                    </Link>
                      
             
                    <Link
                      href={`/privacy-policy/${data?.data?.footer?.pages?.privacy?.slug}`}
                      className="text-[#B1B1B1] hover:text-white font-medium text-[14px] md:text-[15px] no-underline transition-colors duration-300"
                    >
                      {data?.data?.footer?.pages?.privacy?.title}
                    </Link>

                    <Link
                      href={`/user-agreement/${data?.data?.footer?.pages?.policy?.slug}`}
                      className="text-[#B1B1B1] hover:text-white font-medium text-[14px] md:text-[15px] no-underline transition-colors duration-300"
                    >
                      {data?.data?.footer?.pages?.policy?.title}
                    </Link>

                    <Link
                      href={`/accessibility/${data?.data?.footer?.pages?.accessibility?.slug}`}
                      className="text-[#B1B1B1] hover:text-white font-medium text-[14px] md:text-[15px] no-underline transition-colors duration-300"
                    >
                      {data?.data?.footer?.pages?.accessibility?.title}
                    </Link>
                  </div>

                  <div className="text-[#B1B1B1] font-medium text-[14px] md:text-[15px] mt-[21px] md:mt-0">
                    <span>{data?.data?.footer.copyright}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
