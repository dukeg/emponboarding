import { useEffect, useState } from 'react';
import Link from 'next/link';

interface GlobalOffice {
  id: string;
  name: string;
  country: string;
  timezone: string;
  employees: number;
  language: string;
  currency: string;
  compliance: string[];
}

interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

export default function GlobalOperations() {
  const [offices, setOffices] = useState<GlobalOffice[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  const languages: LanguageOption[] = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
    { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
    { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
    { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
    { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  ];

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CNY', 'INR', 'AUD', 'CAD', 'CHF', 'SGD'];

  useEffect(() => {
    setOffices([
      {
        id: '1',
        name: 'San Francisco HQ',
        country: 'United States',
        timezone: 'PST (UTC-8)',
        employees: 450,
        language: 'English',
        currency: 'USD',
        compliance: ['GDPR', 'CCPA', 'SOC 2'],
      },
      {
        id: '2',
        name: 'London Office',
        country: 'United Kingdom',
        timezone: 'GMT (UTC+0)',
        employees: 280,
        language: 'English',
        currency: 'GBP',
        compliance: ['GDPR', 'UK Data Protection Act'],
      },
      {
        id: '3',
        name: 'Tokyo Office',
        country: 'Japan',
        timezone: 'JST (UTC+9)',
        employees: 150,
        language: 'Japanese',
        currency: 'JPY',
        compliance: ['APPI', 'Local Labor Laws'],
      },
      {
        id: '4',
        name: 'Singapore Hub',
        country: 'Singapore',
        timezone: 'SGT (UTC+8)',
        employees: 200,
        language: 'English',
        currency: 'SGD',
        compliance: ['PDPA', 'Local Regulations'],
      },
      {
        id: '5',
        name: 'Sydney Office',
        country: 'Australia',
        timezone: 'AEDT (UTC+11)',
        employees: 120,
        language: 'English',
        currency: 'AUD',
        compliance: ['Privacy Act', 'Local Laws'],
      },
      {
        id: '6',
        name: 'Berlin Office',
        country: 'Germany',
        timezone: 'CET (UTC+1)',
        employees: 180,
        language: 'German',
        currency: 'EUR',
        compliance: ['GDPR', 'German Labor Law'],
      },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/emponboarding/dashboard" className="text-blue-600 hover:text-blue-700 font-medium">
            ← Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Global Operations</h1>
          <div></div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Language & Currency Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold text-gray-900 mb-4">🌍 Select Language</h3>
            <div className="grid grid-cols-2 gap-3">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLanguage(lang.code)}
                  className={`p-3 rounded-lg border-2 transition ${
                    selectedLanguage === lang.code
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-1">{lang.flag}</div>
                  <p className="text-xs font-medium text-gray-900">{lang.name}</p>
                  <p className="text-xs text-gray-500">{lang.nativeName}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold text-gray-900 mb-4">💱 Select Currency</h3>
            <div className="grid grid-cols-2 gap-3">
              {currencies.map((currency) => (
                <button
                  key={currency}
                  onClick={() => setSelectedCurrency(currency)}
                  className={`p-3 rounded-lg border-2 transition text-center ${
                    selectedCurrency === currency
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <p className="font-semibold text-gray-900">{currency}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Global Offices */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">🏢 Global Offices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offices.map((office) => (
              <div key={office.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
                <h3 className="font-semibold text-gray-900 mb-2">{office.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{office.country}</p>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-500">Timezone:</span>
                    <span className="text-sm text-gray-900">{office.timezone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-500">Employees:</span>
                    <span className="text-sm text-gray-900">{office.employees}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-500">Language:</span>
                    <span className="text-sm text-gray-900">{office.language}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-500">Currency:</span>
                    <span className="text-sm text-gray-900">{office.currency}</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-3">
                  <p className="text-xs font-semibold text-gray-600 mb-2">Compliance:</p>
                  <div className="flex flex-wrap gap-2">
                    {office.compliance.map((comp) => (
                      <span key={comp} className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Regional Compliance */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">⚖️ Regional Compliance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-l-4 border-blue-600 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">GDPR (Europe)</h3>
              <p className="text-sm text-gray-600">General Data Protection Regulation compliance for all European operations</p>
            </div>
            <div className="border-l-4 border-green-600 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">CCPA (California)</h3>
              <p className="text-sm text-gray-600">California Consumer Privacy Act compliance for US operations</p>
            </div>
            <div className="border-l-4 border-purple-600 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">APPI (Japan)</h3>
              <p className="text-sm text-gray-600">Act on Protection of Personal Information for Japanese operations</p>
            </div>
            <div className="border-l-4 border-orange-600 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">PDPA (Singapore)</h3>
              <p className="text-sm text-gray-600">Personal Data Protection Act compliance for Asia-Pacific region</p>
            </div>
          </div>
        </div>

        {/* Localization Features */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">🌐 Localization Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white rounded p-4">
              <p className="font-semibold text-gray-900 mb-1">Multi-Language Support</p>
              <p className="text-sm text-gray-600">20+ languages supported globally</p>
            </div>
            <div className="bg-white rounded p-4">
              <p className="font-semibold text-gray-900 mb-1">Timezone Management</p>
              <p className="text-sm text-gray-600">Automatic timezone conversion</p>
            </div>
            <div className="bg-white rounded p-4">
              <p className="font-semibold text-gray-900 mb-1">Multi-Currency</p>
              <p className="text-sm text-gray-600">Real-time currency conversion</p>
            </div>
            <div className="bg-white rounded p-4">
              <p className="font-semibold text-gray-900 mb-1">Regional Templates</p>
              <p className="text-sm text-gray-600">Customized onboarding by region</p>
            </div>
            <div className="bg-white rounded p-4">
              <p className="font-semibold text-gray-900 mb-1">Cultural Adaptation</p>
              <p className="text-sm text-gray-600">Culturally sensitive content</p>
            </div>
            <div className="bg-white rounded p-4">
              <p className="font-semibold text-gray-900 mb-1">Compliance Tracking</p>
              <p className="text-sm text-gray-600">Regional compliance monitoring</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
