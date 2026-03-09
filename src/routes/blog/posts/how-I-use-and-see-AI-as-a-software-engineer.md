---
title: 'How I Use and See A.I. as a Software Engineer (2026)'
description: 'I was amazed by the abilities of Claude Sonnet 4.5 at the end of the last year and decided to again explore how I could use A.I. in my software engineering work.'
date: '2026-03-09'
author: 'Juhana Kuparinen'
tags: ['software engineering', 'A.I.', 'philosophy']
image: '/me.webp'
---

Last Christmas (no pun intended), I was truly amazed by the abilities of **Claude Sonnet 4.5**. Earlier during the year, I had tried GPT 4 during the vibe coding trend, and needless to say, I was disappointed in the results: half the time the code worked, half the time it just blew apart. With the latest Claude model, however, I truly was able to get productive work done. The code actually worked most of the time reliably.

LLMs have truly transformed my workflows, both in work and personal time. Though I feel a bigger impact in my personal projects, since I can now tackle much bigger challenges alone. Since people have been somewhat interested in how I use A.I, I'll talk about that next, based on my experiences, and also share some opinions on the wider implications and usefulness of this new technology.

## What I think A.I. is Good At?

If I had to condense it into one sentence: boilerplate and simple, "common", straightforward tasks.

In more detail, LLMs in my experience excel in tasks that do not require complex architectural reasoning and figuring out new things. After all, they are mainly [text prediction machines under the hood](https://en.wikipedia.org/wiki/Large_language_model#Evaluation), so novel tasks (meaning no human has ever solved a similar task) and making complex reasoning based on architectural tradeoffs and stakeholder needs quickly becomes a struggle. You still have to do that kind of thinking for the A.I.

I'll talk more about the struggle points of LLMs below, but now I'll give you concrete examples of tasks, where A.I. assistance has been truly awesome:

1. Home server setup: I managed to get my home server set up using Docker in a few hours using A.I. tools. Networking issues, Dockerfile issues, and compose files, it could solve all that.
2. Updates on this very website: blog support, fixing audit issues, GEO and SEO optimization, and pnpm migration. Straightforward tasks with straightforward solutions, but implementing all that was reduced from a few days to a few hours.
3. Migrations to newer versions of software: I [upgraded](https://github.com/funnicus/helikuparinen.fi/pull/15) my [mom's site](https://www.helikuparinen.fi/en-US) from Next.js 12 to 16 in about 15 minutes. I'm sure it would have taken me several hours manually.
4. Code reviews: A.I. code reviews are very good. I can't count the number of times [Copilot](https://github.com/features/copilot) has caught a not-so-obvious bug in my PRs over the years.
5. Knowledge gathering: even if A.I. can't always tell you the best solution, it can definitely guide you to resources, where you can find good solutions.
6. Scripting: this in the context of video games. I routinely develop small video games with [Godot](https://godotengine.org/). Simple scripts like player movement can be quickly implemented with LLM assistance. It has also been effective in presenting alternative solutions to existing scripts that might more effectively utilize the nodes Godot provides out-of-the-box.
7. Web development and simple CRUD apps: an example of this is a game master's manager application, which I developed for a homebrew campaign of [Cyberpunk RED](https://rtalsoriangames.com/cyberpunk/). I got very far in a few weekends, even though Cyberpunk RED has a lot of rules, and I was experimenting a lot with different features. I think the project would have taken at least a month otherwise.

In my opinion, if the tasks are simple but require a lot of writing to implement (many tasks, big changes), LLMs are probably a good tool. Here I can almost see the "10x improvement".

## What A.I. Struggles With?

Silicon Valley tech-bros like to hype A.I. beyond belief, but half of the hype is really just marketing talk. The reality is that LLMs are not a silver bullet that will replace all programmers in a few years (and I don't believe we have the capacity to develop AGI yet, which could replace all human work, not even close). Human wisdom and intelligence are still needed. The focus is just shifting a bit more to a higher level of planning, architecture, stakeholder communication, and knowing things that the LLMs' training data does not contain.

Let's look at more concrete examples:

### A.I. Gives You the Most Average Solution

When I asked an LLM to help to build a Dwarf Fortress-style game engine, it suggested common object-oriented patterns, tools, libraries, etc. That is fine if you want a quick DF clone, and I would probably have been happy for a while if I did not know about anything better.

The thing is, I do know about alternatives. And these alternatives, while not maybe the most common or easiest solution in the average hobbyist developer's toolbox, could maybe serve the project much better. [Data-oriented design patterns](https://www.dataorienteddesign.com/site.php), using Rust for safer code, memory optimization using bitflags, etc.

Now, I'm not arguing that the things I mentioned there are the perfect tools to build a colony simulator game like Dwarf Fortress. My point is that we lose a lot of potential for innovation if we always take the average path and are not willing to explore the unknown. I don't think A.I. can do that for us: it is hard to predict an unusual solution.

### A.I. Does Not Have Experiences or True Reason

LLMs know a lot. More than any human on earth. But knowledge by itself is useless without reason and integration. In his book "Bushido", **Inazō Nitobe** compared pure knowledge to a bad-smelling herb that has to be boiled many times to become useful. He died almost 100 years ago, but I think that wisdom is truly timeless.

Claude, ChatGPT, Gemini. They do not live and experience the real world. They can't operate there freely. They do not form their own opinions or philosophies about the world. In this way, they are just echoes of all the existing voices of humanity run through whatever filters the creators of the model deem necessary. But new things and insights won't appear by just repeating what those before you did.

That is why an LLM can't come up with the next world-changing startup. Unless the startup is a copycat. This also means that your view and knowledge of the world as an engineer is really important in guiding the solutions A.I. gives you. Unfortunately, wisdom can't be automated yet.

### Responsibility Outsourced to A.I.

Some of my colleagues have sometimes complained about a trend of "I did it because the A.I. told me so". I'm fortunate enough not have been in such situations, but I still see the danger clearly. As already established, I do not believe LLMs have a true capacity for reason, so responsibility for anything they create can't be expected to fall upon the models. It must fall upon those who use the models. This leads to two things:

1. People who try to avoid responsibility by using A.I. and making sure they do not get away with it.
2. A reality where all A.I. code has to be checked by real humans in serious environments, drastically reducing any benefits from the speed of producing software.

Both are problems that have to be thought about when A.I. is used heavily and with real impact.

### A.I. is Suprisingly Expensive

Guess how much I spent on Claude tokens when I developed the earlier-mentioned game master's manager application for my Cyberpunk homebrew? **Over 60€**. Yeah. And keep in mind, this was maybe 20 hours of coding + I did a lot of manual work too. Much cheaper than your average developer's salary, yes, but not free either. And while the app was functional, it was nowhere near a masterpiece of engineering. This month, I've already spent **almost 10€** just updating my homepage and a few other self-hosted services.

### Sometimes A.I. Still Codes Really Badly

Although recent coding models are truly exceptional and sometimes even mind-blowingly good, they also cause severe disappointments from time-to-time. This probably comes down to inefficient prompting, lack of model context, and the lack of true reasoning capabilities in these models. When you've tried to prompt the A.I. to solve some problem for a few hours without success, but then solve the problem yourself much more simply and rapidly, you really question if the tokens spent were worth the money. This does not happen that often, but often enough for me to not 100% trust my agents. They are dangerously self-confident, even when totally wrong.

## What Does All This Mean?

Well, firstly, to all the doomers who think they are going to get replaced by A.I: no, you won't. If you can think for yourself at all and can adapt your skills a bit. Even the companies that have allegedly cut 50% of their staff due to A.I. have to have [operators](https://agentic-coding.github.io/) for those A.I. models. And once the A.I. hype settles down, do you think people and companies are going to build less with more efficient tools? [Probably not](https://en.wikipedia.org/wiki/Jevons_paradox). Soon, we might need true software engineering know-how more than ever.

Secondly, I really think every engineer should give these tools a try in a real project. You might be surprised by what kinds of things LLMs can do for you. This way, you will also develop your own well-formed opinion on the tools, which will certainly help with employment and work overall. And if you think that trying and being disappointed with A.I. a year ago was good enough, you are wrong. Things move fast in tech, and now you could get totally different results. As always, the best engineers have not been the fastest coders, but the best operators of the tools and knowledge available to them.

Thirdly, those with a bit of entrepreneurial spirit should be overjoyed. Now is the best time in history to try that daunting side project. With the help of an LLM, you probably get up and running much faster than before. And maybe, you'll unexpectedly change the world towards something meaningful to you.

## If You Want a Deeper Dive

I'm by no means an A.I./LLM expert, and this post is mainly based on my own experiences and thoughts on the subject. If you want to dive deeper into the topic, especially in the context of software engineering, you could:

- Watch [Theo - t3.gg](https://www.youtube.com/@t3dotgg) on YouTube. Most of his videos nowadays focus on A.I., and while sometimes a bit hype-driven, they contain a lot of useful information too.
- [Simon Willison's Weblog](https://simonwillison.net/) for A.I. and web development.
- [Jonathan Blow](https://www.youtube.com/watch?v=fzA37SKjrkk) If you want strong opinions against the hypers, and some game development context.

## What A.I. Tools Do I Use?

- Zed Editor and A.I. (often Claude Sonnet, latest version). 10€ a month + usage based billing (max 60€ for me).
- ChatGPT and Codex. 20€ a month.
