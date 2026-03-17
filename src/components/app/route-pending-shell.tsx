export function RoutePendingShell() {
  return (
    <div data-route-pending-shell="true" className="app-shell" aria-hidden="true">
      <div className="page-wrap">
        <header className="mb-6 space-y-4">
          <div className="mb-4 flex items-center justify-between gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-sm md:hidden">
            <div className="flex min-w-0 items-center gap-2">
              <img src="/logo.svg" alt="" className="size-8 rounded-xl" />
              <div className="h-5 w-28 rounded-full bg-[var(--input)]" />
            </div>
            <div className="size-10 rounded-xl border border-border bg-[var(--input)]" />
          </div>

          <div data-route-pending-frame="true" className="shell-frame hidden rounded-3xl border border-border/70 bg-[color:var(--surface-floating)] shadow-sm md:block">
            <div className="flex gap-4 p-6">
              <div className="flex min-w-0 items-start justify-between gap-6">
                <div className="flex min-w-0 items-center gap-3">
                  <img src="/logo.svg" alt="" className="size-11 rounded-2xl" />
                  <div className="min-w-0 space-y-2">
                    <div className="h-2.5 w-20 rounded-full bg-[var(--input)]" />
                    <div className="h-7 w-36 rounded-full bg-[var(--input)]" />
                  </div>
                </div>
                <div className="shell-utility-cluster">
                  <div className="size-10 rounded-2xl border border-border bg-[var(--input)]" />
                  <div className="size-10 rounded-2xl border border-border bg-[var(--input)]" />
                  <div className="size-10 rounded-2xl border border-border bg-[var(--input)]" />
                </div>
              </div>
              <div className="shell-nav-divider" />
              <div className="desktop-tool-nav">
                <div className="desktop-tool-nav-track">
                  <div className="h-10 w-28 shrink-0 rounded-xl border border-border bg-[var(--input)]" />
                  <div className="h-10 w-28 shrink-0 rounded-xl border border-border bg-[var(--input)]" />
                  <div className="h-10 w-32 shrink-0 rounded-xl border border-border bg-[var(--input)]" />
                  <div className="h-10 w-24 shrink-0 rounded-xl border border-border bg-[var(--input)]" />
                  <div className="h-10 w-24 shrink-0 rounded-xl border border-border bg-[var(--input)]" />
                  <div className="h-10 w-24 shrink-0 rounded-xl border border-border bg-[var(--input)]" />
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="mb-6 max-w-3xl">
          <div className="h-3 w-24 rounded-full bg-[var(--input)]" />
          <div className="mt-3 h-10 w-full max-w-xl rounded-2xl bg-[var(--input)]" />
          <div className="mt-3 h-4 w-full max-w-2xl rounded-full bg-[var(--input)]" />
          <div className="mt-2 h-4 w-full max-w-xl rounded-full bg-[var(--input)]" />
        </section>

        <main className="surface-grid">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
            <section data-route-pending-primary="true" className="rounded-3xl border border-border bg-card p-5 shadow-sm">
              <div className="h-5 w-44 rounded-full bg-[var(--input)]" />
              <div className="mt-5 grid gap-4">
                <div className="rounded-3xl border border-border/70 bg-[color:var(--surface-floating)] p-5">
                  <div className="h-4 w-28 rounded-full bg-[var(--input)]" />
                  <div className="mt-4 h-14 w-full max-w-sm rounded-2xl bg-[var(--input)]" />
                  <div className="mt-4 h-10 w-40 rounded-xl bg-[var(--input)]" />
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="h-28 rounded-2xl bg-[var(--input)]" />
                  <div className="h-28 rounded-2xl bg-[var(--input)]" />
                </div>
              </div>
            </section>

            <aside data-route-pending-secondary="true" className="grid gap-4">
              <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
                <div className="h-5 w-32 rounded-full bg-[var(--input)]" />
                <div className="mt-4 grid gap-3">
                  <div className="h-24 rounded-2xl bg-[var(--input)]" />
                  <div className="h-24 rounded-2xl bg-[var(--input)]" />
                  <div className="h-24 rounded-2xl bg-[var(--input)]" />
                </div>
              </div>
              <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
                <div className="h-5 w-24 rounded-full bg-[var(--input)]" />
                <div className="mt-4 h-24 rounded-2xl bg-[var(--input)]" />
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  )
}
