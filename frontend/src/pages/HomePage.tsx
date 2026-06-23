import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout.tsx';
import ProjectListPage from './ProjectListPage.tsx';

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'dev' | 'pm' | 'admin'>('dev');

  // Smooth scroll helper for navbar links
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Loading state matching ProtectedRoute spinner
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-indigo-500/20 animate-pulse"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-indigo-500 animate-spin"></div>
          </div>
          <p className="text-indigo-400 font-medium tracking-widest text-sm animate-pulse">
            SECURELY LOADING...
          </p>
        </div>
      </div>
    );
  }

  // If authenticated, render the logged-in app interface
  if (isAuthenticated) {
    return (
      <Layout>
        <ProjectListPage />
      </Layout>
    );
  }

  // If not authenticated, render the enterprise landing page
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Sticky Navigation Header */}
      <header className="sticky top-0 bg-slate-950/80 backdrop-blur-md border-b border-slate-900 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-600/30">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5.5 h-5.5 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              TaskiMate
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-400">
            <button onClick={() => scrollToSection('features')} className="hover:text-slate-100 transition-colors">Features</button>
            <button onClick={() => scrollToSection('audience')} className="hover:text-slate-100 transition-colors">Why TaskiMate?</button>
            <button onClick={() => scrollToSection('pricing')} className="hover:text-slate-100 transition-colors">Pricing</button>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/login')}
              className="text-sm font-medium text-slate-400 hover:text-slate-100 transition-colors px-3 py-1.5"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/login')}
              className="text-sm font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-all shadow-md shadow-indigo-600/25 hover:shadow-indigo-500/35 hover:scale-[1.02]"
            >
              Get started free
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 px-6 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full bg-indigo-600/10 blur-[130px] pointer-events-none"></div>
        <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] rounded-full bg-fuchsia-600/5 blur-[120px] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-xs font-semibold tracking-wide text-indigo-400 mb-6 uppercase">
            <span>🚀 Version 2.0 Available</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.15]">
            Agile software development,<br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              designed for high velocity
            </span>
          </h2>

          <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-10">
            TaskiMate combines a Jira-inspired agile dashboard with production-grade ACID transactions. Plan, track, and collaborate on software releases in real-time, backed by enterprise security.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-16">
            <button
              onClick={() => navigate('/login')}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-medium px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-600/30 hover:scale-[1.02] flex items-center justify-center space-x-2"
            >
              <span>Get started for free</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800/80 active:bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-medium px-8 py-3.5 rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center"
            >
              Learn more
            </button>
          </div>

          {/* Interactive Mock Dashboard */}
          <div className="relative rounded-2xl border border-slate-800 bg-slate-900/40 p-4 backdrop-blur-xl shadow-2xl overflow-hidden max-w-4xl mx-auto group hover:border-slate-700/60 transition-colors duration-300">
            {/* Window bar */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                <span className="text-xs text-slate-500 font-medium ml-2">TaskiMate Workspace — Project Dashboard</span>
              </div>
              <div className="flex items-center space-x-1.5 px-2.5 py-1 bg-slate-950/60 rounded-md border border-slate-800">
                <span className="text-[10px] text-indigo-400 font-semibold uppercase tracking-wider animate-pulse">● Active</span>
              </div>
            </div>

            {/* Dashboard Mock Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              {/* To Do Column */}
              <div className="bg-slate-950/40 border border-slate-800/60 rounded-lg p-3">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">To Do</span>
                  <span className="text-[10px] bg-slate-900 px-1.5 py-0.5 rounded text-slate-500 font-bold border border-slate-800">2</span>
                </div>
                <div className="space-y-2">
                  <div className="bg-slate-900/80 border border-slate-800 rounded p-2.5 hover:border-slate-700/60 cursor-pointer transition-all">
                    <span className="text-[9px] font-bold text-indigo-400 uppercase">TaskiMate #101</span>
                    <h4 className="text-xs font-semibold text-slate-200 mt-1">Design Atlassian Landing Page</h4>
                    <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-800/50">
                      <div className="w-4.5 h-4.5 rounded-full bg-indigo-500/20 flex items-center justify-center text-[8px] text-indigo-300 font-bold border border-indigo-500/30">AD</div>
                      <span className="text-[9px] text-slate-500">Jun 23</span>
                    </div>
                  </div>
                  <div className="bg-slate-900/80 border border-slate-800 rounded p-2.5 hover:border-slate-700/60 cursor-pointer transition-all">
                    <span className="text-[9px] font-bold text-violet-400 uppercase">TaskiMate #102</span>
                    <h4 className="text-xs font-semibold text-slate-200 mt-1">Write API schema tests</h4>
                    <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-800/50">
                      <div className="w-4.5 h-4.5 rounded-full bg-violet-500/20 flex items-center justify-center text-[8px] text-violet-300 font-bold border border-violet-500/30">JD</div>
                      <span className="text-[9px] text-slate-500">Jun 22</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* In Progress Column */}
              <div className="bg-slate-950/40 border border-slate-800/60 rounded-lg p-3">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">In Progress</span>
                  <span className="text-[10px] bg-slate-900 px-1.5 py-0.5 rounded text-slate-500 font-bold border border-slate-800">1</span>
                </div>
                <div className="space-y-2">
                  <div className="bg-slate-900/80 border border-indigo-500/30 shadow-sm shadow-indigo-600/5 rounded p-2.5 hover:border-indigo-500/50 cursor-pointer transition-all">
                    <span className="text-[9px] font-bold text-amber-400 uppercase">TaskiMate #98</span>
                    <h4 className="text-xs font-semibold text-slate-200 mt-1">Integrate Google OAuth 2.0</h4>
                    <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-800/50">
                      <div className="w-4.5 h-4.5 rounded-full bg-amber-500/20 flex items-center justify-center text-[8px] text-amber-300 font-bold border border-amber-500/30">ME</div>
                      <span className="text-[9px] text-slate-500">Jun 23</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Done Column */}
              <div className="bg-slate-950/40 border border-slate-800/60 rounded-lg p-3">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Done</span>
                  <span className="text-[10px] bg-slate-900 px-1.5 py-0.5 rounded text-slate-500 font-bold border border-slate-800">1</span>
                </div>
                <div className="space-y-2">
                  <div className="bg-slate-900/80 border border-slate-800 rounded p-2.5 opacity-70 hover:opacity-100 hover:border-slate-700/60 cursor-pointer transition-all line-through decoration-slate-600">
                    <span className="text-[9px] font-bold text-emerald-400 uppercase">TaskiMate #95</span>
                    <h4 className="text-xs font-semibold text-slate-300 mt-1">Setup ACID Transactions</h4>
                    <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-800/50">
                      <div className="w-4.5 h-4.5 rounded-full bg-emerald-500/20 flex items-center justify-center text-[8px] text-emerald-300 font-bold border border-emerald-500/30">AD</div>
                      <span className="text-[9px] text-slate-500">Jun 22</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="py-24 px-6 border-t border-slate-900 bg-slate-950 relative">
        <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] rounded-full bg-indigo-600/5 blur-[150px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold tracking-tight text-white mb-4">
              Equipped with every tool agile teams need
            </h3>
            <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
              TaskiMate integrates core development project boards with reliable transactional databases and modern security features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-6 hover:border-slate-700/50 transition-all hover:scale-[1.01]">
              <div className="w-12 h-12 bg-indigo-600/10 border border-indigo-500/20 rounded-lg flex items-center justify-center text-indigo-400 mb-4">
                <span className="text-xl">📋</span>
              </div>
              <h4 className="text-lg font-bold text-slate-100 mb-2">Agile Boards</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Jira-style task mapping that lets you manage projects, prioritize tickets, and update issue states through a clean, intuitive layout.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-6 hover:border-slate-700/50 transition-all hover:scale-[1.01]">
              <div className="w-12 h-12 bg-indigo-600/10 border border-indigo-500/20 rounded-lg flex items-center justify-center text-indigo-400 mb-4">
                <span className="text-xl">🔐</span>
              </div>
              <h4 className="text-lg font-bold text-slate-100 mb-2">ACID Transactions</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Utilizes MongoDB client sessions and ACID transactions to ensure that ticket changes and project activity logs are written atomically.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-6 hover:border-slate-700/50 transition-all hover:scale-[1.01]">
              <div className="w-12 h-12 bg-indigo-600/10 border border-indigo-500/20 rounded-lg flex items-center justify-center text-indigo-400 mb-4">
                <span className="text-xl">⚡</span>
              </div>
              <h4 className="text-lg font-bold text-slate-100 mb-2">Real-Time WebSockets</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Stay updated in real-time. Broadcasts instant activity notifications to all active project members the moment a ticket moves.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-6 hover:border-slate-700/50 transition-all hover:scale-[1.01]">
              <div className="w-12 h-12 bg-indigo-600/10 border border-indigo-500/20 rounded-lg flex items-center justify-center text-indigo-400 mb-4">
                <span className="text-xl">📜</span>
              </div>
              <h4 className="text-lg font-bold text-slate-100 mb-2">Detailed Audit Trails</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Every ticket status change, project creation, or assignee update creates a detailed audit record, preserving clear team histories.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-6 hover:border-slate-700/50 transition-all hover:scale-[1.01]">
              <div className="w-12 h-12 bg-indigo-600/10 border border-indigo-500/20 rounded-lg flex items-center justify-center text-indigo-400 mb-4">
                <span className="text-xl">🛡️</span>
              </div>
              <h4 className="text-lg font-bold text-slate-100 mb-2">Google OAuth 2.0</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Log in securely using Google Identity Services. Direct integration with backend JWT verification ensures robust authentication.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-6 hover:border-slate-700/50 transition-all hover:scale-[1.01]">
              <div className="w-12 h-12 bg-indigo-600/10 border border-indigo-500/20 rounded-lg flex items-center justify-center text-indigo-400 mb-4">
                <span className="text-xl">⚙️</span>
              </div>
              <h4 className="text-lg font-bold text-slate-100 mb-2">Super Mode Access</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Allows administrators to toggle system-wide controls, manage backend flags, and configure operational options securely.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Tabs Section */}
      <section id="audience" className="py-24 px-6 bg-slate-950 border-t border-slate-900 relative">
        <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full bg-indigo-600/5 blur-[150px] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold tracking-tight text-white mb-4">
              Tailored for every team member
            </h3>
            <p className="text-slate-400 max-w-xl mx-auto">
              Different features designed specifically to optimize efficiency, transparency, and operations for each role.
            </p>
          </div>

          {/* Tab buttons */}
          <div className="flex justify-center space-x-2 md:space-x-4 mb-12 bg-slate-900/50 p-1.5 rounded-xl border border-slate-800/80 max-w-md mx-auto">
            <button
              onClick={() => setActiveTab('dev')}
              className={`flex-1 text-center py-2 px-3 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'dev'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-100'
              }`}
            >
              Developers
            </button>
            <button
              onClick={() => setActiveTab('pm')}
              className={`flex-1 text-center py-2 px-3 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'pm'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-100'
              }`}
            >
              Managers
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex-1 text-center py-2 px-3 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'admin'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-100'
              }`}
            >
              Admins
            </button>
          </div>

          {/* Tab content */}
          <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-8 backdrop-blur-xl max-w-4xl mx-auto min-h-[250px] flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 space-y-4">
              {activeTab === 'dev' && (
                <>
                  <h4 className="text-2xl font-bold text-indigo-400">Streamline ticket handling & schemas</h4>
                  <p className="text-slate-300 leading-relaxed text-sm">
                    Keep your database consistent. Every change is verified using Pydantic models to ensure that tickets and projects maintain strict one-to-many relationship boundaries.
                  </p>
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li className="flex items-center space-x-2">
                      <span className="text-indigo-500">✔</span>
                      <span>Type-safe validations on status updates</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="text-indigo-500">✔</span>
                      <span>Hot-reloading API server & WebSocket notifications</span>
                    </li>
                  </ul>
                </>
              )}

              {activeTab === 'pm' && (
                <>
                  <h4 className="text-2xl font-bold text-violet-400">Complete project scope visibility</h4>
                  <p className="text-slate-300 leading-relaxed text-sm">
                    Gain complete oversight. Track user activities, status logs, and project progress in a single unified dashboard, facilitating seamless communication with team members.
                  </p>
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li className="flex items-center space-x-2">
                      <span className="text-violet-500">✔</span>
                      <span>Chronological audit trail for all ticket movements</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="text-violet-500">✔</span>
                      <span>Real-time visitor logs highlighting active team members</span>
                    </li>
                  </ul>
                </>
              )}

              {activeTab === 'admin' && (
                <>
                  <h4 className="text-2xl font-bold text-fuchsia-400">Robust administration & controls</h4>
                  <p className="text-slate-300 leading-relaxed text-sm">
                    Easily manage system configurations. Secure OAuth integrations prevent credentials leaking, and the built-in Super Mode provides instant overrides for operational parameters.
                  </p>
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li className="flex items-center space-x-2">
                      <span className="text-fuchsia-500">✔</span>
                      <span>Single-click secure Sign-In via Google Identity</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="text-fuchsia-500">✔</span>
                      <span>Password-protected administrative settings console</span>
                    </li>
                  </ul>
                </>
              )}
            </div>

            <div className="w-full md:w-80 bg-slate-950/80 rounded-xl border border-slate-800 p-4 font-mono text-xs text-slate-400 space-y-2.5">
              {activeTab === 'dev' && (
                <>
                  <div className="text-slate-500">// Schema Integrity Checks</div>
                  <div className="text-indigo-400">class <span className="text-slate-200">TicketSchema</span>(BaseModel):</div>
                  <div className="pl-4">id: int</div>
                  <div className="pl-4">project_id: int</div>
                  <div className="pl-4 text-emerald-400">status: TicketStatus</div>
                  <div className="pl-4">// Validated: project_id match</div>
                </>
              )}

              {activeTab === 'pm' && (
                <>
                  <div className="text-slate-500">// Audit Log Notification</div>
                  <div className="text-indigo-400">emit(<span className="text-emerald-400">"activity"</span>, &#123;</div>
                  <div className="pl-4">"project_id": 14,</div>
                  <div className="pl-4">"message": <span className="text-slate-300">"user@domain moved ticket from proposed to todo"</span></div>
                  <div className="text-indigo-400">&#125;)</div>
                </>
              )}

              {activeTab === 'admin' && (
                <>
                  <div className="text-slate-500">// Google Tokeninfo Check</div>
                  <div className="text-indigo-400">GET <span className="text-emerald-400">"/oauth2/v3/certs"</span></div>
                  <div className="text-slate-500">// Token client verification</div>
                  <div className="text-indigo-400">assert <span className="text-slate-200">payload["aud"]</span> == CLIENT_ID</div>
                  <div className="text-emerald-400"># Verification Successful</div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6 border-t border-slate-900 bg-slate-950 relative">
        <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-indigo-600/5 blur-[140px] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold tracking-tight text-white mb-4">
              Simple, transparent pricing
            </h3>
            <p className="text-slate-400 max-w-md mx-auto">
              Get started with our rich features for free, or scale up to advanced support for enterprise operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Tier */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-8 hover:border-slate-700/60 transition-colors flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h4 className="text-xl font-bold text-slate-100">Free Starter</h4>
                    <p className="text-slate-500 text-xs mt-1">For small teams and side-projects</p>
                  </div>
                  <span className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Free</span>
                </div>
                
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-extrabold text-white">$0</span>
                  <span className="text-slate-500 text-sm ml-2">/ user / month</span>
                </div>

                <ul className="space-y-3.5 mb-8 text-sm text-slate-300">
                  <li className="flex items-center space-x-2.5">
                    <span className="text-indigo-500">✔</span>
                    <span>Up to 10 project workspaces</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <span className="text-indigo-500">✔</span>
                    <span>Agile boards and ticket dashboard</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <span className="text-indigo-500">✔</span>
                    <span>Google OAuth 2.0 secure sign-in</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <span className="text-indigo-500">✔</span>
                    <span>Real-time WebSocket notifications</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <span className="text-indigo-500">✔</span>
                    <span>MongoDB transaction guarantees</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => navigate('/login')}
                className="w-full bg-slate-800 hover:bg-slate-700 active:bg-slate-800 text-slate-200 font-bold py-3 rounded-xl transition-all hover:scale-[1.01]"
              >
                Sign up free
              </button>
            </div>

            {/* Enterprise Tier */}
            <div className="bg-slate-900/60 border border-indigo-500/30 rounded-2xl p-8 relative shadow-lg shadow-indigo-600/5 hover:border-indigo-500/50 transition-colors flex flex-col justify-between">
              <div className="absolute top-0 right-6 -translate-y-1/2 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-md">
                Recommended
              </div>

              <div>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h4 className="text-xl font-bold text-slate-100">Enterprise Scale</h4>
                    <p className="text-slate-400 text-xs mt-1">For organizations requiring scale & security</p>
                  </div>
                  <span className="bg-indigo-500/20 text-indigo-300 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-indigo-500/30">Custom</span>
                </div>

                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-extrabold text-white">Contact Us</span>
                </div>

                <ul className="space-y-3.5 mb-8 text-sm text-slate-300">
                  <li className="flex items-center space-x-2.5">
                    <span className="text-indigo-400">✔</span>
                    <span>Unlimited project workspaces & tickets</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <span className="text-indigo-400">✔</span>
                    <span>Dedicated database clusters & SSL configurations</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <span className="text-indigo-400">✔</span>
                    <span>Custom SAML & SSO configurations</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <span className="text-indigo-400">✔</span>
                    <span>99.9% Uptime SLA guarantees</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <span className="text-indigo-400">✔</span>
                    <span>24/7 dedicated support representative</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => navigate('/login')}
                className="w-full bg-indigo-600 hover:bg-indigo-505 hover:bg-indigo-500 active:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-all shadow-md shadow-indigo-600/30 hover:scale-[1.01]"
              >
                Contact sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-slate-900 bg-slate-950 text-slate-500 text-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-3.5">
            <h5 className="font-bold text-slate-300 uppercase tracking-wider text-xs">Product</h5>
            <ul className="space-y-2">
              <li><button onClick={() => scrollToSection('features')} className="hover:text-slate-300 transition-colors">Features</button></li>
              <li><button onClick={() => scrollToSection('pricing')} className="hover:text-slate-300 transition-colors">Pricing</button></li>
              <li><button onClick={() => navigate('/login')} className="hover:text-slate-300 transition-colors">Agile Boards</button></li>
            </ul>
          </div>
          <div className="space-y-3.5">
            <h5 className="font-bold text-slate-300 uppercase tracking-wider text-xs">Solutions</h5>
            <ul className="space-y-2">
              <li><button onClick={() => scrollToSection('audience')} className="hover:text-slate-300 transition-colors">For Developers</button></li>
              <li><button onClick={() => scrollToSection('audience')} className="hover:text-slate-300 transition-colors">For Managers</button></li>
              <li><button onClick={() => scrollToSection('audience')} className="hover:text-slate-300 transition-colors">For Admins</button></li>
            </ul>
          </div>
          <div className="space-y-3.5">
            <h5 className="font-bold text-slate-300 uppercase tracking-wider text-xs">Security</h5>
            <ul className="space-y-2">
              <li><span className="text-slate-600">SSO & SAML Login</span></li>
              <li><span className="text-slate-600">ACID Compliance</span></li>
              <li><span className="text-slate-600">JWT Sessions</span></li>
            </ul>
          </div>
          <div className="space-y-3.5 font-sans">
            <h5 className="font-bold text-slate-300 uppercase tracking-wider text-xs">TaskiMate</h5>
            <p className="text-xs text-slate-600 leading-relaxed">
              TaskiMate is a modern issue tracker and sprint dashboard modeled after enterprise systems like Jira.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between border-t border-slate-900 pt-8 gap-4 text-xs">
          <span>&copy; 2026 TaskiMate Inc. All rights reserved.</span>
          <div className="flex space-x-6 text-slate-600">
            <span>Terms of Service</span>
            <span>Privacy Policy</span>
            <span>Security Statement</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
