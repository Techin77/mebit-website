# Website text

Edit the MEBIT website's words here, in Obsidian. One file per page:

| File | What it covers |
|---|---|
| Home | Home page |
| MEBIT Wallet | MEBIT Wallet page, including the text on the sample app screens |
| Bitcoin Collateral | Bitcoin Collateral page and the loan calculator |
| Multisig Set-up | Multisig Set-up page |
| Shared - menu and footer | Top menu, footer and labels used on every page |

## How to edit

```
## heroTitle
TH: การเป็นเจ้าของ<wbr>บิตคอยน์ ที่ทุกคนเข้าใจได้
EN: Bitcoin ownership, made understandable.
```

- Change only the words after `TH:` and `EN:`. Keep each on one line.
- Don't change or delete the `##` headings: they tell the site where the text goes.
  Numbers in a heading count list items from 1 (`pillars › 2 › title` = the second service card's title).
- `<wbr>` is an invisible mark where a long Thai line may break. Keep it, move it, or delete it.
- Deleting a line just brings back the original text from the code; nothing breaks.

## Seeing your changes

- **While the preview runs** (`npm run dev` in `site-v2`, http://127.0.0.1:5174): save the file and the page reloads with the new text.
- **Published artifact:** ask Claude to rebuild and update the v2 artifact; the text is read from these files at build time.
- **This folder is part of the site's git repo** (`site-v2/website-text`), so commit your text edits together with the code.

## Checking the text

`npm run text:check` (in `site-v2`) lists every line where these files differ from the text in code, and warns
about any `##` heading the site doesn't recognize (those lines are ignored). The site always shows the text here;
the code's text is only used when a line is missing. `npm run text:check -- --short` prints just the counts.
`npm run text:export` adds lines for any new text added in code, without touching what you've edited.

## Not in these files

Numbers and links (loan limits, rates, the email address, form links) and three calculator phrases with a number
inside them ("1 เดือน", "15% ต่อปี … วัน", "ลดลง …%") stay in the code.
If the site gains new text, run `npm run text:export` in `site-v2`: it adds the new lines and keeps your edits.
