

export const levels = [
  // Nível 0: simples, 2 cores, 4 tubos
  [
    ["red", "green", "red", "green"],
    ["green", "red", "green", "red"],
    [],
    []
  ],

  // Nível 1: 3 cores, 5 tubos
  [
    ["blue", "green", "blue", "red"],
    ["red", "blue", "green", "red"],
    ["green", "red", "blue", "green"],
    [],
    []
  ],

  // Nível 2: 4 cores, 6 tubos
  [
    ["yellow", "blue", "red", "green"],
    ["green", "red", "yellow", "blue"],
    ["blue", "yellow", "green", "red"],
    ["red", "green", "blue", "yellow"],
    [],
    []
  ],

  // Nível 3: 5 cores, 7 tubos
  [
    ["yellow", "blue", "violet", "red"],
    ["green", "red", "violet", "yellow"],
    ["violet", "blue", "yellow", "green"],
    ["red", "green", "blue", "violet"],
    ["red", "green", "yellow", "blue"],
    [],
    []
  ],

  // ✅ Nível 4 corrigido: 5 cores, 7 tubos
  [
    ["red", "green", "blue", "yellow"],
    ["orange", "red", "green", "blue"],
    ["yellow", "orange", "red", "green"],
    ["blue", "yellow", "orange", "red"],
    ["green", "blue", "yellow", "orange"],
    [],
    []
  ]
];
