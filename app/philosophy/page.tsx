const accent = "var(--accent-philosophy)";

type Article = {
  title: string;
  year: number;
  summary: string;
  quotes: string[];
};

type Author = {
  name: string;
  articles: Article[];
};

const authors: Author[] = [
  {
    name: "Chris Moore",
    articles: [
      {
        title: "Psych Job – The Mental Side of Things",
        year: 2005,
        summary:
          "A list of seven mental factors Moore argues separate lifters who reach their real potential from everyone else, regardless of program. He pushes readers to become genuine \"thinkers\" — pursuing knowledge relentlessly through study and by seeking out people stronger than them — and to actually work hard rather than assume they already are, citing a sport scientist's blunt reminder that real strength takes real effort, not the illusion of it. He argues for deliberately training with people outside your own discipline to break out of tunnel vision, doing the specific exercises you hate because they expose your real weaknesses, and rejecting sports psychology's obsession with \"intrinsic motivation\" in favor of whatever hard-nosed strategy actually keeps you training. He closes by urging lifters to raise their own expectations rather than settle once they hit an early milestone, and to teach others once they've learned enough, since teaching forces you to sharpen your own understanding. The piece ties it all together as \"atmosphere\" — the intangible sum of hard work, teaching, and aggression that defines a place like Westside Barbell.",
        quotes: [
          "The answer is relatively simple; it's the mental factors associated with lifting.",
          "If you are going to have any shot at reaching your absolute strength potential, you're going to have to become a thinker.",
          "Then you are going to have to work hard. I mean really hard!",
          "Consistently doing what you hate to do is key.",
          "If you have good atmosphere, you have a place like Westside Barbell. A place where average will not do.",
        ],
      },
    ],
  },
  {
    name: "Chris Shugart",
    articles: [
      {
        title: "Pick It Up and Bleed",
        year: 2013,
        summary:
          "A short, sharp piece built around a fictional kid, Cody, who quits soccer, gets consoled and rewarded for mediocrity by his parents, and is on track to grow into an entitled adult who blames others for his own failures. Shugart pivots to a redemption arc: what happens the day that same kid picks up a barbell. Unlike team sports, the weight room offers zero excuses to hide behind — the barbell doesn't care about feelings, only effort, and it directly punishes laziness and rewards discipline in a way almost nothing else does. Learning that lesson under the bar, he argues, transfers directly to education, career, and relationships, turning struggle into something worth seeking out rather than avoiding, since the payoff is proportional to the difficulty.",
        quotes: [
          "He displays about as much hustle as a three-toed sloth on a Vicodin bender.",
          "He'll be astounded that his talent at making excuses does not transfer into adding weight to the bar.",
          "There is no team to make up for his laziness. No one is going to shove the right foods into his mouth.",
          "He'll discover the inverse relationship between excuses and progress, and this will be painful and shocking for him, like a slap across the face.",
          "The barbell has lessons for everyone. All they have to do is pick it up and bleed.",
        ],
      },
      {
        title: "Embrace the Suck",
        year: 2013,
        summary:
          "Borrowing the Marine Corps phrase \"welcome to the suck,\" Shugart argues every worthwhile pursuit begins in an unrewarding, painful phase where effort outpaces visible results — the beginner with nothing to show for the pain yet, the dieter with no visible progress, the advanced lifter stuck years on a plateau. He rejects self-pity and \"wallowing\" as a response outright, insisting the only way out is to get angry, refocus, and push harder rather than look for sympathy. The piece is built on a central metaphor — a car stuck in mud that only moves with sustained, deliberate effort — and closes with the claim that every real achievement sits on the other side of the suck, which has to be confronted and fought through, not avoided.",
        quotes: [
          "Training, in the beginning, sucked. I wanted the results from it, but I hated the process of getting them.",
          "The lesson the suck teaches us is that we have the ability to escape it.",
          "Real self-improvement has nothing to do with that coddling, wallowing-in-your-own-misery... bullshit.",
          "No, they get angry, they refocus, and they fight.",
          "Every reward, every achievement lies on the other side of the suck.",
        ],
      },
      {
        title: "Which Wolf Are You Feeding?",
        year: 2014,
        summary:
          "Opens with the well-known Cherokee parable of two wolves battling inside every person — one weakness, ego, and entitlement, the other strength, hard work, and humility — with the grandfather's answer that whichever wolf you feed is the one that wins. Shugart builds his argument on the \"Tetris Effect,\" the real psychological phenomenon where people who played Tetris for hours began perceiving interlocking-block patterns everywhere in daily life, arguing the same pattern-reinforcement applies to mindset: constantly scanning for excuses trains your brain to keep finding excuses, while scanning for opportunities to improve trains it to keep finding those instead. He applies this directly to lifting and physique goals — whether your reflex is to rationalize (\"I can't squat,\" \"I deserve a cheat meal\") or to look for a fix determines which pattern gets reinforced over time.",
        quotes: [
          "One wolf is evil. He is weakness, inferiority, ego, laziness, and entitlement. The other is good. He is strength, hard work, self-reliance, and humility.",
          "The old man replied, 'The one you feed.'",
          "Your level of success is largely derived from how you view the world.",
          "The good news is that you can engrain productive, positive patterns as well.",
          "In other words, which wolf are you feeding?",
        ],
      },
      {
        title: "Tip: Adopt the Average Sucks Mindset",
        year: 2016,
        summary:
          "Shugart attacks the idea of a training or diet \"maintenance phase\" as a comforting fiction — he argues there's no real stasis in body composition or strength, only slow progression or slow regression, and calling stagnation \"maintenance\" just disguises quiet decline as a plan. He notes that being average today is a low bar, citing survey stats on the average adult male's strength and body fat, and argues average should be a starting line, not a goal. His core claim is that assuming you can coast leads to \"half-assery\" in both training and diet, which doesn't actually hold anything steady — it just slows the rate of decline. The piece ends with a blunt directive: keep any real maintenance phase as short and unintentional as possible, because staying there too long turns you into what he calls \"average American average.\"",
        quotes: [
          "In short, average kinda sucks. Today's average is, in fact, below average.",
          "There is no maintenance phase; there is only progression and regression.",
          "'Maintenance' is a cute way of describing slow, almost unnoticeable regression.",
          "Assuming that you can 'maintain' will subconsciously lead to half-assery.",
          "Screw average. Strive for more.",
        ],
      },
      {
        title: "Tip: Fear is Fuel",
        year: 2018,
        summary:
          "A short piece arguing that motivation is unreliable and only really works for beginners — what actually sustains success over the long haul is being \"haunted\" by a specific fear, or \"ghost\": of being broke, of disappointing people you love, of becoming a parent or coach you didn't want to become, of never living up to your own potential. He lists training-specific ghosts too — getting fat again, being weak, not being able to take care of yourself when old — and argues these fears function productively, pushing a kind of discipline that generic positivity can't. The advice is blunt: if you don't already have a ghost, deliberately find or \"summon\" one, because it will outperform any feel-good slogan.",
        quotes: [
          "Motivation is for newbies. To be successful over the long haul, you need to be haunted.",
          "A 'ghost' is something that follows you around your whole life, nudging you.",
          "These ghosts get us out of bed for a morning workout when we'd rather sleep in.",
          "If you don't have a ghost, summon one.",
          "It'll keep you more motivated than some sugary-sweet meme about shooting for the moon.",
        ],
      },
    ],
  },
  {
    name: "Dan John",
    articles: [
      {
        title: "The Journey To Excellence",
        year: 2006,
        summary:
          "Written the week his mentor Coach Ralph Maughan died, John reflects on the gap between \"pretty good\" and true excellence. He opens with a memory of Maughan criticizing his 180-foot discus throws because he'd seen athletes throw 230 feet — a lesson in never getting comfortable with \"good enough.\" John argues modern culture, through participation trophies and lowered bars, has trained people out of pursuing excellence at all, and recounts Dave Tate's four-tier scale of lifting programs — Shitty, Sucks, Good, Great — as a gut-check for where people actually rank versus where they think they rank. His prescription: honestly assess your true level, chart a flexible plan around the few genuinely non-negotiable fundamentals, and — the counterintuitive core of the piece — pursue simplicity and effortlessness rather than strain, since true mastery, from Olympic lifters to Gretzky to Jordan, looks unforced rather than desperate. He closes by tying it back to his own throwing: when he simplified his technique instead of straining for distance, the throws got longer.",
        quotes: [
          "You see, once you have the vision of excellence, 'pretty good' is hard to swallow.",
          "The road from 'suck' to 'good' is long and difficult!",
          "It is the road, not the inn.",
          "Age is crafty. Old athletes figure out one thing from years of doing it wrong: less is more.",
          "Eliminate the excess. Pare down what you do both in training and in movement. Generally, less is more.",
        ],
      },
    ],
  },
  {
    name: "Dave Tate",
    articles: [
      {
        title: "Tip: Change Your Damn Attitude",
        year: 2016,
        summary:
          "Tate splits the difficult, defensive lifters he runs into constantly at seminars into two types. \"Category A\" is skinny guys terrified of gaining any weight who refuse to eat enough to actually build strength. \"Category B\" is heavier guys who've let their conditioning slide so far they can barely function through a training session, let alone a meet. He's blunt with both: Category A needs to accept a modest, controlled body-fat increase if they actually want size and strength, and Category B needs basic conditioning work because poor conditioning directly impairs recovery and nutrient processing. He states a clear preference for coaching Category B, since it's far easier to get an already-built guy to clean up his diet than to talk a terrified beanpole into eating enough to grow.",
        quotes: [
          "I can't relate to these twerps who want to get super strong but refuse to gain weight.",
          "If you're looking to add size and gain strength, 10-14% is going to be a lot better for you than 4%.",
          "If you can't walk 100 yards without stopping to catch your breath, then you really need to get your fat ass into shape.",
          "It's much easier to teach a guy who already has some underlying muscle to eat clean, than to try to convince some bean pole that it's okay if his abs disappear for a while.",
          "I have no idea what their problem is. They have no muscle to begin with and are terrified of losing their abs.",
        ],
      },
    ],
  },
  {
    name: "TC Luoma",
    articles: [
      {
        title: "Vision Quest",
        year: 2013,
        summary:
          "Framed as the answer Luoma wishes he'd given a gym acquaintance who mocked him for logging his lifts and asked why he doesn't just \"train to stay in shape.\" His real answer becomes an extended meditation on training as a substitute heroic quest for people who grew up wanting to slay dragons but never got the chance in ordinary adult life. He argues the goal — a PR, a physique — is secondary to the journey itself, comparing hard training to a Lakota vision quest and to Joseph Campbell's hero's journey: separation, hardship, pain, and partial attainment of what was sought. He leans hard into training-as-religion imagery — the gym as temple, weights as bells, exertion as a kind of spiritual awakening — and frames the whole pursuit as the modern, available version of an ancient rite most people never get to undertake.",
        quotes: [
          "So it's not the goal that's important, it's the journey. The journey's the thing. The journey's the reward.",
          "We not only want to look badass, we want to be badass so we can smite evil.",
          "The gym is our sweat lodge... a great workout... is spiritual.",
          "What is it if it isn't a religion?",
          "I want to be my own hero, be the protagonist in the book of my life.",
        ],
      },
      {
        title: "Fear is Good",
        year: 2014,
        summary:
          "Written while recovering, half-hypoxic, after pushing the Prowler down an alley, Luoma has an epiphany about why most lifters never actually change: they train without real intensity, so nothing forces adaptation. His central claim is that fear — not its absence — is the best predictor of training success. The visible dread lifters feel before a heavy squat, deadlift, or overhead press session is a signal they're loading the spine hard enough to force real change. He contrasts this with the bored, checked-out look of people doing biceps curls or leg extensions, arguing that genuine fear of failure, pain, or the weight itself is what triggers the body's protective, adaptive response, and ties the visible physical toll of a hard set to who actually keeps making progress year after year.",
        quotes: [
          "Hardly anyone who lifts weights ever looks different from year to year.",
          "Fear, I realized, is the single best predictor of success – not the absence of fear, but actually experiencing it.",
          "No weight training program or maneuver or technique will deliver as much muscle as loading up the spine will.",
          "It connotes a level of effort on par with getting a tan or shooing flies away from your summertime glass of lemonade.",
          "The people who have to overcome some primal fear when they come to the gym... are the ones who actually do look better and get stronger year after year.",
        ],
      },
    ],
  },
];

export default function PhilosophyPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <div
        className="rounded-2xl border-2 p-5"
        style={{ borderColor: accent, backgroundColor: `color-mix(in srgb, ${accent} 8%, transparent)` }}
      >
        <h1 className="text-3xl font-extrabold" style={{ color: accent }}>
          Fitness Philosophy Rediscovered During Recovery
        </h1>
        <p className="mt-3 text-[var(--muted)]">
          Old T-Nation &quot;Powerful Words&quot; columns I kept coming back to during a rough stretch, when training
          was one of the few things that made sense. The originals are slowly disappearing from the web, so this is a
          preserved summary and the lines that actually stuck, grouped by the writers who wrote them — not just a link
          that might rot.
        </p>
      </div>

      <div className="mt-10 space-y-12">
        {authors.map((author) => (
          <section key={author.name}>
            <h2 className="text-2xl font-extrabold" style={{ color: accent }}>
              {author.name}
            </h2>
            <div className="mt-4 space-y-4">
              {author.articles.map((article) => (
                <div
                  key={article.title}
                  className="rounded-2xl border-2 bg-[var(--card)] p-5"
                  style={{ borderColor: accent, boxShadow: `5px 5px 0 0 ${accent}` }}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-lg font-bold">{article.title}</h3>
                    <span className="text-sm font-semibold text-[var(--muted)]">{article.year}</span>
                  </div>
                  <p className="mt-2 text-sm text-[var(--muted)]">{article.summary}</p>
                  <ul className="mt-4 space-y-2 border-t border-dashed border-[var(--border)] pt-4">
                    {article.quotes.map((quote) => (
                      <li key={quote} className="pl-4 text-sm italic text-[var(--foreground)]" style={{ borderLeft: `3px solid ${accent}` }}>
                        &ldquo;{quote}&rdquo;
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
