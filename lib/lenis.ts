// Module-level singleton so Navigation can call lenis.scrollTo()
// without prop drilling
let instance: { scrollTo: (target: HTMLElement | string, opts?: Record<string, unknown>) => void } | null = null

export const setLenisInstance = (l: typeof instance) => { instance = l }
export const getLenisInstance = () => instance
