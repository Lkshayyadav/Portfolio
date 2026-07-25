'use client'

import { useEffect, useState } from 'react'
import { PERSONAL } from '@/lib/config'

interface ContributionDay {
    date: string
    count: number
    level: number
}

interface ContributionWeek {
    contributionDays: ContributionDay[]
}

interface GitHubActivityProps {
    username?: string
}

interface ApiData {
    total: Record<string, number>
    contributions: ContributionDay[]
}

export default function GitHubActivity({ username = PERSONAL.githubUsername }: GitHubActivityProps) {
    const [rawApiData, setRawApiData] = useState<ApiData | null>(null)
    const [availableYears, setAvailableYears] = useState<string[]>([])
    const [selectedYear, setSelectedYear] = useState<string>('')
    const [contributions, setContributions] = useState<ContributionWeek[]>([])
    const [totalContributions, setTotalContributions] = useState(0)
    const [allTimeTotal, setAllTimeTotal] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchContributions = async () => {
            try {
                setLoading(true)

                // Fetch all contribution data for username
                const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}`)
                if (!response.ok) {
                    throw new Error('Failed to fetch contributions')
                }

                const data: ApiData = await response.json()
                setRawApiData(data)

                if (data.total) {
                    // Calculate all-time total contributions across all available years
                    const overallTotal = Object.values(data.total).reduce((sum, count) => sum + count, 0)
                    setAllTimeTotal(overallTotal)

                    // Extract available years sorted descending (e.g. 2026, 2025, 2024)
                    const years = Object.keys(data.total).sort((a, b) => Number(b) - Number(a))
                    setAvailableYears(years)

                    // Default to latest year available
                    if (years.length > 0) {
                        setSelectedYear(years[0])
                    } else {
                        setSelectedYear(String(new Date().getFullYear()))
                    }
                }
                setError(null)
            } catch (err) {
                setError('Failed to load GitHub activity')
                console.error('Error fetching GitHub contributions:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchContributions()
    }, [username])

    // Update contribution grid whenever selectedYear or rawApiData changes
    useEffect(() => {
        if (!rawApiData || !selectedYear) return

        const yearDays = rawApiData.contributions.filter((day) =>
            day.date.startsWith(selectedYear)
        )

        const weeks: ContributionWeek[] = []
        let currentWeek: ContributionDay[] = []
        let total = 0
        let isFirstDay = true

        yearDays.forEach((day) => {
            const date = new Date(day.date)
            const dayOfWeek = date.getDay()

            // For the first day, pad the week with empty days if it doesn't start on Sunday
            if (isFirstDay && dayOfWeek !== 0) {
                for (let i = 0; i < dayOfWeek; i++) {
                    currentWeek.push({
                        date: '',
                        count: 0,
                        level: 0
                    })
                }
            }
            isFirstDay = false

            if (dayOfWeek === 0 && currentWeek.length > 0) {
                weeks.push({ contributionDays: currentWeek })
                currentWeek = []
            }

            currentWeek.push({
                date: day.date,
                count: day.count,
                level: day.level
            })

            total += day.count
        })

        if (currentWeek.length > 0) {
            weeks.push({ contributionDays: currentWeek })
        }

        setContributions(weeks)
        // Use total count from API for selected year or calculated sum
        setTotalContributions(rawApiData.total[selectedYear] ?? total)
    }, [selectedYear, rawApiData])

    const getContributionColor = (level: number) => {
        const colors = {
            light: [
                'bg-neutral-100',
                'bg-green-200',
                'bg-green-300',
                'bg-green-400',
                'bg-green-600'
            ],
            dark: [
                'dark:bg-neutral-800',
                'dark:bg-green-900',
                'dark:bg-green-700',
                'dark:bg-green-500',
                'dark:bg-green-400'
            ]
        }
        return `${colors.light[level]} ${colors.dark[level]}`
    }

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    const getMonthLabels = () => {
        if (contributions.length === 0) return []

        const labels: { month: string; position: number }[] = []
        let currentMonth = -1
        let lastLabelPosition = -10

        contributions.forEach((week, weekIndex) => {
            const validDay = week.contributionDays.find((day) => day.date !== '')
            if (validDay) {
                const date = new Date(validDay.date)
                const month = date.getMonth()

                if (currentMonth === -1) {
                    currentMonth = month
                    labels.push({ month: months[month], position: weekIndex })
                    lastLabelPosition = weekIndex
                } else if (month !== currentMonth && weekIndex - lastLabelPosition >= 3) {
                    currentMonth = month
                    labels.push({ month: months[month], position: weekIndex })
                    lastLabelPosition = weekIndex
                } else if (month !== currentMonth) {
                    currentMonth = month
                }
            }
        })

        return labels
    }

    const monthLabels = getMonthLabels()
    const totalWeeks = contributions.length

    if (loading) {
        return (
            <div className="w-full">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-4">
                    <div>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">Featured</p>
                        <h3 className="text-xl font-semibold text-black dark:text-white mb-1">GitHub Activity</h3>
                        <div className="h-4 w-40 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse" />
                    </div>
                </div>
                <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 sm:p-6">
                    <div className="grid grid-cols-[repeat(53,1fr)] gap-[2px]">
                        {Array.from({ length: 53 }).map((_, weekIndex) => (
                            <div key={weekIndex} className="flex flex-col gap-[2px]">
                                {Array.from({ length: 7 }).map((_, dayIndex) => (
                                    <div
                                        key={dayIndex}
                                        className="aspect-square w-full rounded-[2px] bg-neutral-200 dark:bg-neutral-700 animate-pulse"
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="w-full">
                <div className="mb-4">
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">Featured</p>
                    <h3 className="text-xl font-semibold text-black dark:text-white mb-1">GitHub Activity</h3>
                </div>
                <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6">
                    <p className="text-neutral-500 dark:text-neutral-400 text-center">{error}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full">
            {/* Header with Year Selector */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-4">
                <div>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">Featured</p>
                    <h3 className="text-xl font-semibold text-black dark:text-white mb-1">GitHub Activity</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        Total: <span className="font-semibold text-black dark:text-white">{allTimeTotal.toLocaleString()}</span> contributions <span className="text-neutral-400 dark:text-neutral-500 font-normal">({totalContributions.toLocaleString()} in {selectedYear})</span>
                    </p>
                </div>

                {/* Year Selector Pills */}
                {availableYears.length > 0 && (
                    <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800/70 p-1 rounded-lg border border-neutral-200 dark:border-neutral-700/60 self-start sm:self-auto">
                        {availableYears.map((year) => (
                            <button
                                key={year}
                                onClick={() => setSelectedYear(year)}
                                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                                    selectedYear === year
                                        ? 'bg-white dark:bg-neutral-700 text-black dark:text-white shadow-sm font-semibold'
                                        : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                                }`}
                            >
                                {year}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div
                className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 sm:p-6 shadow-sm"
                role="img"
                aria-label={`GitHub contribution graph showing ${totalContributions} contributions in ${selectedYear}`}
            >
                {/* Month labels */}
                <div className="relative mb-2">
                    <div
                        className="grid text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-400"
                        style={{ gridTemplateColumns: `repeat(${totalWeeks || 53}, 1fr)` }}
                    >
                        {monthLabels.map((label, index) => (
                            <div
                                key={index}
                                className="text-left"
                                style={{ gridColumn: label.position + 1 }}
                            >
                                {label.month}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contribution grid - fits container width */}
                <div
                    className="grid gap-[2px]"
                    style={{ gridTemplateColumns: `repeat(${totalWeeks || 53}, 1fr)` }}
                >
                    {contributions.map((week, weekIndex) => (
                        <div key={weekIndex} className="flex flex-col gap-[2px]">
                            {week.contributionDays.map((day, dayIndex) => (
                                <div
                                    key={dayIndex}
                                    className={`aspect-square w-full rounded-[2px] transition-colors ${
                                        day.date ? getContributionColor(day.level) : 'bg-transparent'
                                    }`}
                                    title={
                                        day.date
                                            ? `${day.count} contributions on ${new Date(day.date).toLocaleDateString('en-US', {
                                                  weekday: 'short',
                                                  month: 'short',
                                                  day: 'numeric',
                                                  year: 'numeric'
                                              })}`
                                            : undefined
                                    }
                                    aria-label={day.date ? `${day.count} contributions on ${day.date}` : undefined}
                                />
                            ))}
                        </div>
                    ))}
                </div>

                {/* Legend */}
                <div className="flex items-center justify-end mt-4 gap-2 text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-400">
                    <span>Less</span>
                    <div className="flex gap-[2px]">
                        {[0, 1, 2, 3, 4].map((level) => (
                            <div
                                key={level}
                                className={`w-[10px] h-[10px] sm:w-[12px] sm:h-[12px] rounded-[2px] ${getContributionColor(level)}`}
                            />
                        ))}
                    </div>
                    <span>More</span>
                </div>
            </div>
        </div>
    )
}
