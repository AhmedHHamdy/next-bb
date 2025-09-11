'use client';
import { useEffect, useState } from "react";
import CountryCodeInput from "../global/CountryCodeInput";
import { useLocale, useTranslations } from "next-intl";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FormSettingsDataType, FreeConsultationDataType } from "@/app/utils/Types";
import { Select } from "antd";
import dayjs from "dayjs";

interface FormData {
  name: string;
  country_id: string;
  phone: string;
  email: string;
  services: [];
  date: string;
  duration_id: string;
  inquiry: string;
  country_code: string;
}

interface ValidationErrors {
  name?: string;
  email?: string;
  country_id?: string;
  phone?: string;
  services?: string;
  date?: string;
  duration_id?: string;
  inquiry?: string;
}

// { durations }: { durations: {
//   id: number;
//   name: string;
//   from: string;
//   to: string;
//   formatted_name: string;
// }[]}
export default function CalendarComponent() {

  const locale = useLocale();
  const t = useTranslations("ConsultationForm");
  const tCal = useTranslations("Calendar");
  const tInputs = useTranslations("FormInputs");

  const [formData, setFormData] = useState<FormData>({
    name: "",
    country_id: "",
    date: "",
    duration_id: "",
    phone: "",
    email: "",
    services: [],
    inquiry: "",
    country_code: ""
  });


  const [successText, setSuccessText] = useState("");

  const [errorText, setErrorText] = useState("");
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  // const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  // const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  // console.log(selectedDate, "selected date")


  const [nextSlide, setNextSlide] = useState(false)
  

  console.log(formData, "formData");

  useEffect(() => {
    setFormData((previousData) => ({
      ...previousData, date: dayjs(new Date()).format("YYYY-MM-DD")
    }))
  }, [])

  
  // const availableTimeSlots = [
  //   "09:00 - 09:30 ( BST )",
  //   "10:00 - 10:30 ( BST )",
  //   "11:00 - 11:30 ( BST )",
  //   "12:00 - 12:30 ( BST )",
  //   "13:00 - 13:30 ( BST )",
  // ];

  const fetchDurations = async (): Promise<FreeConsultationDataType> => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/getConsultationPageInfo`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          lang: locale,
        },
      }
    );  
    
    if (!res.ok) {
      throw new Error("Failed to website settings");
    }
    return res.json();
  };

  const { data: durationsData } = useQuery({
    queryKey: ["Durations"],
    queryFn: fetchDurations,
  });

  function formatMonthYearArabic(year: number, monthIndex: number) {
    const date = new Date(year, monthIndex, 1);
    try {
      return new Intl.DateTimeFormat(locale, {
        month: "long",
        year: "numeric",
      }).format(date);
    } catch {
      const monthsAr = [
        "يناير",
        "فبراير",
        "مارس",
        "أبريل",
        "مايو",
        "يونيو",
        "يوليو",
        "أغسطس",
        "سبتمبر",
        "أكتوبر",
        "نوفمبر",
        "ديسمبر",
      ];
      const monthsEn = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const months = locale === "ar" ? monthsAr : monthsEn;
      return months[monthIndex] + " " + year;
    }
  }

  function isSameDate(a: string, b: string) {
    return (
      // a.getFullYear() === b.getFullYear() &&
      // a.getMonth() === b.getMonth() &&
      // a.getDate() === b.getDate()
      a == b
    );
  }

  function generateCalendar(year: number, monthIndex: number) {
    const firstOfMonth = new Date(year, monthIndex, 1);
    const firstDayIndex = firstOfMonth.getDay(); // 0=Sunday
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, monthIndex, 0).getDate();

    const cells: { day: number; date: Date; outside: boolean }[] = [];

    // Leading days
    for (let i = 0; i < firstDayIndex; i++) {
      const dayNum = daysInPrevMonth - firstDayIndex + 1 + i;
      cells.push({
        day: dayNum,
        date: new Date(year, monthIndex - 1, dayNum),
        outside: true,
      });
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({
        day: d,
        date: new Date(year, monthIndex, d),
        outside: false,
      });
    }

    // Trailing days
    while (cells.length < 42) {
      const d = cells.length - (firstDayIndex + daysInMonth) + 1;
      cells.push({
        day: d,
        date: new Date(year, monthIndex + 1, d),
        outside: true,
      });
    }

    return cells;
  }

  const calendarCells = generateCalendar(viewYear, viewMonth);

  const canProceed = formData.date && formData.duration_id;
  
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

  // const validateStepOne = (): boolean => {
  //   const errors: ValidationErrors = {};
  //   if (!formData.date) {
  //     errors.date = t("dateRequired");
  //   }
  //   if (!formData.duration_id) {
  //     errors.duration_id = t("durationRequired");
  //   }
  //   setValidationErrors((prev) => ({ ...prev, ...errors }));
  //   return Object.keys(errors).length === 0;
  // };

  const validateStepOne = (): boolean => {
    const errors: ValidationErrors = {};
    
    if (!formData.date) {
      errors.date = t("dateRequired");
    }
    if (!formData.duration_id) {
      errors.duration_id = t("durationRequired");
    }
  
    setValidationErrors(errors); // reset with fresh errors
  
    return Object.keys(errors).length === 0;
  };
  

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};
    // Name
    if (!formData.name.trim()) {
      errors.name = t("nameRequired");
    }
    // Email
    if (!formData.email.trim()) {
      errors.email = t("emailRequired");
    } else {
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = t("emailInvalid");
      }
    }
    // Country
    if (!formData.country_id) {
      errors.country_id = t("countryRequired");
    }
    // Phone
    // if (!formData.phone.trim()) {
    //   errors.phone = t("phoneRequired");
    // } else {
    //   const phoneLength =
    //     data && formData.country_id
    //       ? Number(
    //           data?.data?.countries?.find(
    //             (e: any) => String(e.id) == formData.country_id
    //           )?.phone_length || ""
    //         )
    //       : 25;
    //   if (formData.phone.length !== phoneLength) {
    //     errors.phone = t("phoneLengthError");
    //   }
    // }

    if (!formData.phone.trim()) {
      errors.phone = t("phoneRequired");
    } else {

      const country = data?.data?.countries?.find(
        (e: any) => String(e.country_code) === String(formData.country_code)
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
    
    // Services
    if (!formData.services || (formData.services as unknown as any[])?.length === 0) {
      errors.services = t("servicesRequired");
    }
    // Step one requirements
    if (!formData.date) {
      errors.date = t("dateRequired");
    }
    if (!formData.duration_id) {
      errors.duration_id = t("durationRequired");
    }

    if (!formData.inquiry) {
      errors.inquiry = t("inquiryRequired");
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/setUserConsultation`, {
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
      console.log("✅ Form submitted successfully:", data);
      setFormData({
        name: "",
        country_id: "",
        date: "",
        duration_id: "",
        phone: "",
        email: "",
        services: [],
        inquiry: "",
        country_code: ""
      })

      setSuccessText(t("successText"));

      setTimeout(() => {
        setSuccessText("");
      }, 3000);
    },
    onError: (error: any) => {
      console.error("❌ Error submitting form:", error);
      console.log(error, "error")

      setErrorText(error.message || t("genericError"));

      setTimeout(() => {
        setErrorText("");
      }, 3000);
    },
  });

  return (
    <section className="relative bg-white px-[15px] pt-[20px] pb-[64px] md:pb-[100px] md:pt-0">
      <div className="max-w-[1400px] mx-auto lg:px-[47px]">


        {/* Form Section */}
        {!nextSlide && <div className="max-w-[1320px] mx-auto bg-white border border-[#DADADA77] rounded-lg">
          <div className="px-4 pt-4 md:p-8">
            <div className="space-y-[32px] md:space-y-[48px]">
              <div className="space-y-12">
                <div className="space-y-[16px] md:space-y-6">
                  <h3 className="text-[20px] md:text-[24px] font-bold text-black pb-[16px] md:pb-[24px] border-b-[0.5px] border-[#DADADA77]">
                    {tCal("stepOneTitle")}
                  </h3>

                  <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Date picker */}
                    <div className="w-full space-y-3 h-full">
                      <h4 className="text-[16px] font-medium text-black">
                        {tCal("dateLabel")}
                      </h4>
                      <div className="border border-[#DADADA] rounded-lg p-4">
                        {/* Month header */}
                        <div className="flex items-center justify-center gap-6">
                          <button
                            type="button"
                            onClick={() => {
                              if (viewMonth === 0) {
                                setViewMonth(11);
                                setViewYear(viewYear - 1);
                              } else {
                                setViewMonth(viewMonth - 1);
                              }
                            }}
                            className="w-8 h-8 grid place-items-center rounded hover:bg-[#FCF4E9]"
                            aria-label={tCal("prevMonthAria")}
                          >
                            <svg className="rtl:block ltr:hidden" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M14 10.0002C14 10.5836 13.775 11.1669 13.3334 11.6086L7.90003 17.0419C7.65837 17.2836 7.25837 17.2836 7.0167 17.0419C6.77503 16.8002 6.77503 16.4002 7.0167 16.1586L12.45 10.7252C12.85 10.3252 12.85 9.67523 12.45 9.27523L7.0167 3.8419C6.77503 3.60023 6.77503 3.20023 7.0167 2.95856C7.25837 2.7169 7.65836 2.7169 7.90003 2.95856L13.3334 8.39189C13.775 8.83356 14 9.41689 14 10.0002Z" fill="#8B8B8B"/>
                            </svg>

                            <svg className="rtl:hidden ltr:block" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5.99997 10.0002C5.99997 10.5836 6.22497 11.1669 6.66663 11.6086L12.1 17.0419C12.3416 17.2836 12.7416 17.2836 12.9833 17.0419C13.225 16.8002 13.225 16.4002 12.9833 16.1586L7.54997 10.7252C7.14997 10.3252 7.14997 9.67523 7.54997 9.27523L12.9833 3.8419C13.225 3.60023 13.225 3.20023 12.9833 2.95856C12.7416 2.7169 12.3416 2.7169 12.1 2.95856L6.66663 8.39189C6.22497 8.83356 5.99997 9.41689 5.99997 10.0002Z" fill="#8B8B8B"/>
                            </svg>
                          </button>
                          <div className="text-[16px] font-medium text-black">
                            {formatMonthYearArabic(viewYear, viewMonth)}
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              if (viewMonth === 11) {
                                setViewMonth(0);
                                setViewYear(viewYear + 1);
                              } else {
                                setViewMonth(viewMonth + 1);
                              }
                            }}
                            className="w-8 h-8 grid place-items-center rounded hover:bg-[#FCF4E9]"
                            aria-label={tCal("nextMonthAria")}
                          > 
                            <svg className="rtl:block ltr:hidden" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5.99997 10.0002C5.99997 10.5836 6.22497 11.1669 6.66663 11.6086L12.1 17.0419C12.3416 17.2836 12.7416 17.2836 12.9833 17.0419C13.225 16.8002 13.225 16.4002 12.9833 16.1586L7.54997 10.7252C7.14997 10.3252 7.14997 9.67523 7.54997 9.27523L12.9833 3.8419C13.225 3.60023 13.225 3.20023 12.9833 2.95856C12.7416 2.7169 12.3416 2.7169 12.1 2.95856L6.66663 8.39189C6.22497 8.83356 5.99997 9.41689 5.99997 10.0002Z" fill="#8B8B8B"/>
                            </svg>


                            <svg className="rtl:hidden ltr:block" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M14 10.0002C14 10.5836 13.775 11.1669 13.3334 11.6086L7.90003 17.0419C7.65837 17.2836 7.25837 17.2836 7.0167 17.0419C6.77503 16.8002 6.77503 16.4002 7.0167 16.1586L12.45 10.7252C12.85 10.3252 12.85 9.67523 12.45 9.27523L7.0167 3.8419C6.77503 3.60023 6.77503 3.20023 7.0167 2.95856C7.25837 2.7169 7.65836 2.7169 7.90003 2.95856L13.3334 8.39189C13.775 8.83356 14 9.41689 14 10.0002Z" fill="#8B8B8B"/>
                            </svg>
                          </button>
                        </div>
                        <div className="w-full h-px bg-[#DADADA] my-4"></div>

                        {/* Weekday header */}
                        <div className="grid grid-cols-7 text-center text-[9px] md:text-[14px] font-medium text-black">
                          <div>{tCal("weekdays.sun")}</div>
                          <div>{tCal("weekdays.mon")}</div>
                          <div>{tCal("weekdays.tue")}</div>
                          <div>{tCal("weekdays.wed")}</div>
                          <div>{tCal("weekdays.thu")}</div>
                          <div>{tCal("weekdays.fri")}</div>
                          <div>{tCal("weekdays.sat")}</div>
                        </div>

                        {/* Days grid */}
                        <div className="grid grid-cols-7 gap-2 mt-2">
                          {calendarCells.map((cell, idx) => {
                            const isPast =
                              cell.date <
                              new Date(
                                today.getFullYear(),
                                today.getMonth(),
                                today.getDate()
                              );
                            const isSelected =
                              formData.date &&
                              isSameDate(dayjs(cell.date).format("YYYY-MM-DD"), formData.date);

                            return (
                              <button
                                key={idx}
                                type="button"
                                disabled={cell.outside || isPast}
                                onClick={() => setFormData(previous => ({...previous, date: (dayjs(cell.date).format("YYYY-MM-DD"))}))} 
                                className={[
                                  "grid place-items-center text-sm md:text-base rounded-full py-2 aspect-square transition-colors duration-150 w-[35px] md:h-[56px] h-[35px] md:w-[56px]",
                                  cell.outside || isPast
                                    ? "text-[#B1B1B1] opacity-60 cursor-not-allowed"
                                    : "text-black bg-[#FCF4E9] hover:bg-[#FCF4E9]",
                                  isSelected
                                    ? "bg-[#FCF4E9] ring ring-[#EDA133]"
                                    : "",
                                ].join(" ")}
                              >
                                {cell.day}
                              </button>
                            );
                          })}
                        </div>
                        {validationErrors.date && (
                          <p className="text-red-500 text-sm mt-2">{validationErrors.date}</p>
                        )}
                      </div>
                    </div>

                    {/* Time slots */}
                    <div className="w-full space-y-3">
                      <h4 className="text-[16px] font-medium text-black">
                        {tCal("timeLabel")}
                      </h4>
                      <div className="space-y-3 border border-[#DADADA] rounded-lg p-[32px] flex flex-col gap-[24px] h-full max-h-[504px] overflow-y-auto">
                        {/* {availableTimeSlots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedTimeSlot(slot)}
                            className={[
                              "w-full h-[59px] border border-[#DADADA] rounded-lg text-[16px] font-medium text-black hover:bg-[#FCF4E9] transition-colors",
                              selectedTimeSlot === slot
                                ? "bg-[#FCF4E9] ring ring-[#EDA133]"
                                : "",
                            ].join(" ")}
                          >
                            {slot}
                          </button>
                        ))} */}
                        {durationsData?.data?.durations && durationsData?.data?.durations.map((slot) => (
                          <button
                            key={slot.id}
                            type="button"
                            onClick={() => setFormData(previous => ({...previous, duration_id: String(slot.id)}))}
                            className={[
                              "w-full h-[59px] border border-[#DADADA] rounded-lg text-[16px] font-medium text-black hover:bg-[#FCF4E9] transition-colors",
                              formData.duration_id == String(slot.id)
                                ? "bg-[#FCF4E9] ring ring-[#EDA133]"
                                : "",
                            ].join(" ")}
                          >
                            {slot.formatted_name}
                          </button>
                        ))}
                        {validationErrors.duration_id && (
                          <p className="text-red-500 text-sm">{validationErrors.duration_id}</p>
                        )}
                      </div>
                    </div>
                  </section>

                  {/* Form Actions */}
                  <section className="flex justify-start">
                    <section className="w-full flex flex-col md:flex-row gap-[16px] md:items-center pb-[16px]">
                      <button
                        className="px-4 py-2 bg-[#EDA133] flex justify-center items-center w-full md:w-[268px] h-[56px] text-white rounded-lg text-base font-medium hover:bg-[#D1912A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={false}
                        onClick={() => {
                          if (validateStepOne()) {
                            setNextSlide(true)
                          }
                        }}
                      >
                        {tCal("nextButton")}
                      </button>
                    </section>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>}

        {/* <!-- Form Section --> */}
        {nextSlide && <div className="max-w-[1320px] mx-auto bg-white border border-[#DADADA77] rounded-lg">
          <div className="px-4 pt-4 md:p-8">
            <div className="space-y-[32px] md:space-y-[48px]">
              <div className="space-y-12">
                <form noValidate onSubmit={(e) => {
                    e.preventDefault();
                    if (validateForm()) {
                      mutation.mutate(formData);
                    }
                  }} className="space-y-[16px] md:space-y-6">
                  <h3 className="text-[20px] md:text-[24px] font-bold text-black pb-[16px] md:pb-[24px] border-b-[0.5px] border-[#DADADA77]">
                    {tCal("consultationInfoTitle")}
                  </h3>

                  {/* <!-- Name and country Row --> */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-[16px] md:gap-6">
                    {/* <!-- Name Field --> */}
                    <div className="space-y-3">
                      <label className="text-base font-medium text-black block">
                        {tInputs("nameLabel")} <span className="text-[#FF6B6B]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        name="name"
                        onChange={handleChange}
                        value={formData?.name}
                        placeholder={tInputs("namePlaceholder")}
                        className={`w-full h-12 px-3 py-2 border rounded-md text-sm text-black placeholder-[#B1B1B1] focus:outline-none focus:border-[#EDA133] ${validationErrors.name ? 'border-red-500' : 'border-[#DADADA]'}`}
                      />
                      {validationErrors.name && (
                        <p className="text-red-500 text-sm">{validationErrors.name}</p>
                      )}
                    </div>

                    {/* <!-- Country Field --> */}
                    <div className="space-y-3">
                      <label className="text-base font-medium text-black block">
                        {tInputs("countryLabel")} <span className="text-[#FF6B6B]">*</span>
                      </label>
                      <div className="relative">
                        <Select
                          className={`placeholderColor w-full h-12 px-3 py-2 border-0 rounded-md text-sm text-black appearance-none focus:outline-none focus:border-[#EDA133] ${validationErrors.country_id ? 'border-[0.5px] border-red-400' : 'border-[#DADADA]'}`}
                          allowClear
                          value={formData.country_id == "" ? undefined : formData.country_id}
                          style={{ width: "100%", height: "3rem" }}
                          placeholder={tInputs("countryPlaceholder")} 
                          onChange={(value) => {
                            setFormData({ ...formData, country_id: value });
                            if (validationErrors.country_id) {
                              setValidationErrors((prev) => ({ ...prev, country_id: undefined }));
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

                    {/* <!-- Email Field --> */}
                    <div className="space-y-3">
                      <label className="text-base font-medium text-black block">
                        {tInputs("emailLabel")} <span className="text-[#FF6B6B]">*</span>
                      </label>
                      <input
                        type="email"
                        maxLength={160}
                        required
                        name="email"
                        onChange={handleChange}
                        value={formData.email}
                        placeholder={tInputs("emailPlaceholder")}
                        className={`w-full h-12 px-3 py-2 border rounded-md text-sm text-black placeholder-[#B1B1B1] focus:outline-none focus:border-[#EDA133] ${validationErrors.email ? 'border-red-500' : 'border-[#DADADA]'}`}
                      />
                      {validationErrors.email && (
                        <p className="text-red-500 text-sm">{validationErrors.email}</p>
                      )}
                    </div>

                    <div className="space-y-3">
                      <label className="text-base font-medium text-black block">
                      {tInputs("servicesLabel")} <span className="text-[#FF6B6B]">*</span>
                      </label>
                      <Select
                        mode="multiple"
                        className={`placeholderColor w-full custom-select px-3 py-2 border-0 rounded-md text-sm text-black appearance-none focus:outline-none focus:border-[#EDA133] ${validationErrors.services ? 'border-[0.5px] border-red-400' : 'border-[#DADADA]'}`}
                        allowClear
                        value={formData["services"]} 
                        style={{ width: '100%'}}
                        placeholder={tInputs("servicesPlaceholder")}
                        onChange={(values) => {
                          setFormData({...formData, services: [...values]});
                          if (validationErrors.services) {
                            setValidationErrors((prev) => ({ ...prev, services: undefined }));
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
                      {validationErrors.services && (
                        <p className="text-red-500 text-sm mt-3">{validationErrors.services}</p>
                      )}
                    </div>

                    
                    <div className="space-y-3 lg:col-span-2">
                      <label className="text-[16px] font-medium text-black block">{tInputs("inquiryLabel")} <span className="text-[#FF6B6B]">*</span></label>
                      <textarea
                        maxLength={3000}
                        value={formData.inquiry}
                        onChange={handleChange}
                        name="inquiry"
                        placeholder={tInputs("inquiryPlaceholder")}
                        className={`w-full h-36 px-3 py-3 border border-[#DADADA] rounded-md text-sm text-black placeholder-[#B1B1B1] focus:outline-none focus:border-[#EDA133] resize-none ${validationErrors.inquiry ? 'border-[0.5px] border-red-400' : 'border-[#DADADA]'}`}
                      ></textarea>
                      {validationErrors.inquiry && (
                        <p className="text-red-500 text-sm">{validationErrors.inquiry}</p>
                      )}
                    </div>
                  </div>
                  {/* <!-- Form Actions --> */}
                  <section className="flex justify-start">
                    <section className="w-full flex flex-col md:flex-row gap-[16px] md:items-center pb-[16px]">
                      <button
                        type="submit"
                        disabled={mutation.isPending}
                        className="px-4 py-2 bg-[#EDA133] w-full md:w-[268px] h-[56px] text-white rounded-lg text-base font-medium hover:bg-[#D1912A] transition-colors">
                        {mutation.isPending ? tCal("submitting") : tCal("submit")}
                      </button>


                      <button
                        onClick={() => {
                          setNextSlide(false)
                        }}
                        className="px-4 py-2 w-full md:w-[268px] flex justify-center items-center h-[56px] text-[#EDA133] gap-[16px] rounded-lg text-base font-medium border border-[#EDA133] hover:bg-orange-50 transition-colors"
                      >
                        {tCal("backButton")}
                      </button>

                      <div className="space-y-3">
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
                  </section>

          
                </form>
              </div>
            </div>
          </div>
        </div>}

      </div>
    </section>
  );
}