const STORAGE_KEY = 'debugpath.learning.v1';

export const challenges = [
  {
    id: 'loop-total', title: 'Accumulate the total', topic: 'Loops', level: 'Beginner', minutes: 5,
    prompt: 'The program should add every number from 0 through 4 and print 10. Find the line that resets the total.',
    starterCode: 'total = 0\nfor i in range(5):\n    total = i\nprint(total)',
    solution: 'total = 0\nfor i in range(5):\n    total += i\nprint(total)',
    expected: '10',
  },
  {
    id: 'string-greeting', title: 'Format the greeting', topic: 'Strings', level: 'Beginner', minutes: 4,
    prompt: 'Make the function print exactly: Hello, World! Include the comma and exclamation mark.',
    starterCode: 'def greet(name):\n    print("Hello" + name)\n\ngreet("World")',
    solution: 'def greet(name):\n    print(f"Hello, {name}!")\n\ngreet("World")',
    expected: 'Hello, World!',
  },
  {
    id: 'condition-boundary', title: 'Check the passing score', topic: 'Conditionals', level: 'Intermediate', minutes: 6,
    prompt: 'A score of 60 is a pass. Update the comparison so the boundary score passes too.',
    starterCode: 'score = 60\nif score > 60:\n    print("Pass")\nelse:\n    print("Try again")',
    solution: 'score = 60\nif score >= 60:\n    print("Pass")\nelse:\n    print("Try again")',
    expected: 'Pass',
  },
  {
    id: 'array-boundary', title: 'Visit every item', topic: 'Arrays', level: 'Intermediate', minutes: 7,
    prompt: 'The loop should visit each value once without going past the end of the list.',
    starterCode: 'values = [3, 6, 9]\nfor i in range(len(values) + 1):\n    print(values[i])',
    solution: 'values = [3, 6, 9]\nfor i in range(len(values)):\n    print(values[i])',
    expected: '3, 6, 9',
  },
  {
    id: 'logic-filter', title: 'Keep the positive values', topic: 'Logic', level: 'Advanced', minutes: 8,
    prompt: 'Only positive values should be added to the result. Zero and negative values should be skipped.',
    starterCode: 'values = [-2, 0, 4]\npositive = []\nfor value in values:\n    if value >= 0:\n        positive.append(value)',
    solution: 'values = [-2, 0, 4]\npositive = []\nfor value in values:\n    if value > 0:\n        positive.append(value)',
    expected: '[4]',
  },
];

export function emptyLearningData() {
  return { attempts: [], solvedIds: [], practiceDays: [] };
}

export function loadLearningData() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    return saved && Array.isArray(saved.attempts) ? { ...emptyLearningData(), ...saved } : emptyLearningData();
  } catch {
    return emptyLearningData();
  }
}

function saveLearningData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  return data;
}

export function evaluateChallenge(challenge, code) {
  const compact = code.toLowerCase().replace(/\s+/g, '');
  let category = 'Logic error';
  let issueLine = 1;
  let explanation = 'The output does not match the expected result yet. Trace the values through the code one step at a time.';
  let hint = 'Compare the expected output with the value your code produces.';
  let tests = [];

  if (challenge.id === 'loop-total') {
    tests = [
      { name: 'Starting value is initialized', passed: /total=0/.test(compact) },
      { name: 'Each value is accumulated', passed: /total\+=i/.test(compact) || /total=total\+i/.test(compact) },
      { name: 'Final total is printed', passed: /print\(total\)/.test(compact) },
    ];
    category = 'Incorrect accumulation';
    issueLine = Math.max(1, code.split('\n').findIndex(line => /total\s*=\s*i\s*$/.test(line)) + 1);
    explanation = 'The loop replaces total with the current value of i instead of adding to the running total.';
    hint = 'Think about the difference between = and +=.';
  } else if (challenge.id === 'string-greeting') {
    tests = [
      { name: 'Greeting function is defined', passed: /defgreet\(name\)/.test(compact) },
      { name: 'Comma and space are included', passed: /hello,\s/.test(code.toLowerCase()) },
      { name: 'Name and punctuation are included', passed: /name/.test(compact) && /!/.test(code) },
    ];
    category = 'String formatting';
    issueLine = Math.max(1, code.split('\n').findIndex(line => /print\(/.test(line)) + 1);
    explanation = 'The greeting is missing punctuation or the name is not combined with the message in the expected format.';
    hint = 'Compare the comma, space, and exclamation mark in the expected output.';
  } else if (challenge.id === 'condition-boundary') {
    tests = [
      { name: 'Score is checked', passed: /ifscore/.test(compact) },
      { name: 'Boundary score passes', passed: /score>=60/.test(compact) },
      { name: 'Both outcomes are handled', passed: /print\("pass"\)/.test(compact) && /print\("tryagain"\)/.test(compact) },
    ];
    category = 'Boundary condition';
    issueLine = Math.max(1, code.split('\n').findIndex(line => /if\s+score/.test(line)) + 1);
    explanation = 'A score equal to 60 should pass, but > excludes the boundary value.';
    hint = 'Which comparison includes values equal to the limit?';
  } else if (challenge.id === 'array-boundary') {
    tests = [
      { name: 'Values are defined', passed: /values=\[3,6,9\]/.test(compact) },
      { name: 'Loop visits the list', passed: /foriinrange\(len\(values\)\)/.test(compact) || /forvalueinvalues/.test(compact) },
      { name: 'No extra index is added', passed: !/len\(values\)\+1/.test(compact) },
    ];
    category = 'Index out of range';
    issueLine = Math.max(1, code.split('\n').findIndex(line => /for\s+i\s+in\s+range/.test(line)) + 1);
    explanation = 'Adding 1 to the list length makes the final loop iteration read past the last valid index.';
    hint = 'List indexes start at zero, so the final valid index is one less than the list length.';
  } else if (challenge.id === 'logic-filter') {
    tests = [
      { name: 'Values are iterated', passed: /forvalueinvalues/.test(compact) },
      { name: 'Only positive values pass', passed: /ifvalue>0/.test(compact) },
      { name: 'Matching values are kept', passed: /positive\.append\(value\)/.test(compact) },
    ];
    category = 'Incorrect condition';
    issueLine = Math.max(1, code.split('\n').findIndex(line => /if\s+value/.test(line)) + 1);
    explanation = 'The current comparison also includes zero, but the task asks for positive values only.';
    hint = 'Positive values are greater than zero; zero itself is not positive.';
  }

  const passed = tests.length > 0 && tests.every(test => test.passed);

  return {
    passed,
    category,
    issueLine,
    explanation,
    hint,
    tests,
    runtime: passed ? '0.08 s' : '0.06 s',
    output: passed ? challenge.expected : 'Output differs from expected result',
  };
}

export function recordAttempt(challenge, code, result) {
  const data = loadLearningData();
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const attempt = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2, 7)}`,
    challengeId: challenge.id,
    title: challenge.title,
    topic: challenge.topic,
    level: challenge.level,
    code,
    solution: challenge.solution,
    passed: result.passed,
    category: result.category,
    explanation: result.explanation,
    hint: result.hint,
    issueLine: result.issueLine,
    createdAt: now.toISOString(),
  };
  const solvedIds = result.passed && !data.solvedIds.includes(challenge.id)
    ? [...data.solvedIds, challenge.id]
    : data.solvedIds;
  return saveLearningData({
    ...data,
    attempts: [...data.attempts, attempt].slice(-150),
    solvedIds,
    practiceDays: data.practiceDays.includes(today) ? data.practiceDays : [...data.practiceDays, today],
  });
}

export function isChallengeUnlocked(challenge, data) {
  if (challenge.level === 'Beginner') return true;
  const beginnerSolved = challenges.filter(item => item.level === 'Beginner' && data.solvedIds.includes(item.id)).length;
  if (challenge.level === 'Intermediate') return beginnerSolved >= 1;
  const intermediateSolved = challenges.filter(item => item.level === 'Intermediate' && data.solvedIds.includes(item.id)).length;
  return beginnerSolved >= 2 && intermediateSolved >= 1;
}

export function getWeakTopics(data) {
  const counts = {};
  data.attempts.filter(attempt => !attempt.passed).forEach(attempt => {
    counts[attempt.topic] = (counts[attempt.topic] || 0) + 1;
  });
  return Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([topic, misses]) => ({ topic, misses }));
}

export function recommendChallenge(data) {
  const open = challenges.filter(challenge => !data.solvedIds.includes(challenge.id) && isChallengeUnlocked(challenge, data));
  if (!open.length) return challenges.find(challenge => !data.solvedIds.includes(challenge.id)) || challenges[0];
  const weakTopics = getWeakTopics(data);
  const weak = weakTopics.find(item => open.some(challenge => challenge.topic === item.topic));
  return (weak && open.find(challenge => challenge.topic === weak.topic)) || open[0];
}

export function getLearningStats(data) {
  const total = data.attempts.length;
  const correct = data.attempts.filter(item => item.passed).length;
  const recent = data.attempts.slice(-5);
  const streak = recent.length > 0 && recent.every(item => item.passed);
  return {
    totalAttempts: total,
    solved: data.solvedIds.length,
    correctSubmissions: correct,
    accuracy: total ? Math.round((correct / total) * 100) : 0,
    weakTopics: getWeakTopics(data),
    recentPerfectRun: streak,
  };
}

export function getAchievements(data) {
  const stats = getLearningStats(data);
  const logicChallenges = challenges.filter(item => item.topic === 'Logic');
  return [
    { id: 'first-fix', title: 'First Fix', detail: 'Solve your first debugging challenge.', unlocked: data.solvedIds.length >= 1, icon: '✳' },
    { id: 'bug-hunter', title: 'Bug Hunter', detail: 'Submit 10 correct solutions.', unlocked: stats.correctSubmissions >= 10, icon: '⌘' },
    { id: 'perfect-run', title: 'Perfect Run', detail: 'Get five correct submissions in a row.', unlocked: stats.recentPerfectRun && data.attempts.length >= 5, icon: '↗' },
    { id: 'consistency', title: 'Consistency', detail: 'Practice on seven different days.', unlocked: data.practiceDays.length >= 7, icon: '◷' },
    { id: 'logic-master', title: 'Logic Master', detail: 'Complete every logic challenge.', unlocked: logicChallenges.every(item => data.solvedIds.includes(item.id)), icon: '◎' },
  ];
}
