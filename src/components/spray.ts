/**
 * The home hero's particle field, ported from site-old (components/home/spray.ts).
 *
 * A grid of dots eases toward a rasterised target shape, cycling through four
 * marks every 5.2s and lighting up under the cursor. Behaviour is preserved
 * exactly; the change is structural — the design ran inside a canvas host that
 * never unmounted, so this returns a `destroy()` that releases the animation
 * frame and resize listener.
 */

type Shape = (ctx: CanvasRenderingContext2D, size: number, cx: number, cy: number) => void

export type Spray = {
  /** Move the cursor glow, in canvas-local coordinates. */
  seed: (x: number, y: number) => void
  /** Advance to the next shape. */
  cycle: () => void
  destroy: () => void
}

const LOGO_PATH_DATA = [
  'M476.52,136.77c-10.37,10.39-22.98,20.36-38.57,30.92l-162.55,94.58c-32.85,22.27-53.85,57.81-56.64,95.83,0,0-3.8,82.39-41.7,105.52l-.71-128.95c-3.06-47.93,20.45-96.42,63.42-125.88l196.21-114.6c-42-34.64-95.78-55.47-154.34-55.47-133.95,0-242.92,108.97-242.92,242.92s108.97,242.92,242.92,242.92,242.92-108.97,242.92-242.92c0-54.25-17.88-104.41-48.05-144.88ZM353.01,366.72l-135.62,78.01h0c4.38-35.5,24.72-67.89,55.53-88.45l171.95-101.81c-21.37,48.6-38.61,81.12-91.86,112.25ZM388.22,270.92l-155,90.02h0c4.38-35.5,25.24-69.75,56.05-90.31l192.19-111.64c-21.37,48.6-39.99,80.79-93.25,111.92Z',
  'M507.51,113.36c10.75-18.28,17.84-39.49,23.47-66.92l4.51-21.95-72.02,42.07C414.41,25.05,350.96,0,281.65,0,126.1,0,0,126.1,0,281.65s126.1,281.65,281.65,281.65,281.65-126.1,281.65-281.65c0-63.09-20.75-121.33-55.79-168.29ZM281.65,530.54c-137.24,0-248.89-111.65-248.89-248.89S144.41,32.76,281.65,32.76c60.79,0,116.54,21.92,159.81,58.24l79.73-46.57c-8.04,39.16-19.07,64.92-40.47,87.99,31.27,41.61,49.82,93.29,49.82,149.23,0,137.24-111.65,248.89-248.89,248.89Z',
]

/** Cycle of meanings: mebit mark · the long view · borrow and repay · treasury. */
function buildShapes(logoPaths: Path2D[]): Shape[] {
  return [
    function mark(c, S, cx, cy) {
      const box = S * 1.12
      const k = box / 563.3
      c.save()
      c.translate(cx - box / 2, cy - box / 2)
      c.scale(k, k)
      for (const p of logoPaths) c.fill(p, 'evenodd')
      c.restore()
    },

    function landscape(c, S, cx, cy) {
      const L = cx - S * 0.62
      const R = cx + S * 0.62
      const horizon = cy + S * 0.16

      c.beginPath()
      c.arc(cx + S * 0.34, cy - S * 0.34, S * 0.1, 0, Math.PI * 2)
      c.fill() // sun

      c.beginPath() // back ridge
      c.moveTo(L, horizon)
      c.lineTo(cx - S * 0.3, cy - S * 0.3)
      c.lineTo(cx - S * 0.06, cy - S * 0.02)
      c.lineTo(cx + S * 0.1, cy - S * 0.16)
      c.lineTo(cx + S * 0.44, horizon)
      c.closePath()
      c.fill()

      c.save()
      c.globalCompositeOperation = 'destination-out'
      c.beginPath() // snow cap notch
      c.moveTo(cx - S * 0.3, cy - S * 0.2)
      c.lineTo(cx - S * 0.19, cy - S * 0.075)
      c.lineTo(cx - S * 0.25, cy - S * 0.055)
      c.lineTo(cx - S * 0.31, cy - S * 0.1)
      c.lineTo(cx - S * 0.37, cy - S * 0.065)
      c.lineTo(cx - S * 0.42, cy - S * 0.115)
      c.closePath()
      c.fill()
      c.restore()

      c.beginPath() // front ridge
      c.moveTo(cx - S * 0.52, horizon + S * 0.02)
      c.lineTo(cx + S * 0.06, cy - S * 0.05)
      c.lineTo(cx + S * 0.3, cy + S * 0.09)
      c.lineTo(cx + S * 0.5, cy - S * 0.08)
      c.lineTo(R, horizon + S * 0.02)
      c.closePath()
      c.fill()

      c.fillRect(L, horizon + S * 0.06, R - L, S * 0.045) // water lines
      c.fillRect(L + S * 0.1, horizon + S * 0.15, (R - L) * 0.62, S * 0.035)
      c.fillRect(L + S * 0.34, horizon + S * 0.24, (R - L) * 0.44, S * 0.03)
    },

    function loan(c, S, cx, cy) {
      const t = S * 0.085
      c.lineWidth = t
      c.strokeStyle = '#fff'
      c.lineCap = 'butt'
      c.beginPath()
      c.arc(cx, cy, S * 0.28, 0, Math.PI * 2)
      c.stroke()
      c.fillRect(cx - t * 0.45, cy - S * 0.17, t * 0.9, S * 0.34)
      c.fillRect(cx - S * 0.11, cy - S * 0.09, S * 0.22, t * 0.8)
      c.fillRect(cx - S * 0.11, cy + S * 0.03, S * 0.22, t * 0.8)

      c.lineWidth = t * 1.05 // circular arrow around the coin
      c.beginPath()
      c.arc(cx, cy, S * 0.46, Math.PI * 0.18, Math.PI * 1.62)
      c.stroke()
      const ax = cx + Math.cos(Math.PI * 0.18) * S * 0.46
      const ay = cy + Math.sin(Math.PI * 0.18) * S * 0.46
      c.beginPath()
      c.moveTo(ax + t * 1.5, ay - t * 0.4)
      c.lineTo(ax - t * 1.1, ay - t * 1.5)
      c.lineTo(ax - t * 0.6, ay + t * 1.6)
      c.closePath()
      c.fill()
    },

    function treasury(c, S, cx, cy) {
      const botY = cy + S * 0.4
      const t = S * 0.03
      c.fillRect(cx - S * 0.3, cy - S * 0.4, S * 0.6, botY - (cy - S * 0.4)) // tower
      c.fillRect(cx + S * 0.3, cy - S * 0.14, S * 0.22, botY - (cy - S * 0.14)) // annex
      c.fillRect(cx - S * 0.5, cy - S * 0.06, S * 0.2, botY - (cy - S * 0.06)) // annex
      c.fillRect(cx - S * 0.36, cy - S * 0.46, S * 0.72, S * 0.06) // cornice
      c.fillRect(cx - t * 0.6, cy - S * 0.6, t * 1.2, S * 0.14) // mast

      c.save()
      c.globalCompositeOperation = 'destination-out'
      const ww = S * 0.075
      const wh = S * 0.055
      for (let r = 0; r < 5; r++)
        for (let k = 0; k < 4; k++)
          c.fillRect(cx - S * 0.235 + k * S * 0.135, cy - S * 0.315 + r * S * 0.125, ww, wh)
      for (let r = 0; r < 3; r++) c.fillRect(cx + S * 0.355, cy - S * 0.055 + r * S * 0.125, ww, wh)
      for (let r = 0; r < 2; r++) c.fillRect(cx - S * 0.44, cy + S * 0.03 + r * S * 0.125, ww, wh)

      c.beginPath() // entrance
      c.moveTo(cx - S * 0.075, botY)
      c.lineTo(cx - S * 0.075, cy + S * 0.26)
      c.quadraticCurveTo(cx, cy + S * 0.2, cx + S * 0.075, cy + S * 0.26)
      c.lineTo(cx + S * 0.075, botY)
      c.closePath()
      c.fill()
      c.restore()
    },
  ]
}

/**
 * `top` is how far below the canvas top the shapes start, in px. The old site's canvas ran up behind a
 * see-through nav, so it used 150; site-v2's hero starts below the header, so it passes less.
 */
export function createSpray(canvas: HTMLCanvasElement, { top = 150 }: { top?: number } = {}): Spray | null {
  const ctx = canvas.getContext('2d')
  if (!ctx) return null

  const CELL = window.innerWidth < 640 ? 10 : 8
  const STEPS = 10
  const styles: string[] = []
  for (let k = 0; k < STEPS; k++) {
    styles.push(`rgba(255,255,255,${((0.08 + k * 0.075) * 0.8).toFixed(3)})`)
  }

  const shapes = buildShapes(LOGO_PATH_DATA.map((d) => new Path2D(d)))

  let noise: Float32Array | null = null
  let w = 0
  let h = 0
  let cols = 0
  let rows = 0
  let cur: Float32Array | null = null
  let tgt: Float32Array | null = null
  let gi = 0
  let t0 = performance.now()
  let mx = -9999
  let my = -9999
  let raf = 0

  const off = document.createElement('canvas')
  const octx = off.getContext('2d')!

  const rasterize = (fn: Shape): Float32Array => {
    off.width = cols
    off.height = rows
    octx.clearRect(0, 0, cols, rows)
    octx.fillStyle = '#fff'
    const S = cols * 0.7
    fn(octx, S, cols / 2, top / CELL + S * 0.48) // top-aligned, clear of the nav
    const d = octx.getImageData(0, 0, cols, rows).data
    const a = new Float32Array(cols * rows)
    for (let i = 0; i < cols * rows; i++) a[i] = d[i * 4 + 3] > 110 ? 1 : 0
    return a
  }

  const resize = () => {
    const r = canvas.getBoundingClientRect()
    if (!r.width || !r.height) return
    w = r.width
    h = r.height
    canvas.width = Math.round(w)
    canvas.height = Math.round(h)
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    cols = Math.ceil(w / CELL) + 1
    rows = Math.ceil(h / CELL) + 1
    cur = new Float32Array(cols * rows)
    noise = new Float32Array(cols * rows)
    for (let i = 0; i < noise.length; i++) noise[i] = Math.random()
    tgt = rasterize(shapes[gi])
  }

  resize()
  window.addEventListener('resize', resize)

  let lastDraw = 0
  let settled = false
  let lastMx = -9999
  let lastMy = -9999

  const tick = (now: number) => {
    raf = requestAnimationFrame(tick)
    if (!w || !cur || !tgt || !noise) {
      resize()
      return
    }
    if (now - t0 > 5200) {
      gi = (gi + 1) % shapes.length
      t0 = now
      tgt = rasterize(shapes[gi])
      settled = false
    }
    if (now - lastDraw < 32) return
    const moved = mx !== lastMx || my !== lastMy
    if (settled && !moved) return
    lastDraw = now
    lastMx = mx
    lastMy = my

    const morph = now - t0 < 1400
    const ph = (now / 90) | 0
    let busy = morph
    ctx.clearRect(0, 0, w, h)

    const tx = w / 2
    const ty0 = h * 0.08
    const ty1 = h * 0.56
    const txr = Math.min(w * 0.3, 520)
    let cs = -1

    for (let r = 0; r < rows; r++) {
      const y = r * CELL
      const inY = y > ty0 && y < ty1
      const fy = inY ? Math.min(1, Math.min(y - ty0, ty1 - y) / (h * 0.12)) : 0
      const rowOff = r * cols
      for (let c = 0; c < cols; c++) {
        const i = rowOff + c
        let v = cur[i]
        const d = tgt[i] - v
        if (d > 0.002 || d < -0.002) {
          v += d * (0.05 + ((c * 7 + r * 13) % 11) * 0.005)
          cur[i] = v
          busy = true
        }
        let a = 0.11 + v * 0.46
        if (morph && (d > 0.1 || d < -0.1) && ((noise[i] * 97 + ph) % 6 | 0) === 0) a += 0.42
        if (inY) {
          const dx = tx - c * CELL
          const ax = dx < 0 ? -dx : dx
          if (ax < txr) a *= 1 - 0.62 * (1 - ax / txr) * fy
        }
        const k = a >= 0.83 ? STEPS - 1 : ((a - 0.08) / 0.075) | 0
        if (k < 0) continue
        if (k !== cs) {
          cs = k
          ctx.fillStyle = styles[k]
        }
        const sz = 2.2 + v * 2.1
        ctx.fillRect(c * CELL - sz * 0.5, y - sz * 0.5, sz, sz)
      }
    }
    settled = !busy

    if (mx > -1000) {
      // cursor glow, local only
      const R = 120
      const c0 = Math.max(0, ((mx - R) / CELL) | 0)
      const c1 = Math.min(cols, ((mx + R) / CELL + 1) | 0)
      const r0 = Math.max(0, ((my - R) / CELL) | 0)
      const r1 = Math.min(rows, ((my + R) / CELL + 1) | 0)
      for (let r = r0; r < r1; r++) {
        for (let c = c0; c < c1; c++) {
          const dx = c * CELL - mx
          const dy = r * CELL - my
          const dd = Math.sqrt(dx * dx + dy * dy)
          if (dd > R) continue
          const g = (1 - dd / R) * (1 - dd / R)
          const k = Math.min(STEPS - 1, ((g * 0.5) / 0.075) | 0)
          if (k < 1) continue
          if (k !== cs) {
            cs = k
            ctx.fillStyle = styles[k]
          }
          const sz = 2.4 + g * 1.8
          ctx.fillRect(c * CELL - sz * 0.5, r * CELL - sz * 0.5, sz, sz)
        }
      }
    }
  }

  raf = requestAnimationFrame(tick)

  return {
    seed: (x, y) => {
      mx = x
      my = y
    },
    cycle: () => {
      gi = (gi + 1) % shapes.length
      t0 = performance.now()
      tgt = rasterize(shapes[gi])
    },
    destroy: () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    },
  }
}
