import React, { useState, useEffect } from 'react';
import { MessageCircle, Send, Bot, User, Trash2, Settings, AlertCircle, Download, Save } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface UserPreferences {
  theme: 'light' | 'dark';
  notifications: boolean;
  autoSave: boolean;
  geminiApiKey: string;
}

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [preferences, setPreferences] = useState<UserPreferences>({
    theme: 'light',
    notifications: true,
    autoSave: true,
    geminiApiKey: 'AIzaSyCWcQoMuzcH723_hNAGSXnOD1NWzoGNZP0'
  });
  const [showSettings, setShowSettings] = useState(false);
  const [error, setError] = useState<string>('');
  const [apiStatus, setApiStatus] = useState<'idle' | 'testing' | 'connected' | 'error'>('idle');

  // Load data from localStorage on component mount
  useEffect(() => {
    loadFromLocalStorage();
    // Test API connection on load
    if (preferences.geminiApiKey) {
      testApiConnection();
    }
  }, []);

  // Save data to localStorage whenever messages or preferences change
  useEffect(() => {
    if (preferences.autoSave) {
      saveToLocalStorage();
    }
  }, [messages, preferences]);

  const loadFromLocalStorage = () => {
    try {
      // Load messages
      const savedMessages = localStorage.getItem('aiAssistant_messages');
      if (savedMessages) {
        const parsedMessages = JSON.parse(savedMessages).map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(parsedMessages);
      } else {
        // Set default welcome message
        setMessages([{
          id: '1',
          text: 'Hello! I\'m your AI medicine assistant powered by Gemini. Your API key is configured and ready to use. Ask me anything about medicines, drug interactions, side effects, or general health advice. Your conversations are saved locally.',
          sender: 'ai',
          timestamp: new Date()
        }]);
      }

      // Load preferences
      const savedPreferences = localStorage.getItem('aiAssistant_preferences');
      if (savedPreferences) {
        setPreferences(JSON.parse(savedPreferences));
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
  };

  const saveToLocalStorage = () => {
    try {
      // Save messages with timestamp
      localStorage.setItem('aiAssistant_messages', JSON.stringify(messages));
      localStorage.setItem('aiAssistant_preferences', JSON.stringify(preferences));
      
      // Save last save timestamp
      localStorage.setItem('aiAssistant_lastSave', new Date().toISOString());
      
      // Save conversation count for analytics
      const conversationCount = messages.filter(msg => msg.sender === 'user').length;
      localStorage.setItem('aiAssistant_conversationCount', conversationCount.toString());
      
      console.log('Data saved to localStorage successfully');
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      setError('Failed to save data locally. Please check your browser storage.');
    }
  };

  const clearChatHistory = () => {
    setMessages([{
      id: Date.now().toString(),
      text: 'Chat history cleared. How can I help you today?',
      sender: 'ai',
      timestamp: new Date()
    }]);
    localStorage.removeItem('aiAssistant_messages');
  };

  const callGeminiAPI = async (prompt: string): Promise<string> => {
    if (!preferences.geminiApiKey) {
      throw new Error('Gemini API key not configured. Please add your API key in settings.');
    }

    const systemPrompt = `You are a helpful AI medicine assistant. Provide accurate, helpful information about medicines, drug interactions, side effects, and general health advice. Always recommend consulting healthcare professionals for specific medical advice. Keep responses concise but informative.`;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${preferences.geminiApiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: systemPrompt },
                { text: prompt }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        return data.candidates[0].content.parts[0].text;
      } else {
        throw new Error('Invalid response format from Gemini API');
      }
    } catch (error) {
      console.error('Gemini API error:', error);
      throw error;
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);
    setError('');

    try {
      const aiResponse = await callGeminiAPI(inputText);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setError(error instanceof Error ? error.message : 'Failed to get AI response');
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error. Please check your API key and try again.',
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const updatePreference = (key: keyof UserPreferences, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const testApiConnection = async () => {
    if (!preferences.geminiApiKey) {
      setApiStatus('error');
      return;
    }

    setApiStatus('testing');
    try {
      const response = await callGeminiAPI('Hello');
      setApiStatus('connected');
      setError('');
    } catch (error) {
      setApiStatus('error');
      console.error('API connection test failed:', error);
    }
  };

  const testApiKey = async () => {
    if (!preferences.geminiApiKey) {
      setError('Please enter your Gemini API key first');
      return;
    }

    setIsTyping(true);
    setError('');

    try {
      const response = await callGeminiAPI('Hello, can you confirm you are working?');
      setError('');
      setApiStatus('connected');
      alert('API key is working! You can now chat with the AI assistant.');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'API key test failed');
      setApiStatus('error');
    } finally {
      setIsTyping(false);
    }
  };

  const exportChatHistory = () => {
    try {
      const exportData = {
        messages: messages,
        exportDate: new Date().toISOString(),
        totalMessages: messages.length,
        userMessages: messages.filter((msg: Message) => msg.sender === 'user').length,
        aiMessages: messages.filter((msg: Message) => msg.sender === 'ai').length
      };
      
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ai-assistant-chat-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      alert('Chat history exported successfully!');
    } catch (error) {
      console.error('Error exporting chat history:', error);
      setError('Failed to export chat history');
    }
  };

  const manualSave = () => {
    saveToLocalStorage();
    alert('Data saved manually!');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className={`bg-white rounded-lg shadow-2xl border border-gray-200 w-96 h-96 mb-4 flex flex-col ${preferences.theme === 'dark' ? 'bg-gray-800 text-white' : ''}`}>
          {/* Header */}
          <div className="bg-emerald-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5" />
              <span className="font-medium">AI Assistant (Gemini)</span>
              <div className="flex items-center space-x-1">
                <div className={`w-2 h-2 rounded-full ${
                  apiStatus === 'connected' ? 'bg-green-400' :
                  apiStatus === 'testing' ? 'bg-yellow-400' :
                  apiStatus === 'error' ? 'bg-red-400' : 'bg-gray-400'
                }`}></div>
                <span className="text-xs opacity-75">
                  {apiStatus === 'connected' ? 'Connected' :
                   apiStatus === 'testing' ? 'Testing...' :
                   apiStatus === 'error' ? 'Error' : 'Idle'}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-1 hover:bg-emerald-700 rounded transition-colors"
              >
                <Settings className="h-4 w-4" />
              </button>
              <button
                onClick={clearChatHistory}
                className="p-1 hover:bg-emerald-700 rounded transition-colors"
                title="Clear chat history"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <h3 className="font-medium mb-3">Settings</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-600 block mb-1">Gemini API Key</label>
                  <input
                    type="password"
                    value={preferences.geminiApiKey}
                    onChange={(e) => updatePreference('geminiApiKey', e.target.value)}
                    placeholder="Enter your Gemini API key"
                    className="w-full text-sm border rounded px-2 py-1"
                  />
                  <button
                    onClick={testApiKey}
                    className="mt-2 text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    Test API Key
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Theme</span>
                  <select
                    value={preferences.theme}
                    onChange={(e) => updatePreference('theme', e.target.value)}
                    className="text-sm border rounded px-2 py-1"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Auto-save</span>
                  <input
                    type="checkbox"
                    checked={preferences.autoSave}
                    onChange={(e) => updatePreference('autoSave', e.target.checked)}
                    className="rounded"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Notifications</span>
                  <input
                    type="checkbox"
                    checked={preferences.notifications}
                    onChange={(e) => updatePreference('notifications', e.target.checked)}
                    className="rounded"
                  />
                </div>
                
                {/* Local Storage Controls */}
                <div className="border-t pt-3 mt-3">
                  <h4 className="text-sm font-medium mb-2">Local Storage</h4>
                  <div className="space-y-2">
                    <button
                      onClick={manualSave}
                      className="w-full flex items-center justify-center px-3 py-2 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition-colors"
                    >
                      <Save className="h-3 w-3 mr-1" />
                      Save Now
                    </button>
                    <button
                      onClick={exportChatHistory}
                      className="w-full flex items-center justify-center px-3 py-2 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Export Chat
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 border-l-4 border-red-400 text-red-700 flex items-center space-x-2">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-2 ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.sender === 'ai' && (
                  <div className="p-1 bg-emerald-100 rounded-full">
                    <Bot className="h-4 w-4 text-emerald-600" />
                  </div>
                )}
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
                {message.sender === 'user' && (
                  <div className="p-1 bg-blue-100 rounded-full">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex items-start space-x-2">
                <div className="p-1 bg-emerald-100 rounded-full">
                  <Bot className="h-4 w-4 text-emerald-600" />
                </div>
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={preferences.geminiApiKey ? "Ask about medicines..." : "Add API key in settings first"}
                disabled={!preferences.geminiApiKey}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <button
                onClick={handleSendMessage}
                disabled={!preferences.geminiApiKey || !inputText.trim()}
                className="bg-emerald-600 text-white p-2 rounded-lg hover:bg-emerald-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-emerald-600 text-white p-4 rounded-full shadow-lg hover:bg-emerald-700 transition-colors"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    </div>
  );
};

export default AIAssistant; 