'use client';
import { useState } from "react";
import CountryCodeInput from "../global/CountryCodeInput";
import { useLocale } from "next-intl";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FormSettingsDataType } from "@/app/utils/Types";
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

export default function CalendarComponent({ durations }: { durations: {
  id: number;
  name: string;
  from: string;
  to: string;
  formatted_name: string;
}[]}) {

  const locale = useLocale();

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
  
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  // const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  // const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  // console.log(selectedDate, "selected date")


  const [nextSlide, setNextSlide] = useState(false)
  

  console.log(formData, "formData");

  
  const availableTimeSlots = [
    "09:00 - 09:30 ( BST )",
    "10:00 - 10:30 ( BST )",
    "11:00 - 11:30 ( BST )",
    "12:00 - 12:30 ( BST )",
    "13:00 - 13:30 ( BST )",
  ];


  function formatMonthYearArabic(year: number, monthIndex: number) {
    const date = new Date(year, monthIndex, 1);
    try {
      return new Intl.DateTimeFormat("ar", {
        month: "long",
        year: "numeric",
      }).format(date);
    } catch {
      const months = [
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

      setSuccessText("تم إرسال النموذج بنجاح!");

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
                    تحديد موعد الإستشارة
                  </h3>

                  <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Date picker */}
                    <div className="w-full space-y-3 h-full">
                      <h4 className="text-[16px] font-medium text-black">
                        تاريخ الإستشارة
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
                            aria-label="الشهر السابق"
                          >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M14 10.0002C14 10.5836 13.775 11.1669 13.3334 11.6086L7.90003 17.0419C7.65837 17.2836 7.25837 17.2836 7.0167 17.0419C6.77503 16.8002 6.77503 16.4002 7.0167 16.1586L12.45 10.7252C12.85 10.3252 12.85 9.67523 12.45 9.27523L7.0167 3.8419C6.77503 3.60023 6.77503 3.20023 7.0167 2.95856C7.25837 2.7169 7.65836 2.7169 7.90003 2.95856L13.3334 8.39189C13.775 8.83356 14 9.41689 14 10.0002Z" fill="#8B8B8B"/>
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
                            aria-label="الشهر التالي"
                          > 
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5.99997 10.0002C5.99997 10.5836 6.22497 11.1669 6.66663 11.6086L12.1 17.0419C12.3416 17.2836 12.7416 17.2836 12.9833 17.0419C13.225 16.8002 13.225 16.4002 12.9833 16.1586L7.54997 10.7252C7.14997 10.3252 7.14997 9.67523 7.54997 9.27523L12.9833 3.8419C13.225 3.60023 13.225 3.20023 12.9833 2.95856C12.7416 2.7169 12.3416 2.7169 12.1 2.95856L6.66663 8.39189C6.22497 8.83356 5.99997 9.41689 5.99997 10.0002Z" fill="#8B8B8B"/>
                            </svg>

                          </button>
                        </div>
                        <div className="w-full h-px bg-[#DADADA] my-4"></div>

                        {/* Weekday header */}
                        <div className="grid grid-cols-7 text-center text-[9px] md:text-[14px] font-medium text-black">
                          <div>الأحد</div>
                          <div>الإثنين</div>
                          <div>الثلاثاء</div>
                          <div>الأربعاء</div>
                          <div>الخميس</div>
                          <div>الجمعة</div>
                          <div>السبت</div>
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
                      </div>
                    </div>

                    {/* Time slots */}
                    <div className="w-full space-y-3">
                      <h4 className="text-[16px] font-medium text-black">
                        موعد الإستشارة
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
                        {durations.map((slot) => (
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
                      </div>
                    </div>
                  </section>

                  {/* Form Actions */}
                  <section className="flex justify-start">
                    <section className="w-full flex flex-col md:flex-row gap-[16px] md:items-center pb-[16px]">
                      <button
                        className="px-4 py-2 bg-[#EDA133] flex justify-center items-center w-full md:w-[268px] h-[56px] text-white rounded-lg text-base font-medium hover:bg-[#D1912A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!canProceed}
                        onClick={() => {
                          // if (canProceed) {
                          //   console.log("Selected:", {
                          //     date: selectedDate?.toISOString(),
                          //     time: selectedTimeSlot,
                          //   });
                          // }
                          setNextSlide(true)
                        }}
                      >
                        التالي
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
                <form onClick={(e) => {
                    e.preventDefault()
                  }} className="space-y-[16px] md:space-y-6">
                  <h3 className="text-[20px] md:text-[24px] font-bold text-black pb-[16px] md:pb-[24px] border-b-[0.5px] border-[#DADADA77]">
                    معلومات عن الإستشارة
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
                        required
                        name="name"
                        onChange={handleChange}
                        value={formData?.name}
                        placeholder="ادخل الاسم الكامل"
                        className="w-full h-12 px-3 py-2 border border-[#DADADA] rounded-md text-sm text-black placeholder-[#B1B1B1] focus:outline-none focus:border-[#EDA133]"
                      />
                    </div>

                    {/* <!-- Country Field --> */}
                    <div className="space-y-3">
                      <label className="text-base font-medium text-black block">
                        الدولة <span className="text-[#FF6B6B]">*</span>
                      </label>
                      <div className="relative">
                        <Select
                          className="w-full h-12 px-3 py-2 border-0 border-[#DADADA] rounded-md text-sm text-black appearance-none focus:outline-none focus:border-[#EDA133]"
                          allowClear
                          value={formData.country_id == "" ? undefined : formData.country_id}
                          style={{ width: "100%", height: "3rem" }}
                          placeholder="الرجاء إختيار الدولة"
                          onChange={(value) => setFormData({ ...formData, country_id: value })}
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
                    </div>

                    <CountryCodeInput setSelectedPhone={(value: string) => setFormData(previous => ({...previous, country_code: value?.split("-")?.[0], phone: value?.split("-")?.[1]}))} formDataValue={formData.phone} />

                    {/* <!-- Email Field --> */}
                    <div className="space-y-3">
                      <label className="text-base font-medium text-black block">
                        البريد الإلكتروني <span className="text-[#FF6B6B]">*</span>
                      </label>
                      <input
                        type="email"
                        maxLength={160}
                        required
                        name="email"
                        onChange={handleChange}
                        value={formData.email}
                        placeholder="الرجاء إدخال البريد الإلكتروني."
                        className="w-full h-12 px-3 py-2 border border-[#DADADA] rounded-md text-sm text-black placeholder-[#B1B1B1] focus:outline-none focus:border-[#EDA133]"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-base font-medium text-black block">
                      الخدمة المطلوبة <span className="text-[#FF6B6B]">*</span>
                      </label>
                      <div className="relative">
                      <Select
                        mode="multiple"
                        className="w-full h-12 px-3 py-2 border-0 border-[#DADADA] rounded-md text-sm text-black appearance-none focus:outline-none focus:border-[#EDA133]"
                        allowClear
                        value={formData["services"]} 
                        style={{ width: '100%' }}
                        placeholder="اختر"
                        onChange={(values) => setFormData({...formData, services: [...values]})}
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
                    </div>

                    
                    <div className="space-y-3 lg:col-span-2">
                      <label className="text-[16px] font-medium text-black block">استفسارك أو احتياجك</label>
                      <textarea
                        maxLength={3000}
                        value={formData.inquiry}
                        onChange={handleChange}
                        name="inquiry"
                        placeholder="اكتب باختصار موضوع الاستشارة..."
                        className="w-full h-36 px-3 py-3 border border-[#DADADA] rounded-md text-sm text-black placeholder-[#B1B1B1] focus:outline-none focus:border-[#EDA133] resize-none"
                      ></textarea>
                    </div>
                  </div>
                  {/* <!-- Form Actions --> */}
                  <section className="flex justify-start">
                    <section className="w-full flex flex-col md:flex-row gap-[16px] md:items-center pb-[16px]">
                      <button
                        type="submit"
                        disabled={mutation.isPending}
                        onClick={() => mutation.mutate(formData)}
                        className="px-4 py-2 bg-[#EDA133] w-full md:w-[268px] h-[56px] text-white rounded-lg text-base font-medium hover:bg-[#D1912A] transition-colors">
                        {mutation.isPending ? "جاري الإرسال..." : "إرسال"}
                      </button>


                      <button
                        onClick={() => {
                          setNextSlide(false)
                        }}
                        className="px-4 py-2 w-full md:w-[268px] flex justify-center items-center h-[56px] text-[#EDA133] gap-[16px] rounded-lg text-base font-medium border border-[#EDA133] hover:bg-orange-50 transition-colors"
                      >
                        رجوع
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