'use client';

import CountryCodeInput from "@/app/components/global/CountryCodeInput";
import FileUpload from "@/app/components/global/FileUpload";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { FormSettingsDataType } from "@/app/utils/Types";
import { useLocale, useTranslations } from "next-intl";
import PreviousProjects from "@/app/components/home/PreviousProjects";
import { Select } from "antd";
interface FormData {
  name: string;
  country_id: string; 
  phone: string;
  email: string;
  communication_way: string;
  communication_lang: string;
  owner_identity: string;
  owner_role: string;
  project_name: string;
  project_description: string;
  has_file: boolean;
  project_description_file: File[];
  services: string[];
  country_code: number; 
}

interface ValidationErrors {
  name?: string;
  email?: string;
  country_id?: string;
  phone?: string;
  communication_way?: string;
  communication_lang?: string;
  owner_identity?: string;
  owner_role?: string;
  project_name?: string;
  services?: string;
}

export default function Page() {

  const locale = useLocale();
  const t = useTranslations("StartProjectForm");

  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    country_id: "",
    phone: "",
    email: "",
    communication_way: "",
    communication_lang: "",
    owner_identity: "",
    owner_role: "",
    project_name: "",
    project_description: "",
    has_file: false,
    project_description_file: [],
    services: [],
    country_code: 0
  })

  const [errorText, setErrorText] = useState("")
  const [successText, setSuccessText] = useState("");
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});


  console.log(formData, "formData")

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
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
      }
    }
    return res.json();
  };


  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["FormSettingsDataStartingProjectForm"],
    queryFn: fetchFormSettingsData,
  });


  // ✅ Mutation setup
  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      let body: BodyInit;
      let headers: HeadersInit = { lang: locale };
  
      if (formData.has_file && formData.project_description_file.length > 0) {
        // ✅ Use FormData for file upload
        const fd = new FormData();
  
        // Append normal fields
        Object.entries(formData).forEach(([key, value]) => {
          if (key === "project_description_file") {
            (value as File[]).forEach((file) => {
              fd.append("project_description_file[]", file);
            });
          } else if (Array.isArray(value)) {
            value.forEach((v) => fd.append(`${key}[]`, v));
          } else if (value !== "" && value !== null && value !== undefined) {
            fd.append(key, String(value));
          }
        });
  
        body = fd;
        // ❌ Do not set Content-Type manually, browser will set it with boundary
      } else {
        // ✅ Send JSON if no files
        const { project_description_file, ...rest } = formData;
        body = JSON.stringify(rest);
        headers["Content-Type"] = "application/json";
      }
  
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/setStartYourProjectDemand`,
        {
          method: "POST",
          headers,
          body,
        }
      );
  
      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(
          errorData?.message || "فشل في إرسال النموذج. حاول مرة أخرى."
        );
      }
  
      return res.json();
    },
    onSuccess: (data) => {
      console.log("✅ Form submitted successfully:", data);
      setFormData({
        name: "",
        country_id: "",
        phone: "",
        email: "",
        communication_way: "",
        communication_lang: "",
        owner_identity: "",
        owner_role: "",
        project_name: "",
        project_description: "",
        has_file: false,
        project_description_file: [],
        services: [],
        country_code: 0
      })

      setSuccessText("تم إرسال النموذج بنجاح!");

      setOpen(false)

      setTimeout(() => {
        setSuccessText("");
      }, 3000);
    },
    onError: (error: any) => {
      console.error("❌ Error submitting form:", error);

      setErrorText(error.message || "حدث خطأ أثناء إرسال النموذج.");

      setTimeout(() => {
        setErrorText("");
      }, 3000);
    },
  });


  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};

    if (!formData.name.trim()) {
      errors.name = t("nameRequired");
    }

    if (!formData.email.trim()) {
      errors.email = t("emailRequired");
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = t("emailInvalid");
      }
    }

    if (!formData.country_id) {
      errors.country_id = t("countryRequired");
    }

    if (!formData.phone.trim()) {
      errors.phone = t("phoneRequired");
    } else {
      const phoneLength =
        data && formData.country_id
          ? Number(
              data?.data?.countries?.find(
                (e: any) => String(e.country_code) == String(formData.country_code)
              )?.phone_length || ""
            )
          : undefined;
      if (phoneLength && formData.phone.length !== phoneLength) {
        errors.phone = t("phoneLengthError");
      }
    }

    if (!formData.communication_way) {
      errors.communication_way = t("communicationWayRequired");
    }

    if (!formData.communication_lang) {
      errors.communication_lang = t("communicationLangRequired");
    }

    if (!formData.owner_identity) {
      errors.owner_identity = t("ownerIdentityRequired");
    }

    if (formData.owner_identity === "other" && !formData.owner_role.trim()) {
      errors.owner_role = t("ownerRoleRequired");
    }

    if (!formData.project_name.trim()) {
      errors.project_name = t("projectNameRequired");
    }

    if (!formData.services || formData.services.length === 0) {
      errors.services = t("servicesRequired");
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };


  return (
    <>
      <div className="w-full bg-white px-6 pt-[6rem] lg:pt-[8rem] xl:pt-[9rem]">
        <div className="max-w-[1400px] mx-auto xl:px-[24px]">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-[#8B8B8B] text-[15px] font-medium leading-[1.65]">
              الرئيسية
            </Link>
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.0603 14.281C10.1869 14.281 10.3136 14.2343 10.4136 14.1343C10.6069 13.941 10.6069 13.621 10.4136 13.4277L6.06693 9.08099C5.74693 8.76099 5.74693 8.24099 6.06693 7.92099L10.4136 3.57432C10.6069 3.38099 10.6069 3.06099 10.4136 2.86766C10.2203 2.67432 9.90026 2.67432 9.70693 2.86766L5.36026 7.21432C5.02026 7.55432 4.82693 8.01432 4.82693 8.50099C4.82693 8.98766 5.01359 9.44766 5.36026 9.78766L9.70693 14.1343C9.80693 14.2277 9.93359 14.281 10.0603 14.281Z"
                fill="#8B8B8B"
              />
            </svg>

            <Link href="/start-your-project" className="text-black text-[15px] font-medium leading-[1.65]">
              ابدأ مشروعك الآن
            </Link>
          </div>
        </div>
      </div>

      {/* <!-- From Section --> */}
      <section className="relative bg-white px-[15px] pt-[20px] pb-[64px] md:pb-[100px] md:pt-[36px]">
        <div className="max-w-[1400px] mx-auto lg:px-[47px]">
          {/* <!-- Section Header --> */}
          <div className="text-center mb-[29px] md:mb-[48px] px-[15px] 2xl:px-0 max-w-[636px] mx-auto">
            <h2 className="text-[24px] md:text-[40px] font-bold text-black mb-[12px]">
              هل أنت مستعد لإستكشاف إمكانيات جديدة للنمو؟
            </h2>
            <p className="text-[14px] md:text-[18px] text-[#4A4A4A] font-medium leading-relaxed max-w-3xl mx-auto">
              اطلب واستشر خطة مع خبيرنا لتحقيق فريق مثالي مخصص لاحتياجات عملك
            </p>
          </div>

          {/* <!-- Form Section --> */}
          <div className="max-w-[1300px] mx-auto bg-white border border-[#DADADA77] rounded-lg">
            <div className="p-2 md:p-8">
              <form noValidate onSubmit={(e) => {
                e.preventDefault()
                if (validateForm()) {
                  mutation.mutate(formData)
                }
              }} className="space-y-[32px] md:space-y-[48px]">
                <div className="space-y-12">
                  <div className="space-y-[16px] md:space-y-6">
                    <h3 className="text-[20px] md:text-[24px] font-bold text-black pb-[16px] md:pb-[24px] border-b-[0.5px] border-[#DADADA77]">
                      معلومات عنك
                    </h3>

                    {/* <!-- Name and country Row --> */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-[16px] md:gap-6">
                      {/* <!-- Name Field --> */}
                      <div className="space-y-3">
                        <label className="text-base font-medium text-black block">
                          الأسم <span className="text-[#FF6B6B]">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          name="name"
                          required
                          maxLength={60}
                          onChange={handleChange}
                          placeholder="الرجاء إدخال اسمك."
                          className={`w-full h-12 px-3 py-2 border rounded-md text-sm text-black placeholder-[#B1B1B1] focus:outline-none focus:border-[#EDA133] ${validationErrors.name ? 'border-red-500' : 'border-[#DADADA]'}`}
                        />
                        {validationErrors.name && (
                          <p className="text-red-500 text-sm">{validationErrors.name}</p>
                        )}
                      </div>

                      {/* <!-- Country Field --> */}
                      <div className="space-y-3">
                        <label className="text-base font-medium text-black block">
                          الدولة <span className="text-[#FF6B6B]">*</span>
                        </label>
                        <div className="relative">
                          <Select
                            className={`w-full h-12 px-3 py-2 border-0 rounded-md text-sm text-black appearance-none focus:outline-none focus:border-[#EDA133] ${validationErrors.country_id ? 'border-[0.5px] border-red-400' : 'border-[#DADADA]'}`}
                            allowClear
                            value={formData.country_id == "" ? undefined : formData.country_id } 
                            style={{ width: '100%', height: "3rem" }}
                            placeholder="الرجاء إختيار الدولة"
                            onChange={(value) => {
                              setFormData({...formData, country_id: value})
                              if (validationErrors.country_id) {
                                setValidationErrors((prev) => ({...prev, country_id: undefined}))
                              }
                            }}
                            options={data?.data?.countries && data?.data?.countries.map(country => {
                              return (
                                {
                                  label: country.name,
                                  value: country.id,
                                }
                              )
                            })}
                          />
                          {validationErrors.country_id && (
                            <p className="text-red-500 text-sm mt-3">{validationErrors.country_id}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-12">
                  <div className="space-y-[16px] md:space-y-6">
                    <h3 className="text-[20px] md:text-[24px] font-bold text-black pb-[16px] md:pb-[24px] border-b-[0.5px] border-[#DADADA77]">
                      بيانات المتقدم
                    </h3>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-[16px] md:gap-6">
                      {/* <!-- Description Section --> */}
                      <div className="space-y-6 col-span-2">
                        <h3 className="text-[16px] font-bold text-black">
                          ما هي صفتك؟ <span className="text-[#FF6B6B]">*</span>
                        </h3>
                        <div id="role-buttons" className="flex flex-row flex-wrap gap-[16px] md:gap-[25px] w-full">
                          <button type="button" onClick={() => {setFormData((previousData) => ({...previousData, owner_identity: "owner"})) 
                          if (validationErrors.owner_identity || validationErrors.owner_role) {
                                setValidationErrors((prev) => ({...prev, owner_identity: undefined, owner_role: undefined}))
                              }  
                        } } className={`${formData.owner_identity == "owner" ? 
                              "border-[#EDA133] bg-[#faead1] text-black" : ""
                            } role-btn px-6 py-3 border border-[#DADADA77] rounded-lg text-sm w-[155px] md:w-[160px] font-medium text-[#4A4A4A] hover:border-[#EDA133] hover:bg-[#FAEAD1] transition-colors`}>
                            صاحب المشروع
                          </button>
                          <button type="button" onClick={() => {setFormData((previousData) => ({...previousData, owner_identity: "representative"})) 
                          if (validationErrors.owner_identity || validationErrors.owner_role) {
                                setValidationErrors((prev) => ({...prev, owner_identity: undefined, owner_role: undefined}))
                              }  
                        } } className={`${formData.owner_identity == "representative" ? 
                              "border-[#EDA133] bg-[#faead1] text-black" : ""
                            } role-btn px-6 py-3 border border-[#DADADA77] rounded-lg text-sm w-[155px] md:w-[160px] font-medium text-[#4A4A4A] hover:border-[#EDA133] hover:bg-[#FAEAD1] transition-colors`}>
                            ممثل عن الشركة
                          </button>
                          <button type="button" onClick={() => {setFormData((previousData) => ({...previousData, owner_identity: "employee"})) 
                          if (validationErrors.owner_identity || validationErrors.owner_role) {
                                setValidationErrors((prev) => ({...prev, owner_identity: undefined, owner_role: undefined}))
                              }  
                        } } className={`${formData.owner_identity == "employee" ? 
                              "border-[#EDA133] bg-[#faead1] text-black" : ""
                            } role-btn px-6 py-3 border border-[#DADADA77] rounded-lg text-sm w-[155px] md:w-[160px] font-medium text-[#4A4A4A] hover:border-[#EDA133] hover:bg-[#FAEAD1] transition-colors`}>
                            موظف
                          </button>
                          <button type="button" onClick={() => {setFormData((previousData) => ({...previousData, owner_identity: "consulting"})) 
                          if (validationErrors.owner_identity || validationErrors.owner_role) {
                                setValidationErrors((prev) => ({...prev, owner_identity: undefined, owner_role: undefined}))
                              }  
                        } } className={`${formData.owner_identity == "consulting" ? 
                              "border-[#EDA133] bg-[#faead1] text-black" : ""
                            } role-btn px-6 py-3 border border-[#DADADA77] rounded-lg text-sm w-[155px] md:w-[160px] font-medium text-[#4A4A4A] hover:border-[#EDA133] hover:bg-[#FAEAD1] transition-colors`}>
                            جهة استشارية
                          </button>
                          <button type="button" onClick={() => {setFormData((previousData) => ({...previousData, owner_identity: "other"})) 
                          if (validationErrors.owner_identity || validationErrors.owner_role) {
                                setValidationErrors((prev) => ({...prev, owner_identity: undefined, owner_role: undefined}))
                              }  
                        } }
                            id="other-button"
                            className={`${formData.owner_identity == "other" ? 
                              "border-[#EDA133] bg-[#faead1] text-black" : ""
                            } role-btn px-6 py-3 border border-[#DADADA77] rounded-lg text-sm w-[155px] md:w-[160px] font-medium text-[#4A4A4A] hover:border-[#EDA133] hover:bg-[#FAEAD1] transition-colors`}
                          >
                            أخرى
                          </button>

                        </div>
                        {validationErrors.owner_identity && (
                            <p className="text-red-500 text-sm">{validationErrors.owner_identity}</p>
                          )}
                      </div>

                      {/* <!-- Hidden by default --> */}
                      {formData.owner_identity == "other" && <div id="other-button-field" className="space-y-3">
                        <label className="text-base font-medium text-black block">ما هي صفتك ؟ </label>
                        <input
                          type="text"
                          name="owner_role"
                          required
                          value={formData.owner_role}
                          onChange={handleChange}
                          placeholder="الرجاء إدخال دورك في الشركة."
                          className="w-full h-12 px-3 py-2 border border-[#DADADA] rounded-md text-sm text-black placeholder-[#B1B1B1] focus:outline-none focus:border-[#EDA133]"
                        />
                      </div>}
                    </div>
                    {validationErrors.owner_role && (
                      <p className="text-red-500 text-sm">{validationErrors.owner_role}</p>
                    )}
                  </div>

                  <div className="space-y-[32px] md:space-b-[48px] md:space-t-[56px]">
                    <div className="space-y-[16px] md:space-y-6">
                      <h3 className="text-[20px] md:text-[24px] font-bold text-black pb-[16px] m:pb-[24px] border-b-[0.5px] border-[#DADADA77]">
                        تفاصيل التواصل
                      </h3>

                      {/* <!-- Name and Email Row --> */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[16px] md:gap-6">
                        {/* <!-- Phone Field --> */}
                        <section className="flex flex-col gap-[0.8rem]">
                          <CountryCodeInput setSelectedPhone={(value: string) => {
                            setFormData(previous => ({...previous, country_code: Number(value?.split("-")?.[0]), phone: value?.split("-")?.[1]}))
                            if (validationErrors.phone) {
                              setValidationErrors((prev) => ({...prev, phone: undefined}))
                            }
                          }} formDataValue={formData.phone} />
                          {validationErrors.phone && (
                            <p className="text-red-500 text-sm">{validationErrors.phone}</p>
                          )}
                        </section>

                        {/* <!-- Email Field --> */}
                        <div className="space-y-3">
                          <label className="text-base font-medium text-black block">
                            البريد الإلكتروني <span className="text-[#FF6B6B]">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            maxLength={160}
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="الرجاء إدخال البريد الإلكتروني."
                            className={`w-full h-12 px-3 py-2 border rounded-md text-sm text-black placeholder-[#B1B1B1] focus:outline-none focus:border-[#EDA133] ${validationErrors.email ? 'border-red-500' : 'border-[#DADADA]'}`}
                          />
                          {validationErrors.email && (
                            <p className="text-red-500 text-sm">{validationErrors.email}</p>
                          )}
                        </div>
                      </div>

                      {/* <!-- How did you hear about us and Role Row --> */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* <!-- How did you hear about us --> */}
                        <div className="space-y-3">
                          <label className="text-base font-medium text-black block">
                            وسيلة التواصل المفضلة؟ <span className="text-[#FF6B6B]">*</span>
                          </label>
                          <div className="flex flex-row flex-wrap gap-[16px] md:gap-[25px] w-full">
                            <button type="button" onClick={() => {
                              setFormData((previousData) => ({...previousData, communication_way: "whatsapp"}))
                              if (validationErrors.communication_way) {
                                setValidationErrors((prev) => ({...prev, communication_way: undefined}))
                              }
                            }} className={`${formData.communication_way == "whatsapp" ? 
                              "border-[#EDA133] bg-[#faead1] text-black" : ""
                            } px-6 py-3 border border-[#DADADA77] rounded-lg text-sm w-[155px] md:w-[160px] font-medium text-[#4A4A4A] hover:border-[#EDA133] hover:bg-[#FAEAD1] transition-colors`}>
                              واتساب
                            </button>
                            <button type="button" onClick={() => {
                              setFormData((previousData) => ({...previousData, communication_way: "call"}))
                              if (validationErrors.communication_way) {
                                setValidationErrors((prev) => ({...prev, communication_way: undefined}))
                              }
                            }} className={`${formData.communication_way == "call" ? 
                              "border-[#EDA133] bg-[#faead1] text-black" : ""
                            } px-6 py-3 border border-[#DADADA77] rounded-lg text-sm w-[155px] md:w-[160px] font-medium text-[#4A4A4A] hover:border-[#EDA133] hover:bg-[#FAEAD1] transition-colors`}>
                              اتصال
                            </button>
                          </div>
                          {validationErrors.communication_way && (
                              <p className="text-red-500 text-sm">{validationErrors.communication_way}</p>
                            )}
                        </div>

                        {/* <!-- Role Field --> */}
                        <div className="space-y-3">
                          <label className="text-base font-medium text-black block">
                            ما اللغة التي تفضل التواصل بها؟ <span className="text-[#FF6B6B]">*</span>
                          </label>
                          <div className="flex flex-row flex-wrap gap-[16px] md:gap-[25px] w-full">
                            <button type="button" onClick={() => {
                              setFormData((previousData) => ({...previousData, communication_lang: "arabic"}))
                              if (validationErrors.communication_lang) {
                                setValidationErrors((prev) => ({...prev, communication_lang: undefined}))
                              }
                            }} className={`px-6 py-3 border 
                            border-[#DADADA77] rounded-lg text-sm w-[155px] md:w-[160px] font-medium text-[#4A4A4A] hover:border-[#EDA133] hover:bg-[#FAEAD1] 
                            transition-colors ${formData.communication_lang == "arabic" ? 
                              "border-[#EDA133] bg-[#faead1] text-black" : ""
                            }`}>
                              عربي
                            </button>
                            <button type="button" onClick={() => {
                              setFormData((previousData) => ({...previousData, communication_lang: "english"}))
                              if (validationErrors.communication_lang) {
                                setValidationErrors((prev) => ({...prev, communication_lang: undefined}))
                              }
                            }} className={`px-6 py-3 border border-[#DADADA77] rounded-lg text-sm w-[155px] md:w-[160px] font-medium text-[#4A4A4A] hover:border-[#EDA133] hover:bg-[#FAEAD1] transition-colors ${formData.communication_lang == "english" ? 
                              "border-[#EDA133] bg-[#FAEAD1] text-black" : ""
                            }`}>
                              إنجليزي
                            </button>
                          </div>
                          {validationErrors.communication_lang && (
                              <p className="text-red-500 text-sm">{validationErrors.communication_lang}</p>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <!-- Project Section --> */}
                  <div className="space-y-[32px] md:space-b-[48px] md:space-t-[56px]">
                    <div className="space-y-[16px] md:space-y-6">
                      <h3 className="text-[20px] md:text-[24px] font-bold text-black pb-[16px] md:pb-[24px] border-b-[0.5px] border-[#DADADA77]">
                        تفاصيل المشروع
                      </h3>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[16px] md:gap-6">
                        <div className="space-y-3">
                          <label className="text-base font-medium text-black block">اسم المشروع</label>
                          <input
                            value={formData.project_name} 
                            onChange={handleChange}
                            name="project_name"
                            required
                            type="text"
                            placeholder="اسم المشروع"
                            className={`w-full h-12 px-3 py-2 border rounded-md text-sm text-black placeholder-[#B1B1B1] focus:outline-none focus:border-[#EDA133] ${validationErrors.project_name ? 'border-red-500' : 'border-[#DADADA]'}`}
                          />
                          {validationErrors.project_name && (
                            <p className="text-red-500 text-sm">{validationErrors.project_name}</p>
                          )}
                        </div>

                        <div className="space-y-3">
                          <label className="text-base font-medium text-black block">
                            ما نوع الخدمة التي تحتاجها؟ <span className="text-[#FF6B6B]">*</span>
                          </label>
                          <div className="relative">
                            <Select
                              mode="multiple"
                              className={`w-full custom-select px-3 py-2 border-0 rounded-md text-sm text-black appearance-none focus:outline-none focus:border-[#EDA133] ${validationErrors.services ? 'border-[0.5px] border-red-400' : 'border-[#DADADA]'}`}
                              allowClear
                              value={formData["services"]} 
                              style={{ width: '100%' }}
                              placeholder="اختر"
                              onChange={(values) => {
                                setFormData({...formData, services: [...values]})
                                if (validationErrors.services) {
                                  setValidationErrors((prev) => ({...prev, services: undefined}))
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
                          {validationErrors.services && (
                            <p className="text-red-500 text-sm">{validationErrors.services}</p>
                          )}
                        </div>

                        <div className="space-y-3 lg:col-span-2">
                          <label className="text-[16px] font-medium text-black block">
                            احكِ لنا نبذة مختصرة عن المشروع أو الفكرة
                          </label>
                          <textarea
                            value={formData.project_description}
                            onChange={handleChange}
                            maxLength={3000}
                            name="project_description"
                            placeholder="الرجاء إدخال لنا نبذة مختصرة عن المشروع أو الفكرة."
                            className="w-full h-36 px-3 py-3 border border-[#DADADA] rounded-md text-sm text-black placeholder-[#B1B1B1] focus:outline-none focus:border-[#EDA133] resize-none"
                          ></textarea>
                        </div>

                        {/* <!-- file input Field settings --> */}
                        <div className="space-y-3">
                          <label className="text-base font-medium text-black block">
                            هل لديك ملف مرفق يوضح فكرتك أو متطلباتك؟
                          </label>
                          <div className="flex flex-row flex-wrap gap-[16px] md:gap-[25px] w-full">
                            <button
                              id="upload-files"
                              type="button"
                              onClick={() => {
                                setOpen(true)
                                setFormData((previousData) => ({...previousData, has_file: true}))
                              }}
                              className={`${formData.has_file == true ? 
                                "border-[#EDA133] bg-[#faead1] text-black" : ""
                              } file-input-settings px-6 py-3 border border-[#DADADA77] rounded-lg text-sm w-[155px] md:w-[160px] font-medium text-[#4A4A4A] hover:border-[#EDA133] hover:bg-[#FAEAD1] transition-colors`}
                            >
                              نعم
                            </button>
                            <button type="button" onClick={() => {
                              setOpen(false)
                              setFormData((previousData) => ({...previousData, has_file: false}))
                            }} className={`${formData.has_file == false ? 
                              "border-[#EDA133] bg-[#faead1] text-black" : ""
                            } file-input-settings px-6 py-3 border border-[#DADADA77] rounded-lg text-sm w-[155px] md:w-[160px] font-medium text-[#4A4A4A] hover:border-[#EDA133] hover:bg-[#FAEAD1] transition-colors`}>
                              لا
                            </button>
                          </div>
                        </div>
                      </div>
                      <div></div>

                      {/* <!-- File Upload Section --> */}
                      {open && <FileUpload
                        setSelectedFiles={(values: File[]) =>
                          setFormData((prev) => ({
                            ...prev,
                            project_description_file: values, 
                          }))
                        }
                        title="إرفاق ملف عن المشروع"
                        required={false}
                      />}
                    </div>

                    {/* <!-- Form Actions --> */}
                    <section className="w-full flex flex-col md:flex-row md:justify-start md:items-center gap-10">
                      <button
                        type="submit"
                        disabled={mutation.isPending}
                        onClick={(e) => {
                          e.preventDefault();
                          if (validateForm()) {
                            mutation.mutate(formData)
                          }
                        }}
                        className="px-4 py-2 bg-[#EDA133] w-full md:w-[268px] h-[56px] text-white rounded-lg text-base font-medium hover:bg-[#D1912A] transition-colors"
                      >
                        {mutation.isPending ? "جاري الإرسال..." : "إرسال"}
                      </button>

                      <div className="space-y-3 w-fit">
                        {successText && (
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
                    </section>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
