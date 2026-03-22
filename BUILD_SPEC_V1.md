# Asian Smart Meals Planner V1 Build Spec

## 1. Product Summary

`asian-smart-meals-planner` is a full-stack web app for a two-person household that plans Chinese-first meals with some Japanese dishes, compares recipe requirements against current home inventory, generates a grocery list, enriches that list with FairPrice product matches, adapts the plan based on what was actually purchased, and updates inventory after cooking.

V1 is optimized for:

- one shared household login
- weekly calendar meal planning
- maximizing recipe variety
- avoiding niche one-off ingredient purchases
- using curated recipe sources before AI-generated recipes

## 2. Primary Goals

- Help the household decide what to cook for the week.
- Reuse existing pantry, fridge, and freezer inventory whenever possible.
- Generate a trustworthy grocery list from the meal plan.
- Reduce purchases of rarely reused ingredients.
- Keep inventory reasonably accurate with lightweight user confirmation.

## 3. Non-Goals For V1

- multi-household collaboration
- multi-store optimization
- receipt OCR
- automatic image-based pantry recognition
- fully autonomous retailer scraping from multiple sources
- nutrition tracking
- native mobile apps

## 4. Source Inputs

### Recipe Sources

- Household Google Sheet export, provided as zip with HTML tabs
- [The Woks of Life](https://thewoksoflife.com/)
- manual household recipes entered in-app
- AI-generated recipes as fallback only

### Grocery Source

- [FairPrice](https://www.fairprice.com.sg/)

### Source Ingestion Notes

The provided zip is readable and appears to contain both:

- structured tabular recipe/meal-planning data
- freeform recipe text blocks

Importer design should support both formats:

- table parser for row-based records
- freeform parser for recipe text split into title, servings, ingredients, instructions

## 5. Core Product Principles

- Canonical ingredients drive planning, not store SKUs.
- Recipe source provenance is always visible.
- AI recipes are clearly labeled and never mixed invisibly with trusted recipes.
- Store matches are advisory until user-confirmed.
- Inventory is editable and forgiving, not treated as perfectly accurate.
- Variety is favored, but penalized when a dish requires niche ingredients with low reuse potential.

## 6. User Personas

### Primary Persona

- Shared household of two: user and spouse
- cooks mostly Chinese food with some Japanese meals
- wants weekly planning, lower waste, and smarter shopping

## 7. Success Metrics

- user can create a weekly meal plan in under 10 minutes
- grocery list reflects missing items with minimal manual corrections
- at least 80 percent of selected meals can be generated from trusted sources
- inventory updates after cooking take under 1 minute per meal
- planner reduces one-off ingredient purchases through reuse suggestions

## 8. V1 Feature Scope

### 8.1 Authentication

- One shared login for the household
- email/password auth is sufficient for V1

### 8.2 Onboarding

- household name
- default servings: 2
- cuisine preferences: Chinese primary, Japanese secondary
- disliked ingredients
- allergies and restrictions
- spice preference
- budget sensitivity
- pantry staples list

### 8.3 Inventory Management

- add/edit/delete inventory items
- storage location: pantry, fridge, freezer
- quantity and unit
- expiry or freshness date
- staple flag
- quick adjust controls

### 8.4 Recipe Library

- import recipes from household sheet export
- save curated recipes from external sources
- add household recipes manually
- AI-generated fallback recipes
- tags: cuisine, protein, meal type, difficulty, prep time
- reuse score for special ingredients

### 8.5 Weekly Meal Planner

- weekly calendar view
- drag/drop optional later; simple slot assignment is enough for V1
- lunch/dinner slots initially, breakfast optional and out of scope by default
- per-meal servings
- recipe replacement suggestions

### 8.6 Grocery List

- generate missing ingredients from meal plan
- aggregate overlapping ingredients across recipes
- subtract available inventory
- mark staple items differently
- enrich with FairPrice product candidates where available

### 8.7 Shopping Reconciliation

- mark purchased items
- adjust quantities bought
- accept substitute product
- flag unavailable items
- trigger meal replanning if critical items remain unpurchased

### 8.8 Cooking And Inventory Deduction

- mark meal as cooked
- deduct ingredient quantities
- allow manual override on actual usage
- create transaction history

## 9. Prioritization Logic

The planner should rank recipes using a weighted score:

- cuisine fit
- recipe variety across the week
- ingredient overlap with other planned meals
- current inventory fit
- perishables usage
- effort/prep time fit
- ingredient reuse potential
- penalty for niche ingredients likely used in only one dish

Example penalty candidates:

- uncommon sauce or spice used in one recipe only
- single-use produce with no overlap elsewhere in the week
- specialty Japanese/Chinese item not marked as pantry staple

## 10. User Flows

### Flow A: First-Time Setup

1. User signs in with shared household login.
2. User completes onboarding preferences.
3. User adds pantry staples and a first inventory snapshot.
4. User imports or reviews recipe library seed data.
5. App lands on weekly planner.

### Flow B: Plan The Week

1. User opens weekly planner.
2. App suggests recipes based on preferences and inventory.
3. User assigns meals into weekly calendar.
4. App recalculates shared ingredient usage and grocery needs in real time.
5. User finalizes plan.

### Flow C: Generate Grocery List

1. User clicks generate grocery list.
2. App scales recipe ingredients to selected servings.
3. App compares required ingredients against current inventory.
4. App groups missing items and staple top-ups.
5. App fetches or reuses FairPrice product candidates.
6. User reviews list and confirms.

### Flow D: Reconcile Purchases

1. User marks what was purchased.
2. User adjusts quantities or substitutions where needed.
3. App updates inventory additions.
4. App flags impacted meals if key ingredients were not obtained.
5. App suggests replacements if needed.

### Flow E: Cook A Meal

1. User opens planned meal.
2. User marks meal as cooked.
3. App deducts expected ingredients from inventory.
4. User optionally edits actual usage.
5. App stores inventory transactions.

## 11. Information Architecture

### Main Screens

- `/`
  Dashboard with this week, low stock, expiring items, quick actions

- `/onboarding`
  Shared household setup

- `/inventory`
  Inventory list and quick updates

- `/recipes`
  Search, filter, import, source labels

- `/planner`
  Weekly calendar planner

- `/grocery-list`
  Generated grocery list with FairPrice candidates

- `/shopping`
  Purchase reconciliation flow

- `/meal/[id]`
  Meal detail and cook action

- `/admin/import`
  Source import tools and ingredient normalization review

## 12. Technical Architecture

### Recommended Stack

- `Next.js` for full-stack web app
- `TypeScript`
- `PostgreSQL`
- `Prisma` ORM
- `Supabase Auth` for shared email/password login
- scheduled jobs later via Vercel cron or equivalent

### App Layers

- UI layer
  Planner, inventory, grocery, recipes

- domain layer
  meal planning logic, ingredient normalization, grocery computation

- integration layer
  recipe importers, FairPrice provider adapter

- persistence layer
  PostgreSQL with normalized schema

## 13. Domain Model

### Tables

#### `households`

- `id`
- `name`
- `timezone`
- `default_servings`
- `created_at`
- `updated_at`

#### `users`

- `id`
- `household_id`
- `email`
- `display_name`
- `role`
- `created_at`

#### `preferences`

- `id`
- `household_id`
- `primary_cuisines` JSON
- `secondary_cuisines` JSON
- `disliked_ingredients` JSON
- `allergies` JSON
- `spice_level`
- `budget_sensitivity`
- `planning_goal`

#### `ingredients`

- `id`
- `canonical_name`
- `category`
- `default_unit`
- `is_pantry_staple_candidate`
- `created_at`

#### `ingredient_aliases`

- `id`
- `ingredient_id`
- `alias`
- `source`

#### `inventory_items`

- `id`
- `household_id`
- `ingredient_id`
- `display_name`
- `quantity`
- `unit`
- `location`
- `expiry_date`
- `is_staple`
- `notes`
- `created_at`
- `updated_at`

#### `recipes`

- `id`
- `title`
- `slug`
- `source_type`
- `source_name`
- `source_url`
- `source_confidence`
- `cuisine`
- `meal_type`
- `default_servings`
- `prep_time_minutes`
- `cook_time_minutes`
- `difficulty`
- `instructions_markdown`
- `is_ai_generated`
- `is_household_favorite`
- `created_at`
- `updated_at`

#### `recipe_ingredients`

- `id`
- `recipe_id`
- `ingredient_id`
- `raw_ingredient_text`
- `quantity`
- `unit`
- `preparation_note`
- `is_optional`

#### `recipe_tags`

- `id`
- `recipe_id`
- `tag`

#### `meal_plans`

- `id`
- `household_id`
- `week_start_date`
- `status`
- `created_at`
- `updated_at`

#### `meal_plan_items`

- `id`
- `meal_plan_id`
- `date`
- `slot`
- `recipe_id`
- `servings`
- `status`
- `notes`

#### `grocery_lists`

- `id`
- `meal_plan_id`
- `status`
- `generated_at`

#### `grocery_list_items`

- `id`
- `grocery_list_id`
- `ingredient_id`
- `display_name`
- `required_quantity`
- `required_unit`
- `owned_quantity`
- `owned_unit`
- `missing_quantity`
- `priority`
- `is_staple_top_up`
- `match_status`

#### `provider_products`

- `id`
- `provider`
- `provider_product_id`
- `name`
- `brand`
- `size_text`
- `price`
- `currency`
- `availability_status`
- `product_url`
- `last_seen_at`

#### `provider_matches`

- `id`
- `provider`
- `ingredient_id`
- `provider_product_id`
- `match_score`
- `is_user_confirmed`
- `notes`

#### `purchases`

- `id`
- `grocery_list_id`
- `provider`
- `purchased_at`
- `notes`

#### `purchase_items`

- `id`
- `purchase_id`
- `ingredient_id`
- `provider_product_id`
- `quantity`
- `unit`
- `price_paid`
- `was_substitution`

#### `inventory_transactions`

- `id`
- `household_id`
- `ingredient_id`
- `inventory_item_id`
- `transaction_type`
- `quantity_delta`
- `unit`
- `reference_type`
- `reference_id`
- `notes`
- `created_at`

## 14. API Surface

### Auth

- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/session`

### Preferences

- `GET /api/preferences`
- `PUT /api/preferences`

### Inventory

- `GET /api/inventory`
- `POST /api/inventory`
- `PUT /api/inventory/:id`
- `DELETE /api/inventory/:id`
- `POST /api/inventory/bulk-adjust`

### Recipes

- `GET /api/recipes`
- `GET /api/recipes/:id`
- `POST /api/recipes`
- `PUT /api/recipes/:id`
- `POST /api/recipes/import/sheet-html`
- `POST /api/recipes/import/url`

### Planner

- `GET /api/meal-plans/current`
- `POST /api/meal-plans`
- `PUT /api/meal-plans/:id`
- `POST /api/meal-plans/:id/generate-suggestions`
- `POST /api/meal-plans/:id/items`
- `PUT /api/meal-plan-items/:id`

### Grocery

- `POST /api/grocery-lists/generate`
- `GET /api/grocery-lists/:id`
- `PUT /api/grocery-list-items/:id`
- `POST /api/grocery-lists/:id/enrich/fairprice`

### Shopping

- `POST /api/purchases`
- `POST /api/purchases/:id/reconcile`
- `POST /api/meal-plans/:id/replan-after-purchase`

### Cooking

- `POST /api/meals/:id/mark-cooked`

## 15. Planner Logic Requirements

### Variety Rules

- avoid repeating the same primary protein too frequently in one week
- avoid repeating the same flagship dish in adjacent meal slots
- encourage ingredient overlap without turning the week into near-duplicate meals

### Rare Ingredient Avoidance

Each recipe should compute a `rare_ingredient_penalty` based on:

- ingredients not already in inventory
- ingredients not marked as pantry staples
- ingredients with no expected reuse in the current week
- ingredients with low presence across trusted recipe library

This penalty should reduce ranking but not make a recipe impossible.

### Inventory Fit

Recipes with high use of near-expiry ingredients get a boost.

## 16. Importer Strategy

### Household Sheet Import

Build an importer that accepts exported HTML files from the zip and parses:

- table-based rows into normalized recipe or meal records
- freeform HTML text blocks into recipe records using heuristics:
  - title extraction
  - serving extraction
  - ingredient list extraction
  - instruction extraction

Importer output should first land in a staging area where the user can:

- confirm parsed title
- confirm servings
- map raw ingredients to canonical ingredients
- save as recipe

### Woks Of Life Import

Initial support should be manual URL import plus parser per page. Do not attempt broad crawling in V1.

## 17. FairPrice Integration Strategy

V1 should use a provider adapter abstraction:

- search by ingredient keywords
- return candidate products
- rank candidates by keyword, category, size, and prior confirmations
- cache results
- allow user to confirm best match

Important:

- FairPrice integration must be treated as best-effort
- planner remains functional even if product enrichment fails
- provider adapter should not be tightly coupled to planner core

## 18. UI Requirements

### Dashboard

- current week summary
- quick add inventory
- expiring soon section
- recommended meals
- grocery list status

### Weekly Planner

- 7-day calendar
- lunch and dinner slots
- recipe card suggestions beside or below calendar
- instant grocery impact summary

### Grocery List

- grouped by produce, protein, pantry, frozen, condiments
- FairPrice candidate product panel
- unavailable and uncertain match states
- purchased toggle

### Inventory

- filter by location
- expiry sorting
- low stock badge
- quick quantity adjustments

## 19. V1 Acceptance Criteria

V1 is complete when:

- user can sign in with one shared account
- user can create or update inventory
- user can import or create recipes
- user can create a weekly meal plan on a calendar
- app generates grocery list from the plan
- app subtracts owned inventory from required ingredients
- app attempts FairPrice enrichment for list items
- user can confirm purchased items
- app updates inventory after purchase and after cooking

## 20. Build Plan

### Phase 1: Foundation

- initialize Next.js app
- set up auth, database, ORM
- implement core schema
- build canonical ingredient seed structure

### Phase 2: Core Household Flows

- onboarding
- inventory CRUD
- recipe CRUD
- weekly planner UI

### Phase 3: Grocery Engine

- ingredient scaling
- unit comparison
- inventory subtraction
- grocery list generation

### Phase 4: Provider Enrichment

- FairPrice adapter
- product candidate UI
- confirmed match persistence

### Phase 5: Reconciliation

- purchase flow
- meal adaptation after incomplete shopping
- inventory deduction after cooking

## 21. Testing Strategy

### Unit Tests

- ingredient normalization
- recipe scaling
- grocery generation
- rare ingredient penalty
- inventory deduction

### Integration Tests

- onboarding to first plan
- plan to grocery list
- shopping reconciliation
- mark cooked flow

### Manual QA

- import sample recipes from provided HTML export
- create a week with mixed Chinese and Japanese meals
- verify niche ingredient penalty behavior
- verify FairPrice enrichment failure does not block grocery list generation

## 22. Open Decisions For First Implementation Pass

- whether to support breakfast slots in the initial planner
- exact unit conversion coverage for Chinese cooking measurements
- whether pantry staples are globally seeded or household-defined only
- how much Woks of Life parsing is automated versus manually curated at first

## 23. Recommended First Coding Milestone

The first implementation pass should build:

- shared auth
- database schema
- onboarding
- inventory CRUD
- recipe CRUD
- weekly planner skeleton
- grocery list generation without FairPrice enrichment

This gives a usable end-to-end MVP core before the store adapter is added.
