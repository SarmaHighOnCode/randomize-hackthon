// ═══════════════════════════════════════════════════════════════════
// PUZZLE ENGINE — 6 Interactive Puzzle Types for NexusOS
// ═══════════════════════════════════════════════════════════════════

// ─── 1. Neural Network Wiring ────────────────────────────────────
// Player must connect the right input→hidden→output nodes
const generateNeuralNetworkPuzzle = () => {
  const configs = [
    { inputs: ['X1=1','X2=0'], hiddenCount: 2, target: 1, correctWires: [[0,0],[1,1]], hint: 'Each input maps to one hidden node' },
    { inputs: ['X1=1','X2=1'], hiddenCount: 2, target: 0, correctWires: [[0,1],[1,0]], hint: 'Cross-wire: input 1→hidden 2, input 2→hidden 1' },
    { inputs: ['A=1','B=0','C=1'], hiddenCount: 2, target: 1, correctWires: [[0,0],[2,1]], hint: 'Only active inputs need wiring' },
    { inputs: ['X=0','Y=1'], hiddenCount: 3, target: 2, correctWires: [[1,2]], hint: 'Y connects to the third hidden node' },
  ]
  const cfg = configs[Math.floor(Math.random() * configs.length)]
  return {
    type: 'neural_network',
    prompt: 'WIRE THE NEURAL NETWORK',
    description: `Connect inputs to hidden nodes so output = ${cfg.target}`,
    inputs: cfg.inputs,
    hiddenCount: cfg.hiddenCount,
    target: cfg.target,
    correctWires: cfg.correctWires, // [[inputIdx, hiddenIdx], ...]
    points: 8,
    hint: cfg.hint,
  }
}

// ─── 2. Pattern Matching ─────────────────────────────────────────
// Fix corrupted data by picking the correct pattern
const generatePatternMatchPuzzle = () => {
  const patterns = [
    {
      corrupted: '██░█░\n░█░██\n██░█░',
      options: [
        '10101\n01011\n10101',
        '10101\n01010\n10101',
        '11001\n01010\n10101',
        '10101\n01010\n10110',
      ],
      correct: 1,
      hint: 'Look for an alternating checkerboard'
    },
    {
      corrupted: '▓▓░░\n░░▓▓\n▓▓░░',
      options: [
        'AABB\nBBAA\nAABB',
        'ABAB\nBABA\nABAB',
        'AABB\nBBAA\nABBA',
        'AABB\nAABB\nAABB',
      ],
      correct: 0,
      hint: 'Pairs alternate by row'
    },
    {
      corrupted: '→↓←\n↓←→\n←→↓',
      options: [
        'RDL\nDLR\nLRD',
        'RDL\nLRD\nDLR',
        'RLD\nDLR\nLRD',
        'RDL\nDLR\nRLD',
      ],
      correct: 0,
      hint: 'Each symbol shifts one position right per row'
    },
  ]
  const p = patterns[Math.floor(Math.random() * patterns.length)]
  return {
    type: 'pattern_match',
    prompt: 'FIX THE CORRUPTED DATA',
    description: 'Select the correct restored pattern',
    corrupted: p.corrupted,
    options: p.options,
    correct: p.correct,
    points: 6,
    hint: p.hint,
  }
}

// ─── 3. Node Connection ──────────────────────────────────────────
// Restore a broken system by clicking nodes in correct order
const generateNodeConnectionPuzzle = () => {
  const systems = [
    { nodes: ['DNS','Load Balancer','Web Server','Database','Cache'], correctOrder: [0,1,4,2,3], hint: 'Request flow: DNS→LB→Cache→Web→DB' },
    { nodes: ['Client','Auth','API Gateway','Service','Database'], correctOrder: [0,1,2,3,4], hint: 'Follow the auth pipeline in order' },
    { nodes: ['Git Push','CI Build','Tests','Staging','Production'], correctOrder: [0,1,2,3,4], hint: 'Standard deployment pipeline' },
    { nodes: ['Input','Validate','Transform','Store','Respond'], correctOrder: [0,1,2,3,4], hint: 'Data processing pipeline' },
  ]
  const s = systems[Math.floor(Math.random() * systems.length)]
  return {
    type: 'node_connection',
    prompt: 'RESTORE THE SYSTEM',
    description: 'Click nodes in the correct order to restore the pipeline',
    nodes: s.nodes,
    correctOrder: s.correctOrder,
    points: 7,
    hint: s.hint,
  }
}

// ─── 4. Sorting Challenge ────────────────────────────────────────
// Sort items by priority/deadline
const generateSortingPuzzle = () => {
  const challenges = [
    {
      items: [
        { label: '🔴 CRITICAL: Server down', priority: 1 },
        { label: '🟡 MEDIUM: UI alignment', priority: 3 },
        { label: '🔴 HIGH: Data leak fix', priority: 2 },
        { label: '🟢 LOW: Update readme', priority: 4 },
      ],
      sortBy: 'priority',
      hint: 'Critical first, then High, Medium, Low'
    },
    {
      items: [
        { label: '⏱ Deploy hotfix (5m left)', priority: 1 },
        { label: '⏱ Review PR (2h left)', priority: 3 },
        { label: '⏱ Fix login (15m left)', priority: 2 },
        { label: '⏱ Update docs (1d left)', priority: 4 },
      ],
      sortBy: 'deadline',
      hint: 'Shortest deadline first'
    },
    {
      items: [
        { label: 'Setup DB schema', priority: 1 },
        { label: 'Create API endpoints', priority: 2 },
        { label: 'Build frontend UI', priority: 3 },
        { label: 'Write integration tests', priority: 4 },
        { label: 'Deploy to production', priority: 5 },
      ],
      sortBy: 'dependency',
      hint: 'What needs to be done before what?'
    },
  ]
  const c = challenges[Math.floor(Math.random() * challenges.length)]
  // Shuffle items
  const shuffled = [...c.items].sort(() => Math.random() - 0.5)
  return {
    type: 'sorting',
    prompt: 'PRIORITIZE THESE TICKETS',
    description: `Sort by ${c.sortBy} (drag or click to reorder)`,
    items: shuffled,
    correctOrder: c.items.map(i => i.label),
    points: 6,
    hint: c.hint,
  }
}

// ─── 5. Logic Grid ───────────────────────────────────────────────
// Resolve dependency chains
const generateLogicGridPuzzle = () => {
  const grids = [
    {
      question: 'Task A depends on B.\nTask B depends on C.\nTask C has no dependencies.\nWhich task should be done FIRST?',
      options: ['Task A', 'Task B', 'Task C'],
      correct: 2,
      hint: 'Start with the one that has no blockers'
    },
    {
      question: 'Deploy needs Tests ✓.\nTests need Build ✓.\nBuild needs Code Review.\nCode Review needs PR.\nWhat should happen NEXT?',
      options: ['Deploy', 'Run Tests', 'Submit PR', 'Code Review'],
      correct: 2,
      hint: 'What hasn\'t been done yet?'
    },
    {
      question: 'Server A talks to B and C.\nB talks to D.\nC talks to D.\nD is the database.\nIf D goes down, how many services are affected?',
      options: ['1', '2', '3', '4'],
      correct: 3,
      hint: 'Count ALL services that depend on D (directly or indirectly)'
    },
    {
      question: 'Sprint has 5 tasks.\n2 are blocked by external team.\n1 is blocked by a blocked task.\n1 is in review.\nHow many can you work on RIGHT NOW?',
      options: ['0', '1', '2', '3'],
      correct: 1,
      hint: 'Only unblocked, non-review tasks'
    },
  ]
  const g = grids[Math.floor(Math.random() * grids.length)]
  return {
    type: 'logic_grid',
    prompt: 'RESOLVE DEPENDENCIES',
    description: 'Analyze the dependency chain and answer correctly',
    question: g.question,
    options: g.options,
    correct: g.correct,
    points: 7,
    hint: g.hint,
  }
}

// ─── 6. Pathfinding ──────────────────────────────────────────────
// Navigate through a grid to find optimal deployment route
const generatePathfindingPuzzle = () => {
  // 5x5 grid, 0=open, 1=wall, 2=start, 3=end
  const mazes = [
    {
      grid: [
        [2,0,1,0,0],
        [0,0,1,0,1],
        [1,0,0,0,1],
        [1,1,1,0,0],
        [0,0,0,0,3],
      ],
      optimalLength: 8,
      hint: 'Go down, then right — avoid the walls'
    },
    {
      grid: [
        [2,0,0,1,0],
        [1,1,0,1,0],
        [0,0,0,0,0],
        [0,1,1,1,0],
        [0,0,0,0,3],
      ],
      optimalLength: 8,
      hint: 'Find the gap in the middle row'
    },
    {
      grid: [
        [0,0,0,0,2],
        [0,1,1,0,0],
        [0,1,0,0,1],
        [0,0,0,1,1],
        [3,0,0,0,0],
      ],
      optimalLength: 8,
      hint: 'Go left and down through the openings'
    },
  ]
  const m = mazes[Math.floor(Math.random() * mazes.length)]
  return {
    type: 'pathfinding',
    prompt: 'DEPLOY THE PACKAGE',
    description: `Navigate from START to END. Find a path in ≤${m.optimalLength + 2} steps.`,
    grid: m.grid,
    optimalLength: m.optimalLength,
    points: 8,
    hint: m.hint,
  }
}

// ─── Also keep some quick text-based puzzles for variety ─────────
const generateQuickTextPuzzle = () => {
  const puzzles = [
    { prompt: 'COMPLETE THE CODE', code: 'const doubled = arr.___(x => x * 2)', answer: 'map', hint: 'Transform each element', points: 4 },
    { prompt: 'COMPLETE THE CODE', code: 'arr._____(x => x > 5)', answer: 'filter', hint: 'Keep matching elements', points: 4 },
    { prompt: 'WHAT COMES NEXT?', code: '🔴 🟡 🔴 🟡 🔴 ?', answer: '🟡', hint: 'Alternating pattern', points: 3 },
    { prompt: 'NAME THAT COLOR', code: 'CSS: #FF0000', answer: 'red', hint: 'Full red channel', points: 3 },
    { prompt: 'NAME THAT COLOR', code: 'CSS: #00FF00', answer: 'green', hint: 'Full green channel', points: 3 },
    { prompt: 'CORPORATE TRIVIA', code: 'What HTTP status means "Not Found"?', answer: '404', hint: 'The famous error page', points: 4 },
    { prompt: 'CORPORATE TRIVIA', code: 'What does LGTM mean?', answer: 'looks good to me', hint: 'Code review approval', points: 4 },
    { prompt: 'UNSCRAMBLE', code: 'Letters: EPYLOD', answer: 'deploy', hint: 'Ship to production', points: 4 },
    { prompt: 'WHAT COMES NEXT?', code: '🌑 🌓 🌕 🌗 🌑 ?', answer: '🌓', hint: 'Moon phase cycle', points: 3 },
    { prompt: 'COMPLETE THE CODE', code: 'JSON._____(data)', answer: 'stringify', hint: 'Object to string', points: 4 },
  ]
  const p = puzzles[Math.floor(Math.random() * puzzles.length)]
  return { type: 'text_input', ...p }
}

// ─── Master Generator ────────────────────────────────────────────
const VISUAL_GENERATORS = [
  generateNeuralNetworkPuzzle,
  generatePatternMatchPuzzle,
  generateNodeConnectionPuzzle,
  generateSortingPuzzle,
  generateLogicGridPuzzle,
  generatePathfindingPuzzle,
]

export const generatePuzzle = () => {
  // 60% visual puzzles, 40% quick text puzzles for variety
  if (Math.random() < 0.6) {
    const gen = VISUAL_GENERATORS[Math.floor(Math.random() * VISUAL_GENERATORS.length)]
    return gen()
  }
  return generateQuickTextPuzzle()
}

// ═══════════════════════════════════════════════════════════════════
// PROCEDURAL RANDOM TASK GENERATOR — 500+ unique combinations
// ═══════════════════════════════════════════════════════════════════

// Building blocks for procedural task generation
const TASK_VERBS = [
  'Fix', 'Debug', 'Refactor', 'Optimize', 'Implement', 'Add', 'Update',
  'Remove', 'Migrate', 'Rewrite', 'Patch', 'Resolve', 'Investigate',
  'Configure', 'Deploy', 'Test', 'Document', 'Review', 'Upgrade',
  'Redesign', 'Integrate', 'Validate', 'Monitor', 'Automate',
  'Deprecate', 'Rollback', 'Benchmark', 'Audit', 'Secure', 'Scale',
]

const TASK_OBJECTS = [
  'login form validation', 'user authentication flow', 'dashboard widgets',
  'payment processing module', 'search indexing service', 'notification system',
  'WebSocket connection handler', 'file upload pipeline', 'caching layer',
  'database connection pool', 'API rate limiter', 'session management',
  'email delivery queue', 'image compression service', 'PDF generator',
  'OAuth2 integration', 'GraphQL resolver', 'REST endpoint',
  'CI/CD pipeline', 'Docker container config', 'Kubernetes deployment',
  'load balancer rules', 'SSL certificate renewal', 'DNS configuration',
  'monitoring dashboard', 'log aggregation service', 'backup scheduler',
  'data migration script', 'user permissions system', 'analytics tracker',
  'A/B testing framework', 'feature flag service', 'error tracking module',
  'CDN cache invalidation', 'microservice mesh', 'message queue consumer',
  'batch processing job', 'webhook delivery system', 'SSO provider',
  'two-factor auth module', 'password hashing service', 'rate throttle middleware',
  'CORS policy handler', 'input sanitization layer', 'audit logging system',
  'health check endpoint', 'metrics exporter', 'secret rotation tool',
  'mobile responsive layout', 'dark mode stylesheet', 'accessibility checker',
]

const TASK_CONTEXTS = [
  'on production', 'for mobile users', 'in staging environment',
  'for the new API v3', 'on legacy codebase', 'for enterprise clients',
  'before the release', 'after the security audit', 'for compliance',
  'on the admin panel', 'in the checkout flow', 'for the onboarding wizard',
  'on the settings page', 'for third-party vendors', 'in the microservices layer',
  'for the React frontend', 'on the Node backend', 'in the data pipeline',
  'for the mobile app', 'on the internal tools', 'before EOD Friday',
  'for the investor demo', 'in the monorepo', 'across all environments',
  'for the Q4 launch', 'on the shared library', 'in the test suite',
  'for the design system', 'on the edge servers', 'for the partner API',
]

const PRIORITIES = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']
const PRIORITY_WEIGHTS = [0.1, 0.3, 0.35, 0.25] // weighted distribution

const _pick = (arr) => arr[Math.floor(Math.random() * arr.length)]
const _weightedPriority = () => {
  const r = Math.random()
  let cumulative = 0
  for (let i = 0; i < PRIORITIES.length; i++) {
    cumulative += PRIORITY_WEIGHTS[i]
    if (r <= cumulative) return PRIORITIES[i]
  }
  return 'MEDIUM'
}

const _pointsForPriority = (priority) => {
  const ranges = { CRITICAL: [25, 40], HIGH: [14, 25], MEDIUM: [8, 16], LOW: [4, 10] }
  const [min, max] = ranges[priority] || [5, 15]
  return min + Math.floor(Math.random() * (max - min + 1))
}

// Track recently generated titles to avoid immediate repeats
const _recentTitles = new Set()
const MAX_RECENT = 50

/**
 * Generates a unique random offline task every time it's called.
 * Combines ~30 verbs × ~50 objects × ~30 contexts = 45,000+ possible titles.
 */
export const generateRandomOfflineTask = () => {
  let title
  let attempts = 0
  do {
    const verb = _pick(TASK_VERBS)
    const obj = _pick(TASK_OBJECTS)
    // 60% chance to include a context suffix for variety
    const ctx = Math.random() < 0.6 ? ` ${_pick(TASK_CONTEXTS)}` : ''
    title = `${verb} ${obj}${ctx}`
    // Truncate to 50 chars max
    if (title.length > 50) title = title.slice(0, 47) + '...'
    attempts++
  } while (_recentTitles.has(title) && attempts < 10)

  // Track to avoid immediate repeats
  _recentTitles.add(title)
  if (_recentTitles.size > MAX_RECENT) {
    const first = _recentTitles.values().next().value
    _recentTitles.delete(first)
  }

  const priority = _weightedPriority()
  return { title, priority, points: _pointsForPriority(priority) }
}

// 500 UNIQUE HAND-CRAFTED OFFLINE TASK TEMPLATES
const SEED_TASKS = [
  // ─── Frontend / UI (1–80) ──────────────────────────────────────
  { title: 'Fix login button alignment on mobile', priority: 'HIGH', points: 15 },
  { title: 'Add loading spinner to dashboard', priority: 'LOW', points: 8 },
  { title: 'Implement dark mode toggle', priority: 'MEDIUM', points: 12 },
  { title: 'Fix z-index stacking on modal overlay', priority: 'HIGH', points: 18 },
  { title: 'Add keyboard shortcuts to editor', priority: 'LOW', points: 10 },
  { title: 'Fix CSS grid overflow on small screens', priority: 'MEDIUM', points: 14 },
  { title: 'Implement drag-and-drop file upload', priority: 'HIGH', points: 20 },
  { title: 'Add tooltip component to design system', priority: 'LOW', points: 8 },
  { title: 'Fix infinite scroll memory leak', priority: 'CRITICAL', points: 28 },
  { title: 'Add breadcrumb navigation to settings', priority: 'LOW', points: 6 },
  { title: 'Implement search autocomplete dropdown', priority: 'MEDIUM', points: 15 },
  { title: 'Fix date picker timezone issues', priority: 'HIGH', points: 22 },
  { title: 'Add skeleton loading states', priority: 'LOW', points: 9 },
  { title: 'Implement responsive sidebar collapse', priority: 'MEDIUM', points: 12 },
  { title: 'Fix tab focus trap in modal dialogs', priority: 'HIGH', points: 16 },
  { title: 'Add progress bar to multi-step form', priority: 'MEDIUM', points: 10 },
  { title: 'Implement lazy loading for images', priority: 'LOW', points: 8 },
  { title: 'Fix SVG icon color inheritance bug', priority: 'LOW', points: 6 },
  { title: 'Add copy-to-clipboard button for codes', priority: 'LOW', points: 5 },
  { title: 'Implement table column sorting', priority: 'MEDIUM', points: 14 },
  { title: 'Fix dropdown menu positioning near edges', priority: 'HIGH', points: 18 },
  { title: 'Add confirmation dialog for destructive actions', priority: 'MEDIUM', points: 10 },
  { title: 'Implement multi-select checkbox filter', priority: 'MEDIUM', points: 12 },
  { title: 'Fix animation jank on page transitions', priority: 'LOW', points: 8 },
  { title: 'Add empty state illustrations', priority: 'LOW', points: 7 },
  { title: 'Refactor form validation to use Zod', priority: 'MEDIUM', points: 14 },
  { title: 'Fix carousel swipe not working on iOS', priority: 'HIGH', points: 16 },
  { title: 'Add toast notification dismiss timer', priority: 'LOW', points: 6 },
  { title: 'Fix header shrink on scroll janky on Safari', priority: 'HIGH', points: 18 },
  { title: 'Implement virtualized list for large tables', priority: 'HIGH', points: 22 },
  { title: 'Add color picker to theme customizer', priority: 'MEDIUM', points: 12 },
  { title: 'Fix text truncation in card component', priority: 'LOW', points: 5 },
  { title: 'Implement inline editing for table cells', priority: 'MEDIUM', points: 15 },
  { title: 'Add avatar upload with crop & resize', priority: 'HIGH', points: 20 },
  { title: 'Fix right-to-left layout for Arabic locale', priority: 'HIGH', points: 22 },
  { title: 'Create reusable modal manager hook', priority: 'MEDIUM', points: 14 },
  { title: 'Fix focus ring missing on custom buttons', priority: 'LOW', points: 5 },
  { title: 'Add pagination controls to admin table', priority: 'MEDIUM', points: 10 },
  { title: 'Implement resizable panel splitter', priority: 'MEDIUM', points: 14 },
  { title: 'Fix Webkit autofill background override', priority: 'LOW', points: 6 },
  { title: 'Add floating action button for quick create', priority: 'LOW', points: 8 },
  { title: 'Fix badge count not updating in real-time', priority: 'HIGH', points: 16 },
  { title: 'Implement data table export to Excel', priority: 'MEDIUM', points: 14 },
  { title: 'Add timeline visualization component', priority: 'MEDIUM', points: 16 },
  { title: 'Fix horizontal scroll snap on mobile', priority: 'HIGH', points: 15 },
  { title: 'Create stepper component for onboarding', priority: 'MEDIUM', points: 12 },
  { title: 'Fix contrast ratio on disabled inputs', priority: 'LOW', points: 5 },
  { title: 'Add collapsible sidebar with animation', priority: 'MEDIUM', points: 12 },
  { title: 'Implement sticky table headers on scroll', priority: 'MEDIUM', points: 10 },
  { title: 'Fix layout shift when web fonts load', priority: 'HIGH', points: 14 },
  { title: 'Add drag reorder for kanban columns', priority: 'HIGH', points: 20 },
  { title: 'Fix print stylesheet cutting off content', priority: 'LOW', points: 8 },
  { title: 'Implement command palette (Cmd+K)', priority: 'HIGH', points: 22 },
  { title: 'Add micro-interactions to nav hover', priority: 'LOW', points: 7 },
  { title: 'Fix React key warning in list rendering', priority: 'LOW', points: 5 },
  { title: 'Create chart component using Recharts', priority: 'MEDIUM', points: 16 },
  { title: 'Fix input mask for phone number field', priority: 'MEDIUM', points: 10 },
  { title: 'Add multi-tab view for settings page', priority: 'MEDIUM', points: 12 },
  { title: 'Fix double-click submit on slow networks', priority: 'HIGH', points: 15 },
  { title: 'Implement notification center drawer', priority: 'MEDIUM', points: 14 },
  { title: 'Add file tree component for code browser', priority: 'HIGH', points: 20 },
  { title: 'Fix overflow hidden clipping tooltip', priority: 'LOW', points: 6 },
  { title: 'Create pill/chip input for tag selection', priority: 'MEDIUM', points: 10 },
  { title: 'Fix favicon not showing in Chrome tab', priority: 'LOW', points: 4 },
  { title: 'Add skeleton screen for initial page load', priority: 'LOW', points: 8 },
  { title: 'Fix CSS variable fallback for older browsers', priority: 'MEDIUM', points: 10 },
  { title: 'Implement accordion FAQ component', priority: 'LOW', points: 8 },
  { title: 'Add rich text editor with markdown support', priority: 'HIGH', points: 24 },
  { title: 'Fix dialog scrollable content overflow', priority: 'MEDIUM', points: 10 },
  { title: 'Implement responsive image gallery grid', priority: 'MEDIUM', points: 14 },
  { title: 'Add confetti animation on task completion', priority: 'LOW', points: 6 },
  { title: 'Fix inconsistent button sizes across pages', priority: 'LOW', points: 5 },
  { title: 'Create onboarding tour with spotlight', priority: 'MEDIUM', points: 16 },
  { title: 'Fix mobile menu not closing on route change', priority: 'HIGH', points: 14 },
  { title: 'Add country flag selector for i18n', priority: 'LOW', points: 8 },
  { title: 'Implement infinite scroll for activity feed', priority: 'MEDIUM', points: 14 },
  { title: 'Fix text wrapping in narrow sidebar', priority: 'LOW', points: 5 },
  { title: 'Add PDF preview before download', priority: 'MEDIUM', points: 14 },
  { title: 'Fix context menu not closing on outside click', priority: 'MEDIUM', points: 10 },
  { title: 'Implement split-button dropdown component', priority: 'LOW', points: 8 },

  // ─── Backend / API (81–170) ────────────────────────────────────
  { title: 'Fix N+1 query in user list endpoint', priority: 'CRITICAL', points: 30 },
  { title: 'Add rate limiting to auth endpoints', priority: 'HIGH', points: 22 },
  { title: 'Implement password reset email flow', priority: 'HIGH', points: 20 },
  { title: 'Add pagination to search results API', priority: 'MEDIUM', points: 14 },
  { title: 'Fix race condition in order processing', priority: 'CRITICAL', points: 35 },
  { title: 'Implement webhook retry mechanism', priority: 'HIGH', points: 18 },
  { title: 'Add input validation to user profile API', priority: 'MEDIUM', points: 10 },
  { title: 'Fix memory leak in WebSocket handler', priority: 'CRITICAL', points: 32 },
  { title: 'Implement audit log for admin actions', priority: 'MEDIUM', points: 16 },
  { title: 'Add caching layer to product catalog', priority: 'HIGH', points: 20 },
  { title: 'Fix timezone conversion in scheduler', priority: 'HIGH', points: 18 },
  { title: 'Implement batch delete endpoint', priority: 'MEDIUM', points: 12 },
  { title: 'Add health check endpoint', priority: 'LOW', points: 6 },
  { title: 'Fix file upload size limit bypass', priority: 'CRITICAL', points: 28 },
  { title: 'Implement API versioning strategy', priority: 'HIGH', points: 22 },
  { title: 'Add request logging middleware', priority: 'LOW', points: 8 },
  { title: 'Fix SQL injection in search query', priority: 'CRITICAL', points: 40 },
  { title: 'Implement email queue processor', priority: 'MEDIUM', points: 16 },
  { title: 'Add CORS configuration for new domain', priority: 'HIGH', points: 14 },
  { title: 'Fix session expiry not clearing tokens', priority: 'HIGH', points: 20 },
  { title: 'Implement data export to CSV endpoint', priority: 'MEDIUM', points: 12 },
  { title: 'Add database migration for new schema', priority: 'HIGH', points: 18 },
  { title: 'Fix connection pool exhaustion under load', priority: 'CRITICAL', points: 30 },
  { title: 'Implement soft delete for user accounts', priority: 'MEDIUM', points: 14 },
  { title: 'Add Prometheus metrics endpoint', priority: 'LOW', points: 10 },
  { title: 'Refactor monolith auth into microservice', priority: 'CRITICAL', points: 38 },
  { title: 'Fix deadlock in concurrent payment writes', priority: 'CRITICAL', points: 35 },
  { title: 'Implement cursor-based pagination for feeds', priority: 'HIGH', points: 20 },
  { title: 'Add retry with exponential backoff to HTTP client', priority: 'MEDIUM', points: 14 },
  { title: 'Fix event bus losing messages on restart', priority: 'CRITICAL', points: 30 },
  { title: 'Implement idempotency keys for payment API', priority: 'HIGH', points: 22 },
  { title: 'Add gzip compression to response middleware', priority: 'LOW', points: 8 },
  { title: 'Fix circular dependency in service layer', priority: 'HIGH', points: 18 },
  { title: 'Implement multi-tenant data isolation', priority: 'CRITICAL', points: 36 },
  { title: 'Add graceful shutdown handler to server', priority: 'MEDIUM', points: 12 },
  { title: 'Fix UUID collision in short-link generator', priority: 'HIGH', points: 16 },
  { title: 'Implement server-sent events for live updates', priority: 'HIGH', points: 20 },
  { title: 'Add structured error codes to all endpoints', priority: 'MEDIUM', points: 14 },
  { title: 'Fix payload too large error for base64 images', priority: 'MEDIUM', points: 12 },
  { title: 'Implement feature flag evaluation endpoint', priority: 'MEDIUM', points: 14 },
  { title: 'Add bulk import API for user CSV upload', priority: 'HIGH', points: 20 },
  { title: 'Fix webhook signature verification failing', priority: 'HIGH', points: 18 },
  { title: 'Implement refresh token rotation', priority: 'HIGH', points: 22 },
  { title: 'Add concurrency limiter for background jobs', priority: 'MEDIUM', points: 14 },
  { title: 'Fix incorrect HTTP status on validation error', priority: 'LOW', points: 6 },
  { title: 'Implement request deduplication middleware', priority: 'MEDIUM', points: 16 },
  { title: 'Add API key management CRUD endpoints', priority: 'MEDIUM', points: 14 },
  { title: 'Fix ORM lazy loading triggering in loops', priority: 'HIGH', points: 18 },
  { title: 'Implement circuit breaker for external APIs', priority: 'HIGH', points: 22 },
  { title: 'Add Swagger/OpenAPI auto-generation', priority: 'MEDIUM', points: 14 },
  { title: 'Fix 502 gateway error on large file download', priority: 'HIGH', points: 16 },
  { title: 'Implement presigned URL for S3 uploads', priority: 'MEDIUM', points: 14 },
  { title: 'Add distributed lock for cron job execution', priority: 'HIGH', points: 20 },
  { title: 'Fix Content-Type sniffing vulnerability', priority: 'CRITICAL', points: 26 },
  { title: 'Implement GraphQL subscriptions for chat', priority: 'HIGH', points: 24 },
  { title: 'Add request tracing with correlation IDs', priority: 'MEDIUM', points: 12 },
  { title: 'Fix email template rendering with null data', priority: 'MEDIUM', points: 10 },
  { title: 'Implement role hierarchy for RBAC system', priority: 'HIGH', points: 22 },
  { title: 'Add startup self-check for required env vars', priority: 'LOW', points: 6 },
  { title: 'Fix cron overlapping executions on restart', priority: 'HIGH', points: 16 },
  { title: 'Implement async job status polling endpoint', priority: 'MEDIUM', points: 14 },
  { title: 'Add ETag support for conditional GET requests', priority: 'LOW', points: 8 },
  { title: 'Fix Redis cache not invalidating on update', priority: 'HIGH', points: 18 },
  { title: 'Implement per-user rate limit with Redis', priority: 'HIGH', points: 20 },
  { title: 'Add webhook event log with replay capability', priority: 'MEDIUM', points: 16 },
  { title: 'Fix double-charge bug in subscription renewal', priority: 'CRITICAL', points: 38 },
  { title: 'Implement stale-while-revalidate cache pattern', priority: 'MEDIUM', points: 14 },
  { title: 'Add field-level encryption for PII columns', priority: 'HIGH', points: 22 },
  { title: 'Fix API returning 200 on internal server error', priority: 'HIGH', points: 14 },
  { title: 'Implement global search across all entities', priority: 'HIGH', points: 24 },
  { title: 'Add JSONB query support for dynamic filters', priority: 'MEDIUM', points: 14 },

  // ─── DevOps / Infrastructure (171–230) ─────────────────────────
  { title: 'Fix Docker build failing on ARM chips', priority: 'HIGH', points: 18 },
  { title: 'Update CI pipeline to run lint checks', priority: 'MEDIUM', points: 12 },
  { title: 'Add staging environment deployment', priority: 'HIGH', points: 22 },
  { title: 'Fix Nginx proxy timeout for large uploads', priority: 'HIGH', points: 16 },
  { title: 'Implement blue-green deployment strategy', priority: 'MEDIUM', points: 20 },
  { title: 'Update SSL certificates before expiry', priority: 'CRITICAL', points: 25 },
  { title: 'Fix log rotation filling up disk space', priority: 'HIGH', points: 18 },
  { title: 'Add Terraform config for new AWS region', priority: 'MEDIUM', points: 16 },
  { title: 'Implement database backup automation', priority: 'HIGH', points: 20 },
  { title: 'Fix Kubernetes pod crash loop', priority: 'CRITICAL', points: 30 },
  { title: 'Add monitoring alerts for CPU usage', priority: 'MEDIUM', points: 12 },
  { title: 'Update base Docker image for security patch', priority: 'HIGH', points: 14 },
  { title: 'Implement canary release pipeline', priority: 'MEDIUM', points: 18 },
  { title: 'Fix environment variable leaking in logs', priority: 'CRITICAL', points: 28 },
  { title: 'Add CDN configuration for static assets', priority: 'LOW', points: 10 },
  { title: 'Implement automated rollback on failure', priority: 'HIGH', points: 22 },
  { title: 'Fix DNS propagation delay for new subdomain', priority: 'MEDIUM', points: 12 },
  { title: 'Add Grafana dashboard for API latency', priority: 'LOW', points: 10 },
  { title: 'Implement secrets rotation policy', priority: 'MEDIUM', points: 16 },
  { title: 'Fix GitHub Actions runner out of space', priority: 'HIGH', points: 14 },
  { title: 'Set up auto-scaling for peak traffic hours', priority: 'HIGH', points: 22 },
  { title: 'Fix Helm chart values overriding defaults', priority: 'MEDIUM', points: 14 },
  { title: 'Add multi-stage Docker build for smaller images', priority: 'MEDIUM', points: 12 },
  { title: 'Fix CI cache not restoring on PR branches', priority: 'MEDIUM', points: 10 },
  { title: 'Implement GitOps workflow with ArgoCD', priority: 'HIGH', points: 24 },
  { title: 'Add PagerDuty integration for critical alerts', priority: 'HIGH', points: 16 },
  { title: 'Fix Terraform state drift in production', priority: 'CRITICAL', points: 30 },
  { title: 'Implement infrastructure cost reporting', priority: 'MEDIUM', points: 14 },
  { title: 'Add node affinity rules for GPU workloads', priority: 'MEDIUM', points: 16 },
  { title: 'Fix ingress controller 504 on websocket upgrade', priority: 'HIGH', points: 18 },
  { title: 'Implement chaos engineering test suite', priority: 'MEDIUM', points: 18 },
  { title: 'Add uptime monitoring with Pingdom', priority: 'LOW', points: 8 },
  { title: 'Fix volume mount permissions in container', priority: 'HIGH', points: 14 },
  { title: 'Implement rolling restart without downtime', priority: 'HIGH', points: 20 },
  { title: 'Add service mesh with Istio sidecar proxies', priority: 'HIGH', points: 24 },
  { title: 'Fix kubectl context switching breaking scripts', priority: 'MEDIUM', points: 10 },
  { title: 'Implement container image vulnerability scanning', priority: 'HIGH', points: 18 },
  { title: 'Add VPN tunnel to partner data center', priority: 'HIGH', points: 22 },
  { title: 'Fix init container timeout on slow clusters', priority: 'MEDIUM', points: 12 },
  { title: 'Implement log shipping to Elasticsearch', priority: 'MEDIUM', points: 16 },
  { title: 'Add resource quotas per namespace', priority: 'MEDIUM', points: 12 },
  { title: 'Fix Docker Compose networking between services', priority: 'HIGH', points: 14 },
  { title: 'Implement disaster recovery runbook', priority: 'HIGH', points: 20 },
  { title: 'Add synthetic monitoring for critical flows', priority: 'MEDIUM', points: 14 },
  { title: 'Fix OOM kill on worker pods during batch runs', priority: 'CRITICAL', points: 26 },
  { title: 'Implement feature branch preview environments', priority: 'MEDIUM', points: 18 },
  { title: 'Add deploy approval gates for production', priority: 'HIGH', points: 16 },
  { title: 'Fix flapping health checks on slow boot apps', priority: 'HIGH', points: 14 },
  { title: 'Implement centralized config management', priority: 'MEDIUM', points: 16 },
  { title: 'Add network policy to restrict pod traffic', priority: 'HIGH', points: 18 },

  // ─── Database (231–290) ────────────────────────────────────────
  { title: 'Add index on users.email for faster lookups', priority: 'HIGH', points: 14 },
  { title: 'Fix migration script failing on Postgres 15', priority: 'HIGH', points: 16 },
  { title: 'Implement read replica routing for analytics', priority: 'HIGH', points: 22 },
  { title: 'Add composite index for multi-column queries', priority: 'MEDIUM', points: 12 },
  { title: 'Fix deadlock in concurrent transaction writes', priority: 'CRITICAL', points: 32 },
  { title: 'Implement database partitioning for logs table', priority: 'HIGH', points: 24 },
  { title: 'Add foreign key constraints to orders table', priority: 'MEDIUM', points: 10 },
  { title: 'Fix sequence gap after bulk delete operation', priority: 'LOW', points: 8 },
  { title: 'Implement JSONB search for product attributes', priority: 'MEDIUM', points: 16 },
  { title: 'Add materialized view for dashboard metrics', priority: 'MEDIUM', points: 14 },
  { title: 'Fix slow query on unindexed JOIN condition', priority: 'HIGH', points: 18 },
  { title: 'Implement row-level security for tenants', priority: 'CRITICAL', points: 30 },
  { title: 'Add CHECK constraint for valid status values', priority: 'LOW', points: 6 },
  { title: 'Fix timezone-unaware timestamps in events table', priority: 'MEDIUM', points: 12 },
  { title: 'Implement soft-delete trigger for audit trail', priority: 'MEDIUM', points: 14 },
  { title: 'Add generated column for full-name search', priority: 'LOW', points: 8 },
  { title: 'Fix migration rollback not cleaning up index', priority: 'MEDIUM', points: 10 },
  { title: 'Implement connection pooling with PgBouncer', priority: 'HIGH', points: 20 },
  { title: 'Add archived data retention policy script', priority: 'MEDIUM', points: 14 },
  { title: 'Fix boolean default not applying on new column', priority: 'LOW', points: 6 },
  { title: 'Implement database changelog with Liquibase', priority: 'MEDIUM', points: 16 },
  { title: 'Add full-text search index for articles', priority: 'MEDIUM', points: 14 },
  { title: 'Fix orphaned records after cascade delete bug', priority: 'HIGH', points: 18 },
  { title: 'Implement automatic vacuum tuning for Postgres', priority: 'MEDIUM', points: 14 },
  { title: 'Add UUID primary keys to new tables', priority: 'LOW', points: 8 },
  { title: 'Fix enum type not updating on schema change', priority: 'MEDIUM', points: 10 },
  { title: 'Implement zero-downtime schema migration', priority: 'HIGH', points: 24 },
  { title: 'Add query plan analysis for top 10 slow queries', priority: 'HIGH', points: 16 },
  { title: 'Fix data corruption from concurrent UPSERT', priority: 'CRITICAL', points: 34 },
  { title: 'Implement Redis cache warming on deploy', priority: 'MEDIUM', points: 14 },
  { title: 'Add database size monitoring alert', priority: 'LOW', points: 8 },
  { title: 'Fix migration order conflict between branches', priority: 'HIGH', points: 14 },
  { title: 'Implement event sourcing for order history', priority: 'HIGH', points: 24 },
  { title: 'Add seed data script for local development', priority: 'LOW', points: 8 },
  { title: 'Fix connection leak in long-running transactions', priority: 'CRITICAL', points: 28 },
  { title: 'Implement sharding strategy for high-write tables', priority: 'CRITICAL', points: 36 },
  { title: 'Add backup verification with restore dry-run', priority: 'HIGH', points: 18 },
  { title: 'Fix character encoding mismatch on import', priority: 'MEDIUM', points: 10 },
  { title: 'Implement change data capture with Debezium', priority: 'HIGH', points: 22 },
  { title: 'Add pg_stat_statements for query performance', priority: 'MEDIUM', points: 12 },
  { title: 'Fix referential integrity on legacy join tables', priority: 'HIGH', points: 16 },
  { title: 'Implement temporal tables for audit history', priority: 'MEDIUM', points: 18 },
  { title: 'Add data anonymization for staging environment', priority: 'HIGH', points: 20 },
  { title: 'Fix table bloat from excessive updates', priority: 'MEDIUM', points: 14 },
  { title: 'Implement cross-database query federation', priority: 'HIGH', points: 22 },
  { title: 'Add automated index usage report', priority: 'LOW', points: 10 },
  { title: 'Fix GIN index not used for array containment', priority: 'MEDIUM', points: 12 },
  { title: 'Implement PITR backups for disaster recovery', priority: 'HIGH', points: 20 },
  { title: 'Add database connection keepalive configuration', priority: 'LOW', points: 8 },
  { title: 'Fix slow aggregate query on 100M+ row table', priority: 'CRITICAL', points: 30 },

  // ─── Security (291–340) ────────────────────────────────────────
  { title: 'Fix XSS vulnerability in user bio field', priority: 'CRITICAL', points: 35 },
  { title: 'Add CSRF token to all POST forms', priority: 'HIGH', points: 18 },
  { title: 'Implement Content Security Policy headers', priority: 'HIGH', points: 20 },
  { title: 'Fix open redirect in OAuth callback URL', priority: 'CRITICAL', points: 30 },
  { title: 'Add IP allowlisting for admin endpoints', priority: 'HIGH', points: 16 },
  { title: 'Implement API key rotation without downtime', priority: 'HIGH', points: 22 },
  { title: 'Fix insecure direct object reference in files', priority: 'CRITICAL', points: 32 },
  { title: 'Add HSTS header to all HTTPS responses', priority: 'MEDIUM', points: 10 },
  { title: 'Implement password strength scoring', priority: 'MEDIUM', points: 12 },
  { title: 'Fix JWT not expiring on password change', priority: 'CRITICAL', points: 28 },
  { title: 'Add brute force protection to login endpoint', priority: 'HIGH', points: 18 },
  { title: 'Implement secrets scanning in CI pipeline', priority: 'HIGH', points: 16 },
  { title: 'Fix plaintext password logged in error traces', priority: 'CRITICAL', points: 36 },
  { title: 'Add subresource integrity for CDN scripts', priority: 'MEDIUM', points: 10 },
  { title: 'Implement SAML SSO for enterprise customers', priority: 'HIGH', points: 24 },
  { title: 'Fix CORS wildcard allowing any origin', priority: 'HIGH', points: 16 },
  { title: 'Add automated dependency vulnerability scan', priority: 'MEDIUM', points: 14 },
  { title: 'Implement security headers middleware', priority: 'MEDIUM', points: 12 },
  { title: 'Fix session fixation vulnerability on login', priority: 'CRITICAL', points: 30 },
  { title: 'Add penetration test report action items', priority: 'HIGH', points: 20 },
  { title: 'Implement data encryption at rest for PII', priority: 'HIGH', points: 22 },
  { title: 'Fix clickjacking via missing X-Frame-Options', priority: 'HIGH', points: 14 },
  { title: 'Add two-factor authentication via TOTP', priority: 'HIGH', points: 20 },
  { title: 'Implement OAuth PKCE flow for mobile apps', priority: 'HIGH', points: 22 },
  { title: 'Fix API key exposed in client-side JavaScript', priority: 'CRITICAL', points: 34 },
  { title: 'Add rate limiting for password reset requests', priority: 'MEDIUM', points: 12 },
  { title: 'Implement role-based access to admin dashboard', priority: 'HIGH', points: 18 },
  { title: 'Fix insecure cookie without HttpOnly flag', priority: 'HIGH', points: 14 },
  { title: 'Add automated OWASP ZAP scan to CI pipeline', priority: 'MEDIUM', points: 16 },
  { title: 'Implement certificate pinning for mobile API', priority: 'HIGH', points: 20 },
  { title: 'Fix SSRF in URL preview/unfurl feature', priority: 'CRITICAL', points: 32 },
  { title: 'Add response sanitization for stack traces', priority: 'MEDIUM', points: 10 },
  { title: 'Implement audit trail for permission changes', priority: 'MEDIUM', points: 14 },
  { title: 'Fix path traversal in file download endpoint', priority: 'CRITICAL', points: 36 },
  { title: 'Add security awareness quiz for team', priority: 'LOW', points: 6 },
  { title: 'Implement token revocation list for JWTs', priority: 'HIGH', points: 20 },
  { title: 'Fix unvalidated redirect after login', priority: 'HIGH', points: 16 },
  { title: 'Add WAF rules for common attack patterns', priority: 'HIGH', points: 18 },
  { title: 'Implement account lockout after failed attempts', priority: 'MEDIUM', points: 14 },
  { title: 'Fix sensitive data in URL query parameters', priority: 'HIGH', points: 16 },
  { title: 'Add secure file upload mime-type validation', priority: 'MEDIUM', points: 12 },
  { title: 'Implement access log anomaly detection', priority: 'MEDIUM', points: 16 },
  { title: 'Fix LDAP injection in directory search', priority: 'CRITICAL', points: 30 },
  { title: 'Add SRI hashes for all external resources', priority: 'LOW', points: 8 },
  { title: 'Implement zero-trust network architecture', priority: 'HIGH', points: 24 },
  { title: 'Fix XML external entity in SOAP endpoint', priority: 'CRITICAL', points: 34 },
  { title: 'Add IP reputation checking for auth attempts', priority: 'MEDIUM', points: 16 },
  { title: 'Implement session timeout for inactive users', priority: 'MEDIUM', points: 10 },
  { title: 'Fix mass assignment vulnerability in API', priority: 'CRITICAL', points: 28 },
  { title: 'Add DMARC/DKIM for outbound email security', priority: 'MEDIUM', points: 14 },

  // ─── Testing / QA (341–400) ────────────────────────────────────
  { title: 'Write unit tests for auth module', priority: 'MEDIUM', points: 14 },
  { title: 'Fix flaky E2E test for checkout flow', priority: 'HIGH', points: 18 },
  { title: 'Add integration tests for payment API', priority: 'HIGH', points: 20 },
  { title: 'Write load test script for homepage', priority: 'MEDIUM', points: 12 },
  { title: 'Fix test database seeding script', priority: 'LOW', points: 8 },
  { title: 'Add accessibility audit to CI pipeline', priority: 'MEDIUM', points: 14 },
  { title: 'Write regression tests for user profile', priority: 'MEDIUM', points: 12 },
  { title: 'Fix mock server returning wrong status', priority: 'HIGH', points: 16 },
  { title: 'Add visual regression testing with Percy', priority: 'LOW', points: 10 },
  { title: 'Write smoke tests for production deploy', priority: 'HIGH', points: 18 },
  { title: 'Fix test coverage report not uploading', priority: 'LOW', points: 8 },
  { title: 'Add contract tests for microservices', priority: 'MEDIUM', points: 16 },
  { title: 'Write security scan automation script', priority: 'HIGH', points: 20 },
  { title: 'Fix Cypress tests breaking on CI', priority: 'HIGH', points: 18 },
  { title: 'Add performance benchmark tests', priority: 'MEDIUM', points: 14 },
  { title: 'Write API snapshot tests for responses', priority: 'MEDIUM', points: 12 },
  { title: 'Fix test isolation causing state leaks', priority: 'HIGH', points: 16 },
  { title: 'Add mutation testing to discover weak tests', priority: 'MEDIUM', points: 16 },
  { title: 'Write chaos test for database failover', priority: 'HIGH', points: 20 },
  { title: 'Fix timezone-dependent test failures', priority: 'MEDIUM', points: 10 },
  { title: 'Add fuzz testing for input validation', priority: 'MEDIUM', points: 16 },
  { title: 'Write component tests for React forms', priority: 'MEDIUM', points: 12 },
  { title: 'Fix parallel test runner race conditions', priority: 'HIGH', points: 18 },
  { title: 'Add golden file tests for API schemas', priority: 'LOW', points: 10 },
  { title: 'Write resilience tests for circuit breaker', priority: 'HIGH', points: 18 },
  { title: 'Fix Docker test environment not matching prod', priority: 'HIGH', points: 16 },
  { title: 'Add test data factory for complex objects', priority: 'MEDIUM', points: 12 },
  { title: 'Write cross-browser tests for Safari & Firefox', priority: 'MEDIUM', points: 14 },
  { title: 'Fix snapshot tests breaking on CSS changes', priority: 'LOW', points: 8 },
  { title: 'Add property-based tests for date utilities', priority: 'MEDIUM', points: 14 },
  { title: 'Write canary test for third-party API uptime', priority: 'MEDIUM', points: 12 },
  { title: 'Fix CI test timeout on large test suites', priority: 'HIGH', points: 14 },
  { title: 'Add test coverage gate to PR checks', priority: 'MEDIUM', points: 10 },
  { title: 'Write migration rollback verification tests', priority: 'HIGH', points: 16 },
  { title: 'Fix mock clock not resetting between tests', priority: 'MEDIUM', points: 10 },
  { title: 'Add Playwright tests for critical user flows', priority: 'HIGH', points: 20 },
  { title: 'Write rate limiter behavior tests', priority: 'MEDIUM', points: 12 },
  { title: 'Fix test fixtures hardcoding absolute paths', priority: 'LOW', points: 6 },
  { title: 'Add email template rendering tests', priority: 'LOW', points: 8 },
  { title: 'Write webhook payload signature tests', priority: 'MEDIUM', points: 12 },
  { title: 'Fix E2E tests not waiting for async operations', priority: 'HIGH', points: 16 },
  { title: 'Add test for graceful degradation on API failure', priority: 'MEDIUM', points: 14 },
  { title: 'Write data validation boundary tests', priority: 'MEDIUM', points: 10 },
  { title: 'Fix flaky WebSocket connection test', priority: 'HIGH', points: 14 },
  { title: 'Add internationalization string coverage tests', priority: 'LOW', points: 8 },
  { title: 'Write concurrency stress tests for checkout', priority: 'HIGH', points: 20 },
  { title: 'Fix test data cleanup leaving stale records', priority: 'MEDIUM', points: 10 },
  { title: 'Add accessibility tests with axe-core', priority: 'MEDIUM', points: 12 },
  { title: 'Write GDPR data deletion verification tests', priority: 'HIGH', points: 16 },
  { title: 'Fix Jest memory leak on large test suites', priority: 'HIGH', points: 14 },

  // ─── Mobile (401–440) ──────────────────────────────────────────
  { title: 'Fix push notification not showing on Android 14', priority: 'HIGH', points: 18 },
  { title: 'Add biometric login for iOS and Android', priority: 'HIGH', points: 22 },
  { title: 'Fix gesture handler conflict with scroll view', priority: 'HIGH', points: 16 },
  { title: 'Implement offline-first data sync for mobile', priority: 'CRITICAL', points: 30 },
  { title: 'Add deep link routing for shared content', priority: 'MEDIUM', points: 14 },
  { title: 'Fix memory warning crash on image-heavy screens', priority: 'CRITICAL', points: 28 },
  { title: 'Implement app-to-web SSO handoff', priority: 'HIGH', points: 20 },
  { title: 'Add pull-to-refresh on all list screens', priority: 'LOW', points: 8 },
  { title: 'Fix keyboard covering input fields on Android', priority: 'HIGH', points: 14 },
  { title: 'Implement background location tracking service', priority: 'HIGH', points: 22 },
  { title: 'Add app update prompt for outdated versions', priority: 'MEDIUM', points: 12 },
  { title: 'Fix splash screen white flash on dark mode', priority: 'LOW', points: 6 },
  { title: 'Implement in-app purchase for premium features', priority: 'HIGH', points: 24 },
  { title: 'Add haptic feedback on button taps', priority: 'LOW', points: 6 },
  { title: 'Fix React Native bridge performance bottleneck', priority: 'CRITICAL', points: 26 },
  { title: 'Implement camera barcode scanner feature', priority: 'MEDIUM', points: 16 },
  { title: 'Add local notification scheduling for reminders', priority: 'MEDIUM', points: 12 },
  { title: 'Fix app crash on iOS 17 widget extension', priority: 'CRITICAL', points: 28 },
  { title: 'Implement app clip for quick-access features', priority: 'MEDIUM', points: 18 },
  { title: 'Add accessibility voice-over labels to all screens', priority: 'MEDIUM', points: 14 },
  { title: 'Fix Android back button not navigating correctly', priority: 'HIGH', points: 14 },
  { title: 'Implement Bluetooth LE device pairing flow', priority: 'HIGH', points: 24 },
  { title: 'Add CodePush OTA updates for hot fixes', priority: 'MEDIUM', points: 16 },
  { title: 'Fix status bar overlap on notch devices', priority: 'MEDIUM', points: 10 },
  { title: 'Implement app shortcuts for frequent actions', priority: 'LOW', points: 10 },
  { title: 'Add Lottie animations for empty states', priority: 'LOW', points: 8 },
  { title: 'Fix ANR on main thread heavy computation', priority: 'CRITICAL', points: 26 },
  { title: 'Implement end-to-end encryption for messages', priority: 'HIGH', points: 24 },
  { title: 'Add dynamic type support for accessibility', priority: 'MEDIUM', points: 12 },
  { title: 'Fix file picker crashing on Android 13+', priority: 'HIGH', points: 16 },
  { title: 'Implement widget for home screen quick stats', priority: 'MEDIUM', points: 16 },
  { title: 'Add offline map tile caching for field workers', priority: 'HIGH', points: 22 },
  { title: 'Fix tablet layout not using split-view properly', priority: 'MEDIUM', points: 14 },
  { title: 'Implement share extension for content ingestion', priority: 'MEDIUM', points: 16 },
  { title: 'Add crash reporting with Sentry for mobile', priority: 'MEDIUM', points: 12 },
  { title: 'Fix ProGuard stripping needed reflection classes', priority: 'HIGH', points: 16 },
  { title: 'Implement dark mode sync with system preference', priority: 'MEDIUM', points: 10 },
  { title: 'Add App Tracking Transparency prompt for iOS', priority: 'HIGH', points: 14 },
  { title: 'Fix socket disconnect on app backgrounding', priority: 'HIGH', points: 18 },
  { title: 'Implement native share sheet with preview', priority: 'LOW', points: 10 },

  // ─── Performance (441–480) ─────────────────────────────────────
  { title: 'Reduce bundle size by code-splitting routes', priority: 'HIGH', points: 18 },
  { title: 'Fix render-blocking CSS on initial page load', priority: 'HIGH', points: 16 },
  { title: 'Implement image WebP conversion pipeline', priority: 'MEDIUM', points: 14 },
  { title: 'Add service worker for offline caching', priority: 'MEDIUM', points: 16 },
  { title: 'Fix unnecessary re-renders in dashboard', priority: 'HIGH', points: 18 },
  { title: 'Implement database query result caching', priority: 'HIGH', points: 20 },
  { title: 'Add Brotli compression to asset server', priority: 'MEDIUM', points: 12 },
  { title: 'Fix N+1 GraphQL resolver for nested queries', priority: 'CRITICAL', points: 28 },
  { title: 'Implement lazy module loading for admin panel', priority: 'MEDIUM', points: 14 },
  { title: 'Add preconnect hints for third-party domains', priority: 'LOW', points: 6 },
  { title: 'Fix main thread blocking on large JSON parse', priority: 'HIGH', points: 16 },
  { title: 'Implement HTTP/2 server push for critical CSS', priority: 'MEDIUM', points: 14 },
  { title: 'Add Lighthouse CI score regression check', priority: 'MEDIUM', points: 12 },
  { title: 'Fix memory leak in chart re-rendering loop', priority: 'HIGH', points: 18 },
  { title: 'Implement edge caching for API responses', priority: 'HIGH', points: 20 },
  { title: 'Add tree-shaking analysis for unused exports', priority: 'LOW', points: 10 },
  { title: 'Fix cumulative layout shift on hero section', priority: 'HIGH', points: 14 },
  { title: 'Implement request batching for GraphQL', priority: 'MEDIUM', points: 16 },
  { title: 'Add prefetch for likely next page transitions', priority: 'MEDIUM', points: 12 },
  { title: 'Fix slow first contentful paint on landing', priority: 'HIGH', points: 18 },
  { title: 'Implement streaming SSR for faster TTFB', priority: 'HIGH', points: 22 },
  { title: 'Add font subsetting to reduce WOFF2 size', priority: 'LOW', points: 8 },
  { title: 'Fix excessive DOM nodes slowing layout calc', priority: 'MEDIUM', points: 14 },
  { title: 'Implement stale-while-revalidate for API calls', priority: 'MEDIUM', points: 14 },
  { title: 'Add response time budgets to API monitoring', priority: 'MEDIUM', points: 12 },
  { title: 'Fix animation frame drops on low-end devices', priority: 'HIGH', points: 16 },
  { title: 'Implement connection pooling for Redis clients', priority: 'HIGH', points: 18 },
  { title: 'Add Web Vitals tracking to analytics', priority: 'MEDIUM', points: 10 },
  { title: 'Fix webpack chunk duplication bloating bundle', priority: 'HIGH', points: 16 },
  { title: 'Implement background task queue with workers', priority: 'HIGH', points: 20 },
  { title: 'Add CDN edge function for dynamic image resize', priority: 'MEDIUM', points: 16 },
  { title: 'Fix long task blocking interaction readiness', priority: 'HIGH', points: 18 },
  { title: 'Implement read-through cache for user profiles', priority: 'MEDIUM', points: 14 },
  { title: 'Add real user monitoring (RUM) dashboard', priority: 'MEDIUM', points: 14 },
  { title: 'Fix third-party script blocking page render', priority: 'HIGH', points: 14 },
  { title: 'Implement database connection warm-up on deploy', priority: 'MEDIUM', points: 12 },
  { title: 'Add async script loading for analytics tags', priority: 'LOW', points: 6 },
  { title: 'Fix SVG sprite not caching across pages', priority: 'LOW', points: 8 },
  { title: 'Implement pagination cursor for large datasets', priority: 'HIGH', points: 18 },
  { title: 'Add memory profiling to staging environment', priority: 'MEDIUM', points: 14 },

  // ─── Corporate / Documentation / Misc (481–500) ───────────────
  { title: 'Update README with setup instructions', priority: 'LOW', points: 5 },
  { title: 'Review and approve PR #4921', priority: 'MEDIUM', points: 10 },
  { title: 'Update privacy policy page content', priority: 'LOW', points: 6 },
  { title: 'Write API documentation for v2 endpoints', priority: 'MEDIUM', points: 14 },
  { title: 'Fix broken links in knowledge base', priority: 'LOW', points: 5 },
  { title: 'Add changelog entry for latest release', priority: 'LOW', points: 4 },
  { title: 'Update third-party dependency licenses', priority: 'MEDIUM', points: 10 },
  { title: 'Respond to customer bug report #7734', priority: 'HIGH', points: 16 },
  { title: 'Create runbook for database failover', priority: 'MEDIUM', points: 14 },
  { title: 'Update Jira board workflow configuration', priority: 'LOW', points: 6 },
  { title: 'Write post-incident report for outage', priority: 'HIGH', points: 18 },
  { title: 'Set up Slack notification for deploys', priority: 'LOW', points: 8 },
  { title: 'Create training doc for new team member', priority: 'MEDIUM', points: 10 },
  { title: 'Migrate wiki pages to Confluence', priority: 'LOW', points: 8 },
  { title: 'Archive completed Q3 sprint tickets', priority: 'LOW', points: 4 },
  { title: 'Write architecture decision record (ADR)', priority: 'MEDIUM', points: 12 },
  { title: 'Create team coding standards document', priority: 'MEDIUM', points: 10 },
  { title: 'Record demo video for stakeholder review', priority: 'MEDIUM', points: 10 },
  { title: 'Update on-call rotation schedule', priority: 'LOW', points: 5 },
  { title: 'Write retrospective notes for sprint #47', priority: 'LOW', points: 6 },
]

// OFFLINE_TASKS export: 30% seed (hand-crafted), 70% procedurally generated
// This gives a mix of polished tasks and fresh random ones
export const OFFLINE_TASKS = SEED_TASKS

/**
 * Returns a random task — either from the seed pool or procedurally generated.
 * Called by useWorkStore when Gemini API is unavailable.
 */
export const resetPool = () => {
  _recentTitles.clear()
}

export const getRandomOfflineTask = () => {
  if (Math.random() < 0.3) {
    // 30% chance: pick from hand-crafted seed pool
    return SEED_TASKS[Math.floor(Math.random() * SEED_TASKS.length)]
  }
  // 70% chance: generate a brand new random task
  return generateRandomOfflineTask()
}

// ─── Meeting Dialogue System ─────────────────────────────────────
export const MEETING_TEMPLATES = [
  { title: 'Sprint Retrospective', organizer: 'Chad B. (PM)', duration: '60 min', room: 'Conf Room C' },
  { title: 'All-Hands Meeting', organizer: 'Brad (CTO)', duration: '90 min', room: 'Auditorium' },
  { title: 'Code Review Session', organizer: 'Sarah (Lead Dev)', duration: '30 min', room: 'Zoom Link' },
  { title: '1:1 with Manager', organizer: 'Mike (Mgr)', duration: '30 min', room: 'His Office' },
  { title: 'Incident Postmortem', organizer: 'DevOps Bot', duration: '45 min', room: 'War Room' },
  { title: 'Mandatory Fun Hour', organizer: 'Karen M. (HR)', duration: '60 min', room: 'Break Room' },
  { title: 'Budget Planning Q4', organizer: 'Dave (Finance)', duration: '120 min', room: 'Board Room' },
  { title: 'Product Demo to Client', organizer: 'Sales Team', duration: '45 min', room: 'Showroom A' },
]

export const MEETING_DIALOGUES = [
  {
    speaker: 'Chad (PM)',
    text: '"So let\'s circle back on the velocity metrics and align our synergies..."',
    choices: [
      { label: '📊 "We should focus on blockers first"', type: 'productive', effect: { score: 5, burnout: -0.01, meetingSpeed: 1.5 } },
      { label: '🤝 "Absolutely, let\'s leverage our core competencies"', type: 'corporate', effect: { score: 0, burnout: 0, meetingSpeed: 1.0 } },
      { label: '🚪 "I have another meeting, sorry"', type: 'escape', effect: { score: -2, burnout: -0.02, meetingSpeed: 3.0 } },
      { label: '😤 "This could have been an email"', type: 'honest', effect: { score: -5, burnout: 0.02, meetingSpeed: 2.0 } },
      { label: '🔇 *Stay silent*', type: 'silent', effect: { score: 0, burnout: 0.01, meetingSpeed: 0.8 } },
    ]
  },
  {
    speaker: 'Brad (CTO)',
    text: '"We need to disrupt the paradigm and move fast. What\'s the team\'s bandwidth?"',
    choices: [
      { label: '📋 "Here\'s our capacity breakdown..."', type: 'productive', effect: { score: 8, burnout: -0.01, meetingSpeed: 1.5 } },
      { label: '🚀 "We\'re optimizing our throughput pipeline"', type: 'corporate', effect: { score: 2, burnout: 0, meetingSpeed: 1.0 } },
      { label: '🚪 "Got a deploy to monitor, BRB"', type: 'escape', effect: { score: -3, burnout: -0.02, meetingSpeed: 3.0 } },
      { label: '😬 "We\'re drowning, Brad"', type: 'honest', effect: { score: -8, burnout: 0.03, meetingSpeed: 2.0 } },
      { label: '🔇 *Nod thoughtfully*', type: 'silent', effect: { score: 0, burnout: 0.01, meetingSpeed: 0.8 } },
    ]
  },
  {
    speaker: 'Karen (HR)',
    text: '"Before we proceed, let\'s do a quick team-building icebreaker! 🎉"',
    choices: [
      { label: '🎯 "How about we use this time productively?"', type: 'productive', effect: { score: 3, burnout: -0.01, meetingSpeed: 1.5 } },
      { label: '😊 "Great idea! I love team bonding!"', type: 'corporate', effect: { score: 1, burnout: 0, meetingSpeed: 1.0 } },
      { label: '🚪 "WiFi issues, dropping..."', type: 'escape', effect: { score: -2, burnout: -0.02, meetingSpeed: 3.0 } },
      { label: '😑 "Can we not?"', type: 'honest', effect: { score: -6, burnout: 0.02, meetingSpeed: 1.5 } },
      { label: '🔇 *Camera off, mic muted*', type: 'silent', effect: { score: 0, burnout: 0.01, meetingSpeed: 0.8 } },
    ]
  },
  {
    speaker: 'Sarah (Lead)',
    text: '"The PR has 47 comments. Let\'s go through them one by one..."',
    choices: [
      { label: '✅ "Let me summarize the key blockers"', type: 'productive', effect: { score: 6, burnout: -0.01, meetingSpeed: 1.8 } },
      { label: '📝 "I\'ll take an action item on that"', type: 'corporate', effect: { score: 1, burnout: 0, meetingSpeed: 1.0 } },
      { label: '🚪 "Can we async this?"', type: 'escape', effect: { score: -1, burnout: -0.01, meetingSpeed: 2.5 } },
      { label: '🤦 "47 comments on a 3-line change?"', type: 'honest', effect: { score: -4, burnout: 0.02, meetingSpeed: 1.5 } },
      { label: '🔇 *Type in Slack instead*', type: 'silent', effect: { score: 0, burnout: 0.01, meetingSpeed: 0.8 } },
    ]
  },
  {
    speaker: 'Dave (Finance)',
    text: '"We need to discuss the budget implications of the new microservices architecture..."',
    choices: [
      { label: '💰 "Here\'s a cost-benefit analysis"', type: 'productive', effect: { score: 7, burnout: -0.01, meetingSpeed: 1.5 } },
      { label: '📈 "It\'s an investment in scalability"', type: 'corporate', effect: { score: 1, burnout: 0, meetingSpeed: 1.0 } },
      { label: '🚪 "I\'m not the right person for this"', type: 'escape', effect: { score: -2, burnout: -0.02, meetingSpeed: 3.0 } },
      { label: '💸 "You approved $0 for infrastructure"', type: 'honest', effect: { score: -5, burnout: 0.02, meetingSpeed: 2.0 } },
      { label: '🔇 *Zone out*', type: 'silent', effect: { score: 0, burnout: 0.01, meetingSpeed: 0.8 } },
    ]
  },
]

// ─── Slack Interruptions ─────────────────────────────────────────
export const SLACK_MESSAGES = [
  { from: 'Kevin (Backend)', channel: '#dev', text: 'hey quick question — is the API down or is it just me?', urgent: false },
  { from: 'PM Bot', channel: '#standups', text: '🔴 You missed today\'s standup update. Please post ASAP.', urgent: true },
  { from: 'Sarah (Lead)', channel: 'DM', text: 'Can you review my PR? It\'s blocking the release', urgent: true },
  { from: 'Random Intern', channel: '#general', text: 'does anyone know the WiFi password?', urgent: false },
  { from: 'CI/CD Bot', channel: '#deploys', text: '❌ Build #4481 FAILED — main branch', urgent: true },
  { from: 'Karen (HR)', channel: '#announcements', text: 'REMINDER: Submit your timesheet by EOD!', urgent: false },
  { from: 'Brad (CTO)', channel: 'DM', text: 'Got a minute? Want to discuss something.', urgent: true },
  { from: 'DevOps Bot', channel: '#alerts', text: '⚠️ CPU usage at 94% on prod-server-3', urgent: true },
  { from: 'Chad (PM)', channel: '#team', text: 'Can everyone fill out the team survey? Takes 5 min (it took 45 min)', urgent: false },
  { from: 'Mike (Manager)', channel: 'DM', text: 'Quick sync? Just 5 minutes (will be 30)', urgent: false },
  { from: 'Jira Bot', channel: '#jira', text: 'TASK-0042 was reopened by QA with 12 new comments', urgent: true },
  { from: 'Coffee Bot', channel: '#random', text: '☕ Free coffee in the break room! (decaf only)', urgent: false },
  { from: 'Janet (Legal)', channel: 'DM', text: 'PER MY PREVIOUS EMAIL — please sign the NDA addendum', urgent: true },
  { from: 'Wellness Bot', channel: '#wellness', text: '🧘 Time for your mandatory 2-minute mindfulness break!', urgent: false },
  { from: 'Git Bot', channel: '#dev', text: '🔥 Force push detected on main by unknown user', urgent: true },
]

// ─── Realism Events ──────────────────────────────────────────────
export const REALISM_EVENTS = [
  { type: 'scope_change', title: '⚠️ SCOPE CHANGE', text: 'Requirements updated. Your current task now has additional requirements.', effect: 'extend_deadline' },
  { type: 'task_reopened', title: '🔄 TASK REOPENED', text: 'QA found issues. A completed task has been moved back to backlog.', effect: 'reopen_task' },
  { type: 'manager_checkin', title: '👔 MANAGER CHECK-IN', text: '"Hey, just checking in. How\'s that ticket going? No pressure." (there is pressure)', effect: 'burnout_spike' },
  { type: 'coffee_break', title: '☕ COFFEE BREAK', text: 'The coffee machine is free! Take a break?', effect: 'offer_break' },
  { type: 'deploy_freeze', title: '🧊 DEPLOY FREEZE', text: 'Production deploy freeze until further notice. Keep working though.', effect: 'increase_deadlines' },
  { type: 'fire_drill', title: '🔥 FIRE DRILL', text: 'Mandatory fire drill in 30 seconds. All work paused.', effect: 'pause_timers' },
  { type: 'internet_lag', title: '🐌 INTERNET ISSUES', text: 'Network latency detected. Everything feels slower...', effect: 'slow_ui' },
  { type: 'praise', title: '🌟 KUDOS!', text: 'Your manager noticed your work! +10 morale boost', effect: 'burnout_relief' },
  { type: 'boss_alert', title: '🚨 BOSS APPROACHING', text: 'Your manager is walking over! Quick — close anything non-work!', effect: 'boss_alert' },
]
