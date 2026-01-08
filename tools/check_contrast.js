const fs = require('fs')
const path = require('path')

function hexToRgb(hex) {
  if (!hex) return null
  hex = hex.replace('#', '')
  if (hex.length === 3) hex = hex.split('').map(c=>c+c).join('')
  const bigint = parseInt(hex, 16)
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255]
}

function luminance([r,g,b]){
  const srgb = [r,g,b].map(v=>v/255).map(v=> v<=0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055,2.4))
  return 0.2126*srgb[0]+0.7152*srgb[1]+0.0722*srgb[2]
}

function contrast(rgbA, rgbB){
  const L1 = luminance(rgbA)
  const L2 = luminance(rgbB)
  const lighter = Math.max(L1,L2)
  const darker = Math.min(L1,L2)
  return (lighter+0.05)/(darker+0.05)
}

const css = fs.readFileSync(path.join(__dirname,'..','styles','globals.css'),'utf8')

function parseVars(selector){
  const re = new RegExp(selector.replace(/[-\/\\^$*+?.()|[\]{}]/g,'\\$&')+"\\s*\\{([\\s\\S]*?)\\}", 'm')
  const m = css.match(re)
  if(!m) return {}
  const body = m[1]
  const vars = {}
  body.split(/;\s*/).forEach(line=>{
    const p = line.split(':').map(s=>s.trim())
    if(p[0] && p[1] && p[0].startsWith('--')) vars[p[0]] = p[1]
  })
  return vars
}

const rootVars = parseVars(':root')
const lightVars = parseVars('[data-theme="light"]')
const darkVars = parseVars('[data-theme="dark"]')

function extractAccentSelectors(){
  const accents = {}
    const re = /\[data-accent="(.*?)"\]\s*\{([\s\S]*?)\}/g
  let m
  while((m = re.exec(css))){
    const name = m[1]
    const body = m[2]
    const vars = {}
    body.split(/;\s*/).forEach(line=>{ const p=line.split(':').map(s=>s.trim()); if(p[0]&&p[1]&&p[0].startsWith('--')) vars[p[0]]=p[1] })
    accents[name]=vars
  }
  return accents
}

function extractPerThemeAccent(){
  const map = {}
  const re = /\[data-theme="(.*?)"\]\[data-accent="(.*?)"\]\s*\{([\s\S]*?)\}/g
  let m
  while((m = re.exec(css))){
    const theme = m[1]
    const accent = m[2]
    const body = m[3]
    const vars = {}
    body.split(/;\s*/).forEach(line=>{ const p=line.split(':').map(s=>s.trim()); if(p[0]&&p[1]&&p[0].startsWith('--')) vars[p[0]]=p[1] })
    map[`${theme}::${accent}`] = vars
  }
  return map
}

const accents = extractAccentSelectors()
const perThemeAccent = extractPerThemeAccent()

function pick(vars, key){
  if(vars[key]) return vars[key]
  if(rootVars[key]) return rootVars[key]
  return null
}

function toRgb(value){
  if(!value) return null
  value = value.trim()
  if(value.startsWith('#')) return hexToRgb(value)
  const m = value.match(/rgba?\(([^)]+)\)/)
  if(m){ return m[1].split(',').slice(0,3).map(s=>parseFloat(s)) }
  return null
}

const themes = { light: {...rootVars, ...lightVars}, dark: {...rootVars, ...darkVars} }

console.log('Checking contrasts for theme × accent combinations')
for(const [tname, tvars] of Object.entries(themes)){
  for(const [acName, acVars] of Object.entries(accents)){
    const vars = {...tvars, ...acVars}
    const per = perThemeAccent[`${tname}::${acName}`]
    if(per) Object.assign(vars, per)
    const bg = toRgb(pick(vars,'--bg'))
    const fg = toRgb(pick(vars,'--fg'))
    const muted = toRgb(pick(vars,'--muted'))
    const card = toRgb(pick(vars,'--card-bg'))
    const accent = toRgb(pick(vars,'--accent')) || (vars['--accent-rgb'] ? vars['--accent-rgb'].split(',').map(s=>parseInt(s)) : null)

    const results = []
    if(bg && fg) results.push({pair:'fg/bg',ratio:contrast(fg,bg)})
    if(card && fg) results.push({pair:'fg/card',ratio:contrast(fg,card)})
    if(bg && accent) results.push({pair:'accent/bg',ratio:contrast(accent,bg)})
    if(card && accent) results.push({pair:'accent/card',ratio:contrast(accent,card)})

    console.log(`\nTheme: ${tname}, Accent: ${acName}`)
    results.forEach(r=>{
      const pass = r.ratio>=4.5 ? 'OK' : (r.ratio>=3 ? 'AA-large' : 'FAIL')
      console.log(`  ${r.pair}: ${r.ratio.toFixed(2)} → ${pass}`)
    })
  }
}
