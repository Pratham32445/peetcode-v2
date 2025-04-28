"use client";

import { FlameKindling, Target } from "lucide-react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function AboutPage() {
  const [isZoomed, setIsZoomed] = useState(false);

  const handleImageClick = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="min-h-screen bg-background mb-6">
      <Link href="/problems" className="flex-1 flex items-center gap-3 p-4">
        <FlameKindling color="#FFA116" />
        <p className="text-white text-2xl">PeetCode</p>
      </Link>
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/10 to-background">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            About <span className="text-primary">Us</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
            we are on a mission to make coding education free in the world
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-muted-foreground mb-6">
                We are on a mission to teach those who cant afford luxury
                courses and want to achieve something big, by providing them
                with the tools, knowledge, and resources they need to succeed.
                With the power of AI support, we are continuously enhancing our
                platform to deliver the best educational content at no cost. We
                believe that access to high-quality education should not be a
                privilege, but a right for everyone, regardless of their
                financial background. Through Peetcode, we offer free access to
                Leetcode premium problems and other valuable learning materials,
                empowering individuals to reach their full potential. Our goal
                is to make education accessible to everyone and help bridge the
                gap in the world of learning, ensuring that anyone with the
                ambition to succeed can do so without barriers
              </p>
              <div className="flex items-center gap-4">
                <Target className="h-12 w-12 text-primary" />
                <div>
                  <h3 className="font-semibold">Forward Thinking</h3>
                  <p className="text-sm text-muted-foreground">
                    Always looking ahead to whats next
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex justify-center">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            System Design
          </h2>
          <Zoom zoomMargin={50}>
            <div onClick={handleImageClick}>
              <Image
                src="/platfrom.png"
                fill={isZoomed}
                width={!isZoomed ? 600 : undefined}
                height={!isZoomed ? 700 : undefined}
                alt="Zoomable"
              />
            </div>
          </Zoom>
        </div>
      </section>
    </div>
  );
}
