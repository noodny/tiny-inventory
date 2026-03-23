import * as React from "react"

import { cn } from "@/lib/utils"
import { ChevronDownIcon, CheckIcon, SearchIcon } from "lucide-react"

interface ComboboxOption {
  value: string
  label: string
}

interface ComboboxProps {
  options: ComboboxOption[]
  value: string
  onValueChange: (value: string) => void
  placeholder?: string
  className?: string
  "data-test"?: string
}

function Combobox({
  options,
  value,
  onValueChange,
  placeholder = "Select...",
  className,
  "data-test": dataTest,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const containerRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const filtered = React.useMemo(() => {
    if (!search) return options
    const q = search.toLowerCase()
    return options.filter((o) => o.label.toLowerCase().includes(q))
  }, [options, search])

  const selectedLabel = options.find((o) => o.value === value)?.label

  const handleSelect = (val: string) => {
    onValueChange(val)
    setOpen(false)
    setSearch("")
  }

  React.useEffect(() => {
    if (!open) return
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
        setSearch("")
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [open])

  React.useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        data-slot="combobox-trigger"
        data-test={dataTest}
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "flex w-full items-center justify-between gap-1.5 rounded-lg border border-input bg-transparent py-2 pr-2 pl-2.5 text-sm whitespace-nowrap transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 h-8 dark:bg-input/30 dark:hover:bg-input/50",
          !selectedLabel && "text-muted-foreground",
          className,
        )}
      >
        <span className="flex-1 text-left truncate">
          {selectedLabel ?? placeholder}
        </span>
        <ChevronDownIcon className="pointer-events-none size-4 shrink-0 text-muted-foreground" />
      </button>
      {open && (
        <div
          data-slot="combobox-content"
          className="absolute top-full left-0 z-50 mt-1 w-full min-w-48 rounded-lg bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10"
        >
          <div className="flex items-center gap-2 border-b px-2.5 py-2">
            <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
            <input
              ref={inputRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              data-test={dataTest ? `${dataTest}-search` : undefined}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <div className="max-h-56 overflow-y-auto p-1">
            {filtered.length === 0 && (
              <div className="px-2 py-4 text-center text-sm text-muted-foreground">
                No results
              </div>
            )}
            {filtered.map((option) => (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={option.value === value}
                onClick={() => handleSelect(option.value)}
                className={cn(
                  "relative flex w-full cursor-default items-center gap-1.5 rounded-md py-1.5 pr-8 pl-1.5 text-sm outline-hidden select-none hover:bg-accent hover:text-accent-foreground",
                  option.value === value && "bg-accent/50",
                )}
              >
                <span className="flex-1 text-left truncate">{option.label}</span>
                {option.value === value && (
                  <span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center">
                    <CheckIcon className="size-4" />
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export { Combobox }
export type { ComboboxOption }
