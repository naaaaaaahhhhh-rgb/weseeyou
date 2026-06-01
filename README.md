# We See You

A Stay in LA campaign site. City Council passed the Keep Hollywood Home
motions earlier this year — but they haven't been enacted. This site lets
people send direct emails to the city department heads responsible for
implementing them.

The site rolls out one department head per week. Each card on the homepage
starts as a mystery silhouette and gets "revealed" on its scheduled week.

---

## How to reveal a department head

When it's time to reveal someone:

1. Open `app/data.ts`.
2. Find the entry for the person you're revealing (e.g. `slug: "head-2"`).
3. Change `revealed: false` to `revealed: true`.
4. Fill in their info: `name`, `title`, `department`, `photo`, `blurb`,
   `motionIds`, `email`. There are comments in the file explaining each one.
5. (Optional) Change the `slug` from the placeholder (`head-2`) to something
   like the person's name (`bob-jones`). This becomes part of the URL. **Only
   do this BEFORE reveal — don't change a slug after sharing the URL, or
   shared links will break.**
6. Add their photo to the `public/` folder. Reference it in `data.ts` as
   `photo: "/their-filename.jpg"`.
7. Commit and push. Vercel will auto-deploy in about a minute.

## How to update the motions list

The Keep Hollywood Home motions are listed in `app/motions.ts`. Edit that
file to update titles, summaries, or add/remove motions.

## Email sending

The site uses the same email mechanism as the original Stay in LA site:

- **By default,** clicking "Send message" opens the user's email app with the
  recipient, subject, and body pre-filled (`mailto`). The user reviews and
  hits send themselves.
- **If you set up Resend** (a paid email service) and add `RESEND_API_KEY` and
  `ADVOCACY_FROM_EMAIL` to your Vercel environment variables, the site will
  send emails directly from the page in one click.

The code already supports both modes — no changes needed when you upgrade.
