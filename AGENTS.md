# Agent Development Guide

## Commands
- **Dev server**: `bin/dev` (runs Rails + Vite via Procfile.dev) → http://localhost:3000
- **Tests**: `bin/rails test` | Single: `bin/rails test test/models/account_test.rb` | Method: `bin/rails test test/models/account_test.rb -n test_method_name`
- **Ruby lint**: `bundle exec rubocop` | Fix: `bundle exec rubocop -A`
- **JS/TS lint**: `bunx biome check .` | Fix: `bunx biome check --write .`
- **Typecheck**: `bun run check`
- **Generate TS types**: `bin/rails typelizer:generate` (run when serializers change)

## Architecture
- **Framework**: Rails 8.1 + Inertia.js + React 19 + TypeScript
- **Database**: PostgreSQL (primary) + Solid Queue/Cache/Cable
- **Auth**: Rodauth (see `app/misc/rodauth_*.rb`)
- **Frontend**: Vite + Tailwind v4 + RetroUI + shadcn/ui (Radix) + Lexical editor
- **UI Components**: RetroUI (`app/javascript/components/retroui/`) — docs: https://www.retroui.dev/docs
- **Serializers**: Alba (app/serializers/) → Typelizer generates TS types in `app/javascript/types/serializers/`

## Code Style
- **Ruby**: Shopify style (rubocop-shopify), frozen_string_literal, Ruby 3.4
- **TypeScript**: Biome (tabs, double quotes), organize imports automatically
- **Components**: shadcn/ui patterns in `app/javascript/components/ui/`
- **Pages**: Inertia pages in `app/javascript/pages/`, controllers render via `inertia:`

## Inertia Rails Patterns

### Controller Responses
```ruby
# Render Inertia page with props
render inertia: { lists: ListSerializer.new(lists) }

# Redirect after successful form submission (standard pattern)
redirect_to lists_url

# Redirect with validation errors
redirect_to new_list_url, inertia: { errors: list.errors }
```

### Shared Data
Controllers should inherit from `InertiaController` to get shared data automatically:

```ruby
class Garage::ListsController < InertiaController
  # Automatically has access to shared props: flash, auth
end
```

Shared data is defined in `app/serializers/shared_props_serializer.rb`:
- `flash` - Flash messages (errors, notices, etc.)
- `auth` - Current user/session info from `Current`

To add new shared data, update `SharedPropsSerializer`.

### Forms (React)
Two options: `<Form>` component (simpler) or `useForm` hook (programmatic control).

**Option 1: Form Component** (recommended for simple forms)
```tsx
import { Form } from "@inertiajs/react"

<Form action="/lists" method="post">
  <input name="name" defaultValue="" />
  <button type="submit">Create</button>
</Form>
```

**Option 2: useForm Hook** (for programmatic control)
```tsx
import { useForm } from "@inertiajs/react"

const { data, setData, post, processing, errors } = useForm({
  name: "",
  description: "",
})

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  post("/lists")
}
```

### Key useForm Properties
- `data` - form data object
- `setData(key, value)` - update field
- `post/get/put/patch/delete(url)` - submit methods
- `processing` - boolean, true during submission
- `errors` - validation errors object
- `reset()` - reset to defaults
- `isDirty` - boolean, true if changed
- `clearErrors()` - clear validation errors
