const STORAGE_KEY = "asian-meals-planner-mvp";
const SLOT_TYPES = ["lunch", "dinner"];

const products = {
  "bok choy": { title: "Pasar Bok Choy", price: 1.95, availability: "In stock", sale: true },
  "napa cabbage": { title: "Napa Cabbage", price: 3.6, availability: "In stock", sale: false },
  "spring onion": { title: "Spring Onion", price: 1.35, availability: "In stock", sale: true },
  "firm tofu": { title: "Fortune Firm Tofu", price: 1.85, availability: "In stock", sale: false },
  "chicken thigh": { title: "Fresh Chicken Thigh Fillet", price: 6.8, availability: "In stock", sale: false },
  "pork belly": { title: "Pork Belly Slices", price: 8.4, availability: "In stock", sale: false },
  "salmon fillet": { title: "Atlantic Salmon Fillet", price: 10.9, availability: "Low stock", sale: true },
  "udon": { title: "Frozen Sanuki Udon", price: 4.5, availability: "In stock", sale: false },
  "light soy sauce": { title: "Light Soy Sauce", price: 3.45, availability: "In stock", sale: false },
  "oyster sauce": { title: "Premium Oyster Sauce", price: 4.2, availability: "In stock", sale: true },
  "eggs": { title: "Fresh Eggs 10s", price: 3.9, availability: "In stock", sale: true },
  "miso paste": { title: "White Miso Paste", price: 5.8, availability: "In stock", sale: false },
  "mirin": { title: "Hon Mirin", price: 5.25, availability: "In stock", sale: false }
};

const seedRecipes = [
  {
    id: "r1",
    title: "Mapo Tofu",
    cuisine: "Chinese",
    protein: "tofu",
    source: "Household sheet",
    notes: "Great when tofu and spring onion are already at home.",
    ingredients: [
      { name: "firm tofu", quantity: 1, unit: "pack", category: "Protein" },
      { name: "pork mince", quantity: 200, unit: "g", category: "Protein" },
      { name: "light soy sauce", quantity: 1, unit: "tbsp", category: "Pantry" },
      { name: "garlic", quantity: 4, unit: "pcs", category: "Produce" },
      { name: "spring onion", quantity: 2, unit: "pcs", category: "Produce" }
    ]
  },
  {
    id: "r2",
    title: "Tomato Egg Stir-Fry",
    cuisine: "Chinese",
    protein: "egg",
    source: "Household sheet",
    notes: "Fast fallback dinner with strong pantry fit.",
    ingredients: [
      { name: "eggs", quantity: 4, unit: "pcs", category: "Protein" },
      { name: "tomato", quantity: 4, unit: "pcs", category: "Produce" },
      { name: "spring onion", quantity: 1, unit: "pcs", category: "Produce" }
    ]
  },
  {
    id: "r3",
    title: "Silky Steamed Egg",
    cuisine: "Chinese",
    protein: "egg",
    source: "Sheet freeform export",
    notes: "Comforting lunch anchor with almost no shopping risk.",
    ingredients: [
      { name: "eggs", quantity: 4, unit: "pcs", category: "Protein" },
      { name: "water", quantity: 300, unit: "ml", category: "Pantry" },
      { name: "spring onion", quantity: 1, unit: "pcs", category: "Produce", optional: true }
    ]
  },
  {
    id: "r4",
    title: "Garlic Bok Choy Stir-Fry",
    cuisine: "Chinese",
    protein: "vegetable",
    source: "The Woks of Life inspired",
    notes: "Helps use garlic and oyster sauce before greens go limp.",
    ingredients: [
      { name: "bok choy", quantity: 400, unit: "g", category: "Produce" },
      { name: "garlic", quantity: 4, unit: "pcs", category: "Produce" },
      { name: "oyster sauce", quantity: 1, unit: "tbsp", category: "Pantry" }
    ]
  },
  {
    id: "r5",
    title: "Napa Cabbage and Pork Stir-Fry",
    cuisine: "Chinese",
    protein: "pork",
    source: "The Woks of Life inspired",
    notes: "Strong overlap play because cabbage, garlic, and sauces get reused.",
    ingredients: [
      { name: "napa cabbage", quantity: 500, unit: "g", category: "Produce" },
      { name: "pork belly", quantity: 250, unit: "g", category: "Protein" },
      { name: "garlic", quantity: 3, unit: "pcs", category: "Produce" },
      { name: "light soy sauce", quantity: 1.5, unit: "tbsp", category: "Pantry" }
    ]
  },
  {
    id: "r6",
    title: "Miso Salmon with Mushrooms",
    cuisine: "Japanese",
    protein: "salmon",
    source: "Household favorite",
    notes: "Great Japanese rotation once miso is worth keeping around.",
    ingredients: [
      { name: "salmon fillet", quantity: 2, unit: "pcs", category: "Protein" },
      { name: "shiitake mushroom", quantity: 200, unit: "g", category: "Produce" },
      { name: "miso paste", quantity: 1.5, unit: "tbsp", category: "Pantry" },
      { name: "mirin", quantity: 1, unit: "tbsp", category: "Pantry" }
    ]
  },
  {
    id: "r7",
    title: "Chicken Yaki Udon",
    cuisine: "Japanese",
    protein: "chicken",
    source: "Household favorite",
    notes: "Useful when cabbage and sauce ingredients already overlap with the week.",
    ingredients: [
      { name: "udon", quantity: 2, unit: "pack", category: "Pantry" },
      { name: "chicken thigh", quantity: 250, unit: "g", category: "Protein" },
      { name: "napa cabbage", quantity: 250, unit: "g", category: "Produce" },
      { name: "oyster sauce", quantity: 1, unit: "tbsp", category: "Pantry" }
    ]
  },
  {
    id: "r8",
    title: "Japanese Chicken Curry",
    cuisine: "Japanese",
    protein: "chicken",
    source: "Household favorite",
    notes: "Good variety bump, but niche if curry roux only appears once.",
    ingredients: [
      { name: "chicken thigh", quantity: 300, unit: "g", category: "Protein" },
      { name: "potato", quantity: 2, unit: "pcs", category: "Produce" },
      { name: "carrot", quantity: 1, unit: "pcs", category: "Produce" },
      { name: "onion", quantity: 1, unit: "pcs", category: "Produce" },
      { name: "japanese curry roux", quantity: 0.5, unit: "pack", category: "Pantry" }
    ]
  }
];

function futureIso(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

function dayLabel(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return new Intl.DateTimeFormat("en-SG", { weekday: "short", month: "short", day: "numeric" }).format(d);
}

function emptyPlan() {
  return Array.from({ length: 7 }, (_, index) => ({
    label: dayLabel(index),
    date: futureIso(index),
    lunchRecipeId: index === 0 ? "r3" : null,
    dinnerRecipeId: null,
    lunchCooked: false,
    dinnerCooked: false
  }));
}

function defaultState() {
  return {
    household: {
      members: 2,
      primaryCuisine: "Chinese",
      secondaryCuisine: "Japanese",
      spiceLevel: "Medium",
      goal: "Maximise recipe variety without buying one-off niche ingredients.",
      staples: ["light soy sauce", "soy sauce", "sesame oil", "oyster sauce", "garlic", "eggs", "rice"]
    },
    inventory: [
      { id: "i1", name: "eggs", quantity: 8, unit: "pcs", category: "Protein", location: "fridge", expiry: futureIso(5) },
      { id: "i2", name: "light soy sauce", quantity: 8, unit: "tbsp", category: "Pantry", location: "pantry", expiry: futureIso(90) },
      { id: "i3", name: "oyster sauce", quantity: 4, unit: "tbsp", category: "Pantry", location: "pantry", expiry: futureIso(120) },
      { id: "i4", name: "garlic", quantity: 12, unit: "pcs", category: "Produce", location: "pantry", expiry: futureIso(15) },
      { id: "i5", name: "spring onion", quantity: 4, unit: "pcs", category: "Produce", location: "fridge", expiry: futureIso(3) },
      { id: "i6", name: "napa cabbage", quantity: 550, unit: "g", category: "Produce", location: "fridge", expiry: futureIso(2) },
      { id: "i7", name: "firm tofu", quantity: 1, unit: "pack", category: "Protein", location: "fridge", expiry: futureIso(2) },
      { id: "i8", name: "chicken thigh", quantity: 300, unit: "g", category: "Protein", location: "freezer", expiry: futureIso(18) },
      { id: "i9", name: "tomato", quantity: 3, unit: "pcs", category: "Produce", location: "fridge", expiry: futureIso(3) },
      { id: "i10", name: "udon", quantity: 1, unit: "pack", category: "Pantry", location: "freezer", expiry: futureIso(30) }
    ],
    recipes: JSON.parse(JSON.stringify(seedRecipes)),
    mealPlan: emptyPlan(),
    purchases: {},
    transactions: [
      {
        id: "t1",
        createdAt: new Date().toISOString(),
        title: "Seeded demo",
        detail: "Loaded household preferences, recipe library, and a fridge/pantry starting point."
      }
    ]
  };
}

let state = loadState();
let groceryItems = [];

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return defaultState();
  try {
    return { ...defaultState(), ...JSON.parse(raw) };
  } catch {
    return defaultState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function norm(value) {
  return String(value || "").trim().toLowerCase();
}

function titleCase(value) {
  return String(value || "")
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(" ");
}

function daysLeft(iso) {
  const a = new Date(iso);
  const b = new Date();
  a.setHours(0, 0, 0, 0);
  b.setHours(0, 0, 0, 0);
  return Math.round((a - b) / 86400000);
}

function inventoryMatch(name, unit) {
  return state.inventory.find((item) => norm(item.name) === norm(name) && item.unit === unit);
}

function recipeById(id) {
  return state.recipes.find((recipe) => recipe.id === id);
}

function ingredientFrequency() {
  const map = new Map();
  state.recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      const key = norm(ingredient.name);
      map.set(key, (map.get(key) || 0) + 1);
    });
  });
  return map;
}

function usedRecipeIds(excludeKey) {
  const ids = [];
  state.mealPlan.forEach((day, index) => {
    SLOT_TYPES.forEach((slot) => {
      if (`${index}-${slot}` === excludeKey) return;
      const id = day[`${slot}RecipeId`];
      if (id) ids.push(id);
    });
  });
  return ids;
}

function scoreRecipe(recipe, context = {}) {
  const slot = context.slot || "dinner";
  const dayIndex = context.dayIndex || 0;
  const freq = ingredientFrequency();
  const scheduled = usedRecipeIds(context.excludeKey);
  const scheduledRecipes = scheduled.map(recipeById).filter(Boolean);
  const proteins = scheduledRecipes.map((item) => item.protein);
  const ingredientSet = new Set(scheduledRecipes.flatMap((item) => item.ingredients.map((ing) => norm(ing.name))));

  let score = 0;
  let rarePenalty = 0;
  const reasons = [];

  if (recipe.cuisine === state.household.primaryCuisine) {
    score += 20;
    reasons.push("matches Chinese-first preference");
  } else if (recipe.cuisine === state.household.secondaryCuisine) {
    score += 12;
    reasons.push("adds Japanese rotation");
  }

  let overlap = 0;
  let stocked = 0;
  let expiryBoost = 0;

  recipe.ingredients.forEach((ingredient) => {
    const key = norm(ingredient.name);
    if (ingredientSet.has(key)) overlap += 1;
    const stock = inventoryMatch(ingredient.name, ingredient.unit);
    if (stock && stock.quantity >= ingredient.quantity) stocked += 1;
    if (stock && daysLeft(stock.expiry) <= 3) expiryBoost += 1;
    if (!stock && !state.household.staples.includes(key) && (freq.get(key) || 0) <= 1 && !ingredient.optional) {
      rarePenalty += 8;
    }
  });

  if (overlap) {
    score += overlap * 4;
    reasons.push(`reuses ${overlap} ingredient${overlap > 1 ? "s" : ""}`);
  }

  if (stocked) {
    score += stocked * 5;
    reasons.push(`uses ${stocked} stocked item${stocked > 1 ? "s" : ""}`);
  }

  if (expiryBoost) {
    score += Math.min(15, expiryBoost * 5);
    reasons.push("helps use near-expiry ingredients");
  }

  if (proteins.includes(recipe.protein)) {
    score -= 8;
  } else {
    score += 4;
  }

  if (slot === "lunch") {
    const previousDinner = dayIndex > 0 ? state.mealPlan[dayIndex - 1].dinnerRecipeId : null;
    if (previousDinner === recipe.id) score += 10;
  }

  score -= rarePenalty;
  if (rarePenalty) reasons.push("penalised for one-off ingredients");

  return { recipe, score, rarePenalty, reasons: reasons.slice(0, 3) };
}

function topRecipes(limit = 6) {
  return state.recipes
    .map((recipe) => scoreRecipe(recipe))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

function addTransaction(title, detail) {
  state.transactions.unshift({
    id: `t-${Date.now()}`,
    createdAt: new Date().toISOString(),
    title,
    detail
  });
  state.transactions = state.transactions.slice(0, 16);
}

function autoPlanWeek() {
  const plan = emptyPlan();
  state.mealPlan = plan;
  for (let i = 0; i < plan.length; i += 1) {
    const dinner = state.recipes
      .map((recipe) => scoreRecipe(recipe, { dayIndex: i, slot: "dinner", excludeKey: `${i}-dinner` }))
      .sort((a, b) => b.score - a.score)[0];
    plan[i].dinnerRecipeId = dinner ? dinner.recipe.id : null;
  }
  for (let i = 0; i < plan.length; i += 1) {
    plan[i].lunchRecipeId = i > 0 ? plan[i - 1].dinnerRecipeId : "r3";
  }
  addTransaction("Auto-plan refreshed", "Rebuilt the calendar using variety, overlap, and one-off ingredient penalties.");
  persistAndRender();
}

function assignNextDinner(recipeId) {
  const open = state.mealPlan.find((day) => !day.dinnerRecipeId);
  if (open) open.dinnerRecipeId = recipeId;
  addTransaction("Meal planned", `Added ${recipeById(recipeId)?.title || "a recipe"} to the next open dinner slot.`);
  persistAndRender();
}

function plannedMeals() {
  const result = [];
  state.mealPlan.forEach((day, dayIndex) => {
    SLOT_TYPES.forEach((slot) => {
      const recipe = recipeById(day[`${slot}RecipeId`]);
      if (recipe) result.push({ dayIndex, slot, recipe });
    });
  });
  return result;
}

function buildGroceries() {
  const required = new Map();
  plannedMeals().forEach(({ recipe }) => {
    recipe.ingredients.forEach((ingredient) => {
      if (ingredient.optional) return;
      const key = `${norm(ingredient.name)}::${ingredient.unit}`;
      const current = required.get(key) || {
        key,
        name: norm(ingredient.name),
        displayName: titleCase(ingredient.name),
        unit: ingredient.unit,
        category: ingredient.category || "Pantry",
        required: 0
      };
      current.required += ingredient.quantity;
      required.set(key, current);
    });
  });

  groceryItems = Array.from(required.values())
    .map((item) => {
      const stock = inventoryMatch(item.name, item.unit);
      const owned = stock ? stock.quantity : 0;
      const missing = Math.max(0, Number((item.required - owned).toFixed(2)));
      return { ...item, owned, missing, product: products[item.name] || null };
    })
    .filter((item) => item.missing > 0);

  return groceryItems;
}

function applyPurchases() {
  const purchased = groceryItems.filter((item) => state.purchases[item.key]);
  if (!purchased.length) {
    addTransaction("No purchases applied", "Nothing was marked purchased yet.");
    persistAndRender();
    return;
  }
  purchased.forEach((item) => {
    const existing = inventoryMatch(item.name, item.unit);
    if (existing) {
      existing.quantity += item.missing;
    } else {
      state.inventory.push({
        id: `i-${Date.now()}-${item.name}`,
        name: item.name,
        quantity: item.missing,
        unit: item.unit,
        category: item.category,
        location: item.category === "Protein" ? "fridge" : "pantry",
        expiry: futureIso(item.category === "Produce" ? 4 : 20)
      });
    }
  });
  state.purchases = {};
  addTransaction("Purchases applied", `Added ${purchased.length} grocery item${purchased.length > 1 ? "s" : ""} into inventory.`);
  persistAndRender();
}

function markCooked(dayIndex, slot) {
  const day = state.mealPlan[dayIndex];
  const recipe = recipeById(day[`${slot}RecipeId`]);
  if (!recipe) return;
  recipe.ingredients.forEach((ingredient) => {
    const stock = inventoryMatch(ingredient.name, ingredient.unit);
    if (stock) stock.quantity = Math.max(0, Number((stock.quantity - ingredient.quantity).toFixed(2)));
  });
  day[`${slot}Cooked`] = true;
  addTransaction("Meal cooked", `${recipe.title} marked cooked for ${day.label} ${slot}.`);
  persistAndRender();
}

function coverageStats() {
  const groceries = buildGroceries();
  const plannedLines = plannedMeals().reduce((sum, meal) => sum + meal.recipe.ingredients.filter((ing) => !ing.optional).length, 0);
  const covered = Math.max(0, plannedLines - groceries.length);
  const percent = plannedLines ? Math.round((covered / plannedLines) * 100) : 100;
  return { groceries, plannedLines, covered, percent };
}

function persistAndRender() {
  saveState();
  render();
}

function renderSummary() {
  const stats = coverageStats();
  const cost = stats.groceries.reduce((sum, item) => sum + (item.product ? item.product.price : 0), 0);
  document.getElementById("goal-copy").textContent = "Variety first, niche buys down";
  document.getElementById("goal-detail").textContent = `${state.household.members} people · ${state.household.primaryCuisine} with ${state.household.secondaryCuisine} mixed in`;
  document.getElementById("coverage-copy").textContent = `${stats.percent}% covered`;
  document.getElementById("coverage-detail").textContent = `${stats.covered} planned ingredient lines already in stock`;
  document.getElementById("shopping-copy").textContent = `${stats.groceries.length} items missing`;
  document.getElementById("shopping-detail").textContent = stats.groceries.length ? `Approx. S$${cost.toFixed(2)} visible from FairPrice-style matches` : "No fresh shopping needed right now";
  document.getElementById("event-copy").textContent = state.transactions[0]?.title || "No activity";
  document.getElementById("event-detail").textContent = state.transactions[0]?.detail || "";
}

function renderHousehold() {
  const pills = [
    `${state.household.primaryCuisine} primary`,
    `${state.household.secondaryCuisine} rotation`,
    `${state.household.members} servings`,
    `${state.household.spiceLevel} spice`,
    "Shared login MVP"
  ];
  document.getElementById("profile-pills").innerHTML = pills.map((pill) => `<span class="pill">${pill}</span>`).join("");
  document.getElementById("staple-pills").innerHTML = state.household.staples.map((item) => `<span class="pill staple">${titleCase(item)}</span>`).join("");
  document.getElementById("strategy-copy").textContent =
    "Recipes score higher when they reuse overlapping sauces, proteins, and vegetables already in rotation, and score lower when they force a one-off specialty purchase.";
}

function renderInventory() {
  const list = document.getElementById("inventory-list");
  const items = [...state.inventory].sort((a, b) => daysLeft(a.expiry) - daysLeft(b.expiry));
  document.getElementById("inventory-count").textContent = `${items.length} items`;
  if (!items.length) {
    list.innerHTML = `<div class="empty-state">No inventory yet.</div>`;
    return;
  }
  list.innerHTML = items.map((item) => `
    <article class="inventory-item">
      <header>
        <div>
          <strong>${titleCase(item.name)}</strong>
          <p class="meta">${item.quantity} ${item.unit} · ${titleCase(item.location)} · ${item.category}</p>
        </div>
        <span class="badge">${daysLeft(item.expiry)}d</span>
      </header>
      <div class="inventory-actions">
        <button class="mini-btn" type="button" data-action="adjust-inventory" data-id="${item.id}" data-delta="-1">-1</button>
        <button class="mini-btn" type="button" data-action="adjust-inventory" data-id="${item.id}" data-delta="1">+1</button>
      </div>
    </article>
  `).join("");
}

function renderRecipes() {
  const ranked = topRecipes();
  document.getElementById("recipe-count").textContent = `${state.recipes.length} recipes`;
  document.getElementById("recommendation-note").textContent = ranked.length
    ? `Top pick right now: ${ranked[0].recipe.title} because it ${ranked[0].reasons.join(", ")}.`
    : "Add recipes to generate suggestions.";

  document.getElementById("recipe-grid").innerHTML = ranked.map((item) => `
    <article class="recipe-card">
      <header>
        <div>
          <strong>${item.recipe.title}</strong>
          <p class="meta">${item.recipe.cuisine} · ${titleCase(item.recipe.protein)} · ${item.recipe.source}</p>
        </div>
        <span class="badge">${item.score}</span>
      </header>
      <p>${item.recipe.notes}</p>
      <div class="score-row">
        ${item.reasons.map((reason) => `<span class="score-chip">${reason}</span>`).join("")}
      </div>
      <div class="recipe-actions">
        <button class="mini-btn success" type="button" data-action="next-dinner" data-id="${item.recipe.id}">Use next dinner slot</button>
      </div>
    </article>
  `).join("");
}

function renderPlanner() {
  document.getElementById("planner-grid").innerHTML = state.mealPlan.map((day, dayIndex) => `
    <article class="planner-card">
      <h3>${day.label}</h3>
      ${SLOT_TYPES.map((slot) => {
        const recipe = recipeById(day[`${slot}RecipeId`]);
        const suggestion = state.recipes
          .map((candidate) => scoreRecipe(candidate, { dayIndex, slot, excludeKey: `${dayIndex}-${slot}` }))
          .sort((a, b) => b.score - a.score)[0];
        return `
          <div class="planner-slot">
            <header>
              <strong>${slot === "lunch" ? "Lunch" : "Dinner"}</strong>
              <span class="badge">${day[`${slot}Cooked`] ? "Cooked" : "Planned"}</span>
            </header>
            <label>
              Select recipe
              <select data-action="select-slot" data-day="${dayIndex}" data-slot="${slot}">
                <option value="">Keep empty</option>
                ${state.recipes.map((item) => `<option value="${item.id}" ${item.id === day[`${slot}RecipeId`] ? "selected" : ""}>${item.title}</option>`).join("")}
              </select>
            </label>
            <p class="slot-note">${recipe ? `${recipe.cuisine} · ${titleCase(recipe.protein)}` : `Best fit now: ${suggestion.recipe.title}`}</p>
            <div class="slot-actions">
              ${recipe
                ? `<button class="mini-btn success" type="button" data-action="cook-slot" data-day="${dayIndex}" data-slot="${slot}">Mark cooked</button>`
                : `<button class="mini-btn warn" type="button" data-action="suggest-slot" data-day="${dayIndex}" data-slot="${slot}" data-id="${suggestion.recipe.id}">Use ${suggestion.recipe.title}</button>`
              }
            </div>
          </div>
        `;
      }).join("")}
    </article>
  `).join("");
}

function renderGroceries() {
  const items = buildGroceries();
  const summary = document.getElementById("grocery-summary");
  const groups = document.getElementById("grocery-groups");
  if (!items.length) {
    summary.textContent = "Current meal plan is fully covered by inventory and staples.";
    groups.innerHTML = `<div class="empty-state">No missing items right now.</div>`;
    return;
  }
  const grouped = items.reduce((acc, item) => {
    const key = item.category || "Other";
    acc[key] = acc[key] || [];
    acc[key].push(item);
    return acc;
  }, {});
  const saleCount = items.filter((item) => item.product?.sale).length;
  summary.textContent = `${items.length} missing items across the week, with ${saleCount} sale-friendly match${saleCount === 1 ? "" : "es"}.`;
  groups.innerHTML = Object.entries(grouped).map(([category, list]) => `
    <section class="grocery-group">
      <h3>${category}</h3>
      ${list.map((item) => `
        <article class="grocery-card">
          <header>
            <div>
              <strong>${item.displayName}</strong>
              <p class="meta">Need ${item.missing} ${item.unit} · Have ${item.owned} ${item.unit}</p>
            </div>
            <span class="badge">${item.product ? "Matched" : "Pending"}</span>
          </header>
          <p>${item.product ? `${item.product.title} · S$${item.product.price.toFixed(2)} · ${item.product.availability}` : "No store match yet."}</p>
          <div class="status-line">
            ${item.product ? '<span class="status-pill match">FairPrice candidate</span>' : '<span class="status-pill pending">Manual confirm</span>'}
            ${item.product?.sale ? '<span class="status-pill sale">On sale</span>' : ""}
          </div>
          <div class="grocery-actions">
            <button class="mini-btn ${state.purchases[item.key] ? "success" : ""}" type="button" data-action="toggle-purchase" data-key="${item.key}">
              ${state.purchases[item.key] ? "Purchased" : "Mark purchased"}
            </button>
          </div>
        </article>
      `).join("")}
    </section>
  `).join("");
}

function renderActivity() {
  const feed = document.getElementById("activity-feed");
  feed.innerHTML = state.transactions.map((entry) => `
    <article class="feed-item">
      <time>${new Intl.DateTimeFormat("en-SG", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(entry.createdAt))}</time>
      <strong>${entry.title}</strong>
      <p>${entry.detail}</p>
    </article>
  `).join("");
}

function render() {
  renderSummary();
  renderHousehold();
  renderInventory();
  renderRecipes();
  renderPlanner();
  renderGroceries();
  renderActivity();
}

document.getElementById("inventory-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  state.inventory.push({
    id: `i-${Date.now()}`,
    name: norm(data.get("name")),
    quantity: Number(data.get("quantity")),
    unit: String(data.get("unit")),
    location: String(data.get("location")),
    expiry: futureIso(Number(data.get("expiry"))),
    category: "Pantry"
  });
  addTransaction("Inventory updated", `Added ${data.get("name")} into tracked stock.`);
  event.currentTarget.reset();
  persistAndRender();
});

document.getElementById("recipe-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const ingredients = String(data.get("ingredients") || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name, quantity, unit, category] = line.split("|").map((part) => part.trim());
      return { name: norm(name), quantity: Number(quantity || 1), unit: unit || "pcs", category: category || "Pantry" };
    });
  state.recipes.unshift({
    id: `r-${Date.now()}`,
    title: String(data.get("title")),
    cuisine: String(data.get("cuisine")),
    protein: norm(data.get("protein") || "vegetable"),
    source: "Household manual",
    notes: "Added manually from the MVP recipe form.",
    ingredients
  });
  addTransaction("Recipe saved", `${data.get("title")} added to the library.`);
  event.currentTarget.reset();
  persistAndRender();
});

document.getElementById("auto-plan-btn").addEventListener("click", autoPlanWeek);
document.getElementById("refresh-grocery-btn").addEventListener("click", () => {
  addTransaction("Grocery list refreshed", "Recomputed the grocery list from the latest meal plan and inventory.");
  persistAndRender();
});
document.getElementById("apply-purchases-btn").addEventListener("click", applyPurchases);
document.getElementById("reset-btn").addEventListener("click", () => {
  state = defaultState();
  addTransaction("Demo reset", "Reset the planner back to the seeded household demo state.");
  persistAndRender();
});

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button) return;
  const action = button.dataset.action;

  if (action === "adjust-inventory") {
    const item = state.inventory.find((entry) => entry.id === button.dataset.id);
    if (!item) return;
    item.quantity = Math.max(0, item.quantity + Number(button.dataset.delta));
    addTransaction("Inventory adjusted", `${titleCase(item.name)} changed to ${item.quantity} ${item.unit}.`);
    persistAndRender();
  }

  if (action === "next-dinner") assignNextDinner(button.dataset.id);
  if (action === "cook-slot") markCooked(Number(button.dataset.day), button.dataset.slot);
  if (action === "suggest-slot") {
    state.mealPlan[Number(button.dataset.day)][`${button.dataset.slot}RecipeId`] = button.dataset.id;
    addTransaction("Suggested meal accepted", `${recipeById(button.dataset.id)?.title || "Recipe"} added to the planner.`);
    persistAndRender();
  }
  if (action === "toggle-purchase") {
    const key = button.dataset.key;
    state.purchases[key] = !state.purchases[key];
    persistAndRender();
  }
});

document.addEventListener("change", (event) => {
  const select = event.target.closest("[data-action='select-slot']");
  if (!select) return;
  const day = Number(select.dataset.day);
  const slot = select.dataset.slot;
  state.mealPlan[day][`${slot}RecipeId`] = select.value || null;
  state.mealPlan[day][`${slot}Cooked`] = false;
  addTransaction("Meal slot updated", `${state.mealPlan[day].label} ${slot} changed.`);
  persistAndRender();
});

render();
