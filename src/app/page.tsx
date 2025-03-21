"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Twitter, Phone } from "lucide-react";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleLogin = () => {
    //login logic 
    router.push('/dashboard');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      {/* Header Section */}
      <div className="w-full h-56 relative">
        <Image
          src="/header-image.jpg" 
          alt="Digital inventory system"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Welcome Text */}
          <div className="lg:col-span-2 bg-white p-6">
            <h2 className="text-xl font-bold mb-4">Welcome !</h2>
            
            <p className="mb-6">
              Inventory Management system<br />
              is used to track inventory operations<br />
              of products from production process<br />
              until to the final step
            </p>
            
            <div className="mt-12">
              <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <div className="w-4 h-4 border border-gray-400 flex items-center justify-center mr-2">
                    <span className="text-xs">✓</span>
                  </div>
                  <Link href="/documentation" className="hover:underline">System documentation</Link>
                </li>
                <li className="flex items-center">
                  <div className="w-4 h-4 border border-gray-400 flex items-center justify-center mr-2">
                    <span className="text-xs">✓</span>
                  </div>
                  <Link href="/guidelines" className="hover:underline">System guidelines</Link>
                </li>
                <li className="flex items-center">
                  <div className="w-4 h-4 border border-gray-400 flex items-center justify-center mr-2">
                    <span className="text-xs">✓</span>
                  </div>
                  <Link href="/tutorials" className="hover:underline">Tutorials</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Login Form and Events */}
          <div className="lg:col-span-1 space-y-4">
            {/* Login Form */}
            <Card className="border border-gray-200">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-center mb-4">System Login</h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="text-sm text-gray-700">enter email</label>
                    <Input 
                      id="email"
                      type="email" 
                      placeholder="email@example.com" 
                      className="mt-1 border-gray-300"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="password" className="text-sm text-gray-700">enter password</label>
                    <Input 
                      id="password"
                      type="password" 
                      placeholder="••••••••••••••••••••••" 
                      className="mt-1 border-gray-300"
                    />
                  </div>
                  
                  <Button className="w-full bg-green-500 hover:bg-green-600 text-white"
                  onClick={handleLogin}>
                    Let me in
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Latest Events */}
            <div className="bg-white p-6 border border-gray-200">
              <h3 className="text-lg font-semibold mb-2">Latest Events</h3>
              <p className="text-gray-700">on 30 March 2025</p>
              {/* Event content can go here */}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-green-500 py-6 mt-8">
        <div className="container mx-auto flex justify-center space-x-16">
          <Link href="https://twitter.com" className="flex flex-col items-center text-white">
            <Twitter size={24} />
            <span className="text-xs mt-1">Twitter</span>
          </Link>
          <Link href="https://whatsapp.com" className="flex flex-col items-center text-white">
            <div className="bg-white rounded-full p-1">
              <Phone size={16} className="text-green-500" />
            </div>
            <span className="text-xs mt-1">Whatsapp</span>
          </Link>
          <Link href="/contact" className="flex flex-col items-center text-white">
            <Phone size={24} />
            <span className="text-xs mt-1">Contact us</span>
          </Link>
        </div>
      </div>
    </div>
  );
}