/**
 * servicesData.js
 * Central source of truth for all services offered by BOTPILOT AI.
 * Each service includes: id, icon, name, tagline, description, features,
 * benefits, process (how we work), useCases, and faq.
 */

const servicesData = [
  {
    id: 'website-development',
    icon: 'bi-globe2',
    name: 'Website Development',
    tagline: 'We build modern, responsive websites designed to engage visitors and convert them into loyal customers.',
    description:
      'Your website is the first impression your business makes \u2014 and you never get a second chance at a first impression. At BOTPILOT AI, we don\u2019t just build websites; we craft high-performance digital experiences that captivate visitors, rank on Google, and turn clicks into customers. Whether it\u2019s a sleek portfolio, a lead-generating landing page, or a full-blown e-commerce empire \u2014 we engineer every pixel with purpose.',
    features: [
      'Custom responsive website design with modern UI/UX',
      'E-commerce development (Shopify, WooCommerce, custom solutions)',
      'High-converting landing pages for campaigns & launches',
      'SEO-optimized architecture with blazing-fast load times',
      'CMS integration (WordPress, headless CMS) for easy updates',
      'Ongoing maintenance, security patches & performance monitoring',
    ],
    benefits: [
      'Sub-2-second page loads that reduce bounce rates by 40%',
      'Mobile-first design that looks stunning on every device',
      'Built-in SEO so you rank higher from day one',
      'Self-manageable content \u2014 no developer needed for updates',
    ],
    process: [
      { step: 'Discovery & Strategy', detail: 'We dive deep into your brand, target audience, competitors, and goals to create a tailored website blueprint.' },
      { step: 'UI/UX Design', detail: 'Our designers craft wireframes and visual mockups. You review, we refine \u2014 until every screen is perfect.' },
      { step: 'Development & Integration', detail: 'Clean, modern code. We build your site with the latest frameworks, integrate APIs, payment gateways, and CMS.' },
      { step: 'Testing & QA', detail: 'Rigorous cross-browser, cross-device testing. Speed optimization, accessibility checks, and security audits.' },
      { step: 'Launch & Support', detail: 'We handle deployment, DNS, SSL, and go live. Post-launch support keeps your site updated and secure.' },
    ],
    useCases: [
      'Startups needing a professional website to build credibility fast',
      'E-commerce businesses looking to sell products online 24/7',
      'Service-based businesses wanting to generate leads through their website',
      'Brands redesigning an outdated website that isn\u2019t converting',
    ],
    faq: [
      { q: 'How long does it take to build a website?', a: 'Most projects take 2\u20134 weeks depending on complexity. Simple landing pages can be ready in 5\u20137 days.' },
      { q: 'Will my website be mobile-friendly?', a: 'Absolutely. Every website we build is 100% responsive and optimized for mobile, tablet, and desktop.' },
      { q: 'Can I update the website content myself?', a: 'Yes! We integrate user-friendly CMS solutions so you can edit text, images, and pages without any coding.' },
      { q: 'Do you provide hosting and domain setup?', a: 'Yes. We handle domain registration, hosting setup, SSL certificates, and ongoing server management.' },
    ],
  },
  {
    id: 'ai-chatbot-automation',
    icon: 'bi-robot',
    name: 'AI Chatbot & Automation Solutions',
    tagline: 'Smart AI-powered chatbots and automated workflows that streamline operations and enhance customer experience.',
    description:
      'Imagine having a tireless team member who never sleeps, never takes a break, and handles hundreds of conversations simultaneously \u2014 that\u2019s what our AI chatbots do for your business. We build intelligent, context-aware chatbots powered by the latest large language models that live on your website, WhatsApp, Instagram DMs, and Facebook Messenger. But we don\u2019t stop at chatbots \u2014 we automate your entire workflow so you can focus on what matters: growing your business.',
    features: [
      'Custom AI chatbots for website, WhatsApp, Instagram & Messenger',
      'Lead capture, qualification & automatic appointment booking',
      'Smart FAQ bots trained on your business knowledge base',
      'Workflow automation with Zapier, Make.com & custom API integrations',
      'Multi-language bots (Urdu, English, Arabic, Hindi)',
      'Real-time analytics dashboard to track conversations & conversions',
    ],
    benefits: [
      'Automate 80% of repetitive customer queries instantly',
      '24/7 customer engagement without hiring extra staff',
      '3x faster response times = happier customers',
      'Save 20+ hours per week with automated workflows',
    ],
    process: [
      { step: 'Business Analysis', detail: 'We study your customer journey, common queries, and pain points to design the perfect chatbot flow.' },
      { step: 'Conversation Design', detail: 'We map out every conversation path \u2014 greetings, FAQs, lead capture, escalation to human agents, and more.' },
      { step: 'AI Training & Building', detail: 'We train the bot on your data, connect it to your CRM/tools, and build the complete automation pipeline.' },
      { step: 'Testing & Optimization', detail: 'Extensive testing across platforms. We fine-tune responses, handle edge cases, and optimize for conversions.' },
      { step: 'Deployment & Monitoring', detail: 'Go live on all channels. We monitor performance, analyze conversations, and continuously improve the bot.' },
    ],
    useCases: [
      'E-commerce stores needing instant order tracking and product recommendations',
      'Clinics & salons automating appointment bookings via WhatsApp',
      'Real estate agencies qualifying leads and scheduling property viewings',
      'Restaurants handling reservations and menu inquiries automatically',
    ],
    faq: [
      { q: 'Which platforms can the chatbot work on?', a: 'We deploy on your website, WhatsApp Business, Instagram DMs, Facebook Messenger, and Telegram.' },
      { q: 'Can the bot handle Urdu conversations?', a: 'Yes! Our bots support Urdu, English, Arabic, and Hindi with natural language understanding.' },
      { q: 'What happens when the bot can\u2019t answer a question?', a: 'It seamlessly escalates to a human agent via WhatsApp or email, ensuring no customer is left hanging.' },
      { q: 'How long does setup take?', a: 'A basic chatbot can be live in 3\u20135 days. More complex automations with CRM integrations take 1\u20132 weeks.' },
    ],
  },
  {
    id: 'social-media-management',
    icon: 'bi-phone',
    name: 'Social Media Management',
    tagline: 'Strategic content creation and audience engagement to grow your brand and build a strong online presence.',
    description:
      'Social media isn\u2019t just about posting pretty pictures \u2014 it\u2019s about building a community, telling your brand\u2019s story, and turning followers into loyal customers. Our social media team takes care of everything: content strategy, eye-catching graphics, viral-worthy reels, community engagement, and detailed analytics. We don\u2019t just manage your accounts \u2014 we grow them strategically so every post moves the needle for your business.',
    features: [
      'Customized content strategy & monthly editorial calendars',
      'Instagram Reels, TikTok videos & YouTube Shorts production',
      'Community management \u2014 replies, DMs & audience engagement',
      'Branded story templates, carousel posts & infographics',
      'Hashtag research, trend analysis & growth hacking strategies',
      'Detailed monthly reports with insights & recommendations',
    ],
    benefits: [
      'Consistent, professional brand presence across all platforms',
      '2\u20135x increase in engagement within the first 3 months',
      'Free up your time \u2014 we handle everything from ideation to posting',
      'Data-backed decisions that actually grow your audience',
    ],
    process: [
      { step: 'Brand Audit & Strategy', detail: 'We analyze your current social presence, competitors, and audience to build a winning content strategy.' },
      { step: 'Content Calendar', detail: 'A full month of content planned in advance \u2014 themes, captions, hashtags, and posting schedule, all approved by you.' },
      { step: 'Content Creation', detail: 'Our designers and copywriters craft scroll-stopping visuals, engaging captions, and trending reel concepts.' },
      { step: 'Scheduling & Publishing', detail: 'Posts go live at optimal times for maximum reach. Stories, reels, and carousels \u2014 all covered.' },
      { step: 'Engagement & Reporting', detail: 'We manage comments and DMs daily. Monthly analytics reports show what\u2019s working and what\u2019s next.' },
    ],
    useCases: [
      'New brands looking to build a social media presence from scratch',
      'Businesses too busy to post consistently and engage with followers',
      'Brands wanting to go viral with trending reels and creative content',
      'Companies needing professional social media for credibility and trust',
    ],
    faq: [
      { q: 'Which platforms do you manage?', a: 'Instagram, Facebook, TikTok, LinkedIn, Twitter/X, YouTube \u2014 we cover all major platforms.' },
      { q: 'Do you create the graphics and videos too?', a: 'Yes! Our in-house designers and video editors create all content. You just approve and we post.' },
      { q: 'How many posts per month?', a: 'Our standard packages include 12\u201320 posts/month plus stories and reels. Custom plans are available.' },
      { q: 'Can I review content before it goes live?', a: 'Absolutely. Every post is shared with you for approval before publishing. Your brand, your voice.' },
    ],
  },
  {
    id: 'google-meta-ads',
    icon: 'bi-megaphone',
    name: 'Google & Meta Ads Management',
    tagline: 'Data-driven advertising campaigns on Google, Facebook, and Instagram focused on maximizing ROI and conversions.',
    description:
      'Throwing money at ads without a strategy is like setting cash on fire. At BOTPILOT AI, we turn your ad budget into a profit machine. Our certified advertising specialists create laser-targeted campaigns on Google, Facebook, and Instagram that reach the right people, at the right time, with the right message. From keyword research to pixel setup, A/B testing to conversion optimization \u2014 we handle everything so you get maximum leads at minimum cost.',
    features: [
      'Google Search, Display, Shopping & YouTube ad campaigns',
      'Facebook & Instagram ads (lead generation, conversions, brand awareness)',
      'Advanced audience targeting, lookalikes & retargeting funnels',
      'Creative A/B testing \u2014 ad copies, visuals & landing pages',
      'Pixel/tag setup, conversion tracking & event configuration',
      'Weekly performance reports with clear ROI metrics',
    ],
    benefits: [
      'Up to 60% lower cost-per-lead with smart audience targeting',
      '100% transparent reporting \u2014 every rupee accounted for',
      'Campaigns that scale profitably as your business grows',
      'Managed by Google & Meta certified advertising experts',
    ],
    process: [
      { step: 'Research & Audit', detail: 'We analyze your industry, competitors, and past ad performance to identify the biggest opportunities.' },
      { step: 'Strategy & Funnel Design', detail: 'We design a complete advertising funnel \u2014 awareness, consideration, conversion \u2014 tailored to your goals.' },
      { step: 'Campaign Setup', detail: 'Pixel installation, audience creation, ad copywriting, creative design, landing page optimization \u2014 all done.' },
      { step: 'Launch & Optimize', detail: 'Campaigns go live. We monitor daily, kill underperformers fast, and scale winners aggressively.' },
      { step: 'Report & Scale', detail: 'Weekly reports show leads, cost-per-result, and ROAS. We continuously optimize and scale what works.' },
    ],
    useCases: [
      'Local businesses wanting to dominate Google search results in their city',
      'E-commerce brands looking to drive profitable online sales',
      'Service businesses (clinics, gyms, salons) needing a steady flow of leads',
      'Startups launching a product and needing rapid awareness and signups',
    ],
    faq: [
      { q: 'What\u2019s the minimum ad budget you recommend?', a: 'We recommend starting with PKR 30,000\u201350,000/month for meaningful data. We can work with smaller budgets too.' },
      { q: 'How soon will I see results?', a: 'Most campaigns start generating leads within 3\u20137 days. Optimization improves results significantly over weeks.' },
      { q: 'Do you create the ad creatives?', a: 'Yes! Our designers create all ad visuals and our copywriters write compelling ad copy \u2014 included in every package.' },
      { q: 'Can I track where my leads are coming from?', a: 'Absolutely. We set up full conversion tracking so you know exactly which ad generated each lead.' },
    ],
  },
  {
    id: 'video-editing-graphic-design',
    icon: 'bi-camera-reels',
    name: 'Professional Video Editing & Graphic Design',
    tagline: 'High-quality visuals and polished video content crafted to capture attention and strengthen your brand identity.',
    description:
      'In a world where attention spans are shorter than ever, stunning visuals are your secret weapon. Our creative powerhouse delivers cinema-quality video editing for YouTube, social media, ads, and corporate content \u2014 paired with jaw-dropping graphic design for logos, brand identities, social posts, packaging, and everything your brand needs to look like a million bucks. We don\u2019t do boring. We make your brand impossible to ignore.',
    features: [
      'YouTube video editing \u2014 cuts, transitions, color grading, sound design',
      'Social media video production (Reels, Shorts, TikToks, Stories)',
      'Motion graphics, animated intros, kinetic typography & explainers',
      'Logo design, complete brand identity kits & style guides',
      'Social media post design, story templates & highlight covers',
      'Print design \u2014 flyers, brochures, business cards, packaging',
    ],
    benefits: [
      'Hollywood-level quality at Pakistan-friendly pricing',
      '24\u201348 hour turnaround on most design requests',
      'A cohesive brand identity that builds instant recognition',
      'Creative concepts that make your competitors jealous',
    ],
    process: [
      { step: 'Creative Brief', detail: 'We discuss your vision, brand personality, target audience, and reference styles to align on the creative direction.' },
      { step: 'Concept & Draft', detail: 'Our team creates initial concepts and drafts. You get mood boards for branding and rough cuts for videos.' },
      { step: 'Design & Edit', detail: 'Full production \u2014 high-quality designs are polished, videos are professionally edited with effects and sound.' },
      { step: 'Revision & Refinement', detail: 'You review and share feedback. We offer multiple revision rounds until you\u2019re 100% satisfied.' },
      { step: 'Final Delivery', detail: 'All files delivered in every format you need \u2014 web, print, social, HD video. Ready to publish and impress.' },
    ],
    useCases: [
      'YouTubers and content creators needing professional video editing',
      'Brands launching a new identity (logo, colors, brand guidelines)',
      'Businesses needing daily social media graphics and story designs',
      'Companies creating promotional or explainer videos for products',
    ],
    faq: [
      { q: 'How many revisions do I get?', a: 'All packages include 2\u20133 revision rounds. We don\u2019t stop until you love the final result.' },
      { q: 'What formats do you deliver?', a: 'We deliver in all formats \u2014 PNG, JPG, SVG, PDF for designs and MP4, MOV for videos. Source files available on request.' },
      { q: 'Can you match my existing brand style?', a: 'Absolutely. Share your brand guidelines and we\u2019ll create content that\u2019s perfectly on-brand.' },
      { q: 'Do you offer monthly design packages?', a: 'Yes! We offer unlimited design request packages where you get a dedicated designer for a flat monthly fee.' },
    ],
  },
];

export default servicesData;
