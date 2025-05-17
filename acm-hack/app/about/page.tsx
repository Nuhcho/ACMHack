// app/about/page.tsx

import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
  } from "@/components/ui/card";
  
  export default function AboutPage() {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4">
        <Card>
          <CardHeader>
            <CardTitle>About This Project</CardTitle>
            <CardDescription>
              Early detection of stomach cancer via convolutional neural networks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p>
              Our platform leverages a custom Convolutional Neural Network (CNN)
              trained on annotated endoscopic images to detect early signs of
              gastric cancer. By highlighting suspicious regions in just seconds,
              we aim to assist clinicians in making faster, more accurate
              diagnoses.
            </p>
            <p>
              Built on Intel Tiber Cloud’s AI accelerators, our model processes
              high-resolution imagery with low latency, ensuring real-time
              feedback during endoscopic procedures. The interface is designed to
              be intuitive, presenting heatmaps and confidence scores alongside
              each frame.
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                🔬 <strong>Model:</strong> Custom 12-layer CNN with transfer
                learning from ImageNet
              </li>
              <li>
                ☁️ <strong>Infrastructure:</strong> Intel Tiber Cloud GPU
                instances for training & inference
              </li>
              <li>
                🛡️ <strong>Compliance:</strong> HIPAA-ready data handling and
                encryption
              </li>
            </ul>
            <p>
              This project was developed by the ACM Hack team at SCU, combining
              expertise in medical imaging, deep learning, and cloud-native
              deployment. Our goal is to democratize access to AI-powered cancer
              screening tools and ultimately improve patient outcomes.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }
  