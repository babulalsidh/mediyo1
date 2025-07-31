import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Shield, AlertTriangle, Thermometer, Calendar, FileText, Users, Pill } from 'lucide-react';

const Report = () => {
  const { id } = useParams();

  // Mock report data - in real app, fetch based on ID
  const report = {
    id: id,
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
    warnings: ['Do not exceed 8 tablets in 24 hours', 'Avoid alcohol consumption'],
    scannedDate: '2024-01-15'
  };

  const getSafetyColor = (safety: string) => {
    switch (safety) {
      case 'Safe':
        return 'text-green-800 bg-green-100 border-green-200';
      case 'Caution':
        return 'text-yellow-800 bg-yellow-100 border-yellow-200';
      case 'Unsafe':
        return 'text-red-800 bg-red-100 border-red-200';
      default:
        return 'text-gray-800 bg-gray-100 border-gray-200';
    }
  };

  const getAgeGroupColor = (status: string) => {
    switch (status) {
      case 'Safe':
        return 'text-green-700 bg-green-50';
      case 'Consult Doctor':
        return 'text-yellow-700 bg-yellow-50';
      case 'Not Recommended':
        return 'text-red-700 bg-red-50';
      default:
        return 'text-gray-700 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/dashboard"
            className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{report.medicineName}</h1>
              <p className="text-gray-600">Scanned on {report.scannedDate}</p>
            </div>
            <div className={`px-6 py-3 rounded-lg border ${getSafetyColor(report.safety)}`}>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span className="font-semibold">{report.safety}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Safety Score */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Safety Analysis</h2>
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-700">Overall Safety Score</span>
            <span className="text-2xl font-bold text-emerald-600">{report.safetyScore}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-emerald-600 h-3 rounded-full"
              style={{ width: `${report.safetyScore}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Composition */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Pill className="h-5 w-5 mr-2 text-emerald-600" />
              Composition
            </h2>
            <div className="space-y-3">
              {report.composition.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-700">{item.ingredient}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-12 text-right">
                      {item.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Age Group Recommendations */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2 text-blue-600" />
              Age Group Safety
            </h2>
            <div className="space-y-3">
              {Object.entries(report.ageGroups).map(([group, status]) => (
                <div key={group} className="flex items-center justify-between">
                  <span className="text-gray-700 capitalize">{group}</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getAgeGroupColor(status)}`}>
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Side Effects */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-yellow-600" />
              Possible Side Effects
            </h2>
            <ul className="space-y-2">
              {report.sideEffects.map((effect, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                  {effect}
                </li>
              ))}
            </ul>
          </div>

          {/* Storage & Expiry */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Thermometer className="h-5 w-5 mr-2 text-purple-600" />
              Storage Information
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Storage Temperature</span>
                <span className="font-medium text-gray-900">Below {report.storageTemp}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Expiry Date</span>
                <span className="font-medium text-gray-900">{report.expiryDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Certification</span>
                <span className="font-medium text-emerald-600">{report.certification}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dosage & Warnings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-green-600" />
              Recommended Dosage
            </h2>
            <p className="text-gray-700">{report.dosage}</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
              Important Warnings
            </h2>
            <ul className="space-y-2">
              {report.warnings.map((warning, index) => (
                <li key={index} className="flex items-start text-gray-700">
                  <div className="w-2 h-2 bg-red-400 rounded-full mr-3 mt-2"></div>
                  {warning}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">Medical Disclaimer</h4>
              <p className="text-sm text-blue-700">
                This AI-generated analysis is for informational purposes only and does not constitute medical advice, 
                diagnosis, or treatment. Always consult with qualified healthcare professionals before making any 
                medical decisions or changes to your medication regimen. The accuracy of this analysis depends on 
                the quality of the scanned image and may not capture all relevant information about the medication.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/scanner"
            className="inline-flex items-center justify-center px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Scan Another Medicine
          </Link>
          <Link
            to="/feedback"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Share Feedback
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Report;