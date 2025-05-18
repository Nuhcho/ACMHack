"use client";
import React, {useEffect, useState} from "react";
import {Card, CardContent, CardTitle, CardDescription} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useTheme} from "@/app/theme-context";
import {motion, AnimatePresence} from "framer-motion";
import Image from "next/image";

//begin

const cancerTypes = ["Stomach", "Lung", "Breast", "Colon", "Prostate", "Liver"];
const cancerEmojis: Record<string, string> = {
    stomach: "\uD83C\uDF7D️",
    lung: "\uD83E\uDEC1",
    breast: "\uD83C\uDF80",
    colon: "\uD83E\uDDA0",
    prostate: "\uD83E\uDD5C",
    liver: "\uD83E\uDDEC",
};

const tissueDescriptions: Record<string, string> = {
    ADI: "ADI: Adipose (fat tissue) 🧈\nClusters of lipid-filled cells that store energy and provide cushioning around organs. In histology, adipose appears as large, clear vacuoles pushing the nucleus to the cell edge.",
    DEB: "DEB: Debris (cellular waste) 🗑️\nFragments of dead cells and extracellular material left behind after tissue breakdown. Often seen as irregular, granular clumps outside healthy cells.",
    LYM: "LYM: Lymphocytes (immune cells) 🛡️\nSmall, round white blood cells responsible for mounting immune responses. They have a dense nucleus and scant cytoplasm, congregating where inflammation occurs.",
    MUC: "MUC: Mucus (protective secretion) 🧴\nGel-like substance secreted by epithelial cells that lubricates and protects tissue surfaces. Appears as amorphous, lightly stained pools between cells.",
    MUS: "MUS: Smooth Muscle (muscle tissue) 💪\nSpindle-shaped cells forming layers in the colon wall that help propel contents. Under microscope, they’re elongated with centrally placed nuclei.",
    NORM: "NORM: Normal Colon Mucosa (healthy tissue for reference) 🌱\nWell-organized epithelial lining with regular glandular crypts and uniform cell shape. Serves as the baseline “healthy” pattern against which pathology is judged.",
    STR: "STR: Cancer-associated Stroma (connective tissue around the tumor) 🕸️\nFibrous support tissue co-opted by a growing tumor, rich in collagen, blood vessels, and fibroblasts. Often shows desmoplastic (scar-like) changes and supports tumor invasion.",
    TUM: "TUM: Tumor (cancerous tissue) 🦠\nDensely packed, irregularly shaped cells exhibiting abnormal nuclei and loss of normal architecture. Indicates active neoplastic growth and invasion potential.",
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
    const [id, setID] = useState(-1);
    const [resultType, setResultType] = useState<string | null>(null);
    const [resultDescription, setResultDescription] = useState<string>("");

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
                setID(data.id); // Save the returned ID for prediction
            }
        } catch (error) {
            alert(error);
        }
    };

    const retrieveEval = async (id: number) => {
        let jsonToSend = {id};
        try {
            const response = await fetch("http://localhost:8000/predict/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(jsonToSend),
            });
            if (!response.ok) {
                alert("Request failed");
            } else {
                const data = await response.json();
                //alert("Result: " + JSON.stringify(data));
                let weights = data.classification;
                let maxIndex = 0;
                for (let i = 1; i < weights.length; i++) {
                    if (weights[maxIndex] < weights[i]) {
                        maxIndex = i;
                    }
                }
                setResultType(['ADI', 'MUS', 'NOR', 'DEB', 'LYM', 'MUC', 'STR', 'TUM'][maxIndex]);
                return resultType;
            }
        } catch (error) {
            alert("Error: " + error);
        }
    };

    useEffect(() => {
        if (resultType && tissueDescriptions[resultType]) {
            setResultDescription(tissueDescriptions[resultType]);
        } else {
            setResultDescription("");
        }
    }, [resultType]);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectedCancer(value);
        setCategoryKey(prev => prev + 1); // Triggers re-animation
    };

    useEffect(() => {
        // You can fetch or log information about gastrointestinal cancer types here.
        // For now, we'll just log a message.
        console.log("Gastrointestinal cancer info: Stomach, Colon, Liver, etc.");
    }, []);

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
                            <Button
                                className="w-full transition-colors duration-300 hover:bg-blue-600"
                                onClick={() => retrieveEval(id)}
                                disabled={id == -1}
                            >
                                Get Result
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

                    {resultDescription && (
                        <div className="max-w-2xl mx-auto my-6 p-4 bg-muted rounded shadow">
                            <pre className="whitespace-pre-wrap text-base">{resultDescription}</pre>
                        </div>
                    )}

                    {/* <div className="max-w-3xl w-full mx-auto mt-10">
                        <Card className="bg-card text-card-foreground shadow-lg transition-all duration-300 hover:scale-[1.01]">
                            <CardContent className="space-y-4 p-6">
                                <CardTitle className="text-2xl font-bold mb-2">
                                    Histological Tissue Types & Their Meanings
                                </CardTitle>
                                <ul className="space-y-3 text-base">
                                    <li>
                                        <span className="font-semibold">ADI: Adipose (fat tissue) 🧈</span><br />
                                        Clusters of lipid-filled cells that store energy and provide cushioning around organs. In histology, adipose appears as large, clear vacuoles pushing the nucleus to the cell edge.
                                    </li>
                                    <li>
                                        <span className="font-semibold">DEB: Debris (cellular waste) 🗑️</span><br />
                                        Fragments of dead cells and extracellular material left behind after tissue breakdown. Often seen as irregular, granular clumps outside healthy cells.
                                    </li>
                                    <li>
                                        <span className="font-semibold">LYM: Lymphocytes (immune cells) 🛡️</span><br />
                                        Small, round white blood cells responsible for mounting immune responses. They have a dense nucleus and scant cytoplasm, congregating where inflammation occurs.
                                    </li>
                                    <li>
                                        <span className="font-semibold">MUC: Mucus (protective secretion) 🧴</span><br />
                                        Gel-like substance secreted by epithelial cells that lubricates and protects tissue surfaces. Appears as amorphous, lightly stained pools between cells.
                                    </li>
                                    <li>
                                        <span className="font-semibold">MUS: Smooth Muscle (muscle tissue) 💪</span><br />
                                        Spindle-shaped cells forming layers in the colon wall that help propel contents. Under microscope, they’re elongated with centrally placed nuclei.
                                    </li>
                                    <li>
                                        <span className="font-semibold">NORM: Normal Colon Mucosa (healthy tissue for reference) 🌱</span><br />
                                        Well-organized epithelial lining with regular glandular crypts and uniform cell shape. Serves as the baseline “healthy” pattern against which pathology is judged.
                                    </li>
                                    <li>
                                        <span className="font-semibold">STR: Cancer-associated Stroma (connective tissue around the tumor) 🕸️</span><br />
                                        Fibrous support tissue co-opted by a growing tumor, rich in collagen, blood vessels, and fibroblasts. Often shows desmoplastic (scar-like) changes and supports tumor invasion.
                                    </li>
                                    <li>
                                        <span className="font-semibold">TUM: Tumor (cancerous tissue) 🦠</span><br />
                                        Densely packed, irregularly shaped cells exhibiting abnormal nuclei and loss of normal architecture. Indicates active neoplastic growth and invasion potential.
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>*/}

                    <footer className="w-full text-center text-sm text-gray-500 mt-12">
                        <div>
                            React + Next &middot; Django &middot; &copy; {new Date().getFullYear()} Tumor? I Hardly Know
                            Her
                        </div>
                        <div className="flex justify-center gap-4 mt-8 py-4">
                            <Button asChild variant="outline" className="w-48">
                                <a href="/about">About</a>
                            </Button>
                            <Button asChild variant="outline" className="w-48">
                                <a href="/info">Info</a>
                            </Button>
                            <Button asChild variant="outline" className="w-48">
                                <a href="/home">Home</a>
                            </Button>
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
                        {/* Navigation Buttons */}
                    </footer>
                </motion.div>
            </div>
        </>
    )
        ;
}


