import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Document {
  id: string;
  name: string;
  description: string;
  required: boolean;
  status: 'pending' | 'submitted' | 'approved' | 'rejected';
  uploadedDate?: string;
}

export default function Documents() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setDocuments([
      { id: '1', name: 'Government ID', description: 'Valid passport or driver\'s license', required: true, status: 'approved', uploadedDate: '2024-04-01' },
      { id: '2', name: 'Tax Form (W-4)', description: 'Federal tax withholding form', required: true, status: 'submitted', uploadedDate: '2024-04-02' },
      { id: '3', name: 'I-9 Verification', description: 'Employment eligibility verification', required: true, status: 'pending' },
      { id: '4', name: 'Insurance Documents', description: 'Health insurance beneficiary forms', required: false, status: 'pending' },
      { id: '5', name: 'Direct Deposit Form', description: 'Banking information for payroll', required: true, status: 'submitted', uploadedDate: '2024-04-02' },
    ]);
    setIsLoading(false);
  }, []);

  const handleFileUpload = (docId: string) => {
    setDocuments(documents.map(doc =>
      doc.id === docId
        ? { ...doc, status: 'submitted', uploadedDate: new Date().toISOString().split('T')[0] }
        : doc
    ));
  };

  const pendingCount = documents.filter(d => d.status === 'pending').length;
  const approvedCount = documents.filter(d => d.status === 'approved').length;

  if (isLoading) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/emponboarding/dashboard" className="text-blue-600 hover:text-blue-700 font-medium">
            ← Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Document Upload</h1>
          <div></div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Pending</p>
            <p className="text-3xl font-bold text-orange-600 mt-2">{pendingCount}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Submitted</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              {documents.filter(d => d.status === 'submitted').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Approved</p>
            <p className="text-3xl font-bold text-green-600 mt-2">{approvedCount}</p>
          </div>
        </div>

        <div className="space-y-4">
          {documents.map((doc) => (
            <div key={doc.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">{doc.name}</h3>
                    {doc.required && (
                      <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-red-100 text-red-700">
                        Required
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mt-1">{doc.description}</p>
                  {doc.uploadedDate && (
                    <p className="text-gray-500 text-xs mt-2">
                      Uploaded: {new Date(doc.uploadedDate).toLocaleDateString()}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3 ml-4">
                  {doc.status === 'approved' && (
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-100">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs font-semibold text-green-700">Approved</span>
                    </div>
                  )}
                  {doc.status === 'submitted' && (
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-xs font-semibold text-blue-700">Submitted</span>
                    </div>
                  )}
                  {doc.status === 'pending' && (
                    <button
                      onClick={() => handleFileUpload(doc.id)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition"
                    >
                      Upload
                    </button>
                  )}
                  {doc.status === 'rejected' && (
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-100">
                      <span className="text-xs font-semibold text-red-700">Rejected</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">Document Upload Guidelines</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• All documents must be clear and legible</li>
            <li>• Accepted formats: PDF, JPG, PNG (max 10MB)</li>
            <li>• Keep copies for your records</li>
            <li>• All required documents must be submitted within 5 business days</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
