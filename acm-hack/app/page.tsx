"use client";
import React, {useEffect, useState} from "react";
import {Card, CardContent, CardTitle, CardDescription} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useTheme} from "@/app/theme-context";
import {motion, AnimatePresence} from "framer-motion";
import Image from "next/image";

const cancerTypes = ["Stomach", "Lung", "Breast", "Colon", "Prostate", "Liver"];
const cancerEmojis: Record<string, string> = {
    stomach: "\uD83C\uDF7D️",
    lung: "\uD83E\uDEC1",
    breast: "\uD83C\uDF80",
    colon: "\uD83E\uDDA0",
    prostate: "\uD83E\uDD5C",
    liver: "\uD83E\uDDEC",
};

function TitleWithEmoji({selectedCancer, title}: { selectedCancer: string; title: string }) {
    const emoji = cancerEmojis[selectedCancer] || "\uD83E\uDDEC";
    return (
        <h2 className="text-2xl font-semibold mb-2">
            {emoji} {title}
        </h2>
    );
}

function getThemeClass(type: string) {
    return `theme-${type.toLowerCase()}`;
}

export default function HomePage() {
    const [selectedCancer, setSelectedCancer] = useState(cancerTypes[0]);
    const {setTheme} = useTheme();
    const [file, setFile] = useState<File | null>(null);
    const [categoryKey, setCategoryKey] = useState(0);

    useEffect(() => {
        setTheme(selectedCancer);
    }, [setTheme, selectedCancer]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("http://localhost:8000/model/", {
                method: "POST",
                body: formData,
            });
            if (!response.ok) {
                alert("Upload failed");
            } else {
                const data = await response.json();
                alert("Upload successful: " + JSON.stringify(data));
            }
        } catch (error) {
            alert(error);
        }
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectedCancer(value);
        setCategoryKey(prev => prev + 1); // Triggers re-animation
    };

    return (
        <>
            <div
                className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-black via-gray-900 to-black z-[-1]"/>

            <div
                className={`bg-background text-foreground py-12 flex flex-col items-center space-y-10 min-h-screen ${getThemeClass(
                    selectedCancer
                )}`}
            >
                <AnimatePresence mode="wait">
                    <Card
                        className="shadow-lg transition-all duration-300 hover:scale-[1.02]"
                        style={{
                            background: "var(--card)",
                            color: "var(--card-foreground)",
                        }}
                    >
                        <CardContent>
                            <motion.h1
                                key={categoryKey}
                                initial={{opacity: 0, y: -30}}
                                animate={{opacity: 1, y: 0}}
                                exit={{opacity: 0, y: -20}}
                                transition={{duration: 0.4}}
                                className="text-6xl font-bold text-center drop-shadow-lg text-[var(--primary)]"
                            >
                                <div className={"pb-4"}>OmniScan
                                </div>
                                <div className={"flex flex-col items-center drop-shadow-xl"}>
                                    <Image
                                        src="/img.png"
                                        alt="Logo"
                                        width={64}
                                        height={64}
                                    />
                                </div>
                            </motion.h1>
                        </CardContent>
                    </Card>
                </AnimatePresence>

                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.6, delay: 0.3}}
                    className="max-w-3xl w-full mx-auto space-y-6"
                >
                    <Card
                        className="bg-card text-card-foreground shadow-lg transition-all duration-300 hover:scale-[1.02]">
                        <CardContent className="text-center space-y-4">
                            <CardTitle className="text-4xl flex flex-col items-center gap-2">
                <span>
                  <select
                      className="text-2xl font-bold border rounded px-2 py-1"
                      value={selectedCancer}
                      onChange={handleCategoryChange}
                  >
                    {cancerTypes.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                  </select>
                  <TitleWithEmoji
                      selectedCancer={selectedCancer.toLowerCase()}
                      title="Cancer Detection AI"
                  />
                </span>
                            </CardTitle>
                            <CardDescription>
                                Upload an endoscopic image and let our CNN model determine whether there was cancer.
                            </CardDescription>
                        </CardContent>
                    </Card>

                    <Card
                        className="bg-card text-card-foreground shadow-lg transition-all duration-300 hover:scale-[1.02]">
                        <CardContent className="flex flex-col items-center space-y-6">
                            <Input
                                type="file"
                                accept="image/*"
                                className="w-full"
                                onChange={handleFileChange}
                            />
                            <Button
                                className="w-full transition-colors duration-300 hover:bg-blue-600"
                                onClick={handleUpload}
                                disabled={!file}
                            >
                                Analyze Image
                            </Button>
                        </CardContent>
                    </Card>

                    <motion.div
                        id="result"
                        className="w-full"
                        initial={{opacity: 0}}
                        animate={{opacity: file ? 1 : 0}}
                        transition={{duration: 0.4}}
                    >
                        {/* Future: Display heatmap or result components here */}
                    </motion.div>

                    <footer className="w-full text-center text-sm text-gray-500 mt-12">
                        <div>
                            React + Next &middot; Django &middot; &copy; {new Date().getFullYear()} Tumor? I Hardly Know
                            Her
                        </div>
                        <div className="space-x-2">
                            <a
                                href="https://github.com/23maxb/TibersHackathonBackend/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline text-blue-500"
                            >
                                Info
                            </a>
                            <span>&middot;</span>
                            <a
                                href="https://github.com/23maxb/TibersHackathonBackend/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline text-blue-500"
                            >
                                Source
                            </a>
                            <span>&middot;</span>
                            <a
                                href="https://github.com/23maxb/TibersHackathonBackend/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline text-blue-500"
                            >
                                Contact Us
                            </a>
                        </div>
                    </footer>
                </motion.div>
            </div>
        </>
    );
}
