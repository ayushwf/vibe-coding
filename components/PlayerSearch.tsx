import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import { topPlayers, Player } from '../data/players'

function slugOf(name?: string) {
    if (!name) return ''
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

export default function PlayerSearch() {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<Player[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()
    const wrapperRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const q = e.target.value
        setQuery(q)

        if (q.length > 0) {
            const filtered = topPlayers.filter(p =>
                p.name?.toLowerCase().includes(q.toLowerCase())
            )
            setResults(filtered)
            setIsOpen(true)
        } else {
            setResults([])
            setIsOpen(false)
        }
    }

    const handleSelect = (player: Player) => {
        const slug = slugOf(player.name)
        router.push(`/players/${slug}`)
        setQuery('')
        setIsOpen(false)
    }

    return (
        <div ref={wrapperRef} style={{ position: 'relative', width: 280 }}>
            <div style={{
                position: 'absolute',
                left: 14,
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--muted)',
                pointerEvents: 'none',
                display: 'flex'
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
            </div>
            <input
                type="text"
                value={query}
                onChange={handleSearch}
                onFocus={() => query.length > 0 && setIsOpen(true)}
                placeholder="Search for players"
                style={{
                    width: '100%',
                    padding: '10px 16px 10px 42px',
                    borderRadius: 99,
                    border: '1px solid rgba(var(--accent-rgb), 0.2)',
                    background: 'rgba(15, 23, 42, 0.6)',
                    backdropFilter: 'blur(12px)',
                    color: 'var(--fg)',
                    outline: 'none',
                    transition: 'all 0.2s',
                    fontSize: '0.95rem',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
                className="glass-input"
            />
            {isOpen && results.length > 0 && (
                <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    marginTop: 8,
                    background: 'rgba(255, 255, 255, 0.85)',
                    backdropFilter: 'blur(12px)',
                    borderRadius: 12,
                    border: '1px solid var(--glass-border)',
                    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
                    overflow: 'hidden',
                    zIndex: 50,
                }}>
                    {results.map(player => (
                        <div
                            key={player.id}
                            onClick={() => handleSelect(player)}
                            style={{
                                padding: '10px 12px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8,
                                borderBottom: '1px solid rgba(0,0,0,0.05)',
                                color: 'var(--fg)'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(var(--accent-rgb), 0.1)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                        >
                            {player.image && (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={player.image}
                                    alt={player.name}
                                    style={{ width: 24, height: 24, borderRadius: '50%', objectFit: 'cover' }}
                                />
                            )}
                            <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{player.name}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
