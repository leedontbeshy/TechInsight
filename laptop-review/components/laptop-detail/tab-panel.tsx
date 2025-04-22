"use client"

import { useState, type ReactNode } from "react"

interface TabProps {
  label: string
  children: ReactNode
}

function Tab({ label, children }: TabProps) {
  return <div>{children}</div>
}

interface TabPanelProps {
  children: ReactNode
  defaultTab?: number
}

export default function TabPanel({ children, defaultTab = 0 }: TabPanelProps) {
  const [activeTab, setActiveTab] = useState(defaultTab)

  // Extract tabs from children
  const tabs = Array.isArray(children) ? children : [children]

  return (
    <div>
      <div className="border-b border-gray-200 mb-6">
        <div className="flex space-x-8">
          {tabs.map((tab: any, index: number) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={activeTab === index ? "tab-active" : "tab"}
            >
              {tab.props.label}
            </button>
          ))}
        </div>
      </div>

      <div>{tabs[activeTab]}</div>
    </div>
  )
}

TabPanel.Tab = Tab
