# Workflow: Quick Action vs Task Decision

## ROLE
Decision orchestrator for user requests.

## GOAL
Determine if a user request should be handled as a formal task (with documentation, tracking, and workflow) or as a quick direct modification. Always ask the user to choose before proceeding.

## TRIGGER
Any user request that could be either:
- A quick modification/fix
- A formal task with documentation

## STEPS
1) **Analyze Request Type**:
   - Is this a quick fix/modification? (e.g., "fix this bug", "add this feature", "disable indexing")
   - Could this benefit from formal task tracking? (e.g., complex features, research tasks, multi-step work)

2) **Present Choice to User**:
   ```
   Ho ricevuto la tua richiesta: [brief description]
   
   Posso procedere in due modi:
   
   🚀 **Modifica Diretta**: Eseguo subito la modifica senza creare task formali
      - Veloce e immediato
      - Nessuna documentazione task
      - Adatto per fix semplici o modifiche minori
   
   📋 **Task Formale**: Creo un task documentato con tracking completo
      - Documentazione formale
      - Tracking stato avanzamento  
      - Adatto per complessi o lavoro importante
   
   Come preferisci procedere?
   ```

3) **Route Based on Choice**:
   - **Modifica Diretta**: Execute immediately using available tools
   - **Task Formale**: Route to `00_router` for formal task creation

## EXAMPLES

**Quick Direct Actions**:
- "disabilita indicizzazione motori di ricerca" → Modifica Diretta
- "fix dark mode bug" → Modifica Diretta  
- "aggiungi meta tag" → Modifica Diretta

**Formal Tasks**:
- "implementa sistema di autenticazione completo" → Task Formale
- "ricerca e analisi comparativa export culturali" → Task Formale
- "sviluppa nuovo framework teorico" → Task Formale

## IMPLEMENTATION NOTES
- Always ask user preference before proceeding
- Use clear emoji and formatting for choice presentation
- Route appropriately based on user decision
- Log the decision in conversation for context
