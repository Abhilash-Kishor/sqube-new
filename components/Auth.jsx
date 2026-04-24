
import React, { useState } from 'react';
import { User, Lock, KeyRound, ShieldCheck, ArrowRight } from 'lucide-react';

const Auth = ({ onLogin, institution, language }) => {
  const [step, setStep] = useState('credentials');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');

  const handleCredentials = (e) => {
    e.preventDefault();
    if (username && password) {
      setStep('otp');
    }
  };

  const handleOtp = (e) => {
    e.preventDefault();
    if (otp.length === 6) {
      onLogin(username);
    }
  };

  const getBranding = () => {
    switch (institution) {
      case 'nvs':
        return {
          bg: 'bg-gradient-to-br from-[#FF9933] to-[#FF6600]',
          formAccent: 'focus:ring-orange-500/20 focus:border-orange-500',
          btn: 'bg-orange-600 hover:bg-orange-700',
          logo: 'https://kamp.org.in/Images/Jawahar_Navodaya_Vidyalaya_logo.png',
          label: 'NVS Decision Portal',
          accentColor: 'text-orange-200',
          btnOtp: 'bg-orange-600 hover:bg-orange-700',
          iconColor: 'group-focus-within:text-orange-500'
        };
      case 'kvs':
        return {
          bg: 'bg-gradient-to-br from-[#128807] to-[#006633]',
          formAccent: 'focus:ring-green-500/20 focus:border-green-500',
          btn: 'bg-green-700 hover:bg-green-800',
          logo: 'https://cdnbbsr.s3waas.gov.in/s32d2ca7eedf739ef4c3800713ec482e1a/uploads/2023/04/2023042118.svg',
          label: 'KVS Decision Portal',
          accentColor: 'text-green-200',
          btnOtp: 'bg-green-700 hover:bg-green-800',
          iconColor: 'group-focus-within:text-green-500'
        };
      case 'cbse':
      default:
        return {
          bg: 'cbse-gradient',
          formAccent: 'focus:ring-blue-500/20 focus:border-blue-500',
          btn: 'bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700',
          logo: 'https://www.cbse.gov.in/cbsenew/img/cbse-logo.png',
          label: 'CBSE Decision Portal',
          accentColor: 'text-blue-200',
          btnOtp: 'bg-blue-600 hover:bg-blue-700',
          iconColor: 'group-focus-within:text-blue-500'
        };
    }
  };

  const branding = getBranding();

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors duration-500">
      {/* Dynamic Background Accents */}
      <div className={`absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-10 blur-3xl ${branding.bg === 'cbse-gradient' ? 'bg-blue-600' : branding.bg}`}></div>
      <div className={`absolute -bottom-40 -right-40 w-96 h-96 rounded-full opacity-10 blur-3xl ${branding.bg === 'cbse-gradient' ? 'bg-indigo-600' : branding.bg}`}></div>

      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden relative z-10 border border-slate-100 dark:border-slate-800">
        {/* Branding Side */}
        <div className={`${branding.bg} bg-[#002B5B] p-12 text-white flex flex-col justify-between hidden md:flex relative overflow-hidden`}>
          <div className="absolute top-0 right-0 p-20 opacity-10 scale-150 rotate-12">
            <ShieldCheck size={400} />
          </div>
          
          <div className="relative z-10">
            <div className="w-20 h-20 bg-white p-3 rounded-2xl shadow-xl mb-8 flex items-center justify-center">
              <img src={branding.logo} alt="Logo" className="max-h-full max-w-full object-contain" />
            </div>
            <h1 className="text-4xl font-black mb-4 tracking-tight leading-tight">सागर से साराांश <br/> <span className={branding.accentColor}>{branding.label} 3.0</span></h1>
            <p className="text-white/80 text-lg font-medium leading-relaxed">Empowering India's educational landscape through intelligent data governance and executive insights.</p>
          </div>
          
          <div className="space-y-5 relative z-10">
            <div className="flex items-center gap-4 text-sm font-bold text-white/90">
              <div className="w-2 h-2 bg-white/40 rounded-full"></div>
              <span>Secure Role-based Access</span>
            </div>
            <div className="flex items-center gap-4 text-sm font-bold text-white/90">
              <div className="w-2 h-2 bg-white/40 rounded-full"></div>
              <span>Real-time Analytics Engine</span>
            </div>
            <p className="text-xs opacity-40 font-bold uppercase tracking-widest mt-4">Verified Sovereign Infrastructure</p>
          </div>
        </div>

        {/* Form Side */}
        <div className="p-12 flex flex-col justify-center bg-white dark:bg-slate-900 transition-colors">
          <div className="mb-10 text-center md:text-left">
            <div className="md:hidden w-16 h-16 bg-white p-2 rounded-xl shadow-lg mb-6 mx-auto flex items-center justify-center">
               <img src={branding.logo} alt="Logo" className="max-h-full max-w-full object-contain" />
            </div>
            <h2 className="text-3xl font-black text-[#002B5B] dark:text-white mb-2 tracking-tight">Executive Login</h2>
            <p className="text-slate-500 dark:text-slate-400 font-bold uppercase text-[10px] tracking-widest">Provide domain credentials to access S³ Hub</p>
          </div>

          {step === 'credentials' ? (
            <form onSubmit={handleCredentials} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">Username</label>
                <div className="relative group">
                  <User className={`absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 ${branding.iconColor} transition-colors`} size={20} />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="official_id@domain"
                    className={`w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 ${branding.formAccent} transition-all font-bold text-slate-700 dark:text-white`}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">Password</label>
                <div className="relative group">
                  <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 ${branding.iconColor} transition-colors`} size={20} />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 ${branding.formAccent} transition-all font-bold text-slate-700 dark:text-white`}
                  />
                </div>
              </div>
              <button
                type="submit"
                className={`w-full py-5 ${branding.btn} text-white rounded-2xl font-black shadow-2xl transition-all flex items-center justify-center gap-2 group uppercase tracking-[0.2em] text-xs`}
              >
                Authenticate <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleOtp} className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 p-5 rounded-2xl border border-emerald-100 dark:border-emerald-800">
                   <ShieldCheck size={20} />
                   <span className="text-xs font-black uppercase tracking-widest leading-none">OTP sent to registered mobile</span>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 text-center block">Enter 6-digit Secure Token</label>
                  <div className="relative group">
                    <KeyRound className={`absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 ${branding.iconColor}`} size={20} />
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                      placeholder="000000"
                      className={`w-full pl-12 pr-4 py-5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 ${branding.formAccent} transition-all text-center text-3xl tracking-[0.5em] font-black text-slate-800 dark:text-white`}
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <button
                  type="submit"
                  className={`w-full py-5 ${branding.btnOtp} text-white rounded-2xl font-black shadow-2xl transition-all uppercase tracking-[0.2em] text-xs`}
                >
                  Verify & Access Portal
                </button>
                <button 
                  type="button"
                  onClick={() => setStep('credentials')}
                  className="w-full py-2 text-slate-400 text-[10px] font-black uppercase tracking-widest hover:text-slate-800 dark:hover:text-white transition-colors"
                >
                  Retry Credentials
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
