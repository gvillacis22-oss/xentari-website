# Xentari Commands Reference

This document contains reusable commands for common operations. Use these exact phrases to trigger specific workflows.

---

## Pre-Work Requirement

**Before executing any command, Claude must:**

1. Read `README.md` - Understand the operating system
2. Read `docs/playbook.md` - Understand page structure rules
3. Read `docs/commands.md` - Understand available commands

This ensures consistent, system-aware execution.

---

## Navigation Commands

### "Fix navigation using system"

**What it does:**
1. Read `lib/constants.ts` to understand current nav structure
2. Read `components/layout/Header.tsx` to verify it reads from constants
3. Identify any mismatches between nav items and actual routes
4. Fix either the nav config OR create missing routes
5. Verify desktop and mobile nav match
6. Run build to confirm

**Key files:**
- `lib/constants.ts` - Navigation config
- `components/layout/Header.tsx` - Header component
- `app/` folder - Check for existing routes

---

### "Add nav item for [page]"

**What it does:**
1. Verify the route exists in `app/`
2. Add to `navLinks` in `lib/constants.ts`
3. Add to `footerLinks` if appropriate
4. Run build to verify

**Example:**
> "Add nav item for /services/disability-insurance"

---

## Homepage Commands

### "Optimize homepage using playbook"

**What it does:**
1. Read `docs/playbook.md` for homepage structure rules
2. Read current `app/page.tsx`
3. Identify sections that violate playbook rules
4. Remove redundant/long sections
5. Ensure 6 sections max
6. Verify CTA placement
7. Run build

**Homepage should have:**
1. HeroV2
2. TrustBarV2
3. WhoWeHelpV2
4. ServicesGridV2
5. TestimonialsV2
6. CTAV2

---

### "Audit homepage for conversion"

**What it does:**
1. Check if headline is clear within 3 seconds
2. Check if primary CTA is visible without scrolling
3. Check mobile responsiveness
4. Check for duplicate content
5. Report findings with recommendations

---

## Service Page Commands

### "Build service page for [service]"

**What it does:**
1. Read `docs/playbook.md` for service page structure
2. Read existing service page as template (e.g., `app/services/business-benefits/page.tsx`)
3. Create new page following template pattern
4. Add to navigation in `lib/constants.ts`
5. Run build to verify

**Required sections:**
- Hero (icon + title + description + CTA)
- Problem (why this matters)
- Benefits (6 cards)
- Ideal For (list + sidebar)
- CTA
- FinalCTA component

**Example:**
> "Build service page for disability insurance"

---

### "Update service page [service] with [changes]"

**What it does:**
1. Read the specific service page
2. Make requested changes
3. Maintain template consistency
4. Verify CTA placement
5. Run build

---

## Tools Commands

### "Add tool page and connect to navigation"

**What it does:**
1. Create route in `app/[tool-name]/page.tsx`
2. Add to `navLinks.Tools.children` in `lib/constants.ts`
3. Add card to `/tools` landing page
4. Run build to verify

---

### "Add tool: [tool name] at /[route]"

**Example:**
> "Add tool: Budget Planner at /budget-planner"

**What it does:**
1. Create `app/budget-planner/page.tsx` with tool structure
2. Add "Budget Planner" to Tools dropdown in nav
3. Add card to `/tools` page
4. Run build

---

## Design System Commands

### "Apply design system globally"

**What it does:**
1. Search for all card/box components
2. Verify orange border system is applied:
   - `border border-[#FF6B35]/20`
   - `hover:border-[#FF6B35]/40`
   - `transition-all duration-300`
   - `rounded-2xl`
3. Fix any components missing the system
4. Report all changes

---

### "Audit design consistency"

**What it does:**
1. Check all V2 components for border consistency
2. Check color palette usage
3. Check spacing consistency
4. Report any deviations from design system

---

### "Fix borders on [component]"

**Example:**
> "Fix borders on ServicesGridV2"

**What it does:**
1. Read the component
2. Apply orange border system to all cards
3. Verify hover states
4. Run build

---

## Debugging Commands

### "Debug why [feature] is not updating"

**What it does:**
1. Identify which file controls the feature
2. Check if component is imported and rendered
3. Check if using hardcoded values vs constants
4. Check for typos in class names or paths
5. Run build to check for errors
6. Report findings

**Common checks:**
- Is the component actually being used?
- Is nav reading from constants or hardcoded?
- Is the file path correct?
- Does the build pass?

---

### "Debug navigation not showing [item]"

**What it does:**
1. Read `lib/constants.ts` to check if item is in `navLinks`
2. Read `components/layout/Header.tsx` to verify it reads from constants
3. Check if route exists
4. Report findings and fix

---

### "Debug 404 on [route]"

**What it does:**
1. Check if `app/[route]/page.tsx` exists
2. Check if route is in navigation
3. Create page if missing
4. Update nav if needed

---

## Verification Commands

### "Verify all navigation works"

**What it does:**
1. List all items in `navLinks`
2. Check each href has a corresponding route in `app/`
3. Report any broken links
4. Optionally fix

---

### "Run full site audit"

**What it does:**
1. Check navigation consistency
2. Audit homepage structure
3. Check design system compliance
4. Verify all routes exist
5. Run build
6. Report comprehensive findings

---

## Build Commands

### "Build and verify"

**What it does:**
```bash
npm run build
```
Reports any errors and confirms success.

---

### "Start dev server"

**What it does:**
```bash
npm run dev
```
Starts server at http://localhost:3000

---

## Quick Reference

| Command | Purpose |
|---------|---------|
| "Fix navigation using system" | Sync nav with routes |
| "Optimize homepage using playbook" | Clean up homepage |
| "Build service page for [x]" | Create new service page |
| "Add tool page and connect to navigation" | Add new tool |
| "Apply design system globally" | Ensure orange borders |
| "Debug why [x] is not updating" | Troubleshoot issues |
| "Verify all navigation works" | Check for broken links |
| "Run full site audit" | Comprehensive check |

---

## Command Format

When giving commands, you can use:

1. **Exact command**: "Fix navigation using system"
2. **Natural language**: "The nav isn't showing the new page I added"
3. **Specific request**: "Add Health Insurance to the services dropdown"

Claude will interpret the intent and execute the appropriate workflow.
