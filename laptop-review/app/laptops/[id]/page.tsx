// File: app/laptops/[id]/page.tsx

import React from 'react';
import { Laptop, SimilarLaptop, Deal } from '@/types/laptop'; // <-- KIỂM TRA ĐƯỜNG DẪN
import { notFound } from 'next/navigation';
import LaptopDetailPageUI from '@/components/laptop-detail/LaptopDetailPageUI'; // <-- KIỂM TRA ĐƯỜNG DẪN

 // MOCK DATA ĐẦY ĐỦ HƠN 

const MOCK_LAPTOP_DATA: Laptop = {
  id: "lenovo-ideapad-5-pro-16",
  name: "Lenovo IdeaPad 5 Pro 16",
  image: "/placeholder.svg?height=600&width=600",
  price: "$899.99",
  originalPrice: "$1,099.99",
  description: "A versatile and powerful laptop offering great value. Suitable for various tasks including productivity, creative work, and light gaming.",
  longDescription: "The Lenovo IdeaPad 5 Pro 16 stands out in the mid-range market with its high-resolution 16-inch display, capable AMD Ryzen processor, and dedicated NVIDIA graphics. It strikes an excellent balance between performance, portability, and price, making it a compelling option for students, professionals, and casual users alike. While not a master of any single task, its all-around competence is its greatest strength.",
  reviewUrl: "https://www.youtube.com/watch?v=your_review_video_id",

  specs: {
    cpu: "AMD Ryzen 7 5800H (8 Cores, 16 Threads)",
    gpu: "NVIDIA GeForce RTX 3050 4GB GDDR6 (TGP 55W)",
    ram: "16GB DDR4 3200MHz (Soldered)",
    storage: "512GB PCIe NVMe Gen3 SSD",
    display: '16.0" 2.5K (2560x1600) IPS Anti-Glare',
    battery: "75Wh Li-Polymer",
    operatingSystem: "Windows 11 Home",
    brightness: "350 nits",
    colorGamut: "100% sRGB",
    charging: "100W USB-C PD 3.0",
    webcamResolution: "1080p FHD + IR with Privacy Shutter",
    panelType: "IPS",
    refreshRate: "120Hz",
  },

  benchmarks: {
    gaming: 7.5,
    productivity: 8.2,
    content: 7.8,
    battery: 8.7, 
    display: 8.0, 
    build: 8.2,   
    value: 9.2,
    overall: 8.3,
    performanceScore: 8.5, 
    trackpadScore: 7.8,
    speakersScore: 7.5,
    webcamScore: 7.0,
    portsScore: 8.3,

    // Điểm benchmark chi tiết
    cinebenchR23Multi: 12456,
    cinebenchR23Single: 1532,
    geekbenchV6Single: 2345,
    geekbenchV6Multi: 11876,
    timeSpy: 5876, // Giả sử là điểm Graphics
    wildlifeExtreme: 5678,
    geekbenchCompute: 21345, // OpenCL/Vulkan score
    pcMark10: "6,234",

    // Plugged vs Unplugged
    pluggedGeekbenchSingle: 2345,
    pluggedGeekbenchMulti: 11876,
    unpluggedGeekbenchSingle: 2123,
    unpluggedGeekbenchMulti: 9654,

    // Battery Life
    batteryLifeCasual: "12.5 hours",
    batteryLifeVideo: "10.2 hours",
    batteryLifeHeavy: "3.8 hours",
  },

  pros: ["Excellent 16:10 120Hz display", "Strong CPU performance", "Good build quality", "Comfortable keyboard", "Great value"],
  cons: ["Soldered RAM", "Average color accuracy for professionals", "Noticeable fan noise under load", "No Thunderbolt"],

  dimensions: "356 x 251 x 17.5-18.4 mm (14.0\" x 9.9\" x 0.69-0.72\")",
  weight: "1.9 kg (4.19 lbs)",
  portsLeft: ["1x USB-C 3.2 Gen 2 (DP 1.4, PD 3.0)", "1x USB-A 3.2 Gen 1", "HDMI 2.0", "SD Card Reader"],
  portsRight: ["1x USB-A 3.2 Gen 1", "1x USB-C 3.2 Gen 2 (PD 3.0, Data)", "3.5mm Combo Audio Jack"],

  performanceAnalysis: "The Ryzen 7 5800H handles multitasking and demanding tasks well. The RTX 3050 allows for enjoyable 1080p gaming and boosts creative apps. Performance on battery sees a noticeable drop in multi-core tasks (~19%) but remains adequate for lighter workloads.",
  batteryAnalysis: "The 75Wh battery provides excellent longevity for typical use, often lasting a full workday. Video playback endurance is also strong. Heavy gaming or rendering will require the charger within a few hours. Fast charging support is a plus.",
  designAnalysis: "The aluminum chassis gives a premium feel and solid build. It's reasonably portable for a 16-inch device. The minimalist Storm Grey finish resists fingerprints well.",
  displayAnalysis: "The high-resolution 16:10 display with a 120Hz refresh rate is a standout feature, offering sharp text and smooth motion. Brightness is sufficient for indoors, and sRGB coverage is excellent for general use, though professionals might need wider gamuts.",
  keyboardAnalysis: "Features a comfortable keyboard with good travel and tactile feedback, plus a numpad. Backlighting is functional with two levels.",
  trackpadAnalysis: "Large and responsive Microsoft Precision trackpad supports gestures well. Clicking is satisfactory. Slightly off-center placement due to numpad.",
  speakersAnalysis: "Downward-firing speakers with Dolby Atmos provide clear audio, suitable for calls and casual media consumption. Bass is lacking.",
  webcamAnalysis: "The 1080p webcam offers better detail than 720p cameras in good light. Includes a privacy shutter and IR for Windows Hello.",
  portsAnalysis: "A comprehensive port selection covers most needs, including versatile USB-C ports and an SD reader. Well-distributed on both sides.",

  deals: [
    { retailer: "Amazon", price: "$899.99", url: "#", logoUrl: "/logos/amazon.png"},
    { retailer: "Best Buy", price: "$949.99", url: "#", logoUrl: "/logos/bestbuy.png"},
    { retailer: "Lenovo", price: "$919.00", url: "#", logoUrl: "/logos/lenovo.png"},
  ]
};

const MOCK_SIMILAR_LAPTOPS: SimilarLaptop[] = [
   { id: "lenovo-ideapad-5-pro-16", name: "Lenovo IdeaPad 5 Pro 16", image: "/placeholder.svg?height=100&width=100", price: "$899.99", cpu: "Ryzen 7 5800H", gpu: "RTX 3050 4GB", ram: "16GB", storage: "512GB SSD", display: '16" 2.5K 120Hz', battery: "75Wh", score: 8.3 },
   { id: "hp-envy-16", name: "HP Envy 16", image: "/placeholder.svg?height=100&width=100", price: "$1,099.99", cpu: "Intel i7-12700H", gpu: "RTX 3060 6GB", ram: "16GB", storage: "1TB SSD", display: '16" 4K OLED', battery: "83Wh", score: 8.7 },
   // Thêm các laptop tương tự khác nếu cần
];

// ham gia lap lay du lieu
async function fetchMockLaptopData(id: string): Promise<Laptop | null> {
    console.log("(Mock) Fetching data for ID:", id);
    if (id === MOCK_LAPTOP_DATA.id) {
        return JSON.parse(JSON.stringify(MOCK_LAPTOP_DATA));
    }
    return null;
}
async function fetchMockSimilarLaptops(currentLaptopId: string): Promise<SimilarLaptop[]> {
     console.log("(Mock) Fetching similar laptops...");
     return JSON.parse(JSON.stringify(MOCK_SIMILAR_LAPTOPS));
 }

//end MOCK DATA & HÀM FETCH fake =


// --- Component Page ---
export default async function Page({ params }: { params: { id: string } }) {
  const laptopId = params.id;
  const laptopData = await fetchMockLaptopData(laptopId);
  let similarLaptopsData: SimilarLaptop[] = [];

  if (!laptopData) {
    notFound();
  } else {
    similarLaptopsData = await fetchMockSimilarLaptops(laptopId);
  }

  return (
    <LaptopDetailPageUI
      laptop={laptopData} 
      similarLaptops={similarLaptopsData}
    />
  );
}