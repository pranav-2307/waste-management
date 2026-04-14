import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, Eye, EyeOff } from 'lucide-react';
import { login, register, UserRole } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const GoogleIcon = () => (
  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

const GithubIcon = () => (
  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
    <path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

export default function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('citizen');
  const [showPw, setShowPw] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister) {
      const user = register(name, email, password, role);
      if (!user) { toast({ title: 'Email already exists', variant: 'destructive' }); return; }
      navigate(`/${user.role}-dashboard`);
    } else {
      const user = login(email, password);
      if (!user) { toast({ title: 'Invalid credentials', variant: 'destructive' }); return; }
      navigate(`/${user.role}-dashboard`);
    }
  };

  const roles: { value: UserRole; label: string }[] = [
    { value: 'citizen', label: 'Citizen' },
    { value: 'worker', label: 'Waste Worker' },
    { value: 'admin', label: 'Administrator' },
    { value: 'champion', label: 'Green Champion' },
  ];

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left panel - Glassmorphism over Image */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-center p-12 overflow-hidden items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&q=80&w=2000" 
            alt="Lush green forest backdrop" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Frosted Glass Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }} 
          animate={{ opacity: 1, scale: 1, y: 0 }} 
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="relative z-10 w-full max-w-lg backdrop-blur-xl bg-white/10 border border-white/20 rounded-[2rem] p-10 shadow-2xl overflow-hidden"
        >
          {/* subtle glow effect behind glass */}
          <div className="absolute -inset-10 bg-primary/20 blur-3xl -z-10 rounded-full" />
          
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-8 border border-white/30 shadow-inner">
            <Leaf className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-4xl font-bold font-display text-white mb-4 tracking-tight drop-shadow-sm">
            WasteWise+
          </h1>
          
          <p className="text-lg text-white/90 mb-8 font-medium leading-relaxed drop-shadow-sm">
            The AI-Powered Waste Governance System tailored for a cleaner, greener future.
          </p>
          
          <div className="space-y-5">
            {[
              'Smart AI waste detection & sorting', 
              'Real-time compliance tracking', 
              'Reward-based engagement models'
            ].map((t, i) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                key={t} 
                className="flex items-center gap-4 text-white hover:text-primary-foreground transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:bg-primary/50 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                </div>
                <span className="text-base font-medium drop-shadow-md">{t}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right panel - Auth Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 relative overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, y: 16 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-[420px]"
        >
          {/* Mobile Logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold font-display tracking-tight">WasteWise+</h1>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold font-display tracking-tight text-foreground">
              {isRegister ? 'Create an account' : 'Welcome back'}
            </h2>
            <p className="text-muted-foreground mt-2">
              {isRegister ? 'Join the green movement today.' : 'Sign in to your dashboard to continue.'}
            </p>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Button variant="outline" className="w-full font-normal bg-background hover:bg-muted/50 rounded-xl h-11 border-border/80" type="button" onClick={() => toast({ title: "Social login coming soon" })}>
              <GoogleIcon /> Google
            </Button>
            <Button variant="outline" className="w-full font-normal bg-background hover:bg-muted/50 rounded-xl h-11 border-border/80" type="button" onClick={() => toast({ title: "Social login coming soon" })}>
              <GithubIcon /> GitHub
            </Button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-4 text-muted-foreground font-medium tracking-wider">
                Or continue with email
              </span>
            </div>
          </div>

          {!isRegister && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-primary/5 border border-primary/10 rounded-xl p-4 mb-6 text-sm text-primary/80 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-2 font-semibold">
                <Leaf className="w-4 h-4" /> Demo credentials
              </div>
              <p className="text-xs space-y-1 mb-2 opacity-80">
                <span className="block font-medium">Password: password123</span>
              </p>
              <div className="text-xs flex flex-wrap gap-x-3 gap-y-1 opacity-80">
                <span>admin@wastewise.com</span>
                <span>jane@example.com <span className="opacity-50">(Citizen)</span></span>
                <span>mike@wastewise.com <span className="opacity-50">(Worker)</span></span>
              </div>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                <Label className="text-foreground/80 font-medium">Full Name</Label>
                <Input 
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                  placeholder="Jane Doe" 
                  required 
                  className="mt-1.5 rounded-xl h-11 bg-muted/30 focus-visible:ring-primary/20" 
                />
              </motion.div>
            )}
            <div>
              <Label className="text-foreground/80 font-medium">Email Address</Label>
              <Input 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                placeholder="you@example.com" 
                required 
                className="mt-1.5 rounded-xl h-11 bg-muted/30 focus-visible:ring-primary/20 transition-all" 
              />
            </div>
            <div>
              <div className="flex justify-between items-center">
                <Label className="text-foreground/80 font-medium">Password</Label>
                {!isRegister && (
                  <button type="button" className="text-xs text-primary hover:underline font-medium" onClick={() => toast({ title: "Password recovery coming soon" })}>
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative mt-1.5">
                <Input 
                  type={showPw ? 'text' : 'password'} 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  placeholder="••••••••" 
                  required 
                  className="rounded-xl h-11 bg-muted/30 pr-10 focus-visible:ring-primary/20 transition-all font-mono tracking-tight" 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPw(!showPw)} 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            {isRegister && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                <Label className="text-foreground/80 font-medium tracking-tight">Select your Role</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {roles.map(r => (
                    <button 
                      key={r.value} 
                      type="button" 
                      onClick={() => setRole(r.value)}
                      className={`px-3 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                        role === r.value 
                          ? 'border-primary bg-primary/5 text-primary shadow-sm' 
                          : 'border-border bg-background text-muted-foreground hover:border-primary/40 hover:bg-muted/30'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
            <Button 
              type="submit" 
              className="w-full gradient-primary hover:opacity-90 text-primary-foreground rounded-xl h-11 font-semibold shadow-lg shadow-primary/20 mt-2 transition-all active:scale-[0.98]"
            >
              {isRegister ? 'Create Account' : 'Sign In'}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-8">
            {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button 
              onClick={() => setIsRegister(!isRegister)} 
              className="text-primary font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              {isRegister ? 'Sign in instead' : 'Register now'}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
