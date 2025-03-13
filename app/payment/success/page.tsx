'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function PaymentSuccess() {
  const [status, setStatus] = useState<'success' | 'processing' | 'error'>('processing');
  const searchParams = useSearchParams();

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (sessionId) {
      // You could verify the subscription status here by calling your backend
      setStatus('success');
    } else {
      setStatus('error');
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-8 bg-white rounded-lg shadow-lg">
        {status === 'success' && (
          <>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Subscription Activated!</h2>
              <p className="text-gray-600 mb-8">Thank you for subscribing. Your subscription has been activated successfully.</p>
            </div>
          </>
        )}
        {status === 'processing' && (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Processing Subscription...</h2>
            <p className="text-gray-600">Please wait while we confirm your subscription.</p>
          </div>
        )}
        {status === 'error' && (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Subscription Error</h2>
            <p className="text-gray-600 mb-8">There was an error processing your subscription. Please try again.</p>
          </div>
        )}
        <div className="text-center mt-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
} 