# How to Publish a Blog Post on Successfulbob.com

This guide walks you through everything you need to do in Sanity Studio to publish a new article on the Insights page.

---

## Accessing the Studio

Go to your Sanity Studio. If you're running it locally:

```
http://localhost:3333
```

Or open the hosted Studio URL if it has been deployed.

---

## Step 1 — Open the Posts section

In the left sidebar, click **Post**. You'll see a list of all existing articles sorted by publish date (newest first).

To create a new post, click the **pencil/compose icon** in the top-right corner of the sidebar, or the **+ New post** button if visible.

---

## Step 2 — Fill in the required fields

These fields are required and marked with a red asterisk in the Studio. The post will not publish without them.

### Title *(required)*
The full headline of the article as it will appear on the site and in search results.

> **Tip:** Write it as a question or a clear statement of value. Example: *"How do you turn technical features into business value?"*

---

### URL Slug *(required)*
This is the web address for the article. It is auto-generated from the title — click **Generate** after entering the title and it will fill in automatically.

Example: a title of *"How do you turn technical features into business value?"* becomes:
```
/insights/how-do-you-turn-technical-features-into-business-value
```

> **Do not change the slug after the post is published.** Changing it breaks existing links.

---

### Excerpt *(required — 300 characters max)*
A one or two sentence summary. This appears:
- On the article card in the Recent Articles grid
- As the meta description in Google search results
- In social share previews (unless overridden — see SEO fields below)

Write it in plain language. Do not start with "In this article…" — just say what the reader will get.

---

## Step 3 — Set the publication details

### Published At
Click the date/time field and select when the article should be considered published. This controls the sort order on the Insights page (newest first).

> If you leave this blank, the post will still appear but will sort to the bottom and show no date.

### Author
Select **Bob Hart** from the dropdown. This links the post to the author record already set up in the system.

### Category
Select the most relevant category from the list:

| Category | Use for |
|---|---|
| Startup Go to Market | GTM strategy, go-to-market planning, early-stage growth |
| Founder Led Sales | Scaling beyond founder-only selling |
| Technical Product Marketing | Explaining complex products in market language |
| Product Messaging | Messaging frameworks, features-to-value translation |
| Partner Enablement | Partner story, repeatability, channel readiness |
| Demos & Field Conversations | Demo structure, buyer conversations |
| Executive Narrative | Board-ready stories, executive and investor communication |

> If none of these fit, contact the site developer to add a new category.

---

## Step 4 — Write the article body

Click into the **Article Body** field. This is a rich text editor that works similarly to a word processor.

### Text formatting available

| Format | How to apply |
|---|---|
| **Bold** | Select text → click **B** in the toolbar |
| *Italic* | Select text → click **I** in the toolbar |
| `Code` | Select text → click the code icon |
| H2 heading | Click the paragraph dropdown → select **H2** |
| H3 heading | Click the paragraph dropdown → select **H3** |
| H4 heading | Click the paragraph dropdown → select **H4** |
| Block quote | Click the paragraph dropdown → select **Quote** |

### Adding links
1. Select the text you want to link
2. Click the link icon in the toolbar
3. Paste the URL
4. Check **Open in new tab** if linking to an external site

### Adding images inside the article
1. Click the **image icon** in the body toolbar (or press Enter at the end of a paragraph and look for the insert options)
2. Upload an image or select one from the media library
3. Fill in the **Alt Text** — this is required for accessibility and SEO
4. Optionally add a **Caption** that appears below the image

> **Image sizing tip:** Upload images at 1200px wide minimum. The site will resize them automatically.

---

## Step 5 — Add a featured image

The **Featured Image** appears at the top of the article page and in social share cards.

1. Click **Upload** to upload a new image, or **Select** to pick from the media library
2. Drag the hotspot circle to focus on the most important part of the image (used for cropping on different screen sizes)
3. Fill in the **Alt Text** field — describe what is in the image

> Recommended size: **1200 × 630px** (standard OG image ratio). This also works well as the article header.

---

## Step 6 — Add tags *(optional)*

Tags are short keyword labels. They are not displayed publicly on the site at this time but are stored for future use and filtering.

Type a tag and press **Enter** or **Return** to add it. Example tags: `messaging`, `demo`, `partner`, `founder`, `gtm`.

---

## Step 7 — Mark as Featured *(optional)*

Toggle **Featured Post** to **on** if this article should appear in the **Start Here** featured slot at the top of the Insights page.

> Only one post can be featured at a time. If you mark a new post as featured, remember to un-feature the previous one.

---

## Step 8 — Add FAQs *(optional)*

The FAQ section appears as an expandable accordion at the bottom of the article. It is good for SEO — FAQ content can appear directly in Google search results.

1. Scroll to the **FAQs** field
2. Click **Add item**
3. Enter a **Question** and an **Answer**
4. Repeat for up to 4–6 questions

> Write questions the way a reader would actually type them into Google: *"What is a GTM strategy for startups?"* not *"GTM strategy overview."*

---

## Step 9 — Link related posts *(optional)*

The **Related Posts** field lets you manually select up to 3 other articles to show at the bottom of this post.

1. Click **Add item**
2. Search for and select the related post

> Choose articles that cover a closely related topic — ideally ones the reader would naturally want to read next.

---

## Step 10 — SEO / Social overrides *(optional)*

These fields override what appears when someone shares the article on LinkedIn, Twitter/X, or Slack.

| Field | What it does |
|---|---|
| **OG Title Override** | Custom headline for social shares (defaults to the article title) |
| **OG Description Override** | Custom description for social shares (defaults to the excerpt) |
| **OG Image Override** | Custom image for social shares (defaults to the featured image) |

> You usually do not need to fill these in. Only use them if you want the social card to say something different from the article title and excerpt.

---

## Step 11 — Publish

When everything looks right:

1. Click **Publish** in the top-right corner of the editor
2. The button will change from blue to grey and show a green checkmark — the post is now live
3. The article will appear on the site within a few seconds

> If you are not ready to publish, click **Save** instead. The post will be saved as a draft and will not appear on the site.

---

## Editing a published post

1. Find the post in the **Post** list in the sidebar
2. Click it to open the editor
3. Make your changes
4. Click **Publish** again to push the update live

Changes are reflected on the site immediately after publishing.

---

## Common mistakes to avoid

| Mistake | Why it matters |
|---|---|
| Leaving **Published At** blank | Post sorts to the bottom with no date shown |
| Changing the slug after publishing | Breaks any links to the article from Google, social, or other pages |
| Skipping the **Excerpt** | The article card shows no description and meta description is empty |
| Not filling in **Alt Text** on images | Accessibility failure; hurts SEO |
| Marking two posts as Featured | Only the most recently published one will actually show in the featured slot |
| Excerpt over 300 characters | Gets cut off in Google search results |

---

## Quick checklist before hitting Publish

- [ ] Title written clearly
- [ ] Slug generated from title
- [ ] Published At date set
- [ ] Author selected (Bob Hart)
- [ ] Category selected
- [ ] Excerpt written (under 300 characters)
- [ ] Featured Image uploaded with Alt Text
- [ ] Article body complete — headings, links, and images formatted
- [ ] FAQs added (if relevant)
- [ ] Related Posts selected (optional but recommended)
- [ ] Featured Post toggle set correctly

---

*Questions about the site or Sanity? Contact your developer.*
