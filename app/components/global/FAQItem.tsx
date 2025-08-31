'use client';

type FAQItemProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
};

function FAQItem({ question, answer, isOpen, onClick }: FAQItemProps) {
  return (
    <div className="faq-item bg-[#F5F5F5] border border-[#E7E8E9] w-full rounded-lg overflow-hidden hover:shadow-md transition-all duration-300">
      {/* Header */}
      <div className="faq-header p-6 cursor-pointer" onClick={onClick}>
        <div className="flex items-center justify-between">
          <div className="w-8 h-8 bg-[#F0AC49] rounded-lg flex items-center justify-center me-4">
            <svg
              className="plus-icon"
              width="33"
              height="32"
              viewBox="0 0 33 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="0.5" width="32" height="32" rx="6.4" fill="#F0AC49" />
              {isOpen ? (
                // X icon
                <>
                  <rect
                    x="10.1367"
                    y="11.0503"
                    width="2"
                    height="16"
                    rx="1"
                    transform="rotate(-45 10.1367 11.0503)"
                    fill="white"
                  />
                  <rect
                    x="21.4492"
                    y="9.63623"
                    width="2"
                    height="16"
                    rx="1"
                    transform="rotate(45 21.4492 9.63623)"
                    fill="white"
                  />
                </>
              ) : (
                // Plus icon
                <>
                  <rect
                    x="8.5"
                    y="17"
                    width="2"
                    height="16"
                    rx="1"
                    transform="rotate(-90 8.5 17)"
                    fill="white"
                  />
                  <rect
                    x="24.5"
                    y="15"
                    width="2"
                    height="16"
                    rx="1"
                    transform="rotate(90 24.5 15)"
                    fill="white"
                  />
                </>
              )}
            </svg>
          </div>
          <h3 className="text-[14px] md:text-[20px] font-medium text-[#2A313D] flex-1">
            {question}
          </h3>
        </div>
      </div>

      {/* Content */}
      {isOpen && (
        <div className="faq-content expanded px-6 pb-6">
          <div className="w-full h-px bg-[#DADADA] mt-0 mb-[24px]"></div>
          <div dangerouslySetInnerHTML={{__html: answer}} className="text-gray-800 text-[14px] md:text-[16px] leading-relaxed font-medium ">
            {/* {answer} */}
          </div>
        </div>
      )}
    </div>
  );
}

export default FAQItem;