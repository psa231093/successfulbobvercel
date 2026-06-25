"use client";

const challenges = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783M10.34 6.66a49.422 49.422 0 0 1 2.71-.166m-2.71.166 4.67 13.89m0-13.89a49.42 49.42 0 0 1 2.71.165M12 6.495v-.75m0 0c0-.414.336-.75.75-.75h.75a.75.75 0 0 1 .75.75v.75M12 6.495c0 .414-.336.75-.75.75H10.5a.75.75 0 0 1-.75-.75V5.745m2.25.75v.75m0-.75H12m0 0v-.75" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: "Getting to market",
    body: "You have to explain a complex technology in simple terms without oversimplifying.",
    example: '"Our product is unique, but we can\'t get the message across."',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
      </svg>
    ),
    title: "Changing stakeholders",
    body: "The audience changes, but the story hasn't kept up.",
    example: '"The message that worked with investors doesn\'t work with buyers."',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
      </svg>
    ),
    title: "Sales conversations stalling",
    body: "Great conversations start, but buying decisions don't move forward.",
    example: '"We have interest, but no urgency."',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.05 4.575a1.575 1.575 0 1 0-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 0 1 3.15 0v1.5m-3.15 0 .075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 0 1 3.15 0V15M6.9 7.575a1.575 1.575 0 1 0-3.15 0v8.175a6.75 6.75 0 0 0 6.75 6.75h2.018a5.25 5.25 0 0 0 3.712-1.538l1.732-1.732a5.25 5.25 0 0 0 1.538-3.712l.003-2.024a.668.668 0 0 1 .198-.471 1.575 1.575 0 1 0-2.228-2.228 3.818 3.818 0 0 0-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0 1 16.35 15m.002 0h-.002" />
      </svg>
    ),
    title: "Partner and channel friction",
    body: "Partners need a story they can trust and repeat.",
    example: '"We\'re not aligned on the message or the priority."',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
    title: "Executive alignment",
    body: "Executives need clarity before they can commit or champion.",
    example: '"We\'re not aligned on the message or the priority."',
  },
];

export default function ChallengesVisual() {
  return (
    <div
      className="w-full max-w-4xl rounded-2xl overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0b1433 0%, #0f1d4a 100%)" }}
    >
      {/* Header */}
      <div className="text-center px-8 pt-10 pb-6">
        <h3 className="text-2xl md:text-[28px] font-bold text-white leading-tight mb-2">
          The challenges technical companies face.
        </h3>
        <p className="text-white/55 text-sm md:text-base">
          Different moments. Different pressures. Same underlying challenge:
        </p>
        <p
          className="text-sm md:text-base font-semibold mt-1"
          style={{ background: "linear-gradient(90deg, #3f6bff, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
        >
          making the story make sense.
        </p>
      </div>

      {/* Cards — honeycomb stagger: row of 2 then row of 3, second row offset */}
      <div className="mx-6 mb-6">
        {/* Row 1: first 2 cards, offset right by ~20% */}
        <div className="flex gap-px mb-px" style={{ marginLeft: "10%", marginRight: "10%" }}>
          {challenges.slice(0, 2).map((c) => (
            <div key={c.title} className="flex-1 rounded-tl-xl rounded-tr-xl first:rounded-tl-xl last:rounded-tr-xl overflow-hidden bg-white/[0.06]">
              <div className="bg-[#0d1a42] px-4 py-5 flex flex-col gap-3 h-full">
                {/* Icon */}
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(63,107,255,0.15)", color: "#7c9fff" }}>{c.icon}</div>
                <p className="text-white font-semibold text-sm leading-tight">{c.title}</p>
                <p className="text-white/45 text-[11px] leading-relaxed">{c.body}</p>
                <div className="mt-auto pt-2 border-t border-white/[0.08]">
                  <p className="text-[9px] font-semibold tracking-widest uppercase text-white/25 mb-1">Real-world example</p>
                  <p className="text-[11px] italic text-white/50 leading-relaxed">{c.example}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Row 2: last 3 cards, full width */}
        <div className="flex gap-px rounded-b-xl overflow-hidden bg-white/[0.06]">
          {challenges.slice(2).map((c) => (
            <div key={c.title} className="flex-1 bg-[#0d1a42] px-4 py-5 flex flex-col gap-3">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(63,107,255,0.15)", color: "#7c9fff" }}>{c.icon}</div>
              <p className="text-white font-semibold text-sm leading-tight">{c.title}</p>
              <p className="text-white/45 text-[11px] leading-relaxed">{c.body}</p>
              <div className="mt-auto pt-2 border-t border-white/[0.08]">
                <p className="text-[9px] font-semibold tracking-widest uppercase text-white/25 mb-1">Real-world example</p>
                <p className="text-[11px] italic text-white/50 leading-relaxed">{c.example}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mx-6 mb-8 flex items-center gap-4 px-5 py-4 rounded-xl" style={{ background: "rgba(63,107,255,0.1)", border: "1px solid rgba(63,107,255,0.2)" }}>
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(63,107,255,0.2)" }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="#7c9fff" strokeWidth={1.8} className="w-5 h-5">
            <circle cx="12" cy="12" r="10" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
          </svg>
        </div>
        <p className="text-white/70 text-sm leading-snug">
          These aren&apos;t marketing problems. They&apos;re communication problems.{" "}
          <span
            className="font-semibold"
            style={{ background: "linear-gradient(90deg, #3f6bff, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          >
            Fix the story, and everything gets easier.
          </span>
        </p>
      </div>
    </div>
  );
}
