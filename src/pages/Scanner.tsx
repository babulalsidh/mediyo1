import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Upload, Zap, Scan, CheckCircle, AlertTriangle } from 'lucide-react';

const Scanner = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const navigate = useNavigate();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (error) {
      alert('Camera access denied or not available');
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (context) {
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
            setSelectedFile(file);
            setPreview(canvas.toDataURL());
            stopCamera();
          }
        });
      }
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      setIsCameraActive(false);
    }
  };

  const handleScan = async () => {
    if (!selectedFile) return;

    setIsScanning(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock scan result
    const mockResult = {
      id: Date.now().toString(),
      medicineName: 'Paracetamol 500mg',
      composition: [
        { ingredient: 'Paracetamol', percentage: 85 },
        { ingredient: 'Starch', percentage: 10 },
        { ingredient: 'Other excipients', percentage: 5 }
      ],
      safety: 'Safe',
      safetyScore: 92,
      ageGroups: {
        children: 'Consult Doctor',
        adults: 'Safe',
        elderly: 'Safe',
        pregnant: 'Consult Doctor'
      },
      sideEffects: ['Nausea', 'Dizziness', 'Skin rash (rare)'],
      dosage: 'Adults: 1-2 tablets every 4-6 hours',
      expiryDate: '2025-12-31',
      storageTemp: '25°C',
      certification: 'FDA Approved',
      warnings: ['Do not exceed 8 tablets in 24 hours', 'Avoid alcohol consumption']
    };

    setScanResult(mockResult);
    setIsScanning(false);
    
    // Navigate to report page after 2 seconds
    setTimeout(() => {
      navigate(`/report/${mockResult.id}`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Medicine Scanner</h1>
          <p className="text-gray-600">
            Upload an image or use your camera to scan medicine packages
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {!scanResult ? (
            <>
              {/* Upload Methods */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div 
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-emerald-500 transition-colors cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Image</h3>
                    <p className="text-gray-600 mb-4">
                      Select an image from your device
                    </p>
                    <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                      Choose File
                    </button>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>

                <div className="text-center">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-blue-500 transition-colors">
                    <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Use Camera</h3>
                    <p className="text-gray-600 mb-4">
                      Capture image using your camera
                    </p>
                    <button
                      onClick={startCamera}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Start Camera
                    </button>
                  </div>
                </div>
              </div>

              {/* Camera View */}
              {isCameraActive && (
                <div className="mb-8">
                  <div className="relative bg-black rounded-lg overflow-hidden">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full max-h-96 object-cover"
                    />
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
                      <button
                        onClick={capturePhoto}
                        className="bg-white text-gray-900 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        Capture
                      </button>
                      <button
                        onClick={stopCamera}
                        className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Preview and Scan */}
              {preview && (
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Preview</h3>
                  <div className="relative">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full max-h-96 object-contain bg-gray-100 rounded-lg"
                    />
                    <button
                      onClick={() => {
                        setPreview(null);
                        setSelectedFile(null);
                      }}
                      className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}

              {/* Scan Button */}
              {selectedFile && (
                <div className="text-center">
                  <button
                    onClick={handleScan}
                    disabled={isScanning}
                    className="inline-flex items-center px-8 py-4 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isScanning ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Scan className="mr-2 h-5 w-5" />
                        Scan Medicine
                      </>
                    )}
                  </button>
                  
                  {isScanning && (
                    <div className="mt-4">
                      <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                        <Zap className="h-4 w-4 text-emerald-600" />
                        <span>AI is analyzing your medicine...</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            /* Scan Result Preview */
            <div className="text-center">
              <div className="mb-6">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Scan Complete!</h2>
                <p className="text-gray-600">Medicine successfully analyzed</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {scanResult.medicineName}
                </h3>
                <div className="flex items-center justify-center space-x-4">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                    scanResult.safety === 'Safe' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {scanResult.safety}
                  </span>
                  <span className="text-gray-600">
                    Safety Score: {scanResult.safetyScore}%
                  </span>
                </div>
              </div>

              <p className="text-gray-600 mb-4">
                Redirecting to detailed report...
              </p>
              
              <div className="animate-pulse">
                <div className="h-2 bg-emerald-200 rounded-full">
                  <div className="h-2 bg-emerald-600 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Safety Notice */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900">Important Disclaimer</h4>
              <p className="text-sm text-blue-700 mt-1">
                This AI analysis is for informational purposes only and should not replace professional medical advice. 
                Always consult with healthcare providers before making medication decisions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scanner;