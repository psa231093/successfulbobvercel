# How to Publish & Manage Blog Posts on Successfulbob.com

> **Your CMS is Sanity Studio** — a private web app where you write and edit content. Once you hit Publish, it goes live on the site automatically. No code, no deploys, no waiting.

---

## Accessing the Studio

Open your browser and go to:

```
https://succesfulbob.sanity.studio
```

Log in with your Sanity account (the email address you used when you signed up). Bookmark this URL — it's your editorial home base.

---

## The Layout at a Glance

When you log in you'll see a sidebar on the left with three sections:

| Section | What it is |
|---|---|
| **Post** | Your blog articles — this is where you'll spend most of your time |
| **Author** | Author profiles (yours is already set up) |
| **Category** | The topic categories shown on the Insights page |

Click any item in the sidebar to open a list of documents. Click a document to edit it. Simple.

---

## Writing a New Blog Post

### 1. Create the document

1. Click **Post** in the left sidebar.
2. Click the **pencil / compose icon** (top right of the list pane) or the **"+ New document"** button.
3. A blank post form opens on the right.

### 2. Fill in the required fields

These two fields are **required** before you can publish:

**Title**
Your article headline. Write it exactly as you want it to appear on the site. Keep it clear and direct — this is also what search engines read first.

**URL Slug**
This auto-generates from your title (e.g., "How to Hire a VP of Sales" becomes `how-to-hire-a-vp-of-sales`). You rarely need to edit it, but you can. Once a post is live, **don't change the slug** — it will break any links that exist to that article.

### 3. Set publication metadata

**Published At**
Pick the date and time you want the post to show as published. You can back-date or forward-date this — it's purely a display timestamp, not a scheduled release mechanism. If you leave it blank, the post won't appear on the site even after you hit Publish.

**Featured Post**
Toggle this **on** for the one article you want pinned to the hero slot on the Insights page. Only one post should be featured at a time — if you feature a second one, you should un-feature the old one.

**Author**
Select your author profile from the dropdown. This is already set up as "Bob Hart."

**Category**
Assign this post to one of your content categories (e.g., GTM Strategy, Sales Leadership, Revenue Operations). If a category you need doesn't exist yet, see [Managing Categories](#managing-categories) below.

**Tags**
Optional free-form labels (e.g., `hiring`, `pipeline`, `enterprise`). Type a tag and press Enter to add it. Tags can be used for filtering later.

### 4. Write the excerpt

The **Excerpt** is the 1–3 sentence summary shown on article cards, in search results, and in social media link previews. Think of it as the hook that makes someone click. Keep it under 300 characters. This is required for good SEO — don't skip it.

### 5. Upload the featured image

Click the **Featured Image** field and drag-and-drop an image file (JPG or PNG, at least 1200×630px for best results across all screen sizes).

After uploading:
- **Alt Text** — fill this in. It's what screen readers say and what Google indexes. Describe what's in the image in plain English (e.g., "Bob Hart speaking at a revenue leadership conference").
- You can drag the **hotspot** dot to set the focal point — this tells the site which part of the image to keep visible when it's cropped to different shapes.

### 6. Write the article body

The **Article Body** is your rich-text editor. It works like a simplified version of Google Docs.

**Text styles available:**
- `Normal` — standard paragraph text
- `H2` — major section heading
- `H3` — sub-section heading
- `H4` — minor sub-heading
- `Quote` — pull quote / blockquote

**Formatting marks:**
- **Bold**, *Italic*, `Inline code`

**Adding links:**
1. Highlight the text you want to link.
2. Click the link icon in the toolbar.
3. Paste the URL and choose whether to open in a new tab.

**Adding images inside the body:**
Click the **image icon** at the bottom of the editor to insert an inline image. Always fill in the Alt Text. You can optionally add a Caption that appears beneath the image.

**Headings and structure tips:**
- Use H2 for your main sections.
- Use H3 underneath H2 for sub-points.
- Don't skip heading levels (H2 → H4 with no H3) — it confuses both readers and search engines.
- Short paragraphs (3–5 sentences) are easier to read on screen than walls of text.

### 7. Social / SEO overrides (optional)

These three fields let you control exactly what appears when someone shares your article on LinkedIn, Twitter, or in iMessage:

| Field | When to use it |
|---|---|
| **OG Title Override** | When you want a different (usually shorter) headline for social vs. the page |
| **OG Description Override** | When your excerpt isn't punchy enough for social and you want a sharper hook |
| **OG Image Override** | When you want a different image for social shares than the featured image |

If you leave all three blank, the post title, excerpt, and featured image are used automatically. That's fine most of the time.

### 8. Add FAQs (optional)

The **FAQs** section appends an accordion at the bottom of your article — good for targeting "People Also Ask" results in Google. Click **Add item**, fill in a Question and Answer, and repeat. You can reorder them by dragging.

### 9. Link related posts (optional)

The **Related Posts** field lets you manually pin up to 3 other articles to show at the bottom of this one. Start typing a title in the field to search your existing posts.

### 10. Publish

When you're ready to go live:

1. Check that **Title**, **Slug**, **Published At**, and **Featured Image** are all filled in.
2. Click the **Publish** button in the top right corner of the document.
3. The button changes to show a green checkmark. The post is now live on the site.

> **Draft vs. Published:** Any changes you make after publishing show a blue "Edited" badge. The live site still shows the last-published version until you click Publish again to push the update.

---

## Editing an Existing Post

1. Click **Post** in the sidebar.
2. Find the article in the list (you can sort by **Published Date, New → Old** using the sort icon).
3. Click it to open the editor.
4. Make your changes.
5. Click **Publish** to push the update live.

There's no save button — Sanity auto-saves your work every few seconds as a draft. You won't lose anything if you close the tab mid-edit.

---

## Unpublishing / Deleting a Post

To take a post offline without deleting it:

- Click the **three-dot menu** (⋯) next to the Publish button → select **Unpublish**. The post disappears from the site but stays in your Studio as a draft.

To permanently delete a post:

- Open the post → three-dot menu → **Delete**. This is permanent. When in doubt, unpublish instead.

---

## Managing Categories

Categories appear as filter pills and section cards on the Insights page. You likely won't need to touch these often, but here's how:

1. Click **Category** in the left sidebar.
2. Click an existing category to edit it, or create a new one.

**Fields:**
- **Title** — the display name (e.g., "GTM Strategy")
- **Slug** — auto-generated from the title, used in URLs
- **Blurb** — 1–2 sentences shown on the category card on the Insights page
- **Topics** — up to 4 representative questions that appear on the card (e.g., "When should I hire a VP of Sales?")
- **Sort Order** — a number that controls the order categories appear on the page. Lower numbers appear first. Set to `1`, `2`, `3` etc.

---

## Managing Your Author Profile

You shouldn't need to edit this often, but your author byline, bio, and photo live here.

1. Click **Author** in the sidebar.
2. Click your name.
3. Update the fields and click Publish.

---

## Quick Reference: Field Checklist Before Publishing

Before you hit Publish, run through this mental checklist:

- [ ] Title — written and final
- [ ] Slug — auto-filled (leave it unless you have a reason to change it)
- [ ] Published At — date and time set
- [ ] Author — set to Bob Hart
- [ ] Category — assigned
- [ ] Excerpt — 1–3 sentences, under 300 characters
- [ ] Featured Image — uploaded, alt text filled in
- [ ] Article Body — complete
- [ ] Proofread once in the preview pane

Everything else (tags, OG overrides, FAQs, related posts) is optional enhancement.

---

## Tips

- **Write the excerpt last.** After you've written the full article, writing the excerpt is much easier — you know exactly what the best hook is.
- **One featured post at a time.** When you feature a new article, go back and turn off the toggle on the previous one.
- **Don't change slugs on live posts.** If you must change a slug, let Pablo know so a redirect can be set up to avoid broken links.
- **Images should be at least 1200px wide.** Anything smaller may look blurry on large screens or in social shares.
- **Sanity auto-saves.** You can close the browser mid-draft and come back later — your work is saved as a draft automatically.

---

*Questions? Contact Pablo at pablosaenzweb@gmail.com*
