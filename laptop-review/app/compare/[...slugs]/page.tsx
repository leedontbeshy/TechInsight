"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, Check } from "lucide-react"
import { getLaptopById } from "@/mock_data/data"
import Header from "@/components/laptop-detail/header"
import RatingBar from "@/components/laptop-detail/rating-bar"


interface ComparisonWeights {
  performance: number
  gaming: number
  display: number
  battery: number
  connectivity: number
  portability: number
}

function compareSpecs(value1: any, value2: any, isHigherBetter = true): [boolean, boolean] {
  // Handle numeric values (with possible unit strings)
  if (typeof value1 === 'string' && typeof value2 === 'string') {
    // Extract numbers from strings (e.g. "1.9 kg" -> 1.9)
    const num1 = parseFloat(value1)
    const num2 = parseFloat(value2)
    if (!isNaN(num1) && !isNaN(num2)) {
      if (isHigherBetter) {
        return [num1 > num2, num1 < num2]
      } else {
        return [num1 < num2, num1 > num2]
      }
    }
  }

  // Handle boolean values
  if (typeof value1 === 'boolean' && typeof value2 === 'boolean') {
    return [value1 && !value2, !value1 && value2]
  }

  // Handle string comparison
  if (value1 === value2) return [false, false]
  return [value1 > value2, value1 < value2]
}

export default function ComparisonPage() {
  const params = useParams()
  const [laptops, setLaptops] = useState<any[]>([])
  const [weights, setWeights] = useState<ComparisonWeights>({
    performance: 1,
    gaming: 1,
    display: 1,
    battery: 1,
    connectivity: 1,
    portability: 1,
  })

  useEffect(() => {
    if (params.slugs) {
      // Lấy chuỗi cuối cùng từ mảng slugs và tách nó bằng '-vs-'
      const compareString = params.slugs[params.slugs.length - 1]
      const ids = compareString.split("-vs-")
      
      if (ids.length === 2) {
        const laptopData = ids.map((id) => getLaptopById(id)).filter(Boolean)
        if (laptopData.length === 2) {
          setLaptops(laptopData)
        }
      }
    }
  }, [params])

  if (laptops.length < 2) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Unable to Compare Laptops</h1>
            <p className="mb-4">Please make sure you're using the correct URL format:</p>
            <code className="block bg-gray-100 p-2 rounded mb-4">/compare/laptop-id-1-vs-laptop-id-2</code>
            <p className="mb-4">Available laptops for comparison:</p>
            <ul className="space-y-2 mb-4">
              <li>lenovo-ideapad-5-pro-16</li>
              <li>asus-rog-zephyrus-g14</li>
              <li>dell-xps-15</li>
              <li>hp-spectre-x360</li>
              <li>acer-nitro-5</li>
            </ul>
            <Link href="/" className="text-blue-600 hover:underline mt-4 inline-block">
              Return to home
            </Link>
          </div>
        </main>
      </div>
    )
  }

  // Replace the calculateWeightedScore function with this more detailed one:
  const calculateWeightedScore = (laptop: any) => {
    const { benchmarks } = laptop;
    
    // Calculate the sum of (rating × weight)
    const weightedSum = 
      benchmarks.productivity * weights.performance +
      benchmarks.gaming * weights.gaming +
      benchmarks.display * weights.display +
      benchmarks.battery * weights.battery +
      (benchmarks.build * weights.portability);
    
    // Calculate the sum of weights
    const totalWeight = 
      weights.performance +
      weights.gaming +
      weights.display +
      weights.battery +
      weights.connectivity +
      weights.portability;
    
    // Calculate the normalized score (out of 10)
    const normalizedScore = (weightedSum / (totalWeight * 10)) * 10;
    
    return normalizedScore.toFixed(2);
  };

  // Find key differences between laptops
  const getKeyDifferences = () => {
    const laptop1 = laptops[0]
    const laptop2 = laptops[1]

    const differences = {
      laptop1: [] as string[],
      laptop2: [] as string[],
    }

    // Weight difference
    const weight1 = Number.parseFloat(laptop1.detailedSpecs.case.weight.split(" ")[0])
    const weight2 = Number.parseFloat(laptop2.detailedSpecs.case.weight.split(" ")[0])
    if (weight1 < weight2) {
      differences.laptop1.push(`Lighter by ${(weight2 - weight1).toFixed(1)} kg`)
    } else if (weight2 < weight1) {
      differences.laptop2.push(`Lighter by ${(weight1 - weight2).toFixed(1)} kg`)
    }

    // Display refresh rate
    const refresh1 = Number.parseInt(laptop1.detailedSpecs.display.refreshRate)
    const refresh2 = Number.parseInt(laptop2.detailedSpecs.display.refreshRate)
    if (refresh1 > refresh2) {
      differences.laptop1.push(`Higher refresh rate (${refresh1}Hz vs ${refresh2}Hz)`)
    } else if (refresh2 > refresh1) {
      differences.laptop2.push(`Higher refresh rate (${refresh2}Hz vs ${refresh1}Hz)`)
    }

    // Battery capacity
    const battery1 = Number.parseInt(laptop1.detailedSpecs.battery.capacity)
    const battery2 = Number.parseInt(laptop2.detailedSpecs.battery.capacity)
    if (battery1 > battery2) {
      differences.laptop1.push(`Larger battery (${battery1}Wh vs ${battery2}Wh)`)
    } else if (battery2 < battery1) {
      differences.laptop2.push(`Larger battery (${battery2}Wh vs ${battery1}Wh)`)
    }

    // Storage
    const storage1 = Number.parseInt(laptop1.specs.storage.split("GB")[0])
    const storage2 = Number.parseInt(laptop2.specs.storage.split("GB")[0])
    if (storage1 > storage2) {
      differences.laptop1.push(`More storage (${storage1}GB vs ${storage2}GB)`)
    } else if (storage2 > storage1) {
      differences.laptop2.push(`More storage (${storage2}GB vs ${storage1}GB)`)
    }

    // GPU performance
    if (laptop1.benchmarks.gaming > laptop2.benchmarks.gaming) {
      const diff = Math.round((laptop1.benchmarks.gaming / laptop2.benchmarks.gaming - 1) * 100)
      differences.laptop1.push(`Better gaming performance (${diff}% faster)`)
    } else if (laptop2.benchmarks.gaming > laptop1.benchmarks.gaming) {
      const diff = Math.round((laptop2.benchmarks.gaming / laptop1.benchmarks.gaming - 1) * 100)
      differences.laptop2.push(`Better gaming performance (${diff}% faster)`)
    }

    // CPU performance
    if (laptop1.benchmarks.productivity > laptop2.benchmarks.productivity) {
      const diff = Math.round((laptop1.benchmarks.productivity / laptop2.benchmarks.productivity - 1) * 100)
      differences.laptop1.push(`Better productivity performance (${diff}% faster)`)
    } else if (laptop2.benchmarks.productivity > laptop1.benchmarks.productivity) {
      const diff = Math.round((laptop2.benchmarks.productivity / laptop1.benchmarks.productivity - 1) * 100)
      differences.laptop2.push(`Better productivity performance (${diff}% faster)`)
    }

    // Display quality
    if (laptop1.benchmarks.display > laptop2.benchmarks.display) {
      differences.laptop1.push("Better display quality")
    } else if (laptop2.benchmarks.display > laptop1.benchmarks.display) {
      differences.laptop2.push("Better display quality")
    }

    // USB-C ports
    const usbc1 = laptop1.detailedSpecs.connectivity.ports.usbc
    const usbc2 = laptop2.detailedSpecs.connectivity.ports.usbc
    if (usbc1 > usbc2) {
      differences.laptop1.push(`More USB-C ports (${usbc1} vs ${usbc2})`)
    } else if (usbc2 > usbc1) {
      differences.laptop2.push(`More USB-C ports (${usbc2} vs ${usbc1})`)
    }

    return differences
  }

  const keyDifferences = getKeyDifferences()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:underline">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Home
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-8 text-center">Laptop Comparison</h1>

        {/* Overview Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">Overview</h2>

          <div className="grid grid-cols-2 gap-8">
            {laptops.map((laptop, index) => (
              <div key={laptop.id} className="text-center">
                <div className="relative w-full h-[200px] mb-4">
                  <Image 
                    src={laptop.image} 
                    alt={laptop.name} 
                    fill 
                    className="object-contain"
                    priority
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">{laptop.name}</h3>
                <div className="text-2xl font-bold text-blue-600 mb-4">{laptop.price}</div>
                <Link
                  href={`/laptops/${laptop.id}`}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Adjust Importance section */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-bold mb-4">Adjust Importance</h3>
          <p className="text-gray-600 mb-6">
            Adjust the importance of each category based on your needs to find the best laptop for you.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="font-medium">Performance</label>
                  <span className="text-sm text-gray-500">Weight: {weights.performance}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="1"
                  value={weights.performance}
                  onChange={(e) => setWeights({ ...weights, performance: Number(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Not Important</span>
                  <span>Very Important</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="font-medium">Gaming</label>
                  <span className="text-sm text-gray-500">Weight: {weights.gaming}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="1"
                  value={weights.gaming}
                  onChange={(e) => setWeights({ ...weights, gaming: Number(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Not Important</span>
                  <span>Very Important</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="font-medium">Display</label>
                  <span className="text-sm text-gray-500">Weight: {weights.display}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="1"
                  value={weights.display}
                  onChange={(e) => setWeights({ ...weights, display: Number(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Not Important</span>
                  <span>Very Important</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="font-medium">Battery Life</label>
                  <span className="text-sm text-gray-500">Weight: {weights.battery}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="1"
                  value={weights.battery}
                  onChange={(e) => setWeights({ ...weights, battery: Number(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Not Important</span>
                  <span>Very Important</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="font-medium">Connectivity</label>
                  <span className="text-sm text-gray-500">Weight: {weights.connectivity}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="1"
                  value={weights.connectivity}
                  onChange={(e) => setWeights({ ...weights, connectivity: Number(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Not Important</span>
                  <span>Very Important</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="font-medium">Portability</label>
                  <span className="text-sm text-gray-500">Weight: {weights.portability}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="1"
                  value={weights.portability}
                  onChange={(e) => setWeights({ ...weights, portability: Number(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Not Important</span>
                  <span>Very Important</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <h4 className="font-medium text-blue-900 mb-2">Weighted Score Calculation</h4>
            <p className="text-sm text-blue-700">
              The weighted score helps you find the best laptop based on your priorities. Each category's score is multiplied by its importance weight, then normalized to a 10-point scale.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 mt-8">
            {laptops.map((laptop) => (
              <div key={laptop.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-blue-600">{calculateWeightedScore(laptop)}</div>
                  <p className="text-gray-600 mt-1">Overall Score</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">Performance</span>
                      <span>{laptop.benchmarks.productivity}/10</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-600 rounded-full" 
                        style={{ width: `${laptop.benchmarks.productivity * 10}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">Gaming</span>
                      <span>{laptop.benchmarks.gaming}/10</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-600 rounded-full" 
                        style={{ width: `${laptop.benchmarks.gaming * 10}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">Display</span>
                      <span>{laptop.benchmarks.display}/10</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-600 rounded-full" 
                        style={{ width: `${laptop.benchmarks.display * 10}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">Battery</span>
                      <span>{laptop.benchmarks.battery}/10</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-600 rounded-full" 
                        style={{ width: `${laptop.benchmarks.battery * 10}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">Build Quality</span>
                      <span>{laptop.benchmarks.build}/10</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-600 rounded-full" 
                        style={{ width: `${laptop.benchmarks.build * 10}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Differences */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">Key Differences</h2>

          <div className="grid grid-cols-2 gap-8">
            {laptops.map((laptop, index) => (
              <div key={laptop.id}>
                <h3 className="text-xl font-bold mb-4">{laptop.name} Advantages</h3>
                <ul className="space-y-2">
                  {(index === 0 ? keyDifferences.laptop1 : keyDifferences.laptop2).map((diff, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="text-green-500 w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{diff}</span>
                    </li>
                  ))}
                  {(index === 0 ? keyDifferences.laptop1 : keyDifferences.laptop2).length === 0 && (
                    <li className="text-gray-500">No significant advantages found</li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Value for Money */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">Value for Money</h2>

          <div className="grid grid-cols-2 gap-8">
            {laptops.map((laptop, index) => (
              <div key={laptop.id} className="text-center">
                <div className="text-2xl font-bold mb-2">{laptop.price}</div>
                <div className="text-lg mb-4">
                  <span className="font-medium">
                    ${(Number.parseInt(laptop.price.replace("$", "").replace(",", "")) / 10).toFixed(2)}
                  </span>{" "}
                  per point
                </div>
                <RatingBar score={laptop.benchmarks.value} label="Value Rating" />
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Comparison */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">Detailed Comparison</h2>

          {/* Case */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Case</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Feature
                    </th>
                    {laptops.map((laptop) => (
                      <th
                        key={laptop.id}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {laptop.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Weight</td>
                    {laptops.map((laptop, idx) => {
                      const [isWorse, isBetter] = compareSpecs(
                        laptop.detailedSpecs.case.weight,
                        laptops[1 - idx].detailedSpecs.case.weight,
                        false
                      )
                      return (
                        <td
                          key={laptop.id}
                          className={`px-6 py-4 whitespace-nowrap text-sm ${
                            isBetter ? 'text-green-600 font-medium' : isWorse ? 'text-gray-500' : 'text-gray-500'
                          }`}
                        >
                          {laptop.detailedSpecs.case.weight}
                        </td>
                      )
                    })}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Screen-to-Body Ratio</td>
                    {laptops.map((laptop, idx) => {
                      const [isWorse, isBetter] = compareSpecs(
                        laptop.detailedSpecs.case.screenToBodyRatio,
                        laptops[1 - idx].detailedSpecs.case.screenToBodyRatio
                      )
                      return (
                        <td
                          key={laptop.id}
                          className={`px-6 py-4 whitespace-nowrap text-sm ${
                            isBetter ? 'text-green-600 font-medium' : isWorse ? 'text-gray-500' : 'text-gray-500'
                          }`}
                        >
                          {laptop.detailedSpecs.case.screenToBodyRatio}
                        </td>
                      )
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Display */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Display</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Feature
                    </th>
                    {laptops.map((laptop) => (
                      <th
                        key={laptop.id}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {laptop.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Resolution</td>
                    {laptops.map((laptop, idx) => {
                      const [isWorse, isBetter] = compareSpecs(
                        laptop.detailedSpecs.display.resolution,
                        laptops[1 - idx].detailedSpecs.display.resolution
                      )
                      return (
                        <td
                          key={laptop.id}
                          className={`px-6 py-4 whitespace-nowrap text-sm ${
                            isBetter ? 'text-green-600 font-medium' : isWorse ? 'text-gray-500' : 'text-gray-500'
                          }`}
                        >
                          {laptop.detailedSpecs.display.resolution}
                        </td>
                      )
                    })}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Refresh Rate</td>
                    {laptops.map((laptop, idx) => {
                      const [isWorse, isBetter] = compareSpecs(
                        laptop.detailedSpecs.display.refreshRate,
                        laptops[1 - idx].detailedSpecs.display.refreshRate
                      )
                      return (
                        <td
                          key={laptop.id}
                          className={`px-6 py-4 whitespace-nowrap text-sm ${
                            isBetter ? 'text-green-600 font-medium' : isWorse ? 'text-gray-500' : 'text-gray-500'
                          }`}
                        >
                          {laptop.detailedSpecs.display.refreshRate}
                        </td>
                      )
                    })}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Brightness</td>
                    {laptops.map((laptop, idx) => {
                      const [isWorse, isBetter] = compareSpecs(
                        laptop.detailedSpecs.display.brightness,
                        laptops[1 - idx].detailedSpecs.display.brightness
                      )
                      return (
                        <td
                          key={laptop.id}
                          className={`px-6 py-4 whitespace-nowrap text-sm ${
                            isBetter ? 'text-green-600 font-medium' : isWorse ? 'text-gray-500' : 'text-gray-500'
                          }`}
                        >
                          {laptop.detailedSpecs.display.brightness}
                        </td>
                      )
                    })}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Color Gamut (sRGB)</td>
                    {laptops.map((laptop, idx) => {
                      const [isWorse, isBetter] = compareSpecs(
                        laptop.detailedSpecs.display.colorGamut.sRGB,
                        laptops[1 - idx].detailedSpecs.display.colorGamut.sRGB
                      )
                      return (
                        <td
                          key={laptop.id}
                          className={`px-6 py-4 whitespace-nowrap text-sm ${
                            isBetter ? 'text-green-600 font-medium' : isWorse ? 'text-gray-500' : 'text-gray-500'
                          }`}
                        >
                          {laptop.detailedSpecs.display.colorGamut.sRGB}
                        </td>
                      )
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Performance */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Performance</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Feature
                    </th>
                    {laptops.map((laptop) => (
                      <th
                        key={laptop.id}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {laptop.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Geekbench 6 (Single)</td>
                    {laptops.map((laptop, idx) => {
                      const [isWorse, isBetter] = compareSpecs(
                        laptop.detailedSpecs.cpu.benchmarks.geekbench6Single,
                        laptops[1 - idx].detailedSpecs.cpu.benchmarks.geekbench6Single
                      )
                      return (
                        <td
                          key={laptop.id}
                          className={`px-6 py-4 whitespace-nowrap text-sm ${
                            isBetter ? 'text-green-600 font-medium' : isWorse ? 'text-gray-500' : 'text-gray-500'
                          }`}
                        >
                          {laptop.detailedSpecs.cpu.benchmarks.geekbench6Single}
                        </td>
                      )
                    })}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Geekbench 6 (Multi)</td>
                    {laptops.map((laptop, idx) => {
                      const [isWorse, isBetter] = compareSpecs(
                        laptop.detailedSpecs.cpu.benchmarks.geekbench6Multi,
                        laptops[1 - idx].detailedSpecs.cpu.benchmarks.geekbench6Multi
                      )
                      return (
                        <td
                          key={laptop.id}
                          className={`px-6 py-4 whitespace-nowrap text-sm ${
                            isBetter ? 'text-green-600 font-medium' : isWorse ? 'text-gray-500' : 'text-gray-500'
                          }`}
                        >
                          {laptop.detailedSpecs.cpu.benchmarks.geekbench6Multi}
                        </td>
                      )
                    })}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">3D Mark Wildlife Extreme</td>
                    {laptops.map((laptop, idx) => {
                      const [isWorse, isBetter] = compareSpecs(
                        laptop.detailedSpecs.gpu.benchmarks.wildlifeExtreme,
                        laptops[1 - idx].detailedSpecs.gpu.benchmarks.wildlifeExtreme
                      )
                      return (
                        <td
                          key={laptop.id}
                          className={`px-6 py-4 whitespace-nowrap text-sm ${
                            isBetter ? 'text-green-600 font-medium' : isWorse ? 'text-gray-500' : 'text-gray-500'
                          }`}
                        >
                          {laptop.detailedSpecs.gpu.benchmarks.wildlifeExtreme}
                        </td>
                      )
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Battery */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Battery</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Feature
                    </th>
                    {laptops.map((laptop) => (
                      <th
                        key={laptop.id}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {laptop.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Capacity</td>
                    {laptops.map((laptop, idx) => {
                      const [isWorse, isBetter] = compareSpecs(
                        laptop.detailedSpecs.battery.capacity,
                        laptops[1 - idx].detailedSpecs.battery.capacity
                      )
                      return (
                        <td
                          key={laptop.id}
                          className={`px-6 py-4 whitespace-nowrap text-sm ${
                            isBetter ? 'text-green-600 font-medium' : isWorse ? 'text-gray-500' : 'text-gray-500'
                          }`}
                        >
                          {laptop.detailedSpecs.battery.capacity}
                        </td>
                      )
                    })}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Fast Charging</td>
                    {laptops.map((laptop, idx) => {
                      const [isWorse, isBetter] = compareSpecs(
                        laptop.detailedSpecs.battery.fastCharging,
                        laptops[1 - idx].detailedSpecs.battery.fastCharging
                      )
                      return (
                        <td
                          key={laptop.id}
                          className={`px-6 py-4 whitespace-nowrap text-sm ${
                            isBetter ? 'text-green-600 font-medium' : isWorse ? 'text-gray-500' : 'text-gray-500'
                          }`}
                        >
                          {laptop.detailedSpecs.battery.fastCharging ? "Yes" : "No"}
                        </td>
                      )
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Connectivity */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Connectivity</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Feature
                    </th>
                    {laptops.map((laptop) => (
                      <th
                        key={laptop.id}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {laptop.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Wi-Fi</td>
                    {laptops.map((laptop) => (
                      <td key={laptop.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {laptop.detailedSpecs.connectivity.wifi}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Bluetooth</td>
                    {laptops.map((laptop) => (
                      <td key={laptop.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {laptop.detailedSpecs.connectivity.bluetooth}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">USB-A Ports</td>
                    {laptops.map((laptop) => (
                      <td key={laptop.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {laptop.detailedSpecs.connectivity.ports.usba}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">USB-C Ports</td>
                    {laptops.map((laptop) => (
                      <td key={laptop.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {laptop.detailedSpecs.connectivity.ports.usbc}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Thunderbolt</td>
                    {laptops.map((laptop) => (
                      <td key={laptop.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {laptop.detailedSpecs.connectivity.ports.thunderbolt || "No"}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">HDMI</td>
                    {laptops.map((laptop) => (
                      <td key={laptop.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {laptop.detailedSpecs.connectivity.ports.hdmi || "No"}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">SD Card Reader</td>
                    {laptops.map((laptop) => (
                      <td key={laptop.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {laptop.detailedSpecs.connectivity.ports.sdCard || "No"}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Webcam</td>
                    {laptops.map((laptop) => (
                      <td key={laptop.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {laptop.detailedSpecs.connectivity.webcam || "No"}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-8">
              {laptops.map((laptop) => (
                <div key={laptop.id}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Connectivity Rating</span>
                    <span className="text-sm font-medium">
                      {/* Assuming connectivity score is the average of other scores */}
                      {((laptop.benchmarks.productivity + laptop.benchmarks.display) / 2).toFixed(1)}/10
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="h-2.5 rounded-full bg-blue-600" 
                      style={{ width: `${((laptop.benchmarks.productivity + laptop.benchmarks.display) / 2) * 10}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Input */}
          <div>
            <h3 className="text-xl font-bold mb-4">Input</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Feature
                    </th>
                    {laptops.map((laptop) => (
                      <th
                        key={laptop.id}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {laptop.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Keyboard</td>
                    {laptops.map((laptop) => (
                      <td key={laptop.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {laptop.detailedSpecs.input.keyboard}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Numpad</td>
                    {laptops.map((laptop) => (
                      <td key={laptop.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {laptop.detailedSpecs.input.numpad ? "Yes" : "No"}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Key Travel</td>
                    {laptops.map((laptop) => (
                      <td key={laptop.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {laptop.detailedSpecs.input.keyTravel}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Touchpad Size</td>
                    {laptops.map((laptop) => (
                      <td key={laptop.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {laptop.detailedSpecs.input.touchpad.size}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Touchpad Surface</td>
                    {laptops.map((laptop) => (
                      <td key={laptop.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {laptop.detailedSpecs.input.touchpad.surface}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-8">
              {laptops.map((laptop) => (
                <div key={laptop.id}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Input Devices Rating</span>
                    <span className="text-sm font-medium">
                      {/* Assuming input score is related to build quality */}
                      {(laptop.benchmarks.build * 0.9).toFixed(1)}/10
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="h-2.5 rounded-full bg-blue-600" 
                      style={{ width: `${laptop.benchmarks.build * 9}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* User Voting */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">Which one would you choose?</h2>

          <div className="grid grid-cols-2 gap-8">
            {laptops.map((laptop) => (
              <div key={laptop.id} className="text-center">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg w-full">
                  Vote for {laptop.name}
                </button>
                <div className="mt-2 text-sm text-gray-500">
                  <span className="font-medium">1,245</span> users voted for this laptop
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded"
          >
            Back to Home
          </Link>
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
