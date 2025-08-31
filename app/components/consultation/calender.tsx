'use client';
import { useState } from "react";

export default function CalendarComponent() {
  const availableTimeSlots = [
    "09:00 - 09:30 ( BST )",
    "10:00 - 10:30 ( BST )",
    "11:00 - 11:30 ( BST )",
    "12:00 - 12:30 ( BST )",
    "13:00 - 13:30 ( BST )",
  ];

  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

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

  function isSameDate(a: Date, b: Date) {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
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

  const canProceed = selectedDate && selectedTimeSlot;

  return (
    <section className="relative bg-white px-[15px] pt-[20px] pb-[64px] md:pb-[100px] md:pt-[36px]">
      <div className="max-w-[1400px] mx-auto lg:px-[47px]">
        {/* Section Header */}
        <div className="text-center mb-[29px] md:mb-[48px] px-[15px] 2xl:px-0 max-w-[636px] mx-auto">
          <h2 className="text-[24px] md:text-[40px] font-bold text-black mb-[12px]">
            احصل على استشارة مجانية الآن وابدأ طريق النجاح
          </h2>
          <p className="text-[14px] md:text-[18px] text-[#4A4A4A] font-medium leading-relaxed max-w-3xl mx-auto">
            قدم طلبك الآن واستفد من استشارة مجانية مع فريقنا المتخصص.
          </p>
        </div>

        {/* Form Section */}
        <div className="max-w-[1300px] mx-auto bg-white border border-[#DADADA77] rounded-lg">
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
                            ◀
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
                            ▶
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
                              selectedDate &&
                              isSameDate(cell.date, selectedDate);

                            return (
                              <button
                                key={idx}
                                type="button"
                                disabled={cell.outside || isPast}
                                onClick={() => setSelectedDate(cell.date)}
                                className={[
                                  "grid place-items-center text-sm md:text-base rounded-full py-2 aspect-square transition-colors duration-150 w-[35px] md:h-[56px] h-[35px] md:w-[56px]",
                                  cell.outside || isPast
                                    ? "text-[#B1B1B1] opacity-60 cursor-not-allowed"
                                    : "text-black hover:bg-[#FCF4E9]",
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
                      <div className="space-y-3 border border-[#DADADA] rounded-lg p-[32px] flex flex-col gap-[24px]">
                        {availableTimeSlots.map((slot) => (
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
                          if (canProceed) {
                            console.log("Selected:", {
                              date: selectedDate?.toISOString(),
                              time: selectedTimeSlot,
                            });
                          }
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
        </div>
      </div>
    </section>
  );
}