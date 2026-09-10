export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <header className="mb-12 text-center">
        <h1 className="text-6xl font-bold text-primary mb-4 tracking-tighter">CodeForge</h1>
        <p className="text-xl text-foreground opacity-80">Distributed Code Execution Engine</p>
      </header>
      
      <main className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card border border-border p-6 rounded-lg shadow-lg hover:border-primary transition-colors">
          <h2 className="text-2xl font-semibold text-accent mb-3">Problems</h2>
          <p className="opacity-80 mb-4">Browse and solve coding challenges.</p>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded font-medium hover:bg-accent transition-colors">
            View Problems
          </button>
        </div>
        
        <div className="bg-card border border-border p-6 rounded-lg shadow-lg hover:border-primary transition-colors">
          <h2 className="text-2xl font-semibold text-accent mb-3">Leaderboard</h2>
          <p className="opacity-80 mb-4">See where you rank among other developers.</p>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded font-medium hover:bg-accent transition-colors">
            View Leaderboard
          </button>
        </div>
      </main>
      
      <footer className="mt-16 opacity-50 text-sm">
        CodeForge &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}
