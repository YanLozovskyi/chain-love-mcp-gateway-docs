"use client";

import { AnimatePresence, motion } from "framer-motion";
import { LoaderCircle, Search, Sparkles } from "lucide-react";
import { useDeferredValue, useState, useTransition } from "react";

interface NetworkRecord {
  chain: string;
  loaded: boolean;
}

interface NetworkSnapshot {
  source: string;
  total: number;
  lastUpdated: string;
  networks: NetworkRecord[];
}

export function NetworkExplorer() {
  const [snapshot, setSnapshot] = useState<NetworkSnapshot | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();
  const deferredQuery = useDeferredValue(query);

  const normalizedQuery = deferredQuery.trim().toLowerCase();
  const filteredNetworks = snapshot
    ? snapshot.networks.filter((network) => network.chain.includes(normalizedQuery))
    : [];

  async function loadSnapshot() {
    try {
      setError(null);

      const response = await fetch("/api/networks", { cache: "no-store" });
      if (!response.ok) {
        throw new Error("Unable to fetch registry snapshot.");
      }

      const data = (await response.json()) as NetworkSnapshot;
      setSnapshot(data);
    } catch (loadError) {
      setError((loadError as Error).message);
    }
  }

  function handleExplore() {
    startTransition(() => {
      void loadSnapshot();
    });
  }

  return (
    <div className="explorer-panel">
      <div className="explorer-header">
        <div>
          <span className="section-kicker">Interactive Snapshot</span>
          <h3>Explore the registry from the landing page</h3>
          <p>
            Pull a live-style gateway snapshot and filter the current chain list without exposing any downstream
            credentials in the browser.
          </p>
        </div>
        <motion.button
          type="button"
          className="button-primary"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleExplore}
          disabled={isPending}
        >
          {isPending ? <LoaderCircle className="spin-icon" size={18} /> : <Sparkles size={18} />}
          {snapshot ? "Refresh Snapshot" : "Explore Registry"}
        </motion.button>
      </div>

      <AnimatePresence initial={false}>
        {snapshot ? (
          <motion.div
            key="snapshot"
            className="explorer-content"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="explorer-toolbar">
              <div className="explorer-badge">
                <span>{snapshot.source}</span>
                <strong>{snapshot.total} networks</strong>
              </div>
              <label className="explorer-search">
                <Search size={16} />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Filter chains like base, filecoin, zksync..."
                />
              </label>
            </div>

            <div className="explorer-meta">
              Snapshot date: <strong>{snapshot.lastUpdated}</strong>
            </div>

            <div className="network-grid">
              {filteredNetworks.map((network) => (
                <motion.div
                  key={network.chain}
                  className="network-chip"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.22 }}
                >
                  <span>{network.chain}</span>
                  <small>{network.loaded ? "loaded" : "pending"}</small>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {error ? <p className="explorer-error">{error}</p> : null}
    </div>
  );
}
