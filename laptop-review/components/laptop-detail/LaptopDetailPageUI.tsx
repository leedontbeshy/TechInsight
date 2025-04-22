"use client";

import React, { useState } from "react";
import Image from "next/image";
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
  ShoppingCart,
} from "lucide-react";

import Header from "./header"; 
import SpecItem from "./spec-item"; 
import TabPanel from "./tab-panel";
import RatingBar from "./rating-bar";
import ComparisonTable from "./comparison-table";

import {
  Laptop,
  SimilarLaptop,
  LaptopDetailPageUIProps,
  Deal,
} from "@/types/laptop";

// Component Phụ hiển thị điểm số (có thể đặt ở file riêng sau này)
const ScoreBadge: React.FC<{ score?: number }> = ({ score }) => {
  if (score === undefined || score === null) return null;
  let bgColor = "bg-gray-500";
  if (score >= 8.5) bgColor = "bg-green-600";
  else if (score >= 7.0) bgColor = "bg-blue-600";
  else if (score >= 5.0) bgColor = "bg-yellow-500";
  else bgColor = "bg-red-600";
  return (
    <div
      className={`${bgColor} text-white text-xs px-2.5 py-1 rounded-full font-bold`}
    >
      {score.toFixed(1)}/10
    </div>
  );
};

// Component Phụ hiển thị thanh progress (ví dụ)
const ProgressBar: React.FC<{
  value?: number | string;
  max: number;
  color?: string;
}> = ({ value, max, color = "bg-blue-600" }) => {
  const numericValue =
    typeof value === "string" ? parseFloat(value.split("/")[0]) : value; // Lấy số đầu nếu là string "A / B"
  if (
    numericValue === undefined ||
    numericValue === null ||
    isNaN(numericValue) ||
    max <= 0
  )
    return null;
  const percentage = Math.min(100, Math.max(0, (numericValue / max) * 100));
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
      <div
        className={`h-2.5 rounded-full ${color}`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

// Component chính
export default function LaptopDetailPageUI({
  laptop,
  similarLaptops,
}: LaptopDetailPageUIProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Ví dụ MAX SCORES (Điều chỉnh nếu cần)
  const MAX_GEEKBENCH_SINGLE = 2800;
  const MAX_GEEKBENCH_MULTI = 15000;
  const MAX_CINEBENCH_R23_SINGLE = 1800;
  const MAX_CINEBENCH_R23_MULTI = 15000;
  const MAX_TIMESPY = 10000; // Giả sử là điểm Graphics
  const MAX_WILDLIFE = 8000;
  const MAX_GEEKBENCH_COMPUTE = 30000;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* === Product Header === */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg p-6 flex items-center justify-center shadow">
            {" "}
            {/* Ảnh */}
            <div className="relative w-full h-[350px] md:h-[400px]">
              <Image
                src={laptop.image || "/placeholder.svg"}
                alt={`Image of ${laptop.name}`}
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            {" "}
            {/* Thông tin */}
            <h1 className="text-3xl lg:text-4xl font-bold mb-3">
              {laptop.name}
            </h1>
            {laptop.reviewUrl && (
              <a
                href={laptop.reviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-red-600 mb-5 hover:underline w-fit"
              >
                <Youtube className="w-5 h-5 mr-2" />
                Watch Video Review
              </a>
            )}
            <div className="mb-5">
              {" "}
              {/* Mô tả */}
              {laptop.description ? (
                <p className="text-gray-700 leading-relaxed">
                  {laptop.description}
                </p>
              ) : (
                <p className="text-gray-500 italic">No description.</p>
              )}
              {laptop.longDescription && (
                <div className="mt-3">
                  {!isExpanded ? (
                    <button
                      onClick={() => setIsExpanded(true)}
                      className="flex items-center text-blue-600 font-medium hover:text-blue-800"
                    >
                      Read More <ChevronDown className="w-4 h-4 ml-1" />
                    </button>
                  ) : (
                    <p className="text-gray-700 leading-relaxed mt-2">
                      {laptop.longDescription}
                    </p>
                  )}
                </div>
              )}
            </div>
            <div className="mb-5">
              {" "}
              {/* Giá */}
              <div className="flex items-baseline mb-1">
                {laptop.price ? (
                  <span className="text-3xl font-bold text-gray-900">
                    {laptop.price}
                  </span>
                ) : (
                  <span className="text-xl text-gray-500">N/A</span>
                )}
                {laptop.originalPrice && (
                  <span className="ml-2 text-sm text-gray-500 line-through">
                    {laptop.originalPrice}
                  </span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              {" "}
              {/* Specs tóm tắt */}
              <SpecItem
                icon={<Cpu className="w-5 h-5 text-gray-600" />}
                label="Processor"
                value={laptop.specs.cpu}
              />
              <SpecItem
                icon={<Gpu className="w-5 h-5 text-gray-600" />}
                label="Graphics"
                value={laptop.specs.gpu}
              />
              <SpecItem
                icon={<Memory className="w-5 h-5 text-gray-600" />}
                label="Memory"
                value={laptop.specs.ram}
              />
              <SpecItem
                icon={<HardDrive className="w-5 h-5 text-gray-600" />}
                label="Storage"
                value={laptop.specs.storage}
              />
              <SpecItem
                icon={<Monitor className="w-5 h-5 text-gray-600" />}
                label="Display"
                value={laptop.specs.display}
              />
              <SpecItem
                icon={<Battery className="w-5 h-5 text-gray-600" />}
                label="Battery"
                value={laptop.specs.battery}
              />
            </div>
          </div>
        </div>
        {/* === Tabs Section === */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-8">
          <TabPanel>
            {/* --- Tab Specs --- */}
            <TabPanel.Tab label="Specifications">
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-6 pt-4 text-sm">
                <div>
                  {" "}
                  {/* System */}
                  <h3 className="text-base font-semibold mb-3 text-gray-800">
                    System
                  </h3>
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td className="py-2 pr-2 text-gray-500">Processor</td>
                        <td className="py-2 font-medium text-gray-700">
                          {laptop.specs.cpu}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-2 pr-2 text-gray-500">Graphics</td>
                        <td className="py-2 font-medium text-gray-700">
                          {laptop.specs.gpu}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-2 pr-2 text-gray-500">Memory</td>
                        <td className="py-2 font-medium text-gray-700">
                          {laptop.specs.ram}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-2 pr-2 text-gray-500">Storage</td>
                        <td className="py-2 font-medium text-gray-700">
                          {laptop.specs.storage}
                        </td>
                      </tr>
                      <tr className="">
                        <td className="py-2 pr-2 text-gray-500">
                          Operating System
                        </td>
                        <td className="py-2 font-medium text-gray-700">
                          {laptop.specs.operatingSystem ?? "N/A"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div>
                  {" "}
                  {/* Display & Battery */}
                  <h3 className="text-base font-semibold mb-3 text-gray-800">
                    Display & Battery
                  </h3>
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td className="py-2 pr-2 text-gray-500">Display</td>
                        <td className="py-2 font-medium text-gray-700">
                          {laptop.specs.display}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-2 pr-2 text-gray-500">Brightness</td>
                        <td className="py-2 font-medium text-gray-700">
                          {laptop.specs.brightness ?? "N/A"}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-2 pr-2 text-gray-500">Color Gamut</td>
                        <td className="py-2 font-medium text-gray-700">
                          {laptop.specs.colorGamut ?? "N/A"}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-2 pr-2 text-gray-500">Battery</td>
                        <td className="py-2 font-medium text-gray-700">
                          {laptop.specs.battery}
                        </td>
                      </tr>
                      <tr className="">
                        <td className="py-2 pr-2 text-gray-500">Charging</td>
                        <td className="py-2 font-medium text-gray-700">
                          {laptop.specs.charging ?? "N/A"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </TabPanel.Tab>
            {/* --- Tab Benchmarks --- */}
            {laptop.benchmarks && (
              <TabPanel.Tab label="Benchmarks">
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-6 pt-4">
                  <div>
                    <h3 className="text-base font-semibold mb-3 text-gray-800">
                      Performance Ratings
                    </h3>
                    {laptop.benchmarks.gaming !== undefined && (
                      <RatingBar
                        score={laptop.benchmarks.gaming}
                        label="Gaming"
                      />
                    )}
                    {laptop.benchmarks.productivity !== undefined && (
                      <RatingBar
                        score={laptop.benchmarks.productivity}
                        label="Productivity"
                      />
                    )}
                    {laptop.benchmarks.content !== undefined && (
                      <RatingBar
                        score={laptop.benchmarks.content}
                        label="Content Creation"
                      />
                    )}
                    {laptop.benchmarks.overall !== undefined && (
                      <RatingBar
                        score={laptop.benchmarks.overall}
                        label="Overall Performance"
                      />
                    )}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold mb-3 text-gray-800">
                      Hardware Ratings
                    </h3>
                    {laptop.benchmarks.display !== undefined && (
                      <RatingBar
                        score={laptop.benchmarks.display}
                        label="Display Quality"
                      />
                    )}
                    {laptop.benchmarks.battery !== undefined && (
                      <RatingBar
                        score={laptop.benchmarks.battery}
                        label="Battery Life"
                      />
                    )}
                    {laptop.benchmarks.build !== undefined && (
                      <RatingBar
                        score={laptop.benchmarks.build}
                        label="Build Quality"
                      />
                    )}
                    {laptop.benchmarks.value !== undefined && (
                      <RatingBar
                        score={laptop.benchmarks.value}
                        label="Value for Money"
                      />
                    )}
                  </div>
                  <div className="md:col-span-2 mt-4">
                    <h3 className="text-base font-semibold mb-3 text-gray-800">
                      Benchmark Results
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {laptop.benchmarks.cinebenchR23Multi && (
                        <div className="bg-gray-100 p-3 rounded">
                          <p className="text-xs text-gray-500">
                            Cine R23 Multi
                          </p>
                          <p className="text-lg font-semibold">
                            {laptop.benchmarks.cinebenchR23Multi}
                          </p>
                        </div>
                      )}
                      {laptop.benchmarks.timeSpy && (
                        <div className="bg-gray-100 p-3 rounded">
                          <p className="text-xs text-gray-500">Time Spy</p>
                          <p className="text-lg font-semibold">
                            {laptop.benchmarks.timeSpy}
                          </p>
                        </div>
                      )}
                      {laptop.benchmarks.pcMark10 && (
                        <div className="bg-gray-100 p-3 rounded">
                          <p className="text-xs text-gray-500">PCMark 10</p>
                          <p className="text-lg font-semibold">
                            {laptop.benchmarks.pcMark10}
                          </p>
                        </div>
                      )}
                      {laptop.benchmarks.geekbench5 && (
                        <div className="bg-gray-100 p-3 rounded">
                          <p className="text-xs text-gray-500">Geekbench 5</p>
                          <p className="text-lg font-semibold">
                            {laptop.benchmarks.geekbench5}
                          </p>
                        </div>
                      )}
                      {laptop.benchmarks.geekbenchV6Single && (
                        <div className="bg-gray-100 p-3 rounded">
                          <p className="text-xs text-gray-500">GB6 Single</p>
                          <p className="text-lg font-semibold">
                            {laptop.benchmarks.geekbenchV6Single}
                          </p>
                        </div>
                      )}
                      {laptop.benchmarks.geekbenchV6Multi && (
                        <div className="bg-gray-100 p-3 rounded">
                          <p className="text-xs text-gray-500">GB6 Multi</p>
                          <p className="text-lg font-semibold">
                            {laptop.benchmarks.geekbenchV6Multi}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </TabPanel.Tab>
            )}
            {/* --- Tab Comparisons --- */}
            {similarLaptops && similarLaptops.length > 0 && (
              <TabPanel.Tab label="Comparisons">
                <div className="pt-4">
                  <ComparisonTable
                    laptops={similarLaptops}
                    currentLaptopId={laptop.id}
                  />
                </div>
              </TabPanel.Tab>
            )}
          </TabPanel>
        </div>
        {/* === Pros and Cons === */}
        {(laptop.pros && laptop.pros.length > 0) ||
        (laptop.cons && laptop.cons.length > 0) ? (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {laptop.pros && laptop.pros.length > 0 && (
              <div className="bg-green-50 rounded-lg p-5 shadow-sm">
                <h3 className="text-lg font-semibold text-green-800 mb-3">
                  Pros
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  {laptop.pros.map((pro, index) => (
                    <li key={`pro-${index}`} className="flex items-start">
                      <Check className="text-green-500 w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {laptop.pros?.length === 0 &&
              laptop.cons &&
              laptop.cons.length > 0 && <div></div>}
            {laptop.cons && laptop.cons.length > 0 && (
              <div className="bg-red-50 rounded-lg p-5 shadow-sm">
                <h3 className="text-lg font-semibold text-red-800 mb-3">
                  Cons
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  {laptop.cons.map((con, index) => (
                    <li key={`con-${index}`} className="flex items-start">
                      <X className="text-red-500 w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : null}
        
        <div className="mb-8 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Detailed Analysis
          </h2>

          {/* --- //hieu nang --- */}
          {(laptop.benchmarks || laptop.performanceAnalysis) && (
            <div className="bg-white rounded-lg shadow p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  1. Performance
                </h3>
                <ScoreBadge score={laptop.benchmarks?.performanceScore} />
              </div>
              {/* Benchmarks chi tiết */}
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 mb-5 text-sm">
                <div>
                  {" "}
                  {/* CPU Benchmarks */}
                  <h4 className="font-semibold mb-2 text-gray-700">
                    CPU Benchmarks
                  </h4>
                  <div className="space-y-3">
                    {laptop.benchmarks?.geekbenchV6Single && (
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-600">
                            Geekbench v6 (Single)
                          </span>
                          <span className="font-medium text-gray-800">
                            {laptop.benchmarks.geekbenchV6Single}
                          </span>
                        </div>
                        <ProgressBar
                          value={laptop.benchmarks.geekbenchV6Single}
                          max={MAX_GEEKBENCH_SINGLE}
                        />
                      </div>
                    )}
                    {laptop.benchmarks?.geekbenchV6Multi && (
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-600">
                            Geekbench v6 (Multi)
                          </span>
                          <span className="font-medium text-gray-800">
                            {laptop.benchmarks.geekbenchV6Multi}
                          </span>
                        </div>
                        <ProgressBar
                          value={laptop.benchmarks.geekbenchV6Multi}
                          max={MAX_GEEKBENCH_MULTI}
                        />
                      </div>
                    )}
                    {laptop.benchmarks?.cinebenchR23Single && (
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-600">
                            Cinebench R23 (Single)
                          </span>
                          <span className="font-medium text-gray-800">
                            {laptop.benchmarks.cinebenchR23Single}
                          </span>
                        </div>
                        <ProgressBar
                          value={laptop.benchmarks.cinebenchR23Single}
                          max={MAX_CINEBENCH_R23_SINGLE}
                        />
                      </div>
                    )}
                    {laptop.benchmarks?.cinebenchR23Multi && (
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-600">
                            Cinebench R23 (Multi)
                          </span>
                          <span className="font-medium text-gray-800">
                            {laptop.benchmarks.cinebenchR23Multi}
                          </span>
                        </div>
                        <ProgressBar
                          value={laptop.benchmarks.cinebenchR23Multi}
                          max={MAX_CINEBENCH_R23_MULTI}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  {" "}
                  {/* GPU Benchmarks */}
                  <h4 className="font-semibold mb-2 text-gray-700">
                    GPU Benchmarks
                  </h4>
                  <div className="space-y-3">
                    {laptop.benchmarks?.timeSpy && (
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-600">
                            3DMark Time Spy (Graphics)
                          </span>
                          <span className="font-medium text-gray-800">
                            {laptop.benchmarks.timeSpy}
                          </span>
                        </div>
                        <ProgressBar
                          value={laptop.benchmarks.timeSpy}
                          max={MAX_TIMESPY}
                          color="bg-green-500"
                        />
                      </div>
                    )}
                    {laptop.benchmarks?.wildlifeExtreme && (
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-600">
                            3DMark Wildlife Extreme
                          </span>
                          <span className="font-medium text-gray-800">
                            {laptop.benchmarks.wildlifeExtreme}
                          </span>
                        </div>
                        <ProgressBar
                          value={laptop.benchmarks.wildlifeExtreme}
                          max={MAX_WILDLIFE}
                          color="bg-green-500"
                        />
                      </div>
                    )}
                    {laptop.benchmarks?.geekbenchCompute && (
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-600">
                            Geekbench Compute
                          </span>
                          <span className="font-medium text-gray-800">
                            {laptop.benchmarks.geekbenchCompute}
                          </span>
                        </div>
                        <ProgressBar
                          value={laptop.benchmarks.geekbenchCompute}
                          max={MAX_GEEKBENCH_COMPUTE}
                          color="bg-green-500"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* Plugged vs Unplugged */}
              {(laptop.benchmarks?.pluggedGeekbenchMulti ||
                laptop.benchmarks?.unpluggedGeekbenchMulti) && (
                <>
                  <h4 className="font-semibold mb-3 text-gray-700 text-sm">
                    Performance Comparison: Plugged vs. Unplugged
                  </h4>
                  <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 mb-4 text-sm">
                    <div>
                      <h5 className="font-medium mb-2 text-gray-600">
                        Plugged In (AC Power)
                      </h5>
                      <div className="space-y-3">
                        {laptop.benchmarks?.pluggedGeekbenchSingle && (
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-gray-600">GB6 Single</span>
                              <span className="font-medium text-gray-800">
                                {laptop.benchmarks.pluggedGeekbenchSingle}
                              </span>
                            </div>
                            <ProgressBar
                              value={laptop.benchmarks.pluggedGeekbenchSingle}
                              max={MAX_GEEKBENCH_SINGLE}
                              color="bg-emerald-500"
                            />
                          </div>
                        )}
                        {laptop.benchmarks?.pluggedGeekbenchMulti && (
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-gray-600">GB6 Multi</span>
                              <span className="font-medium text-gray-800">
                                {laptop.benchmarks.pluggedGeekbenchMulti}
                              </span>
                            </div>
                            <ProgressBar
                              value={laptop.benchmarks.pluggedGeekbenchMulti}
                              max={MAX_GEEKBENCH_MULTI}
                              color="bg-emerald-500"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2 text-gray-600">
                        Unplugged (Battery)
                      </h5>
                      <div className="space-y-3">
                        {laptop.benchmarks?.unpluggedGeekbenchSingle && (
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-gray-600">GB6 Single</span>
                              <span className="font-medium text-gray-800">
                                {laptop.benchmarks.unpluggedGeekbenchSingle}
                              </span>
                            </div>
                            <ProgressBar
                              value={laptop.benchmarks.unpluggedGeekbenchSingle}
                              max={MAX_GEEKBENCH_SINGLE}
                              color="bg-amber-500"
                            />
                          </div>
                        )}
                        {laptop.benchmarks?.unpluggedGeekbenchMulti && (
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-gray-600">GB6 Multi</span>
                              <span className="font-medium text-gray-800">
                                {laptop.benchmarks.unpluggedGeekbenchMulti}
                              </span>
                            </div>
                            <ProgressBar
                              value={laptop.benchmarks.unpluggedGeekbenchMulti}
                              max={MAX_GEEKBENCH_MULTI}
                              color="bg-amber-500"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
              {/* Text phân tích */}
              {laptop.performanceAnalysis ? (
                <p className="text-gray-700 mt-3 text-sm">
                  {laptop.performanceAnalysis}
                </p>
              ) : (
                <p className="text-gray-500 italic mt-3 text-sm">
                  No detailed performance analysis.
                </p>
              )}
            </div>
          )}

          {/* --- pin --- */}
          {(laptop.specs.battery || laptop.batteryAnalysis) && (
            <div className="bg-white rounded-lg shadow p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  2. Battery
                </h3>
                <ScoreBadge score={laptop.benchmarks?.battery} />{" "}
                {/* Điểm pin từ benchmark */}
              </div>
              <div className="mb-4 text-sm">
                <p className="mb-1">
                  <span className="font-medium text-gray-600">Capacity:</span>{" "}
                  <span className="text-gray-800">
                    {laptop.specs.battery?.split(",")[0] ?? "N/A"}
                  </span>
                </p>
                {laptop.specs.charging && (
                  <p>
                    <span className="font-medium text-gray-600">Charging:</span>{" "}
                    <span className="text-gray-800">
                      {laptop.specs.charging}
                    </span>
                  </p>
                )}
              </div>
              {/* Battery Life Tests */}
              {(laptop.benchmarks?.batteryLifeCasual ||
                laptop.benchmarks?.batteryLifeVideo ||
                laptop.benchmarks?.batteryLifeHeavy) && (
                <>
                  <h4 className="font-semibold mb-3 text-gray-700 text-sm">
                    Battery Life Tests (Approx.)
                  </h4>
                  <div className="space-y-4 mb-4 text-sm">
                    {laptop.benchmarks.batteryLifeCasual && (
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-600">
                            Casual Use (Web/Office)
                          </span>
                          <span className="font-medium text-gray-800">
                            {laptop.benchmarks.batteryLifeCasual}
                          </span>
                        </div>
                        <ProgressBar
                          value={parseFloat(
                            laptop.benchmarks.batteryLifeCasual
                          )}
                          max={14}
                          color="bg-green-500"
                        />
                      </div>
                    )}
                    {laptop.benchmarks.batteryLifeVideo && (
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-600">Video Playback</span>
                          <span className="font-medium text-gray-800">
                            {laptop.benchmarks.batteryLifeVideo}
                          </span>
                        </div>
                        <ProgressBar
                          value={parseFloat(laptop.benchmarks.batteryLifeVideo)}
                          max={12}
                          color="bg-blue-500"
                        />
                      </div>
                    )}
                    {laptop.benchmarks.batteryLifeHeavy && (
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-600">
                            Heavy Load (Gaming/CPU)
                          </span>
                          <span className="font-medium text-gray-800">
                            {laptop.benchmarks.batteryLifeHeavy}
                          </span>
                        </div>
                        <ProgressBar
                          value={parseFloat(laptop.benchmarks.batteryLifeHeavy)}
                          max={5}
                          color="bg-yellow-500"
                        />
                      </div>
                    )}
                  </div>
                </>
              )}
              {laptop.batteryAnalysis ? (
                <p className="text-gray-700 text-sm">
                  {laptop.batteryAnalysis}
                </p>
              ) : (
                <p className="text-gray-500 italic text-sm">
                  No detailed battery analysis.
                </p>
              )}
            </div>
          )}

          {/* --- //thiet ke va nag --- */}
          {(laptop.dimensions || laptop.weight || laptop.designAnalysis) && (
            <div className="bg-white rounded-lg shadow p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  3. Design & Build
                </h3>
                <ScoreBadge score={laptop.benchmarks?.build} />{" "}
                {/* Dùng điểm build */}
              </div>
              <div className="text-sm mb-3">
                {laptop.dimensions && (
                  <p className="mb-1">
                    <span className="font-medium text-gray-600">
                      Dimensions:
                    </span>{" "}
                    <span className="text-gray-800">{laptop.dimensions}</span>
                  </p>
                )}
                {laptop.weight && (
                  <p>
                    <span className="font-medium text-gray-600">Weight:</span>{" "}
                    <span className="text-gray-800">{laptop.weight}</span>
                  </p>
                )}
              </div>
              {laptop.designAnalysis ? (
                <p className="text-gray-700 text-sm">{laptop.designAnalysis}</p>
              ) : (
                <p className="text-gray-500 italic text-sm">
                  No detailed design analysis.
                </p>
              )}
            </div>
          )}

          {/* --- man hinh --- */}
          {(laptop.specs.display || laptop.displayAnalysis) && (
            <div className="bg-white rounded-lg shadow p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  4. Display
                </h3>
                <ScoreBadge score={laptop.benchmarks?.display} />{" "}
                {/* Điểm display */}
              </div>
              <div className="text-sm mb-3 grid grid-cols-2 gap-x-4">
                <p className="mb-1">
                  <span className="font-medium text-gray-600">Size:</span>{" "}
                  <span className="text-gray-800">
                    {laptop.specs.display.split('"')[0]}"
                  </span>
                </p>{" "}
                {/* Tách kích thước */}
                <p className="mb-1">
                  <span className="font-medium text-gray-600">Resolution:</span>{" "}
                  <span className="text-gray-800">
                    {laptop.specs.display.split(",")[0].split('" ')[1]}
                  </span>
                </p>{" "}
                {/* Tách độ phân giải */}
                {laptop.specs.panelType && (
                  <p className="mb-1">
                    <span className="font-medium text-gray-600">
                      Panel Type:
                    </span>{" "}
                    <span className="text-gray-800">
                      {laptop.specs.panelType}
                    </span>
                  </p>
                )}
                {laptop.specs.refreshRate && (
                  <p className="mb-1">
                    <span className="font-medium text-gray-600">
                      Refresh Rate:
                    </span>{" "}
                    <span className="text-gray-800">
                      {laptop.specs.refreshRate}
                    </span>
                  </p>
                )}
                {laptop.specs.brightness && (
                  <p className="mb-1">
                    <span className="font-medium text-gray-600">
                      Brightness:
                    </span>{" "}
                    <span className="text-gray-800">
                      {laptop.specs.brightness}
                    </span>
                  </p>
                )}
                {laptop.specs.colorGamut && (
                  <p className="mb-1">
                    <span className="font-medium text-gray-600">
                      Color Gamut:
                    </span>{" "}
                    <span className="text-gray-800">
                      {laptop.specs.colorGamut}
                    </span>
                  </p>
                )}
              </div>
              {laptop.displayAnalysis ? (
                <p className="text-gray-700 text-sm">
                  {laptop.displayAnalysis}
                </p>
              ) : (
                <p className="text-gray-500 italic text-sm">
                  No detailed display analysis.
                </p>
              )}
            </div>
          )}

          {/* --- ban phim --- */}
          {laptop.keyboardAnalysis && (
            <div className="bg-white rounded-lg shadow p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-semibold text-gray-800">
                  5. Keyboard
                </h3>
                <ScoreBadge score={laptop.benchmarks?.keyboardScore} />
              </div>
              <p className="text-gray-700 text-sm">{laptop.keyboardAnalysis}</p>
            </div>
          )}

          {/* --- 6. Trackpad --- */}
          {laptop.trackpadAnalysis && (
            <div className="bg-white rounded-lg shadow p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-semibold text-gray-800">
                  6. Trackpad
                </h3>
                <ScoreBadge score={laptop.benchmarks?.trackpadScore} />
              </div>
              <p className="text-gray-700 text-sm">{laptop.trackpadAnalysis}</p>
            </div>
          )}

          {/* --- //speaker --- */}
          {laptop.speakersAnalysis && (
            <div className="bg-white rounded-lg shadow p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-semibold text-gray-800">
                  7. Speakers
                </h3>
                <ScoreBadge score={laptop.benchmarks?.speakersScore} />
              </div>
              <p className="text-gray-700 text-sm">{laptop.speakersAnalysis}</p>
            </div>
          )}

          {/* --- //webcam --- */}
          {laptop.webcamAnalysis && (
            <div className="bg-white rounded-lg shadow p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-semibold text-gray-800">
                  8. Webcam
                </h3>
                <ScoreBadge score={laptop.benchmarks?.webcamScore} />
              </div>
              {laptop.specs.webcamResolution && (
                <p className="text-gray-700 text-sm mb-2">
                  <span className="font-medium text-gray-600">Resolution:</span>{" "}
                  {laptop.specs.webcamResolution}
                </p>
              )}
              <p className="text-gray-700 text-sm">{laptop.webcamAnalysis}</p>
            </div>
          )}

         {/* --- //cong ket noi --- */}
          {(laptop.portsLeft || laptop.portsRight || laptop.portsAnalysis) && (
            <div className="bg-white rounded-lg shadow p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-semibold text-gray-800">
                  9. Ports
                </h3>
                <ScoreBadge score={laptop.benchmarks?.portsScore} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-3 text-sm">
                <div>
                  <p className="font-medium mb-1 text-gray-600">Left Side:</p>
                  {laptop.portsLeft && laptop.portsLeft.length > 0 ? (
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      {laptop.portsLeft.map((port, index) => (
                        <li key={`left-${index}`}>{port}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 italic">N/A</p>
                  )}
                </div>
                <div>
                  <p className="font-medium mb-1 text-gray-600">Right Side:</p>
                  {laptop.portsRight && laptop.portsRight.length > 0 ? (
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      {laptop.portsRight.map((port, index) => (
                        <li key={`right-${index}`}>{port}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 italic">N/A</p>
                  )}
                </div>
              </div>
              {laptop.portsAnalysis && (
                <p className="text-gray-700 text-sm">{laptop.portsAnalysis}</p>
              )}
            </div>
          )}
        </div>{" "}
        {/* ---  end ptich chi tiet --- */}
        
        {/* --- //deals --- */}
        {laptop.deals && laptop.deals.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Best Prices & Deals
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {laptop.deals.map((deal, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow border border-gray-200 hover:border-blue-500 transition-colors flex flex-col"
                >
                  <div className="p-4 flex-grow">
                    <div className="flex justify-between items-center mb-3">
                      {deal.logoUrl ? (
                        <img
                          src={deal.logoUrl}
                          alt={`${deal.retailer} logo`}
                          className="h-6 max-w-[80px] object-contain mr-2"
                        />
                      ) : (
                        <span className="font-semibold text-gray-700 text-sm">
                          {deal.retailer}
                        </span>
                      )}
                      <span className="text-xl font-bold text-gray-800">
                        {deal.price}
                      </span>
                    </div>
                  </div>
                  <a
                    href={deal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-auto"
                  >
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-b text-sm flex items-center justify-center">
                      <ShoppingCart className="w-4 h-4 mr-2" /> View Deal
                    </button>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>{" "}
      {/* End div container */}
      {/* === Footer === */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        {/* Footer content giữ nguyên */}
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
            <div>
              <h3 className="text-base font-bold mb-3">AllTech</h3>
              <p className="text-gray-400 text-xs">
                Your trusted source for laptop reviews, comparisons, and the
                best deals online.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Categories</h4>
              <ul className="space-y-1.5">
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
              <h4 className="font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-1.5">
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
              <h4 className="font-semibold mb-3">Newsletter</h4>
              <p className="text-gray-400 mb-2 text-xs">
                Subscribe for the latest deals and reviews
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="text-xs px-2 py-1.5 text-gray-900 rounded-l focus:outline-none w-full"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-xs px-3 py-1.5 rounded-r">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-xs">
            <p>© {new Date().getFullYear()} AllTech. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div> // End div min-h-screen
  );
}
