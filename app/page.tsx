"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Eye, EyeOff, KeyRound, Leaf, Mail, Sparkles } from "lucide-react";

export default function Home() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");
  const [success, setSuccess] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true); setNotice(""); setSuccess(false);
    const form = new FormData(event.currentTarget);
    const payload: Record<string, string> = { email: String(form.get("email") || ""), password: String(form.get("password") || "") };
    if (mode === "register") payload.name = String(form.get("name") || "");
    try {
      const response = await fetch(`/api/auth/${mode === "login" ? "login" : "register"}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      setSuccess(true);
      setNotice(mode === "login" ? `Welcome back, ${data.user.name}! You’re signed in.` : `Your account is ready, ${data.user.name}.`);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Unable to connect. Please try again.");
    } finally { setLoading(false); }
  }

  return (
    <main className="min-h-screen px-4 py-6 sm:px-8 sm:py-10 lg:px-12">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-[1280px] flex-col overflow-hidden rounded-[30px] bg-[#fbf9f6] shadow-[0_30px_90px_-35px_rgba(74,49,32,.28)] lg:min-h-[calc(100vh-5rem)] lg:flex-row">
        <section className="relative min-h-[290px] overflow-hidden lg:min-h-full lg:w-[53%]">
          <div className="room-scene absolute inset-0" />
          <div className="shelf absolute left-0 top-0 h-[34%] w-[15%] rounded-br-sm" />
          <div className="absolute left-[3%] top-[15%] h-10 w-6 rounded-[45%_45%_20%_20%] bg-[#d7c7b5] shadow-lg" />
          <div className="absolute left-[8%] top-[22%] h-8 w-8 rounded-[45%_45%_20%_20%] bg-[#b8a18e] shadow-lg" />
          <div className="absolute bottom-[20%] left-[12%] h-[19%] w-[72%] rounded-[50%] bg-gradient-to-b from-[#c7a687] to-[#86664f] shadow-[0_18px_22px_#2e1d1644]" />
          <div className="absolute bottom-[16%] left-[44%] h-[16%] w-[4%] bg-[#795d49]" />
          <div className="absolute bottom-[19%] left-[37%] h-16 w-16 rounded-full bg-[#d9c2a8] shadow-xl" />
          <div className="absolute bottom-[30%] left-[38%] h-20 w-2 rounded-full bg-[#798455]" />
          <div className="absolute bottom-[31%] left-[31%] h-12 w-12 -rotate-12 rounded-[100%_0_100%_0] bg-[#586947]" />
          <div className="absolute bottom-[36%] left-[39%] h-14 w-10 rotate-12 rounded-[100%_0_100%_0] bg-[#66754d]" />
          <div className="absolute bottom-[37%] left-[43%] h-12 w-10 -rotate-12 rounded-[100%_0_100%_0] bg-[#526343]" />
          <div className="absolute bottom-[29%] left-[55%] h-12 w-20 rounded-t-full bg-[#fff4d8] shadow-[0_0_30px_#fff3c788] before:absolute before:left-1/2 before:top-full before:h-3 before:w-1 before:bg-[#a88b67]" />
          <div className="absolute bottom-[25%] left-[53%] h-2 w-24 rounded-full bg-[#d8c3ad] shadow-md" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#281c14]/45 via-transparent to-white/10" />
          <div className="absolute left-7 top-7 flex items-center gap-2 rounded-full border border-white/40 bg-white/45 px-3 py-2 text-sm font-semibold text-[#342820] shadow-sm backdrop-blur-md sm:left-10 sm:top-10"><span className="grid h-7 w-7 place-items-center rounded-full bg-[#49362b] text-[#f9e9d2]"><Sparkles size={14} /></span> haven</div>
          <div className="absolute bottom-8 left-7 right-7 text-white sm:bottom-10 sm:left-10 sm:right-10">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3 py-1.5 text-xs backdrop-blur"><Leaf size={13} /> A little more at home</span>
            <h1 className="max-w-lg font-serif text-3xl leading-tight tracking-tight sm:text-4xl">Make room for the life you love.</h1>
            <p className="mt-2 max-w-md text-sm text-white/85">Thoughtful spaces. Beautiful finds. A home that feels like you.</p>
          </div>
        </section>

        <section className="flex flex-1 items-center justify-center px-6 py-10 sm:px-12 lg:px-14 xl:px-20">
          <div className="w-full max-w-[410px]">
            <div className="mb-10 flex items-center justify-between lg:hidden"><span className="flex items-center gap-2 font-semibold"><span className="grid h-8 w-8 place-items-center rounded-full bg-[#49362b] text-[#f9e9d2]"><Sparkles size={15} /></span> haven</span><span className="text-xs text-[#8b8178]">Your home, your way</span></div>
            <div className="mb-8 hidden lg:block"><div className="mb-7 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eee6dc] text-[#73543c]"><KeyRound size={20} /></div><p className="mb-2 text-sm font-medium uppercase tracking-[.18em] text-[#a28870]">Welcome to Haven</p><h2 className="font-serif text-[38px] leading-tight tracking-tight">{mode === "login" ? "Welcome back." : "Find your place."}</h2><p className="mt-3 text-sm leading-6 text-[#81766d]">{mode === "login" ? "Sign in to pick up right where you left off." : "Create an account and make yourself at home."}</p></div>
            <div className="mb-8 lg:hidden"><p className="mb-2 text-xs font-medium uppercase tracking-[.18em] text-[#a28870]">Welcome to Haven</p><h2 className="font-serif text-3xl">{mode === "login" ? "Welcome back." : "Find your place."}</h2><p className="mt-2 text-sm text-[#81766d]">{mode === "login" ? "Sign in and settle in." : "Create your account to get started."}</p></div>

            <div className="mb-7 grid grid-cols-2 rounded-xl bg-[#f1ece6] p-1 text-sm">
              <button type="button" onClick={() => { setMode("login"); setNotice(""); }} className={`rounded-lg py-2.5 transition ${mode === "login" ? "bg-white font-medium text-[#302821] shadow-sm" : "text-[#82766b] hover:text-[#302821]"}`}>Sign in</button>
              <button type="button" onClick={() => { setMode("register"); setNotice(""); }} className={`rounded-lg py-2.5 transition ${mode === "register" ? "bg-white font-medium text-[#302821] shadow-sm" : "text-[#82766b] hover:text-[#302821]"}`}>Create account</button>
            </div>

            <form onSubmit={submit} className="space-y-4">
              {mode === "register" && <label className="block"><span className="mb-2 block text-sm font-medium text-[#51473f]">Your name</span><input name="name" autoComplete="name" required minLength={2} maxLength={80} placeholder="Alex Morgan" className="w-full rounded-xl border border-[#e6dfd7] bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-[#b3aaa2] focus:border-[#9b795c] focus:ring-4 focus:ring-[#9b795c]/10" /></label>}
              <label className="block"><span className="mb-2 block text-sm font-medium text-[#51473f]">Email address</span><span className="relative block"><Mail size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a69a8e]" /><input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" className="w-full rounded-xl border border-[#e6dfd7] bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-[#b3aaa2] focus:border-[#9b795c] focus:ring-4 focus:ring-[#9b795c]/10" /></span></label>
              <label className="block"><span className="mb-2 block text-sm font-medium text-[#51473f]">Password</span><span className="relative block"><KeyRound size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a69a8e]" /><input name="password" type={showPassword ? "text" : "password"} autoComplete={mode === "login" ? "current-password" : "new-password"} required minLength={mode === "register" ? 8 : 1} maxLength={72} placeholder={mode === "register" ? "At least 8 characters" : "Enter your password"} className="w-full rounded-xl border border-[#e6dfd7] bg-white py-3.5 pl-11 pr-12 text-sm outline-none transition placeholder:text-[#b3aaa2] focus:border-[#9b795c] focus:ring-4 focus:ring-[#9b795c]/10" /><button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#a69a8e] hover:text-[#51473f]">{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></span></label>
              {mode === "login" && <div className="flex justify-end"><button type="button" onClick={() => setNotice("Password reset is not set up yet. Please contact the site administrator.")} className="text-xs font-medium text-[#8a684d] hover:text-[#61442e]">Forgot password?</button></div>}
              {notice && <p role="status" className={`rounded-xl px-4 py-3 text-sm ${success ? "bg-[#eaf0e5] text-[#526745]" : "bg-[#f8e9e4] text-[#9b4e3b]"}`}>{notice}</p>}
              <button type="submit" disabled={loading} className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#453329] px-5 py-3.5 text-sm font-medium text-white shadow-[0_8px_18px_-8px_#45332988] transition hover:bg-[#5a4233] disabled:cursor-not-allowed disabled:opacity-60">{loading ? "Please wait…" : mode === "login" ? "Sign in to your account" : "Create your account"}<ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></button>
            </form>
            <p className="mt-7 text-center text-xs leading-5 text-[#9a9087]">By continuing, you agree to Haven’s <a href="#terms" className="underline underline-offset-2 hover:text-[#51473f]">Terms</a> and <a href="#privacy" className="underline underline-offset-2 hover:text-[#51473f]">Privacy Policy</a>.</p>
            <div className="mt-10 flex items-center justify-center gap-2 text-xs text-[#a69a8e]"><span className="h-px flex-1 bg-[#e9e2da]" />Thoughtfully made for you<span className="h-px flex-1 bg-[#e9e2da]" /></div>
          </div>
        </section>
      </div>
    </main>
  );
}
