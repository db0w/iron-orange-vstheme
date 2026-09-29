// Single source of truth for every color in Iron Orange.
// The template (src/template.mjs) maps these roles onto VS Code theme keys,
// so tweaking a tone here updates every place that uses it.

// Dark: bright copper surfaces ("Cobre vivo") framed by light orange bars.
export const dark = {
  name: 'Iron Orange Dark',
  type: 'dark',

  // Title bar, activity bar and status bar
  chrome: {
    title: '#FF9B55',
    titleFg: '#1A0B03',
    titleInactiveFg: '#6B3510',
    commandCenter: '#FFB27A',
    commandCenterBorder: '#D9661F',
    commandCenterFg: '#1A0B03',
    activity: '#FF9B55',
    activityFg: '#1A0B03',
    activityDim: '#6B3510',
    activityActive: '#1A0B03',
    badge: '#1A0B03',
    badgeFg: '#FF9B55',
    status: '#FF9B55',
    statusFg: '#1A0B03',
    statusBorder: '#E8702A',
    statusHover: '#FFFFFF33', // lightens the orange so dark text keeps contrast
    statusDebug: '#9C4412',
    statusDebugFg: '#FFF6EE',
    remote: '#1A0B03',
    remoteFg: '#FF9B55',
  },
  bg: {
    deep: '#43210A', // deepest surfaces (peek results)
    side: '#4F270C', // sidebar, panel, tabs strip
    editor: '#5C2E0E', // bright copper
    widget: '#6A3713', // hover, suggest, find widget
    input: '#4A240B',
    hover: '#633411', // list hover
    active: '#733D16', // list inactive selection
  },
  border: {
    subtle: '#6A3713',
    strong: '#7E4519',
  },
  fg: {
    main: '#FFF6EE', // warm cream
    muted: '#F2D3BA',
    dim: '#C4946F', // line numbers, placeholders
    faint: '#7E4519', // whitespace, indent guides
    onAccent: '#1A0B03', // text on orange buttons/badges
  },
  accent: {
    main: '#FFA766', // cursor, focus, indicators
    deep: '#F07A2E', // buttons
    sheen: '#FFC08E', // highlight on orange
    text: '#FFB57D', // links and accent text
    hover: '#FF9B55', // button hover
  },
  // Gunmetal selection: darker than the copper background, so every color gains contrast when selected
  selection: {
    editor: '#12141799',
    inactive: '#12141766',
    highlight: '#12141747',
    list: '#12141780',
    find: '#FFD66B3D',
    findBorder: '#FFD66B',
    findHighlight: '#FFD66B1F',
  },
  status: {
    error: '#FF8A8E',
    warning: '#FFD66B',
    info: '#A6D3E8',
    success: '#BFE6A8',
  },
  git: {
    added: '#BFE6A8',
    modified: '#A6D3E8',
    deleted: '#FF8A8E',
    untracked: '#BFE6A8',
    ignored: '#B08466',
    conflict: '#F7AE9A',
    submodule: '#E2D0C0',
  },
  syntax: {
    keyword: '#FF9B55', // orange
    operator: '#FFB27A',
    func: '#FFC894', // light copper
    string: '#CFE8B4', // patina
    regexp: '#A8DCC4',
    escape: '#FFD66B',
    type: '#A6D3E8', // steel blue
    number: '#FFD66B', // amber
    constant: '#F7AE9A', // rose copper
    variable: '#FFF6EE',
    parameter: '#FAE0CA',
    property: '#E2D0C0',
    tag: '#FF9B55',
    attribute: '#FFC894',
    decorator: '#FFD66B',
    namespace: '#BFDDEB',
    punctuation: '#E0C0A6',
    comment: '#C19F87',
    heading: '#FFA766',
    link: '#A6D3E8',
    inserted: '#BFE6A8',
    deleted: '#FF8A8E',
    invalid: '#FF8A8E',
  },
  // Bracket pair colorization: copper, gold, steel, silver, bronze, rose copper
  brackets: ['#FFA766', '#FFD66B', '#A6D3E8', '#E2D0C0', '#E8B07A', '#F7AE9A'],
  ansi: {
    black: '#6A3713',
    red: '#FF8A8E',
    green: '#BFE6A8',
    yellow: '#FFD66B',
    blue: '#9DC0EA',
    magenta: '#EBA9CB',
    cyan: '#A6D3E8',
    white: '#E8D8CA',
    brightBlack: '#C4946F',
    brightRed: '#FFA8AB',
    brightGreen: '#D4F0C2',
    brightYellow: '#FFE59E',
    brightBlue: '#BAD4F2',
    brightMagenta: '#F5C4DD',
    brightCyan: '#C4E4F2',
    brightWhite: '#FFFFFF',
  },
};

// Light: soft mandarin surfaces ("Mandarina suave") with orange bars and a copper status bar.
export const light = {
  name: 'Iron Orange Light',
  type: 'light',

  chrome: {
    title: '#E97A2A',
    titleFg: '#1A0B03',
    titleInactiveFg: '#5A2A0C',
    commandCenter: '#F59A55',
    commandCenterBorder: '#B85A17',
    commandCenterFg: '#1A0B03',
    activity: '#F59346',
    activityFg: '#1A0B03',
    activityDim: '#6E3A18',
    activityActive: '#1A0B03',
    badge: '#1A0B03',
    badgeFg: '#FFB27A',
    status: '#9C4209',
    statusFg: '#FFFFFF',
    statusBorder: '#9C4209',
    statusHover: '#00000033',
    statusDebug: '#6B1500',
    statusDebugFg: '#FFFFFF',
    remote: '#1A0B03',
    remoteFg: '#FFB27A',
  },
  bg: {
    deep: '#FAD3AE',
    side: '#FFDDBC',
    editor: '#FFE8D1', // soft mandarin
    widget: '#FFF4E8',
    input: '#FFF4E8',
    hover: '#FCD0A6',
    active: '#F8C69A',
  },
  border: {
    subtle: '#F2C29A',
    strong: '#E0AA7A',
  },
  fg: {
    main: '#241005',
    muted: '#653C22',
    dim: '#8F6244',
    faint: '#F2C29A',
    onAccent: '#FFFFFF',
  },
  accent: {
    main: '#D66014',
    deep: '#A84A12',
    sheen: '#E97A2A',
    text: '#9E3800',
    hover: '#B8480F',
  },
  // Orange selection; syntax colors are tuned to keep 4.5:1 on top of it
  selection: {
    editor: '#D6601433',
    inactive: '#D6601424',
    highlight: '#D660141A',
    list: '#D6601433',
    find: '#FFC8008C',
    findBorder: '#8F5F00',
    findHighlight: '#FFC80047',
  },
  status: {
    error: '#A6231C',
    warning: '#7F5100',
    info: '#1F5F82',
    success: '#2A611B',
  },
  git: {
    added: '#2A611B',
    modified: '#1F5F82',
    deleted: '#A6231C',
    untracked: '#2A611B',
    ignored: '#8F6244',
    conflict: '#A33129',
    submodule: '#653C22',
  },
  syntax: {
    keyword: '#9E3800',
    operator: '#8F4312',
    func: '#8A3A0A',
    string: '#566010',
    regexp: '#1A5E4A',
    escape: '#7F5100',
    type: '#1F5F82',
    number: '#7F5100',
    constant: '#A33129',
    variable: '#241005',
    parameter: '#6B3A1E',
    property: '#2F5268',
    tag: '#9E3800',
    attribute: '#8A3A0A',
    decorator: '#7F5100',
    namespace: '#2F5268',
    punctuation: '#6B4128',
    comment: '#6C5546',
    heading: '#9E3800',
    link: '#1F5F82',
    inserted: '#2A611B',
    deleted: '#A6231C',
    invalid: '#A6231C',
  },
  brackets: ['#C2571A', '#7F5100', '#1F5F82', '#6B4128', '#8F5A1E', '#A33129'],
  ansi: {
    black: '#241005',
    red: '#B3261E',
    green: '#276B3A',
    yellow: '#7F5500',
    blue: '#1F5F82',
    magenta: '#8E3A6E',
    cyan: '#166A74',
    white: '#8F6244',
    brightBlack: '#653C22',
    brightRed: '#A01F18',
    brightGreen: '#256A2B',
    brightYellow: '#855A00',
    brightBlue: '#28608C',
    brightMagenta: '#933B75',
    brightCyan: '#17656F',
    brightWhite: '#B08A6E',
  },
};

export const palettes = [dark, light];
