// Google Apps Script endpoint — set these after deploying your script
// See docs/TrekonFormScript.gs for setup instructions
const GAS_URL    = import.meta.env.VITE_GAS_URL    as string | undefined
const GAS_SECRET = import.meta.env.VITE_GAS_SECRET as string | undefined

export async function submitToGAS(payload: Record<string, string>): Promise<void> {
  if (!GAS_URL || !GAS_SECRET) return // not configured yet — silently skip
  await fetch(GAS_URL, {
    method: 'POST',
    mode: 'no-cors', // required for direct browser → Apps Script calls
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret: GAS_SECRET, ...payload }),
  })
}
