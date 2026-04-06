import { useState, useCallback, type KeyboardEvent } from "react";
import { sentinelCheck, type SentinelCheckResult } from "@/service/sentinel";
import { Button } from "./Button";
import { Input } from "./Input";
import { Card } from "./Card";
import { SeverityBadge } from "./SeverityBadge";
import { StatusDot } from "./StatusDot";
import type { Severity } from "./SeverityBadge";

// ── Types ──────────────────────────────────────────────────────────────────

type State =
  | { type: "idle" }
  | { type: "loading"; domain: string }
  | {
      type: "results";
      domain: string;
      results: SentinelCheckResult[];
      time: string;
    }
  | { type: "error" };

// ── Helpers ────────────────────────────────────────────────────────────────

function validateDomain(domain: string): boolean {
  return /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}/.test(
    domain,
  );
}

function overallStatus(statuses: Severity[]): {
  color: "pass" | "critical" | "warning";
  label: string;
} {
  if (statuses.includes("critical"))
    return { color: "critical", label: "Issues found" };
  if (statuses.includes("warning"))
    return { color: "warning", label: "Warnings" };
  return { color: "pass", label: "All clear" };
}

// ── Sub-components ─────────────────────────────────────────────────────────

function Skeleton({ domain }: { domain: string }) {
  return (
    <Card bordered>
      <div className="px-5 py-3 border-b border-border-base flex items-center gap-3">
        <StatusDot color="accent" blink />
        <span className="font-mono text-xs text-accent uppercase tracking-widest">
          Scanning {domain}…
        </span>
      </div>
      <div className="divide-y divide-border-dim">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="px-5 py-3 flex items-center gap-4">
            <div className="w-12 h-2.5 bg-bg-subtle animate-pulse flex-shrink-0" />
            <div className="w-16 h-2.5 bg-bg-subtle animate-pulse" />
          </div>
        ))}
      </div>
    </Card>
  );
}

function ResultCard({
  domain,
  results,
  time,
}: {
  domain: string;
  results: SentinelCheckResult[];
  time: string;
}) {
  const overall = overallStatus(results.map((r) => r.status as Severity));

  return (
    <Card bordered>
      {/* Header */}
      <div className="px-5 py-3 border-b border-border-base flex flex-wrap items-center gap-x-4 gap-y-2">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <StatusDot color={overall.color} />
          <span className="font-mono text-xs text-text-primary uppercase tracking-widest truncate">
            {domain}
          </span>
          <span className="font-mono text-xs text-text-dim flex-shrink-0">
            — {overall.label}
          </span>
        </div>
        <div className="flex items-center gap-4 flex-shrink-0">
          <span className="font-mono text-xs text-text-dim tabular-nums">
            {time}
          </span>
          <Button href={`/signup?domain=${domain}`} size="sm">
            Monitor →
          </Button>
        </div>
      </div>

      {/* Check rows */}
      <div className="divide-y divide-border-dim">
        {results.map((r) => (
          <div key={r.checkId} className="px-5 py-3 flex items-center gap-4">
            <SeverityBadge severity={r.status as Severity} />
            <span className="font-mono text-xs text-text-muted uppercase tracking-wider">
              {r.title}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ── Main component ─────────────────────────────────────────────────────────

interface DomainCheckerProps {
  /** Hint list shown below the input */
  hints?: string[];
}

export default function DomainChecker({
  hints = ["No credit card", "No installation", "Results in 60 seconds"],
}: DomainCheckerProps) {
  const [domain, setDomain] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [state, setState] = useState<State>({ type: "idle" });

  const runCheck = useCallback(async () => {
    const d = domain.trim().toLowerCase();
    if (!validateDomain(d)) {
      setInvalid(true);
      return;
    }
    setInvalid(false);
    setState({ type: "loading", domain: d });

    try {
      const results = await sentinelCheck({ domain: d });
      const time = new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setState({ type: "results", domain: d, results, time });
    } catch {
      setState({ type: "error" });
    }
  }, [domain]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") runCheck();
    },
    [runCheck],
  );

  return (
    <div className="max-w-2xl">
      {/* Input row */}
      <div
        className={[
          "flex gap-0 border",
          invalid ? "border-critical" : "border-border-base",
        ].join(" ")}
      >
        <Input
          className="flex-1"
          placeholder="yourcompany.com"
          value={domain}
          onChange={(e) => {
            setDomain(e.target.value);
            if (invalid) setInvalid(false);
          }}
          onKeyDown={onKeyDown}
          pattern="[a-zA-Z0-9][a-zA-Z0-9\-]{0,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}"
        />
        <Button
          className="border-l"
          onClick={runCheck}
          disabled={state.type === "loading"}
        >
          {state.type === "loading" ? "Scanning…" : "Scan domain →"}
        </Button>
      </div>

      {/* Micro-copy */}
      {hints.length > 0 && (
        <div className="flex items-center gap-6 mt-3">
          {hints.map((hint) => (
            <div key={hint} className="flex items-center gap-1.5">
              <StatusDot color="pass" size="xs" />
              <span className="font-mono text-xs text-text-dim">{hint}</span>
            </div>
          ))}
        </div>
      )}

      {/* Results */}
      <div className="mt-6">
        {state.type === "loading" && <Skeleton domain={state.domain} />}
        {state.type === "results" && (
          <ResultCard
            domain={state.domain}
            results={state.results}
            time={state.time}
          />
        )}
        {state.type === "error" && (
          <div className="border border-critical/30 bg-critical-bg px-5 py-4">
            <span className="font-mono text-xs text-critical uppercase tracking-widest">
              Check failed — verify the domain and try again.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
