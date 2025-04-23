"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { PasswordInput } from "@/components/auth/PasswordInput"
import { SocialLoginButtons } from "@/components/auth/SocialLoginButton"

export function LoginForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Giả lập đăng nhập
    setTimeout(() => {
      setLoading(false)
      router.push("/")
    }, 1500)
  }

  return (
    <div className="mt-6 space-y-6">
      <Tabs defaultValue="email" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 rounded-lg bg-gray-100">
          <TabsTrigger value="email" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
            Email
          </TabsTrigger>
          <TabsTrigger value="phone" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
            Số điện thoại
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="email">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@example.com"
                className="w-full px-3 py-2 transition duration-200 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                required 
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium">Mật khẩu</Label>
                <Link 
                  href="/auth/forgot-password" 
                  className="text-xs text-gray-600 hover:text-gray-800 hover:underline transition duration-200"
                >
                  Quên mật khẩu?
                </Link>
              </div>
              <PasswordInput 
                id="password"
                className="w-full transition duration-200 focus:ring-2 focus:ring-gray-200"
                required 
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-sm text-gray-600">
                Ghi nhớ đăng nhập
              </Label>
            </div>

            <Button 
              type="submit" 
              className="w-full py-2.5 text-sm font-medium transition duration-200 bg-gray-900 hover:bg-gray-800 focus:ring-2 focus:ring-gray-200"
              disabled={loading}
            >
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="phone">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">Số điện thoại</Label>
              <Input 
                id="phone" 
                type="tel" 
                placeholder="0912345678"
                className="w-full px-3 py-2 transition duration-200 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200" 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password-phone" className="text-sm font-medium">Mật khẩu</Label>
                <Link 
                  href="/auth/forgot-password" 
                  className="text-xs text-gray-600 hover:text-gray-800 hover:underline transition duration-200"
                >
                  Quên mật khẩu?
                </Link>
              </div>
              <PasswordInput 
                id="password-phone"
                className="w-full transition duration-200 focus:ring-2 focus:ring-gray-200"
                required 
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="remember-phone" />
              <Label htmlFor="remember-phone" className="text-sm text-gray-600">
                Ghi nhớ đăng nhập
              </Label>
            </div>

            <Button 
              type="submit" 
              className="w-full py-2.5 text-sm font-medium transition duration-200 bg-gray-900 hover:bg-gray-800 focus:ring-2 focus:ring-gray-200"
              disabled={loading}
            >
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </Button>
          </form>
        </TabsContent>
      </Tabs>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full border-gray-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-4 text-gray-500">Hoặc tiếp tục với</span>
        </div>
      </div>

      <SocialLoginButtons />

      <div className="mt-6 text-center text-sm text-gray-600">
        Chưa có tài khoản?{" "}
        <Link 
          href="/auth/register" 
          className="font-medium text-gray-900 hover:text-gray-800 hover:underline transition duration-200"
        >
          Đăng ký ngay
        </Link>
      </div>
    </div>
  )
}
