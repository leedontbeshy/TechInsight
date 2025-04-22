"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Cpu,
  CpuIcon as Gpu,
  MemoryStickIcon as Memory,
  HardDrive,
  Monitor,
  Battery,
  Youtube,
  ChevronDown,
  Check,
  X,
} from "lucide-react"
import Header from "@/components/laptop-detail/header"
import SpecItem from "@/components/laptop-detail/spec-item"
import TabPanel from "@/components/laptop-detail/tab-panel"
import RatingBar from "@/components/laptop-detail/rating-bar"
import ComparisonTable from "@/components/laptop-detail/comparison-table"

// Mock data 
const laptopData = {
  id: "lenovo-ideapad-5-pro-16",
  name: "Lenovo IdeaPad 5 Pro 16",
  image: "/placeholder.svg?height=600&width=600",
  price: "$899.99",
  originalPrice: "$1,099.99",
  description:
    "This is a very good all-round laptop for those who want to do a variety of different tasks on their laptop. You can game on it, code on it, video edit on it etc. It's very flexible. Good at everything, but master of none. This is unusual at this price point. Most laptops out there have material cons if they are trying to deliver as much as the IdeaPad 5 Pro.",
  longDescription:
    "The Lenovo IdeaPad 5 Pro 16 is a versatile laptop designed for users who need a reliable machine for various tasks. With its powerful processor and dedicated graphics, it can handle everything from everyday productivity to creative work and even some gaming. The 16-inch display offers plenty of screen real estate for multitasking, while the lightweight design makes it portable despite the larger screen size. At this price point, it offers exceptional value compared to competitors with similar specifications.",
  specs: {
    cpu: "AMD Ryzen 7 5800H",
    gpu: "NVIDIA GeForce RTX 3050 4GB",
    ram: "16GB DDR4 3200MHz",
    storage: "512GB NVMe SSD",
    display: '16" 2.5K (2560 x 1600) IPS, 120Hz',
    battery: "75Wh, Up to 12 hours",
  },
  benchmarks: {
    gaming: 7.5,
    productivity: 8.2,
    content: 7.8,
    battery: 8.5,
    display: 8.0,
    build: 7.9,
    value: 9.2,
    overall: 8.3,
  },
  pros: [
    "Lightweight and compact for a powerful 16inch laptop",
    "Excellent value at it's price point",
    "Can do a wide variety of performance tasks well",
    "CPU and GPU are fed ample power and outperform other laptops with these parts",
  ],
  cons: [
    "Display's color gamut is not wide enough for some professional work",
    "Fan noise can get loud under heavy load",
    "No Thunderbolt support",
    "RAM is soldered and not upgradeable",
  ],
}

// Mock data for similar laptops
const similarLaptops = [
  {
    id: "lenovo-ideapad-5-pro-16",
    name: "Lenovo IdeaPad 5 Pro 16",
    image: "/placeholder.svg?height=100&width=100",
    price: "$899.99",
    cpu: "Ryzen 7 5800H",
    gpu: "RTX 3050 4GB",
    ram: "16GB",
    storage: "512GB SSD",
    display: '16" 2.5K 120Hz',
    battery: "75Wh",
    score: 8.3,
  },
  {
    id: "hp-envy-16",
    name: "HP Envy 16",
    image: "/placeholder.svg?height=100&width=100",
    price: "$1,099.99",
    cpu: "Intel i7-12700H",
    gpu: "RTX 3060 6GB",
    ram: "16GB",
    storage: "1TB SSD",
    display: '16" 4K OLED',
    battery: "83Wh",
    score: 8.7,
  },
  {
    id: "dell-inspiron-16",
    name: "Dell Inspiron 16 Plus",
    image: "/placeholder.svg?height=100&width=100",
    price: "$949.99",
    cpu: "Intel i7-11800H",
    gpu: "RTX 3050 Ti 4GB",
    ram: "16GB",
    storage: "512GB SSD",
    display: '16" 3K',
    battery: "86Wh",
    score: 8.1,
  },
  {
    id: "asus-vivobook-pro-16",
    name: "ASUS VivoBook Pro 16X",
    image: "/placeholder.svg?height=100&width=100",
    price: "$1,299.99",
    cpu: "Ryzen 9 5900HX",
    gpu: "RTX 3050 Ti 4GB",
    ram: "32GB",
    storage: "1TB SSD",
    display: '16" 4K OLED',
    battery: "96Wh",
    score: 8.9,
  },
]

export default function LaptopDetailPage() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Product Header */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Product Image */}
          <div className="bg-white rounded-lg p-6 flex items-center justify-center">
            <div className="relative w-full h-[400px]">
              <Image
                src={laptopData.image || "/placeholder.svg"}
                alt={laptopData.name}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{laptopData.name}</h1>

            <button className="flex items-center text-red-600 mb-6">
              <Youtube className="w-5 h-5 mr-2" />
              Watch Review
            </button>

            <div className="mb-6">
              <p className="text-gray-700 leading-relaxed">{laptopData.description}</p>

              <div className="mt-4">
                {!isExpanded ? (
                  <button onClick={() => setIsExpanded(true)} className="flex items-center text-blue-600 font-medium">
                    Read More <ChevronDown className="w-4 h-4 ml-1" />
                  </button>
                ) : (
                  <p className="text-gray-700 leading-relaxed mt-4">{laptopData.longDescription}</p>
                )}
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline mb-2">
                <span className="text-3xl font-bold text-gray-900">{laptopData.price}</span>
                {laptopData.originalPrice && (
                  <span className="ml-2 text-sm text-gray-500 line-through">{laptopData.originalPrice}</span>
                )}
              </div>
            </div>

            {/* Specifications */}
            <div className="grid grid-cols-2 gap-4">
              <SpecItem icon={<Cpu className="w-5 h-5" />} label="Processor" value={laptopData.specs.cpu} />
              <SpecItem icon={<Gpu className="w-5 h-5" />} label="Graphics" value={laptopData.specs.gpu} />
              <SpecItem icon={<Memory className="w-5 h-5" />} label="Memory" value={laptopData.specs.ram} />
              <SpecItem icon={<HardDrive className="w-5 h-5" />} label="Storage" value={laptopData.specs.storage} />
              <SpecItem icon={<Monitor className="w-5 h-5" />} label="Display" value={laptopData.specs.display} />
              <SpecItem icon={<Battery className="w-5 h-5" />} label="Battery" value={laptopData.specs.battery} />
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <TabPanel>
            <TabPanel.Tab label="Specifications">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">System</h3>
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 text-gray-500">Processor</td>
                        <td className="py-3 font-medium">{laptopData.specs.cpu}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 text-gray-500">Graphics</td>
                        <td className="py-3 font-medium">{laptopData.specs.gpu}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 text-gray-500">Memory</td>
                        <td className="py-3 font-medium">{laptopData.specs.ram}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 text-gray-500">Storage</td>
                        <td className="py-3 font-medium">{laptopData.specs.storage}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 text-gray-500">Operating System</td>
                        <td className="py-3 font-medium">Windows 11 Home</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Display & Battery</h3>
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 text-gray-500">Display</td>
                        <td className="py-3 font-medium">{laptopData.specs.display}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 text-gray-500">Brightness</td>
                        <td className="py-3 font-medium">350 nits</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 text-gray-500">Color Gamut</td>
                        <td className="py-3 font-medium">100% sRGB, 75% AdobeRGB</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 text-gray-500">Battery</td>
                        <td className="py-3 font-medium">{laptopData.specs.battery}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 text-gray-500">Charging</td>
                        <td className="py-3 font-medium">100W USB-C PD</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </TabPanel.Tab>

            <TabPanel.Tab label="Benchmarks">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Performance Ratings</h3>
                  <RatingBar score={laptopData.benchmarks.gaming} label="Gaming Performance" />
                  <RatingBar score={laptopData.benchmarks.productivity} label="Productivity" />
                  <RatingBar score={laptopData.benchmarks.content} label="Content Creation" />
                  <RatingBar score={laptopData.benchmarks.overall} label="Overall Performance" />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Hardware Ratings</h3>
                  <RatingBar score={laptopData.benchmarks.display} label="Display Quality" />
                  <RatingBar score={laptopData.benchmarks.battery} label="Battery Life" />
                  <RatingBar score={laptopData.benchmarks.build} label="Build Quality" />
                  <RatingBar score={laptopData.benchmarks.value} label="Value for Money" />
                </div>

                <div className="md:col-span-2 mt-6">
                  <h3 className="text-lg font-semibold mb-4">Benchmark Results</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Cinebench R23 (Multi)</p>
                      <p className="text-xl font-bold">11,542</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">3DMark Time Spy</p>
                      <p className="text-xl font-bold">5,876</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">PCMark 10</p>
                      <p className="text-xl font-bold">6,234</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Geekbench 5</p>
                      <p className="text-xl font-bold">1,456 / 7,893</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel.Tab>

            <TabPanel.Tab label="Comparisons">
              <ComparisonTable laptops={similarLaptops} currentLaptopId={laptopData.id} />
            </TabPanel.Tab>
          </TabPanel>
        </div>

        {/* Pros and Cons */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-green-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-800 mb-4">Pros</h3>
            <ul className="space-y-3">
              {laptopData.pros.map((pro, index) => (
                <li key={index} className="flex items-start">
                  <Check className="text-green-500 w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-red-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-red-800 mb-4">Cons</h3>
            <ul className="space-y-3">
              {laptopData.cons.map((con, index) => (
                <li key={index} className="flex items-start">
                  <X className="text-red-500 w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Detailed Analysis Sections */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Detailed Analysis</h2>

          {/* Performance Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">1. Performance</h3>
              <div className="bg-blue-600 text-white px-3 py-1 rounded-full font-bold">8.5/10</div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-6">
              <div>
                <h4 className="font-semibold mb-4">CPU Benchmarks</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Geekbench v6 (Single-Core)</span>
                      <span className="text-sm font-medium">2,345</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="h-2.5 rounded-full bg-blue-600" style={{ width: "78%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Geekbench v6 (Multi-Core)</span>
                      <span className="text-sm font-medium">11,876</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="h-2.5 rounded-full bg-blue-600" style={{ width: "82%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Cinebench R23 (Single-Core)</span>
                      <span className="text-sm font-medium">1,532</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="h-2.5 rounded-full bg-blue-600" style={{ width: "76%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Cinebench R23 (Multi-Core)</span>
                      <span className="text-sm font-medium">12,456</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="h-2.5 rounded-full bg-blue-600" style={{ width: "85%" }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-4">GPU Benchmarks</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">3D Mark - Wildlife Extreme</span>
                      <span className="text-sm font-medium">5,678</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="h-2.5 rounded-full bg-blue-600" style={{ width: "72%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Geekbench v6 Compute</span>
                      <span className="text-sm font-medium">21,345</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="h-2.5 rounded-full bg-blue-600" style={{ width: "68%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <h4 className="font-semibold mb-4">Performance Comparison: Plugged vs. Unplugged</h4>
            <div className="grid md:grid-cols-2 gap-8 mb-4">
              <div>
                <h5 className="text-sm font-medium mb-2">Plugged In (AC Power)</h5>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Geekbench v6 (Single-Core)</span>
                      <span className="text-sm">2,345</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="h-2.5 rounded-full bg-green-500" style={{ width: "100%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Geekbench v6 (Multi-Core)</span>
                      <span className="text-sm">11,876</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="h-2.5 rounded-full bg-green-500" style={{ width: "100%" }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h5 className="text-sm font-medium mb-2">Unplugged (Battery Power)</h5>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Geekbench v6 (Single-Core)</span>
                      <span className="text-sm">2,123</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="h-2.5 rounded-full bg-yellow-500" style={{ width: "90%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Geekbench v6 (Multi-Core)</span>
                      <span className="text-sm">9,654</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="h-2.5 rounded-full bg-yellow-500" style={{ width: "81%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-gray-700 mt-4">
              The Lenovo IdeaPad 5 Pro 16 delivers impressive performance for its price range. The AMD Ryzen 7 5800H
              processor handles multitasking with ease, and the RTX 3050 GPU provides decent gaming performance for a
              mainstream laptop. There is some performance throttling when running on battery power, with multi-core
              performance dropping by about 19%, which is typical for laptops in this category.
            </p>
          </div>

          {/* Battery Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">2. Battery</h3>
              <div className="bg-blue-600 text-white px-3 py-1 rounded-full font-bold">8.7/10</div>
            </div>

            <div className="mb-4">
              <p className="mb-2">
                <span className="font-medium">Battery Capacity:</span> 75Wh
              </p>
            </div>

            <h4 className="font-semibold mb-4">Battery Life</h4>
            <div className="space-y-6 mb-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Casual Use</span>
                  <span className="font-medium">12.5 hours</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="h-4 rounded-full bg-green-500 flex items-center justify-end px-2"
                    style={{ width: "83%" }}
                  >
                    <span className="text-xs text-white font-medium">12.5h</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Watching Online Video</span>
                  <span className="font-medium">10.2 hours</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="h-4 rounded-full bg-blue-500 flex items-center justify-end px-2"
                    style={{ width: "68%" }}
                  >
                    <span className="text-xs text-white font-medium">10.2h</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Extreme Use (Gaming/Rendering)</span>
                  <span className="font-medium">3.8 hours</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="h-4 rounded-full bg-yellow-500 flex items-center justify-end px-2"
                    style={{ width: "25%" }}
                  >
                    <span className="text-xs text-white font-medium">3.8h</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-gray-700">
              The 75Wh battery in the IdeaPad 5 Pro 16 provides excellent battery life for a laptop with these
              specifications. It easily lasts through a full workday with casual use, and even video streaming won't
              drain it too quickly. As expected, demanding tasks like gaming or video rendering will significantly
              reduce battery life, but that's common for all laptops with dedicated GPUs. The laptop also supports fast
              charging, reaching about 60% in 30 minutes.
            </p>
          </div>

          {/* Design and Weight */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">3. Design and Weight</h3>
              <div className="bg-blue-600 text-white px-3 py-1 rounded-full font-bold">8.2/10</div>
            </div>

            <p className="text-gray-700 mb-2">
              <span className="font-medium">Dimensions:</span> 356 x 251 x 17.5-18.4 mm (14.0" x 9.9" x 0.69-0.72")
            </p>
            <p className="text-gray-700 mb-4">
              <span className="font-medium">Weight:</span> 1.9 kg (4.19 lbs)
            </p>

            <p className="text-gray-700">
              The IdeaPad 5 Pro 16 features a sleek, minimalist design with an aluminum chassis that gives it a premium
              feel. At 1.9 kg, it's relatively lightweight for a 16-inch laptop, especially one with dedicated graphics.
              The build quality is solid with minimal flex in the keyboard deck and display. The Storm Grey color looks
              professional and does a good job hiding fingerprints. While not the thinnest laptop in its class, the
              overall design strikes a good balance between portability and performance.
            </p>
          </div>

          {/* Display */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">4. Display</h3>
              <div className="bg-blue-600 text-white px-3 py-1 rounded-full font-bold">8.0/10</div>
            </div>

            <p className="text-gray-700 mb-2">
              <span className="font-medium">Size:</span> 16.0 inches
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-medium">Resolution:</span> 2560 x 1600 (16:10 aspect ratio)
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-medium">Panel Type:</span> IPS
            </p>
            <p className="text-gray-700 mb-4">
              <span className="font-medium">Refresh Rate:</span> 120 Hz
            </p>

            <p className="text-gray-700">
              The 16-inch 2.5K display is one of the highlights of this laptop. The 16:10 aspect ratio provides more
              vertical space for productivity tasks, and the 120Hz refresh rate makes scrolling and gaming smoother.
              Color accuracy is good for casual use with 100% sRGB coverage, though it falls short for professional
              color work with only about 75% Adobe RGB coverage. The display gets reasonably bright at 350 nits, which
              is adequate for indoor use but may struggle in very bright environments. Overall, it's an excellent
              display for the price point, with the higher resolution being a standout feature compared to competitors.
            </p>
          </div>

          {/* Keyboard */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">5. Keyboard</h3>
              <div className="bg-blue-600 text-white px-3 py-1 rounded-full font-bold">8.5/10</div>
            </div>

            <p className="text-gray-700">
              The keyboard on the IdeaPad 5 Pro 16 offers a comfortable typing experience with good key travel (1.5mm)
              and tactile feedback. The keys are well-spaced and have a slightly concave shape that guides your fingers.
              The white backlighting has two brightness levels and is evenly distributed. The layout is standard with a
              full-size number pad, which is a nice addition for those who work with numbers frequently. The function
              row includes useful shortcuts for volume, brightness, and media controls. While not quite at the level of
              ThinkPad keyboards, it's definitely above average for a consumer laptop and suitable for long typing
              sessions.
            </p>
          </div>

          {/* Trackpad */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">6. Trackpad</h3>
              <div className="bg-blue-600 text-white px-3 py-1 rounded-full font-bold">7.8/10</div>
            </div>

            <p className="text-gray-700">
              The trackpad is generously sized at 120 x 75 mm, providing plenty of space for multi-finger gestures. It
              uses Microsoft Precision drivers, ensuring accurate tracking and good gesture recognition. The surface is
              smooth with a matte finish that allows for easy gliding. The integrated buttons have a satisfying click
              that's not too loud. While it's not as premium as glass trackpads found on more expensive laptops, it's
              responsive and reliable for everyday use. The only minor drawback is that it's slightly off-center due to
              the number pad, which might take some getting used to for new users.
            </p>
          </div>

          {/* Speakers */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">7. Speakers</h3>
              <div className="bg-blue-600 text-white px-3 py-1 rounded-full font-bold">7.5/10</div>
            </div>

            <p className="text-gray-700">
              The IdeaPad 5 Pro 16 features a dual-speaker system with Dolby Atmos support. The speakers are
              downward-firing but produce surprisingly clear audio with decent volume levels. The mids and highs are
              well-represented, making them good for dialogue in movies and vocals in music. As with most laptop
              speakers, bass response is limited, so don't expect deep, thumping lows. The Dolby Atmos software allows
              for some customization with presets for music, movies, and games. For casual listening and video calls,
              these speakers are more than adequate, though audiophiles will still want to connect external speakers or
              headphones for a better experience.
            </p>
          </div>

          {/* Webcam */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">8. Webcam</h3>
              <div className="bg-blue-600 text-white px-3 py-1 rounded-full font-bold">7.0/10</div>
            </div>

            <p className="text-gray-700">
              The laptop comes with a 1080p (Full HD) webcam, which is a step up from the 720p cameras still common in
              many laptops. Image quality is decent in good lighting conditions with accurate colors and reasonable
              detail. Low-light performance is average, with some noise becoming apparent. The webcam includes a
              physical privacy shutter, which is a welcome security feature. There's also an IR camera that supports
              Windows Hello facial recognition for convenient, password-free logins. For video conferencing and casual
              calls, this webcam performs well enough, though it won't replace a dedicated external webcam for content
              creators or frequent streamers.
            </p>
          </div>

          {/* Ports */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">9. Ports</h3>
              <div className="bg-blue-600 text-white px-3 py-1 rounded-full font-bold">8.3/10</div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="font-medium mb-2">Left Side:</p>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>1x USB-C 3.2 Gen 1 (DisplayPort 1.4)</li>
                  <li>1x USB-A 3.2 Gen 1</li>
                  <li>HDMI 2.0</li>
                  <li>SD Card Reader</li>
                </ul>
              </div>
              <div>
                <p className="font-medium mb-2">Right Side:</p>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>1x USB-A 3.2 Gen 1</li>
                  <li>1x USB-C 3.2 Gen 1 (Power Delivery)</li>
                  <li>3.5mm Combo Audio Jack</li>
                </ul>
              </div>
            </div>

            <p className="text-gray-700">
              The port selection on the IdeaPad 5 Pro 16 is comprehensive and well-thought-out. Having two USB-C ports
              is convenient, especially since one supports power delivery for charging. The inclusion of an SD card
              reader is particularly useful for photographers and content creators. The HDMI 2.0 port allows for
              connecting to external displays at up to 4K resolution. While Thunderbolt is missing (as expected on an
              AMD-based laptop), the overall port selection provides good versatility for most users without requiring
              dongles for common peripherals. The ports are also well-distributed on both sides of the laptop for easier
              cable management.
            </p>
          </div>
        </div>

        {/* Best Prices & Deals */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Best Prices & Deals</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 hover:border-blue-500 transition-colors">
              <div className="flex justify-between items-center mb-4">
                <div className="w-16 h-8 bg-gray-100 rounded flex items-center justify-center">
                  <span className="font-bold text-gray-700">Amazon</span>
                </div>
                <span className="text-xl font-bold">$899.99</span>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
                View Deal
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 hover:border-blue-500 transition-colors">
              <div className="flex justify-between items-center mb-4">
                <div className="w-16 h-8 bg-gray-100 rounded flex items-center justify-center">
                  <span className="font-bold text-gray-700">Best Buy</span>
                </div>
                <span className="text-xl font-bold">$949.99</span>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
                View Deal
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 hover:border-blue-500 transition-colors">
              <div className="flex justify-between items-center mb-4">
                <div className="w-16 h-8 bg-gray-100 rounded flex items-center justify-center">
                  <span className="font-bold text-gray-700">Lenovo</span>
                </div>
                <span className="text-xl font-bold">$919.99</span>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
                View Deal
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">AllTech</h3>
              <p className="text-gray-400">
                Your trusted source for laptop reviews, comparisons, and the best deals online.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Categories</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Gaming Laptops
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Business Laptops
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Student Laptops
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Budget Laptops
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Newsletter</h4>
              <p className="text-gray-400 mb-2">Subscribe for the latest deals and reviews</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 text-gray-900 rounded-l focus:outline-none"
                />
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r">Subscribe</button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2023 AllTech. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
