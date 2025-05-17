"use client";
import React, {useState} from "react";
import {Card, CardContent, CardTitle, CardDescription} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

const cancerTypes = [
    "Stomach",
    "Lung",
    "Breast",
    "Colon",
    "Prostate",
    "Liver"
];

export default function HomePage() {
    const [selectedCancer, setSelectedCancer] = useState(cancerTypes[0]);

    return (
        <div className="max-w-3xl mx-auto py-12 px-4 flex flex-col items-center space-y-10">
            {/* Hero Section */}
            <Card className="w-full">
                <CardContent className="text-center space-y-4">
                    <CardTitle className="text-4xl flex flex-col items-center gap-2">
            <span>
              <select
                  className="text-2xl font-bold border rounded px-2 py-1"
                  value={selectedCancer}
                  onChange={e => setSelectedCancer(e.target.value)}
              >
                {cancerTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                ))}
              </select>{" "}
                Cancer Detection AI
            </span>
                    </CardTitle>
                    <CardDescription>
                        Upload an endoscopic image and let our CNN model highlight
                        suspicious regions in seconds.
                    </CardDescription>
                </CardContent>
            </Card>

            {/* Upload / Analyze Section */}
            <Card className="w-full">
                <CardContent className="flex flex-col items-center space-y-6">
                    <Input
                        type="file"
                        accept="image/*"
                        className="w-full"
                    />
                    <Button className="w-full">
                        Analyze Image
                    </Button>
                </CardContent>
            </Card>

            {/* Placeholder for results */}
            <div id="result" className="w-full">
                {/* you can render heatmap overlay or confidence scores here */}
            </div>
            {/* Footer */}
            <footer className="w-full text-center text-sm text-gray-500 mt-12">
                <div>
                    Powered by Tibers Backend &middot; &copy; {new Date().getFullYear()} Tumor? I Hardly Know Her
                </div>
                <div>
                    <a
                        href="https://github.com/23maxb/TibersHackathonBackend/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-blue-500"
                    >
                        Info
                    </a>
                    <> &middot; </>
                    <a

                        href="https://github.com/23maxb/TibersHackathonBackend/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-blue-500"
                    >
                        Source
                    </a><> &middot; </>
                    <a

                        href="https://github.com/23maxb/TibersHackathonBackend/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-blue-500"
                    >Contact Us</a>
                </div>
            </footer>
        </div>

    );
}