export const supportedNetworks = [
  { chain: "algorand", loaded: true },
  { chain: "aptos", loaded: true },
  { chain: "arbitrum", loaded: true },
  { chain: "astar", loaded: true },
  { chain: "avalanche", loaded: true },
  { chain: "base", loaded: true },
  { chain: "berachain", loaded: true },
  { chain: "bitcoin", loaded: true },
  { chain: "bitcoin-cash", loaded: true },
  { chain: "blast", loaded: true },
  { chain: "bsc", loaded: true },
  { chain: "cardano", loaded: true },
  { chain: "celo", loaded: true },
  { chain: "cronos", loaded: true },
  { chain: "dash", loaded: true },
  { chain: "dogecoin", loaded: true },
  { chain: "ethereum", loaded: true },
  { chain: "ethereum-classic", loaded: true },
  { chain: "fantom", loaded: true },
  { chain: "filecoin", loaded: true },
  { chain: "flare", loaded: true },
  { chain: "fraxtal", loaded: true },
  { chain: "gnosis", loaded: true },
  { chain: "ink", loaded: true },
  { chain: "iotex", loaded: true },
  { chain: "kaspa", loaded: true },
  { chain: "lens", loaded: true },
  { chain: "linea", loaded: true },
  { chain: "litecoin", loaded: true },
  { chain: "mantle", loaded: true },
  { chain: "metis", loaded: true },
  { chain: "mode", loaded: true },
  { chain: "monad", loaded: true },
  { chain: "moonbeam", loaded: true },
  { chain: "opbnb", loaded: true },
  { chain: "optimism", loaded: true },
  { chain: "polygon", loaded: true },
  { chain: "scroll", loaded: true },
  { chain: "sei", loaded: true },
  { chain: "solana", loaded: true },
  { chain: "somnia", loaded: true },
  { chain: "soneium", loaded: true },
  { chain: "sonic", loaded: true },
  { chain: "stacks", loaded: true },
  { chain: "stellar", loaded: true },
  { chain: "sui", loaded: true },
  { chain: "taiko", loaded: true },
  { chain: "tezos", loaded: true },
  { chain: "ton", loaded: true },
  { chain: "tron", loaded: true },
  { chain: "unichain", loaded: true },
  { chain: "xrpl", loaded: true },
  { chain: "zcash", loaded: true },
  { chain: "zksync", loaded: true }
] as const;

export const heroSubtitleLines = [
  "Search RPC endpoints across Ethereum, Base, Filecoin, and 51 more networks.",
  "Surface explorers, Blockscout-class services, oracles, and contract tooling in one registry.",
  "Proxy downstream MCP tools like GitHub through one gateway and one execution flow."
];

export const gatewayStats = [
  {
    value: "54",
    label: "supported networks",
    detail: "returned by discover_networks"
  },
  {
    value: "15",
    label: "Ethereum categories",
    detail: "returned by discover_categories"
  },
  {
    value: "70",
    label: "Ethereum MCP servers",
    detail: "search-ready on the registry"
  }
] as const;

export const specCards = [
  {
    title: "Discovery",
    eyebrow: "discover_networks",
    description:
      "Automatic chain discovery returns canonical keys for Ethereum, Base, Filecoin, Solana, Arbitrum, Optimism, and dozens more without hardcoding a network map.",
    bullets: [
      "54 live chain keys in the current snapshot",
      "Canonical names that feed the rest of the flow",
      "Perfect entry point before category or service lookup"
    ]
  },
  {
    title: "Registry",
    eyebrow: "discover_categories + search",
    description:
      "The registry is not a flat list. It can expose dynamic categories like APIs, explorers, oracles, bridges, storages, and MCP servers with provider samples and counts.",
    bullets: [
      "Ethereum snapshot exposes 15 categories",
      "Examples include Blockscout, Chainlink, Base, GitHub",
      "Deterministic search with chain, category, tags, and filters"
    ]
  },
  {
    title: "Proxy Execution",
    eyebrow: "execute",
    description:
      "Connect to downstream MCPs, inspect their tools, and call them through the same gateway session. Session credentials can be bound once and reused across the flow.",
    bullets: [
      "connect_mcp validates downstream access",
      "list_mcp_tools reveals runtime capabilities",
      "call_mcp_tool executes GitHub-style actions behind the gateway"
    ]
  }
] as const;

export const runtimeFlow = [
  "bind_credentials_bag",
  "connect_mcp",
  "list_mcp_tools",
  "call_mcp_tool"
] as const;

export const featuredServices = [
  "GitHub MCP",
  "Blockscout",
  "Chainlink",
  "Base Docs",
  "Coinbase CDP",
  "DeFiLlama"
] as const;

export const discoverNetworksRequest = {
  tool: "discover_networks",
  arguments: {}
};

export const discoverNetworksResponse = {
  networks: supportedNetworks,
  total: supportedNetworks.length
};

export const searchRequest = {
  tool: "search",
  arguments: {
    chain: "ethereum",
    category: "mcpservers",
    query: "github",
    limit: 1
  }
};

export const searchResponse = {
  results: [
    {
      service_id: "mcpservers:github-mcp-server",
      chain: "ethereum",
      category: "mcpservers",
      provider: "GitHub",
      title: "GitHub",
      summary:
        "Official GitHub MCP Server for repository, issues, pull request, and workflow operations via AI agents",
      score: 4.5,
      tags: ["github", "source control", "ci/cd", "ai agents"],
      price_hint: "$0",
      execute_hint: {
        operation: "connect_mcp",
        service_id: "mcpservers:github-mcp-server"
      }
    }
  ],
  total: 70,
  next_offset: 1
};

export const executeRequest = {
  tool: "execute",
  arguments: {
    service_id: "mcpservers:github-mcp-server",
    operation: "connect_mcp"
  }
};

export const executeResponse = {
  service_id: "mcpservers:github-mcp-server",
  chain: "algorand",
  category: "mcpservers",
  mcpEndpoint: "https://api.githubcopilot.com/mcp/",
  transportType: "http",
  proxySupported: true,
  proxyTransport: "http",
  authType: "bearer",
  authRequired: true,
  rawAuthType: "OAuth/PAT",
  selfHostedSupported: false,
  selfHostedCommand: null,
  selfHostedArgs: null,
  selfHostedRequiredEnvVars: null,
  agentSkills: [
    "repository-management",
    "issue-pr-automation",
    "workflow-intelligence",
    "code-analysis"
  ],
  tags: ["github", "source control", "ci/cd", "ai agents"],
  status: "connected",
  validated: true,
  connection_id: "agent::mcpservers:github-mcp-server",
  selected_connection_id: "agent::mcpservers:github-mcp-server",
  available_connection_ids: ["agent::mcpservers:github-mcp-server"],
  auth_source: "session_connection",
  message: "Downstream MCP connection validated with session-scoped credentials.",
  next_actions: [
    {
      tool: "execute",
      operation: "list_mcp_tools",
      arguments: {
        connection_id: "agent::mcpservers:github-mcp-server"
      },
      reason: "Inspect downstream tools now that the MCP connection is validated."
    }
  ]
};

export const setupConfigExample = {
  mcpServers: {
    "chainlove-prod": {
      url: "https://app.chain.love/mcp",
      headers: {
        Authorization: "Bearer clv_prod_xxxxxxxxxxxxxxxxxxxxx",
        "x-chainlove-cred-github": "ghp_xxxxxxxxxxxxxxxxxxxxx"
      }
    }
  }
};
