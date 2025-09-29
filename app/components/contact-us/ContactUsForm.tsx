"use client";

import { FormSettingsDataType } from "@/app/utils/Types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Select } from "antd";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import CountryCodeInput from "../global/CountryCodeInput";

interface FormData {
  name: string;
  country_id: string;
  phone: string;
  email: string;
  subject: string;
  service_id: string;
  message: string;
  country_code: string;
}

interface ValidationErrors {
  name?: string;
  email?: string;
  country_id?: string;
  phone?: string;
  message?: string;
  service_id?: string;
}

export default function ContactUsForm({translationData}: {
  translationData: {
    title: string;
    desc: string;
    left_title: string;
    left_desc: string;
  }
}) {

  const locale = useLocale();
  const t = useTranslations("ContactForm");

  const contactTranslation = useTranslations("ContactUs");

  const tInput = useTranslations("FormInputs")

  const [formData, setFormData] = useState<FormData>({
    name: "",
    country_id: "",
    phone: "",
    email: "",
    subject: "",
    service_id: "",
    message: "",
    country_code: ""
  });

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  const [successText, setSuccessText] = useState("");

  const [errorText, setErrorText] = useState("");
  

  // console.log(formData, "formData");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear validation error when user starts typing
    if (validationErrors[name as keyof ValidationErrors]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      errors.name = t("nameRequired");
    }

    // Email validation
    if (!formData.email.trim()) {
      errors.email = t("emailRequired");
    } else {
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = t("emailInvalid");
      }
    }

    // Country validation
    if (!formData.country_id) {
      errors.country_id = t("countryRequired");
    }

    // Phone validation
    // if (!formData.phone.trim()) {
    //   errors.phone = t("phoneRequired");
    // }

    // Phone validation Length
    // const phoneLength = data && formData.country_id ? Number(data?.data?.countries?.find(e => String(e.id) == formData.country_id)?.phone_length || "") : 25
    // if (formData.phone.length < phoneLength) {
    //   errors.phone = t("phoneLengthError");
    // }

    // Phone validation
    // if (!formData.phone.trim()) {
    //   errors.phone = t("phoneRequired");
    // } else {
    //   const phoneLength =
    //     data && formData.country_id
    //       ? Number(
    //           data?.data?.countries?.find(
    //             (e) => String(e.id) == formData.country_id
    //           )?.phone_length || ""
    //         )
    //       : 25;

    //   if (formData.phone.length !== phoneLength) {
    //     errors.phone = t("phoneLengthError"); // e.g. "رقم الجوال يجب أن يكون {phoneLength} أرقام"
    //   }
    // }

    if (!formData.phone.trim()) {
      errors.phone = t("phoneRequired");
    } else {

      const country = data?.data?.countries?.find(
        (e: any) => String(e.id) == String(formData.country_id)
      );

      
      const phoneLength = country ? Number(country?.phone_length || "") : undefined;

      if (phoneLength && formData.phone.length !== phoneLength) {
        errors.phone = t("phoneLengthError");
      }

      if (country && !formData.phone.startsWith(String(country.starts_with))) {
        const expected = String(country.starts_with ?? "").replace(/^\+/, "").trim();
        errors.phone = t("phoneFormatError", { code: `${expected}` });
      }
    }

    // Service validation
    if (!formData.service_id) {
      errors.service_id = t("serviceRequired");
    }

    // Message validation
    if (!formData.message.trim()) {
      errors.message = t("messageRequired");
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const fetchFormSettingsData = async (): Promise<FormSettingsDataType> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getStartYourProjectInfo`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        lang: locale,
      },
    });

    if (!res.ok) {
      if (res.status == 500 || res.status == 502 || res.status == 503 || res.status == 504) {
        throw new Error("Failed to fetch Server issue");
      } else {
        throw new Error("Failed to fetch website countries settings");
      }
    }
    return res.json();
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["FormSettingsData"],
    queryFn: fetchFormSettingsData,
  });

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/setUserMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          lang: locale
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        // Try to extract error message from API response
        const errorData = await res.json().catch(() => null);
        throw new Error(
          errorData?.message || "فشل في إرسال النموذج. حاول مرة أخرى."
        );
      }

      return res.json();
    },
    onSuccess: (data) => {
      // console.log("✅ Form submitted successfully:", data);
      setFormData({
        name: "",
        country_id: "",
        phone: "",
        email: "",
        subject: "",
        service_id: "",
        message: "",
        country_code: ""
      })

      setSuccessText("تم إرسال النموذج بنجاح!");

      setTimeout(() => {
        setSuccessText("");
      }, 3000);
    },
    onError: (error: any) => {
      console.error("❌ Error submitting form:", error);
      // console.log(error, "error")

      setErrorText(error.message || "حدث خطأ أثناء إرسال النموذج.");

      setTimeout(() => {
        setErrorText("");
      }, 3000);
    },
  });

  return (
    <div className="w-full bg-white px-6 pt-[48px] pb-[48px] md:pb-[72px] md:pt-[72px]">
      <div className="max-w-[1300px] mx-auto">
        {/* <!-- Contact Form Header --> */}
        <div className="flex flex-col items-center gap-3 mb-[32px]">
          <h1 className="text-[24px] md:text-[40px] font-bold text-black text-center">{translationData?.title}</h1>
          <p className="text-[14px] md:text-[18px] font-medium text-[#4A4A4A] leading-[1.5] text-center max-w-[611px]">
            {translationData?.desc}
          </p>
        </div>

        {/* <!-- Contact --> */}
        <div className="flex flex-col lg:flex-row gap-9 justify-center">
          <div className="w-full lg:w-[500px]">
            <div className="bg-white border border-[#E7E8E9] rounded-lg p-6 shadow-lg">
              <h2 className="text-[20px] md:text-[40px] font-medium md:font-bold text-black mb-9">
                {/* {contactTranslation("pleaseFillTheForm")} */}
                {translationData.left_title}
              </h2>

              <div className="space-y-6">
                <p className="text-[14px] md:text-[18px] font-medium text-[#4A4A4A] leading-[1.5] ">
                  {/* {contactTranslation("fillDataBelow")} */}
                  {translationData.left_desc}
                </p>

                <section className="flex items-center">
                  {/* <!-- User Avatars --> */}
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                      <div className="w-12 h-12 rounded-full border-2 border-white bg-gray-300 flex items-center justify-center">
                        <img src="/image-people-1.png" />
                      </div>
                      <div className="w-12 h-12 rounded-full border-2 border-white bg-gray-400 flex items-center justify-center">
                        <img src="/image-people-2.png" />
                      </div>
                      <div className="w-12 h-12 rounded-full border-2 border-white bg-gray-500 flex items-center justify-center">
                        <img src="/image-people-3.png" />
                      </div>
                    </div>

                    {/* <!-- Rating Section --> */}
                    <div className="flex flex-col items-center gap-[2px]">
                      <div className="flex items-center gap-2">
                        <img src="/star-svg.svg"  />
                        <span className="text-[16px] font-normal text-[#050505]">4.5</span>
                      </div>
                      <span className="text-[14px] font-normal text-[#050505]">{contactTranslation("fromOver500Reviews")}</span>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>

          <div className="flex-1 max-w-[744px]">
            <div className="bg-white border border-[#E7E8E9] rounded-lg p-6 shadow-lg">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* <!-- Form Fields --> */}
                <form noValidate  onSubmit={(e) => {
                  e.preventDefault()
                  if (validateForm()) {
                    mutation.mutate(formData)
                  }
                }} className="grid grid-cols-1 xl:grid-cols-2 gap-6 w-full">
                  {/* <!-- Name Field --> */}

                    <div className="space-y-3">
                      <label className="block text-[16px] font-medium text-black">{tInput("nameLabel")} <span className="text-[#FF6B6B]">*</span></label>
                      <input
                        type="text"
                        name="name"
                        onChange={handleChange}
                        maxLength={60}
                        value={formData.name}
                        required
                        placeholder={tInput("namePlaceholder")}
                        className={`w-full h-12 px-3 py-2 border rounded-md text-sm text-black placeholder-[#B1B1B1] focus:outline-none focus:border-[#EDA133] ${
                          validationErrors.name ? 'border-red-500' : 'border-[#DADADA]'
                        }`}
                      />
                      {validationErrors.name && (
                        <p className="text-red-500 text-sm">{validationErrors.name}</p>
                      )}
                    </div>

                    <div className="space-y-3">
                      <label className="text-base font-medium text-black block">
                       {tInput("countryLabel")} <span className="text-[#FF6B6B]">*</span>
                      </label>
                      <div className="relative">
                        <Select
                          className={`w-full h-12 px-3 py-2 border-0 rounded-md text-sm text-black appearance-none focus:outline-none focus:border-[#EDA133] ${
                            validationErrors.country_id ? 'border-[0.5px] border-red-400' : 'border-[#DADADA]'
                          }`}
                          allowClear
                          value={formData.country_id == "" ? undefined : formData.country_id}
                          style={{ width: "100%", height: "3rem" }}
                          placeholder={tInput("countryPlaceholder")}
                          onChange={(value) => {
                            setFormData({ ...formData, country_id: value });
                            if (validationErrors.country_id) {
                              setValidationErrors((prev) => ({
                                ...prev,
                                country_id: undefined,
                              }));
                            }
                          }}
                          options={data?.data?.countries && data?.data?.countries?.map(country => {
                            return (
                              {
                                label: country.name,
                                value: country.id,
                              }
                            )
                          })}
                        />
                      </div>
                      {validationErrors.country_id && (
                        <p className="text-red-500 text-sm">{validationErrors.country_id}</p>
                      )}
                    </div>
                    
                    {/* <!-- Email and Phone Row --> */}
                    <div className="space-y-3">
                      <label className="block text-[16px] font-medium text-black">{tInput("emailLabel")} <span className="text-[#FF6B6B]">*</span></label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        maxLength={160}
                        onChange={handleChange}
                        placeholder={tInput("emailPlaceholder")}
                        className={`w-full h-12 px-3 py-2 border rounded-md text-sm text-black placeholder-[#B1B1B1] focus:outline-none focus:border-[#EDA133] ${
                          validationErrors.email ? 'border-red-500' : 'border-[#DADADA]'
                        }`}
                      />
                      {validationErrors.email && (
                        <p className="text-red-500 text-sm">{validationErrors.email}</p>
                      )}
                    </div>

                    <div className="space-y-3">
                      {/* <label className="block text-[16px] font-medium text-black">{tInput("phoneLabel")} <span className="text-[#FF6B6B]">*</span></label>
                      <input
                        dir="rtl"
                        type="text"
                        required
                        maxLength={
                          data && formData.country_id
                            ? Number(
                                data?.data?.countries?.find(
                                  (e) => String(e.id) == formData.country_id
                                )?.phone_length || ""
                              )
                            : 25
                        }
                        value={formData.phone}
                        name="phone"
                        onChange={(e) => {
                          // Only allow digits
                          const value = e.target.value.replace(/\D/g, "");
                          setFormData({ ...formData, phone: value });

                          if (validationErrors.phone) {
                            setValidationErrors((prev) => ({
                              ...prev,
                              phone: undefined,
                            }));
                          }
                        }}
                        placeholder={tInput("phonePlaceholder")}
                        className={`w-full h-12 px-3 py-2 border rounded-md text-sm text-black placeholder-[#B1B1B1] placeholderAlign focus:outline-none focus:border-[#EDA133] ${
                          validationErrors.phone ? "border-red-500" : "border-[#DADADA]"
                        }`}
                      /> */}
                      <section className="flex flex-col gap-[0.8rem]">
                        <CountryCodeInput setSelectedPhone={(value: string) => {
                          setFormData(previous => ({...previous, country_code: value?.split("-")?.[0], phone: value?.split("-")?.[1]}));
                          if (validationErrors.phone) {
                            setValidationErrors((prev) => ({ ...prev, phone: undefined }));
                          }
                        }} formDataValue={formData.phone} />
                        {validationErrors.phone && (
                          <p className="text-red-500 text-sm">{validationErrors.phone}</p>
                        )}
                      </section>
                      {/* {validationErrors.phone && (
                        <p className="text-red-500 text-sm">{validationErrors.phone}</p>
                      )} */}
                    </div>

                    <div className="space-y-3">
                      <label className="text-base font-medium text-black block">
                      {tInput("reasonForContact")} <span className="text-[#FF6B6B]">*</span>
                      </label>
                      <div className="relative">
                        <Select
                          className={`placeholderColor w-full h-12 px-3 py-2 border-0 rounded-md text-sm text-black appearance-none focus:outline-none focus:border-[#EDA133] ${
                            validationErrors.service_id ? 'border-[0.5px] border-red-400' : 'border-[#DADADA]'
                          }`}
                          allowClear
                          value={formData.service_id == "" ? undefined : formData.service_id } 
                          style={{ width: '100%', height: "3rem" }}
                          placeholder={tInput("chooseReason")}
                          onChange={(value) => {
                            setFormData({...formData, service_id: value});
                            if (validationErrors.service_id) {
                              setValidationErrors((prev) => ({
                                ...prev,
                                service_id: undefined,
                              }));
                            }
                          }}
                          options={data?.data?.services && data?.data?.services?.map(service => {
                            return (
                              {
                                label: service.name,
                                value: service.id,
                              }
                            )
                          })}
                        />
                      </div>
                      {validationErrors.service_id && (
                        <p className="text-red-500 text-sm">{validationErrors.service_id}</p>
                      )}
                    </div>

                    {/* <!-- Subject Field --> */}
                    <div className="space-y-3">
                      <label className="block text-[16px] font-medium text-black">{tInput("subject")}</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder={tInput("subject")}
                        className="w-full h-12 px-3 py-2 border border-[#DADADA] rounded-md text-sm text-black placeholder-[#B1B1B1] focus:outline-none focus:border-[#EDA133]"
                      />
                    </div>

                    {/* <!-- Message Field --> */}
                    <div className="space-y-3 col-span-1 xl:col-span-2">
                      <label className="block text-[16px] font-medium text-black">{tInput("message")} <span className="text-[#FF6B6B]">*</span></label>
                      <textarea
                        placeholder={tInput("enterMessageText")}
                        rows={5}
                        maxLength={3000}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 placeholder:text-[16px] placeholder:text-[#B1B1B1] border rounded-md focus:outline-none focus:ring-2 focus:ring-[#EDA133] focus:border-transparent resize-none ${
                          validationErrors.message ? 'border-red-500' : 'border-[#DADADA]'
                        }`}
                      ></textarea>
                      {validationErrors.message && (
                        <p className="text-red-500 text-sm">{validationErrors.message}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={mutation.isPending}
                      className="flex-1 px-4 py-2 bg-[#EDA133] w-full md:w-full h-[56px] text-white rounded-lg text-base font-medium hover:bg-[#D1912A] transition-colors"
                    >
                      {mutation.isPending ? tInput("send") + "..." : tInput("send")}
                    </button>

                    <div className="space-y-3">
                      { successText && (
                        <div className="w-full h-[56px] flex items-center gap-2 rounded-lg border border-green-400 bg-green-100 px-4 py-3 text-green-700">
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

                      {errorText && (
                        <div className="w-full h-[56px] flex items-center gap-2 rounded-lg border border-red-400 bg-red-50 px-4 py-3 text-red-700">
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
                    </div>
                    
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
