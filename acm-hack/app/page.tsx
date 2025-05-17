"use client";
import React, {useEffect, useState} from "react";
import {Card, CardContent, CardTitle, CardDescription} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useTheme} from "@/app/theme-context";

const cancerTypes = [
    "Stomach",
    "Lung",
    "Breast",
    "Colon",
    "Prostate",
    "Liver"
];


const cancerEmojis: Record<string, string> = {
    stomach: "🍽️",
    lung: "🫁",
    breast: "🎀",
    colon: "🦠",
    prostate: "🥜",
    liver: "🧬",
};

function TitleWithEmoji({selectedCancer, title}: { selectedCancer: string, title: string }) {
    const emoji = cancerEmojis[selectedCancer] || "🧬";
    return (
        <h1 className="text-3xl font-robotoMono font-bold mb-4">
            {emoji} {title}
        </h1>
    );
}

function getThemeClass(type: string) {
    return `theme-${type.toLowerCase()}`;
}

export default function HomePage() {
    const [selectedCancer, setSelectedCancer] = useState(cancerTypes[0]);
    const {setTheme} = useTheme();
    const [file, setFile] = useState<File | null>(null);

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
                // Do something with the JSON response, e.g., display it
                alert("Upload successful: " + JSON.stringify(data));
                // Optionally, set state to display results in the UI
            }
        } catch (error) {
            alert(error);
        }
    };
    return (
        <>
            <div
                className="fixed "
                style={{background: "black"}}/>
            <div
                className={`bg-background text-foreground py-12 px-4 flex flex-col items-center space-y-10 min-h-screen ${getThemeClass(selectedCancer)}`}
            >   {/* Hero Section */}
                <div className={"max-w-3xl mx-auto space-y-6"}>
                    <Card className="w-full bg-card text-card-foreground">
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
                                <TitleWithEmoji selectedCancer={selectedCancer.toLowerCase()}
                                                title="Cancer Detection AI"/>
                            </span>
                            </CardTitle>
                            <CardDescription>
                                Upload an endoscopic image and let our CNN model highlight
                                suspicious regions in seconds.
                            </CardDescription>
                        </CardContent>
                    </Card>

                    {/* Upload / Analyze Section */}
                    <Card className="w-full bg-card text-card-foreground">
                        <CardContent className="flex flex-col items-center space-y-6">
                            <Input
                                type="file"
                                accept="image/*"
                                className="w-full"
                                onChange={handleFileChange}
                            />
                            <Button className="w-full" onClick={handleUpload} disabled={!file}>
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
                            Powered by Tibers Backend &middot; &copy; {new Date().getFullYear()} Tumor? I Hardly Know
                            Her
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
                            </a>
                            <> &middot; </>
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
                </div>
            </div>
        </>
    )
        ;
}