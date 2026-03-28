import { ArrowLeft, Upload, Camera, Image, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const AIScanner = () => {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<{ disease: string; confidence: number; recommendation: string } | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
      setResult(null);
    }
  };

  const handleScan = async () => {
    setScanning(true);
    // Mock AI result
    await new Promise((r) => setTimeout(r, 2500));
    setResult({
      disease: "Leaf Blight (Early Stage)",
      confidence: 87,
      recommendation: "Apply copper-based fungicide within 48 hours. Ensure proper drainage around the affected area.",
    });
    setScanning(false);
  };

  return (
    <div className="pb-24 px-5 pt-12">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-xl glass-card flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-xl font-bold text-foreground">AI Scanner</h1>
      </div>

      <input type="file" ref={fileRef} accept="image/*" capture="environment" className="hidden" onChange={handleFile} />

      {!image ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card rounded-2xl p-8 text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Camera className="w-10 h-10 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Scan Your Crop</h3>
          <p className="text-sm text-muted-foreground mb-6">Take a photo or upload an image to detect diseases</p>
          <div className="flex gap-3">
            <Button onClick={() => fileRef.current?.click()} className="flex-1 gap-2">
              <Camera className="w-4 h-4" /> Camera
            </Button>
            <Button variant="outline" onClick={() => fileRef.current?.click()} className="flex-1 gap-2">
              <Upload className="w-4 h-4" /> Upload
            </Button>
          </div>
        </motion.div>
      ) : (
        <div className="space-y-4">
          <div className="glass-card rounded-2xl overflow-hidden">
            <img src={image} alt="Scanned crop" className="w-full h-56 object-cover" />
          </div>

          {!result && (
            <Button onClick={handleScan} disabled={scanning} className="w-full gap-2">
              {scanning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Image className="w-4 h-4" />}
              {scanning ? "Analyzing..." : "Analyze Image"}
            </Button>
          )}

          <AnimatePresence>
            {result && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs text-muted-foreground">Detected</p>
                    <p className="text-base font-semibold text-destructive">{result.disease}</p>
                  </div>
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">
                    {result.confidence}% match
                  </span>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Recommendation</p>
                  <p className="text-sm text-foreground">{result.recommendation}</p>
                </div>
                <Button variant="outline" className="w-full" onClick={() => { setImage(null); setResult(null); }}>
                  Scan Another
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default AIScanner;
