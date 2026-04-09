"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Cable,
  Compass,
  Database,
  ExternalLink,
  Globe2,
  Search,
  ShieldCheck
} from "lucide-react";

import { AnimatedSubtitle } from "@/components/animated-subtitle";
import { CodeWindow } from "@/components/code-window";
import { NetworkExplorer } from "@/components/network-explorer";
import {
  discoverNetworksRequest,
  discoverNetworksResponse,
  executeRequest,
  executeResponse,
  featuredServices,
  gatewayStats,
  runtimeFlow,
  searchRequest,
  searchResponse,
  setupConfigExample,
  specCards
} from "@/lib/gateway-data";

const sectionTransition = {
  duration: 0.55,
  ease: [0.22, 1, 0.36, 1]
} as const;

const iconMap = [Globe2, Search, Cable];

export default function HomePage() {
  return (
    <main className="page-shell">
      <div className="shell-grid">
        <motion.header
          className="topbar glass-panel"
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={sectionTransition}
        >
          <div className="brand-mark">
            <span className="brand-mark-dot" />
            Chain-Love Gateway
          </div>
          <a className="topbar-link" href="#setup">
            Setup Guide
          </a>
        </motion.header>

        <section className="hero-layout">
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={sectionTransition}
          >
            <span className="section-kicker">Hero Section</span>
            <h1>Chain-Love: The Web3 MCP Gateway</h1>
            <p className="hero-description">
              A single MCP gateway for discovering chains, searching the Web3 service registry, and proxying
              downstream tool servers through one clean runtime surface.
            </p>

            <AnimatedSubtitle />

            <div className="hero-actions">
              <motion.a
                href="#playground"
                className="button-primary"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                API Playground
                <ArrowRight size={18} />
              </motion.a>
              <motion.a
                href="#setup"
                className="button-secondary"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Add to mcp_config.json
              </motion.a>
            </div>

            <div className="stats-grid">
              {gatewayStats.map((stat) => (
                <motion.div
                  key={stat.label}
                  className="stat-card glass-panel"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                  <small>{stat.detail}</small>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.aside
            className="hero-side glass-panel"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...sectionTransition, delay: 0.08 }}
          >
            <div className="side-header">
              <ShieldCheck size={18} />
              <span>Gateway Runtime Flow</span>
            </div>

            <div className="runtime-flow">
              {runtimeFlow.map((step, index) => (
                <div key={step} className="runtime-step">
                  <div className="runtime-step-index">{index + 1}</div>
                  <div>
                    <strong>{step}</strong>
                    <p>
                      {step === "bind_credentials_bag"
                        ? "Bind session-scoped downstream credentials once."
                        : step === "connect_mcp"
                          ? "Validate and connect to a downstream MCP like GitHub."
                          : step === "list_mcp_tools"
                            ? "Inspect the real tool surface exposed by that MCP."
                            : "Execute downstream tool calls through the gateway."}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="service-badges">
              {featuredServices.map((service) => (
                <span key={service}>{service}</span>
              ))}
            </div>
          </motion.aside>
        </section>

        <motion.section
          id="specs"
          className="section-block"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={sectionTransition}
        >
          <div className="section-head">
            <span className="section-kicker">Technical Specs</span>
            <h2>Built for discovery, registry lookup, and proxy execution</h2>
            <p>
              The site content mirrors real chain-love behavior: canonical network discovery, dynamic registry
              categories, and connection-aware execution against downstream MCPs.
            </p>
          </div>

          <div className="spec-grid">
            {specCards.map((card, index) => {
              const Icon = iconMap[index];

              return (
                <motion.article
                  key={card.title}
                  className="spec-card glass-panel"
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="spec-icon">
                    <Icon size={22} />
                  </div>
                  <span className="section-kicker">{card.eyebrow}</span>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <ul className="spec-list">
                    {card.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </motion.article>
              );
            })}
          </div>
        </motion.section>

        <motion.section
          id="playground"
          className="section-block"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={sectionTransition}
        >
          <div className="section-head">
            <span className="section-kicker">API Playground</span>
            <h2>Code examples styled like a live editor</h2>
            <p>
              Each example below is derived from the current gateway shape: `discover_networks`, `search`, and
              `execute` are shown with real request and response structures.
            </p>
          </div>

          <div className="playground-grid">
            <motion.article className="playground-card glass-panel" whileHover={{ y: -6 }}>
              <div className="playground-header">
                <div>
                  <span className="section-kicker">discover_networks</span>
                  <h3>Ask the gateway what chains it knows</h3>
                </div>
                <Compass size={20} />
              </div>
              <CodeWindow
                label="Request"
                title="discover_networks.json"
                code={JSON.stringify(discoverNetworksRequest, null, 2)}
              />
              <CodeWindow
                label="Response"
                title="discover_networks.result.json"
                code={JSON.stringify(discoverNetworksResponse, null, 2)}
              />
            </motion.article>

            <motion.article className="playground-card glass-panel" whileHover={{ y: -6 }}>
              <div className="playground-header">
                <div>
                  <span className="section-kicker">search</span>
                  <h3>Find a downstream MCP in the registry</h3>
                </div>
                <Database size={20} />
              </div>
              <CodeWindow
                label="Request"
                title="search.json"
                code={JSON.stringify(searchRequest, null, 2)}
              />
              <CodeWindow
                label="Response"
                title="search.result.json"
                code={JSON.stringify(searchResponse, null, 2)}
              />
            </motion.article>

            <motion.article className="playground-card glass-panel" whileHover={{ y: -6 }}>
              <div className="playground-header">
                <div>
                  <span className="section-kicker">execute</span>
                  <h3>Connect to GitHub through the gateway</h3>
                </div>
                <Bot size={20} />
              </div>
              <CodeWindow
                label="Request"
                title="execute.json"
                code={JSON.stringify(executeRequest, null, 2)}
              />
              <CodeWindow
                label="Response"
                title="execute.result.json"
                code={JSON.stringify(executeResponse, null, 2)}
              />
            </motion.article>
          </div>
        </motion.section>

        <motion.section
          id="setup"
          className="section-block"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={sectionTransition}
        >
          <div className="section-head">
            <span className="section-kicker">Setup Guide</span>
            <h2>Add the gateway to your mcp_config.json</h2>
            <p>
              This example mirrors the structure from the current local config, but the real secrets are masked.
              The GitHub header is optional and only needed when you want proxied GitHub calls to authenticate
              downstream.
            </p>
          </div>

          <div className="setup-layout">
            <div className="setup-copy glass-panel">
              <div className="setup-step">
                <span>1</span>
                <p>
                  Add a `chainlove-prod` server entry with the hosted gateway URL at
                  `https://app.chain.love/mcp`.
                </p>
              </div>
              <div className="setup-step">
                <span>2</span>
                <p>
                  Provide your bearer token in `Authorization`, then optionally forward downstream credentials like
                  GitHub via `x-chainlove-cred-github`.
                </p>
              </div>
              <div className="setup-step">
                <span>3</span>
                <p>
                  Use the runtime flow above to bind credentials, connect to an MCP, inspect its tools, and call
                  them through the same gateway session.
                </p>
              </div>
              <a className="inline-link" href="#specs">
                See the technical flow
                <ExternalLink size={15} />
              </a>
            </div>

            <div className="setup-code">
              <CodeWindow
                label="Config"
                title="mcp_config.json"
                code={JSON.stringify(setupConfigExample, null, 2)}
              />
            </div>
          </div>
        </motion.section>

        <motion.section
          id="explore"
          className="section-block"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={sectionTransition}
        >
          <NetworkExplorer />
        </motion.section>
      </div>
    </main>
  );
}
