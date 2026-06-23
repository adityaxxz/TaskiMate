import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

declare global {
  interface Window {
    google: any;
  }
}

export default function LoginPage() {
  const { googleLogin, isAuthenticated, isLoading, error: authError } = useAuth();
  const navigate = useNavigate();
  const [localError, setLocalError] = useState<string | null>(null);

  // If already authenticated, redirect immediately to prevent loop
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const initializeGoogle = () => {
      if (window.google) {
        try {
          window.google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || "1008719970978-831t21shves48gb2olm259rj2g9pn978.apps.googleusercontent.com",
            callback: async (response: any) => {
              setLocalError(null);
              try {
                await googleLogin(response.credential);
                navigate('/');
              } catch (err) {
                setLocalError(err instanceof Error ? err.message : 'Google authentication failed');
              }
            },
          });

          window.google.accounts.id.renderButton(
            document.getElementById("google-signin-btn"),
            { 
              theme: "filled_blue", 
              size: "large", 
              width: "320", 
              text: "signin_with", 
              shape: "rectangular" 
            }
          );
        } catch (err) {
          console.error("Failed to initialize Google Sign-In:", err);
          setLocalError("Google Identity Services failed to load. Please refresh.");
        }
      }
    };

    if (window.google) {
      initializeGoogle();
    } else {
      const script = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
      if (script) {
        script.addEventListener('load', initializeGoogle);
      }
    }
  }, [googleLogin, navigate]);

  const displayError = localError || authError;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-950/40 via-slate-950 to-slate-950 text-slate-100 overflow-hidden relative">
      {/* Decorative ambient glowing backdrops */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-fuchsia-500/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-md w-full px-6 z-10">
        <div className="bg-slate-900/60 backdrop-blur-2xl border border-slate-800/85 rounded-2xl p-8 shadow-2xl transition-all duration-300 hover:border-slate-700/60">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-3 bg-indigo-500/10 rounded-xl mb-4 border border-indigo-500/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-8 h-8 text-indigo-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            </div>
            
            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent mb-2">
              TaskiMate
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">
              Collaborative ticket dashboard and project workspace. Streamline your team's workflow in real-time.
            </p>
          </div>

          <div className="space-y-6">
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-slate-800/80"></div>
              <span className="flex-shrink mx-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Secure Access Portal
              </span>
              <div className="flex-grow border-t border-slate-800/80"></div>
            </div>

            {displayError && (
              <div className="p-4 bg-red-950/40 border border-red-500/30 rounded-xl text-red-300 text-sm leading-relaxed flex items-start space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mt-0.5 flex-shrink-0 text-red-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                <span>{displayError}</span>
              </div>
            )}

            <div className="flex flex-col items-center justify-center pt-2">
              {isLoading ? (
                <div className="flex flex-col items-center space-y-3 py-4">
                  <div className="w-8 h-8 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin"></div>
                  <span className="text-xs text-slate-400 font-medium">Authenticating via Google...</span>
                </div>
              ) : (
                <div className="w-full flex justify-center hover:scale-[1.02] transition-transform duration-200">
                  <div id="google-signin-btn"></div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-slate-600">
          <span>Protected by Google Identity Services &copy; 2026 TaskiMate Inc.</span>
        </div>
      </div>
    </div>
  );
}
