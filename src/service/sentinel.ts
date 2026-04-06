export interface SentinelCheckResult {
  checkId: string;
  status: "critical" | "warning" | "info" | "pass";
  title: string;
  detail: string;
  remediation: string;
  raw: any;
  checkedAt: string;
}

export const sentinelCheck = async ({ domain }: { domain: string }) => {
  const response = await fetch("http://localhost:3000/api/check", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      domain,
    }),
  });

  return response.json() as Promise<SentinelCheckResult[]>;
};
