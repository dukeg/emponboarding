import { useEffect, useState } from 'react';
import Link from 'next/link';
import { chatWithAI, ChatMessage } from '@/lib/ai-service';

export default function AIAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await chatWithAI(input, messages);
      setMessages(prev => [...prev, response]);
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/emponboarding/dashboard" className="text-blue-600 hover:text-blue-700 font-medium">
            ← Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">AI Assistant</h1>
          <div></div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow flex flex-col h-96">
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="text-5xl mb-4">🤖</div>
                  <p className="text-gray-600 text-lg">Hi! I'm your AI Assistant</p>
                  <p className="text-gray-500 text-sm mt-2">Ask me anything about your onboarding</p>
                </div>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))
            )}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-900 px-4 py-2 rounded-lg">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Form */}
          <div className="border-t border-gray-200 p-4">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me about onboarding, training, documents..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition"
              >
                Send
              </button>
            </form>

            {/* Quick Questions */}
            {messages.length === 0 && (
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  onClick={() => setInput('What documents do I need to submit?')}
                  className="text-left px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm text-gray-700 transition"
                >
                  📄 What documents do I need?
                </button>
                <button
                  onClick={() => setInput('When is my training?')}
                  className="text-left px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm text-gray-700 transition"
                >
                  📅 When is training?
                </button>
                <button
                  onClick={() => setInput('Who is my manager?')}
                  className="text-left px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm text-gray-700 transition"
                >
                  👤 Who is my manager?
                </button>
                <button
                  onClick={() => setInput('How long does onboarding take?')}
                  className="text-left px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm text-gray-700 transition"
                >
                  ⏱️ How long is onboarding?
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-3">💡 Tips for Using AI Assistant</h3>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>• Ask questions about your onboarding process</li>
            <li>• Get information about required documents</li>
            <li>• Learn about training schedules and sessions</li>
            <li>• Find contact information for your team</li>
            <li>• Get help with common onboarding tasks</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
