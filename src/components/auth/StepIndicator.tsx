interface Props {
  steps: string[];
  current: number;
}

export default function StepIndicator({ steps, current }: Props) {
  return (
    <div className="mb-6">
      {/* Dots + lines */}
      <div className="flex items-center">
        {steps.map((_, i) => (
          <div key={i} className="flex items-center flex-1 last:flex-none">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all ${
                i < current
                  ? "bg-[#2d7a57] text-white"
                  : i === current
                  ? "bg-[#1a4d35] text-white shadow-[0_0_0_3px_rgba(45,122,87,0.2)]"
                  : "bg-[#e5e7eb] text-[#9ca3af]"
              }`}
            >
              {i < current ? "✓" : i + 1}
            </div>
            {i < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 transition-all ${
                  i < current ? "bg-[#2d7a57]" : "bg-[#e5e7eb]"
                }`}
              />
            )}
          </div>
        ))}
      </div>
      {/* Labels */}
      <div className="flex justify-between mt-1.5">
        {steps.map((step, i) => (
          <span
            key={step}
            className={`text-[0.68rem] font-medium text-center flex-1 ${
              i < current
                ? "text-[#2d7a57]"
                : i === current
                ? "text-[#1a4d35] font-semibold"
                : "text-[#9ca3af]"
            }`}
          >
            {step}
          </span>
        ))}
      </div>
    </div>
  );
}
