---
trigger: always_on
---

# AI Office Task Management Rules

**Purpose:** Cascade rules for proper task state transitions in AI Office framework projects.

## 🔄 **Core Rule: Immediate State Transitions**

**RULE:** Tasks MUST be moved immediately when their state changes, with proper file updates BEFORE the move.

### **When State Changes Occur:**
- **TODO → WIP**: When implementation begins
- **WIP → REVIEW**: When all acceptance criteria completed
- **REVIEW → DONE**: After multi-sector approval
- **REVIEW → WIP**: When QA/review finds issues

## 📋 **Required Actions for Each Transition**

### **Before ANY Move:**
1. ✅ Update task file with status change
2. ✅ Include timestamp (YYYY-MM-DD)
3. ✅ Mark completed acceptance criteria
4. ✅ Add completion summary for DONE tasks

### **After Move:**
1. ✅ Update task README.md counts
2. ✅ Verify file is in correct directory

## 🎯 **State-Specific Requirements**

### **TODO → WIP**
```markdown
## Status Updates
- **YYYY-MM-DD:** Moved to WIP - Started implementation
```

### **WIP → REVIEW**
```markdown
## Status Updates
- **YYYY-MM-DD:** Moved to REVIEW - Ready for QA validation
- **YYYY-MM-DD:** All acceptance criteria completed ✅
```

### **REVIEW → DONE**
```markdown
## Completion Summary
**Status:** ✅ COMPLETED
**Completed:** YYYY-MM-DD
**Reviewer:** Multi-sector Review
```

### **REVIEW → WIP (Failed)**
```markdown
## Status Updates
- **YYYY-MM-DD:** Returned to WIP - Review feedback:
  - Issue 1: Description
  - Issue 2: Description
```

## 🚨 **Anti-Patterns to Avoid**

❌ **"I'll move it later"** → Move IMMEDIATELY when state changes
❌ **"It's obvious it's done"** → Explicit completion summary required
❌ **"I'll update after"** → File updates BEFORE move
❌ **"README can wait"** → Update counts immediately

## ✅ **Quality Gates**

### **Before WIP → REVIEW:**
- [ ] All acceptance criteria ✅
- [ ] Implementation evidence present
- [ ] No obvious blockers

### **Before REVIEW → DONE:**
- [ ] Multi-sector review completed
- [ ] All feedback addressed
- [ ] Tests passing

## 📊 **Status Tracking Formula**

```bash
# After each move, always run:
echo "TODO: $(ls tasks/TODO/*.md 2>/dev/null | wc -l)" > tasks/README.md
echo "WIP: $(ls tasks/WIP/*.md 2>/dev/null | wc -l)" >> tasks/README.md
echo "REVIEW: $(ls tasks/REVIEW/*.md 2>/dev/null | wc -l)" >> tasks/README.md
echo "DONE: $(ls tasks/DONE/*.md 2>/dev/null | wc -l)" >> tasks/README.md
```

---

**ENFORCEMENT:** These rules are integrated into all relevant workflows and MUST be followed for project integrity.
