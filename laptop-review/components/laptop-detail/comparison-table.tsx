import Image from "next/image"
import { SimilarLaptop } from '@/types/laptop'



interface ComparisonTableProps {
  laptops: SimilarLaptop[]
  currentLaptopId: string
}

export default function ComparisonTable({ laptops, currentLaptopId }: ComparisonTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Laptop
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              CPU
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              GPU
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              RAM
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Storage
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Score
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {laptops.map((laptop) => (
            <tr key={laptop.id} className={laptop.id === currentLaptopId ? "bg-blue-50" : ""}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 relative">
                    <Image src={laptop?.image || "/placeholder.svg"} alt={laptop?.name || ""} fill className="object-contain" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {laptop?.name}
                      {laptop.id === currentLaptopId && <span className="ml-2 text-xs text-blue-600">(Current)</span>}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{laptop?.price}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{laptop?.cpu}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{laptop?.gpu}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{laptop?.ram}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{laptop?.storage}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 font-medium">{laptop?.score || 0}/10</div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                  <div
                    className="h-1.5 rounded-full bg-blue-600"
                    style={{ width: `${((laptop?.score || 0) / 10) * 100}%` }}
                  ></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
