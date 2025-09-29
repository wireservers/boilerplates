
import { ResponsiveLine } from '@nivo/line'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../state/hooks'
import { setWindow, togglePaused } from '../state/controlsSlice'

type Point = { x: number; y: number }

function downsample(arr: Point[], max=240){
  if(arr.length <= max) return arr
  const stride = Math.ceil(arr.length / max)
  const out: Point[] = []
  for(let i=0;i<arr.length;i+=stride){ out.push(arr[i]) }
  return out
}

export function Dashboard(){
  const { paused, windowSec } = useAppSelector(s => s.controls)
  const dispatch = useAppDispatch()
  const [series, setSeries] = useState<Point[]>([])
  const timer = useRef<number | null>(null)

  useEffect(() => {
    if(!paused){
      timer.current = window.setInterval(() => {
        const t = Date.now()
        const y = 50 + 8*Math.sin(t/3500) + (Math.random()-0.5)*6
        setSeries(prev => {
          const next = [...prev, { x: t, y: Math.round(y*100)/100 }]
          const cutoff = t - windowSec*1000
          return next.filter(p => p.x >= cutoff)
        })
      }, 500)
    }
    return () => { if(timer.current) clearInterval(timer.current) }
  }, [paused, windowSec])

  const data = useMemo(() => [{
    id: 'telemetry',
    data: downsample(series).map(p => ({ x: new Date(p.x), y: p.y }))
  }], [series])

  const csv = useMemo(() => {
    const rows = ['t,y', ...series.map(p => `${p.x},${p.y}`)].join('\n')
    return URL.createObjectURL(new Blob([rows], { type: 'text/csv' }))
  }, [series])

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <div className="card">
      <div className="toolbar">
        <button className="btn" onClick={()=>dispatch(togglePaused())}>{paused ? 'Resume' : 'Pause'}</button>
        <select value={windowSec} onChange={e=>dispatch(setWindow(Number(e.target.value)))}>
          <option value={30}>Last 30s</option>
          <option value={60}>Last 60s</option>
          <option value={300}>Last 5m</option>
        </select>
        <a className="btn ghost" href={csv} download="telemetry.csv">Export CSV</a>
        <span className="muted">Points: {series.length}</span>
      </div>
      <div className="spacer" />
      <div style={{ height: 320 }}>
        <ResponsiveLine
          data={data}
          margin={{ top: 20, right: 20, bottom: 40, left: 50 }}
          xScale={{ type: 'time', format: 'native' }}
          xFormat="time:%H:%M:%S"
          yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false }}
          axisBottom={{ format: '%H:%M:%S', tickRotation: 0 }}
          useMesh
          enablePoints={false}
          curve="monotoneX"
          isInteractive
          animate={!reduceMotion}
        />
      </div>
    </div>
  )
}
