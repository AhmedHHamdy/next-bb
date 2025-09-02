import BlogsCategories from "@/app/components/blogs/Blogs-Categories";
import BlogsPagination from "@/app/components/blogs/BlogsPagination";
import BlogsTagsPagination from "@/app/components/blogs/BlogsTagsPagination";
import { BlogsPageDataApi } from "@/app/utils/Types";
import { Link } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";
// import { getLocale } from "next-intl/server";

async function getBlogsPageData(locale: string): Promise<BlogsPageDataApi> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getAllBlogInfo`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      lang: locale,
    }
  });

  if (!res.ok) {
    if (res.status == 500 || res.status == 502 || res.status == 503 || res.status == 504) {
      throw new Error("Failed to fetch Server issue");
    } else {
      throw new Error("Failed to fetch BlogsData data");
    }
  }

  return res.json();
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const locale = await getLocale();

  const { slug } = await params;

  // fetch typed data
  const { data } = await getBlogsPageData(locale);

  return (
    <>
      <div className="w-full bg-white px-6 pt-[6rem] lg:pt-[8rem] xl:pt-[9rem]">
        <div className="max-w-[1400px] mx-auto xl:px-[24px]">
          <div className="flex items-center gap-2">
  
            <Link href="/blogs" className="text-[#8B8B8B] text-[15px] font-medium leading-[1.65]">
                المدونات
            </Link>

            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.0603 14.281C10.1869 14.281 10.3136 14.2343 10.4136 14.1343C10.6069 13.941 10.6069 13.621 10.4136 13.4277L6.06693 9.08099C5.74693 8.76099 5.74693 8.24099 6.06693 7.92099L10.4136 3.57432C10.6069 3.38099 10.6069 3.06099 10.4136 2.86766C10.2203 2.67432 9.90026 2.67432 9.70693 2.86766L5.36026 7.21432C5.02026 7.55432 4.82693 8.01432 4.82693 8.50099C4.82693 8.98766 5.01359 9.44766 5.36026 9.78766L9.70693 14.1343C9.80693 14.2277 9.93359 14.281 10.0603 14.281Z"
                fill="#8B8B8B"
              />
            </svg>
          </div>
        </div>
      </div>

      <section className="relative bg-white pt-[24px] pb-[64px] md:pb-[64px] md:pt-[36px]">
        <div className="max-w-[1400px] mx-auto lg:px-[47px]">
          <div className="flex flex-col items-center gap-3 mb-[40px] md:mb-[32px] px-[15px]">
            <h1 className="text-center font-bold text-[24px] md:text-[40px] text-black leading-[1.2] max-w-[550px]">
              {data?.heading_title}
            </h1>
            <p className="text-center font-medium text-[14px] md:text-[18px] text-[#4A4A4A] leading-[1.44] max-w-[550px]">
              {data?.heading_desc}
            </p>
          </div>

        <BlogsTagsPagination tagId={slug} />

  
        </div>
      </section>
    </>
  );
}
