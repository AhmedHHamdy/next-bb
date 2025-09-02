"use client";

import { Branch } from "@/app/utils/Types";
import { useEffect, useRef } from "react";

export default function MapComponent({ branchesData }: { branchesData?: Branch[] }) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Branch Data
    // const branchData: Record<
    //   string,
    //   {
    //     title: string;
    //     address: string;
    //     phone: string;
    //     email: string;
    //     lat: number;
    //     lng: number;
    //   }
    // > = {
    //   "riyadh-1": {
    //     title: "فرع الرياض",
    //     address: "7 ش حسين , الرياض , السعودية",
    //     phone: "(309) 8855-314",
    //     email: "info@domainname.com",
    //     lat: 24.7136,
    //     lng: 46.6753,
    //   },
    //   "jeddah-1": {
    //     title: "فرع جدة",
    //     address: "شارع التحلية، حي الشاطئ، جدة، السعودية",
    //     phone: "+966 12 345 6789",
    //     email: "jeddah@domainname.com",
    //     lat: 21.4858,
    //     lng: 39.1925,
    //   },
    //   "dammam-1": {
    //     title: "فرع الدمام",
    //     address: "شارع الملك خالد، حي الشاطئ، الدمام، السعودية",
    //     phone: "+966 13 234 5678",
    //     email: "dammam@domainname.com",
    //     lat: 26.4207,
    //     lng: 50.0888,
    //   },
    //   "makkah-1": {
    //     title: "فرع مكة",
    //     address: "شارع العزيزية، حي العزيزية، مكة المكرمة، السعودية",
    //     phone: "+966 12 123 4567",
    //     email: "makkah@domainname.com",
    //     lat: 21.4225,
    //     lng: 39.8262,
    //   },
    // };

    const branchData: Record<
      string,
      Branch
    > = branchesData ? branchesData.reduce((acc, branch) => {
      const key = `branch-${branch.id}`
      acc[key] = branch
      return acc
    }, {} as Record<string, Branch>) : {}

    let map: google.maps.Map;
    let activeMarker: google.maps.marker.AdvancedMarkerElement | null = null;

    async function initMap() {
      const { Map } = (await google.maps.importLibrary("maps")) as google.maps.MapsLibrary;
      const { AdvancedMarkerElement } = (await google.maps.importLibrary("marker")) as google.maps.MarkerLibrary;

      map = new Map(mapRef.current as HTMLElement, {
        zoom: 6,
        center: { lat: 24.7136, lng: 46.6753 },
        mapId: "4504f8b37365c3d0",
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
        ],
      });

      // Floating card elements
      const floatingCard = document.getElementById("floating-branch-card")!;
      const branchTitle = document.getElementById("branch-title")!;
      const branchContent = document.getElementById("branch-content")!;
      const closeButton = document.getElementById("close-branch-card")!;
      const mapLoading = document.getElementById("map-loading")!;

      let activeMarker: google.maps.marker.AdvancedMarkerElement | null = null;

      // Default marker icon
      function createMarkerIcon() {
        const div = document.createElement("div");
        div.innerHTML = `
          <svg class="relative z-10" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_3191_16566)">
                <path d="M18 36C27.9411 36 36 27.9411 36 18C36 8.05887 27.9411 0 18 0C8.05887 0 0 8.05887 0 18C0 27.9411 8.05887 36 18 36Z" fill="#EDA133"/>
                <path d="M18.0331 7.74414C14.5488 7.74928 11.6045 10.9057 11.6045 14.6381C11.6045 16.982 12.8105 19.1561 14.1438 20.8533C12.1471 21.1683 9.00098 21.9551 9.00098 23.7834C8.99969 25.8946 13.5254 26.9977 17.9984 26.9977C22.4714 26.9977 26.9984 25.8933 26.9984 23.7834C26.9984 21.9564 23.8523 21.1709 21.8633 20.8559C23.221 19.0816 24.4617 16.7583 24.4617 14.156C24.4617 12.4113 23.806 10.7939 22.6141 9.60328C21.4133 8.40371 19.7907 7.74414 18.0434 7.74414H18.0331ZM18.0331 9.03243H18.0434C19.4461 9.03243 20.7473 9.55957 21.7051 10.5149C22.654 11.4624 23.176 12.7546 23.176 14.156C23.176 18.3526 19.2841 21.9449 18.0331 22.9889C16.7783 21.9551 12.8903 18.44 12.8903 14.6407C12.8903 11.6051 15.2444 9.03628 18.0331 9.03243ZM17.9277 11.5987C17.2468 11.6271 16.6049 11.9243 16.1427 12.4251C15.6805 12.9259 15.4356 13.5894 15.4617 14.2704C15.4904 14.9517 15.7881 15.5938 16.2893 16.056C16.7906 16.5182 17.4546 16.7629 18.136 16.7364C18.817 16.7083 19.4591 16.4113 19.9214 15.9104C20.3837 15.4096 20.6284 14.7458 20.602 14.0647C20.5712 13.3842 20.273 12.7433 19.7722 12.2815C19.2714 11.8197 18.6085 11.5743 17.9277 11.5987ZM17.9804 12.8819H18.0331C18.3741 12.875 18.7038 13.004 18.9498 13.2402C19.1957 13.4765 19.3377 13.8009 19.3445 14.1419C19.3514 14.4828 19.2225 14.8126 18.9862 15.0585C18.7499 15.3045 18.4255 15.4465 18.0845 15.4533C17.4211 15.4816 16.7757 14.9287 16.7474 14.2203C16.7342 13.8794 16.8567 13.5472 17.0881 13.2965C17.3195 13.0458 17.6408 12.8972 17.9817 12.8831L17.9804 12.8819ZM15.1351 22.0233C15.9071 22.8615 16.7488 23.6327 17.6513 24.3286L18.0331 24.614L18.4188 24.3286C18.523 24.2501 19.6454 23.4029 20.8938 22.0259C24.2418 22.4193 25.7153 23.3681 25.7153 23.786C25.7153 24.4661 22.7864 25.7146 18.001 25.7146C13.2155 25.7146 10.2867 24.4661 10.2867 23.786C10.2854 23.3669 11.7653 22.4154 15.1351 22.0233Z" fill="white"/>
            </g>
            <defs>
                <clipPath id="clip0_3191_16566">
                    <rect width="36" height="36" fill="white"/>
                </clipPath>
            </defs>
          </svg>
        `;
        return div;
      }

      // Mini card that replaces marker when active
      function buildMarkerCard(branch: (typeof branchData)[string]) {
        const div = document.createElement("div");
        div.className = "branch-marker";
        div.innerHTML = `
          <div class="branch-card bg-[#F5F5F5] border-2 border-[white] rounded shadow p-2 text-xs max-w-[160px]">
            <h4 class="font-bold mb-[12px] text-[20px]">${branch.name}</h4>
            <div class="space-y-1">
              <div class="flex items-center gap-1">
                <img src="/location-icon-svg.svg" class="w-[25px] h-[25px]"/>
                <span class="text-[15px] font-medium">${branch.location}</span>
              </div>
              <div class="flex items-center gap-1">
                <img src="/call-icon-svg.svg" class="w-[25px] h-[25px]"/>
                <span class="text-[15px] font-medium">${branch.phone}</span>
              </div>
              <div class="flex items-center gap-1">
                <img src="/call-icon-svg.svg" class="w-[25px] h-[25px]"/>
                <span class="text-[15px] font-medium">${branch.email}</span>
              </div>
            </div>
          </div>
        `;
        return div;
      }

      // Floating card content
      // function buildFloatingCard(branch: typeof branchData[string]) {
      //   return `
      //     <div class="space-y-2">
      //       <div class="flex items-center gap-2">
      //         <img src="/location-icon-svg.svg" class="w-4 h-4"/>
      //         <span>${branch.address}</span>
      //       </div>
      //       <div class="flex items-center gap-2">
      //         <img src="/call-icon-svg.svg" class="w-4 h-4"/>
      //         <span>${branch.phone}</span>
      //       </div>
      //       <div class="flex items-center gap-2">
      //         <img src="/email-icon-svg.svg" class="w-4 h-4"/>
      //         <span>${branch.email}</span>
      //       </div>
      //     </div>
      //   `;
      // }

      // Add markers
      Object.values(branchData).forEach((branch) => {
        const marker = new AdvancedMarkerElement({
          position: { lat: Number(branch.lat), lng: Number(branch.lng) },
          map,
          content: createMarkerIcon(),
          title: branch.name,
        });

        marker.addListener("click", () => {
          // Reset previous active marker
          if (activeMarker && activeMarker !== marker) {
            activeMarker.content = createMarkerIcon();
          }

          // Toggle current marker
          if (activeMarker === marker) {
            marker.content = createMarkerIcon();
            activeMarker = null;
            floatingCard.style.opacity = "0";
            floatingCard.style.pointerEvents = "none";
            floatingCard.style.transform = "translateY(2px)";
          } else {
            marker.content = buildMarkerCard(branch);
            activeMarker = marker;

            // branchTitle.textContent = branch.title;
            // branchContent.innerHTML = buildFloatingCard(branch);

            // floatingCard.style.opacity = '1';
            // floatingCard.style.pointerEvents = 'auto';
            // floatingCard.style.transform = 'translateY(0)';
          }
        });
      });

      // Close button
      // closeButton.addEventListener('click', () => {
      //   floatingCard.style.opacity = '0';
      //   floatingCard.style.pointerEvents = 'none';
      //   floatingCard.style.transform = 'translateY(2px)';
      //   if (activeMarker) {
      //     activeMarker.content = createMarkerIcon();
      //     activeMarker = null;
      //   }
      // });

      // Hide loading overlay
      map.addListener("tilesloaded", () => {
        mapLoading.style.opacity = "0";
        setTimeout(() => (mapLoading.style.display = "none"), 500);
      });
    }

    if (typeof google !== "undefined" && google.maps) {
      initMap();
    }
  }, []);

  return (
    <div className="relative mb-[24px] md:mb-[48px] rounded-[12px] px-[15px] lg:px-0">
      <div className="w-full h-[638px] rounded-[12px] md:h-[500px] overflow-hidden shadow-lg">
        {/* Google Maps Container */}
        <div ref={mapRef} id="saudi-map" className="w-full h-full"></div>

        {/* Floating Branch Card */}
        <div
          id="floating-branch-card"
          className="absolute top-4 right-4 bg-white rounded-[6px] p-1 shadow-lg border border-[#F3F3F1] max-w-[300px] opacity-0 pointer-events-none transition-all duration-300 transform translate-y-2 z-10"
        >
          <div className="bg-[#F5F5F5] rounded-[6px] h-full p-3">
            <div className="flex justify-between items-start mb-3">
              <h4 id="branch-title" className="font-bold text-lg text-black"></h4>
              <button id="close-branch-card" className="text-gray-400 hover:text-gray-600 transition-colors">
                ✕
              </button>
            </div>
            <div id="branch-content" className="space-y-[10px]"></div>
          </div>
        </div>

        {/* Map Loading Overlay */}
        <div
          id="map-loading"
          className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center pointer-events-none transition-opacity duration-500"
        >
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F0AC49] mx-auto mb-2"></div>
            <p className="text-sm text-gray-600">جاري تحميل الخريطة...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
