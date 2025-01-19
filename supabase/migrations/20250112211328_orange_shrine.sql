/*
  # Add Sample Blog Posts
  
  1. New Content
    - 10 blog posts across different categories
    - Each post includes title, content, category, author, and metadata
    - Images are stored in Supabase storage
  
  2. Categories Coverage
    - TECH: 2 posts
    - GAMES: 2 posts
    - ENTERTAINMENT: 2 posts
    - STOCKS: 2 posts
    - GADGETS: 2 posts
*/

INSERT INTO blogs (
  title,
  content,
  category,
  subcategory,
  author,
  image_url,
  slug,
  featured,
  featured_in_category,
  popular,
  meta_title,
  meta_description,
  meta_keywords
) VALUES
-- TECH Category
(
  'The Future of AI: What to Expect in 2024',
  '<p>Artificial Intelligence continues to evolve at an unprecedented pace. In 2024, we''re seeing groundbreaking developments in machine learning, natural language processing, and computer vision. From autonomous vehicles to healthcare diagnostics, AI is revolutionizing every industry.</p><h2>Key Developments</h2><p>Major tech companies are investing billions in AI research and development. OpenAI''s latest models show remarkable improvements in understanding context and generating human-like responses. Google''s DeepMind has made significant breakthroughs in protein folding prediction.</p><h2>Impact on Industries</h2><p>Healthcare, finance, and manufacturing sectors are seeing the most dramatic transformations. AI-powered diagnostic tools are achieving accuracy rates surpassing human experts. Automated trading systems are becoming more sophisticated, while smart factories are optimizing production like never before.</p>',
  'TECH',
  'News',
  'Sarah Johnson',
  'https://fkthvcaehstlbkgztspt.supabase.co/storage/v1/object/public/blog-images/ai-future.webp',
  'future-of-ai-2024',
  true,
  true,
  true,
  'The Future of AI: What to Expect in 2024 | Technikaz',
  'Explore the latest developments in Artificial Intelligence and their impact across industries in 2024. From healthcare to finance, discover how AI is shaping our future.',
  'AI, artificial intelligence, machine learning, technology trends, 2024 tech'
),
(
  'Best Tech Deals: January 2024 Sales Event',
  '<p>Start the year with amazing deals on the latest tech gadgets. From smartphones to laptops, we''ve curated the best discounts available right now.</p><h2>Top Smartphone Deals</h2><p>The iPhone 15 Pro is available with a significant discount at major retailers. Samsung''s Galaxy S24 series pre-orders come with exclusive bonuses.</p><h2>Laptop Savings</h2><p>MacBook Pro models are seeing price cuts up to $200. Dell''s XPS lineup has special New Year offers with additional accessories.</p>',
  'TECH',
  'Tech Deals',
  'Michael Chen',
  'https://fkthvcaehstlbkgztspt.supabase.co/storage/v1/object/public/blog-images/tech-deals.webp',
  'best-tech-deals-january-2024',
  false,
  true,
  true,
  'Best Tech Deals: January 2024 Sales Event | Technikaz',
  'Find the best deals on smartphones, laptops, and other tech gadgets this January. Exclusive discounts and offers you can''t miss.',
  'tech deals, smartphone deals, laptop deals, January 2024, sales'
),

-- GAMES Category
(
  'Spider-Man 2 Review: A PlayStation 5 Masterpiece',
  '<p>Marvel''s Spider-Man 2 swings onto PS5 with stunning visuals and enhanced gameplay. This sequel brings both Peter Parker and Miles Morales together in their biggest adventure yet.</p><h2>Graphics and Performance</h2><p>The game showcases the PS5''s capabilities with ray-traced reflections, instant loading, and smooth 60fps performance mode. New York City has never looked better.</p><h2>Gameplay Evolution</h2><p>New mechanics include seamless character switching, expanded combat options, and the controversial but exciting symbiote powers.</p>',
  'GAMES',
  'PS5',
  'Alex Turner',
  'https://fkthvcaehstlbkgztspt.supabase.co/storage/v1/object/public/blog-images/spiderman2.webp',
  'spiderman-2-ps5-review',
  true,
  true,
  true,
  'Spider-Man 2 PS5 Review: The Ultimate Superhero Game | Technikaz',
  'Our comprehensive review of Marvel''s Spider-Man 2 on PS5. Discover why this sequel sets new standards for superhero games.',
  'Spider-Man 2, PS5, game review, Marvel games, PlayStation 5'
),
(
  'Xbox Game Pass in 2024: All New Games Coming',
  '<p>Xbox Game Pass continues to grow with an exciting lineup of games for 2024. From day-one releases to indie gems, here''s everything coming to the service.</p><h2>Upcoming Releases</h2><p>Major titles include Senua''s Saga: Hellblade II and Avowed. Several surprise indie games are also joining the service.</p><h2>Service Improvements</h2><p>Microsoft is enhancing cloud gaming features and adding new perks for subscribers.</p>',
  'GAMES',
  'Xbox',
  'Emily Rodriguez',
  'https://fkthvcaehstlbkgztspt.supabase.co/storage/v1/object/public/blog-images/xbox-gamepass.webp',
  'xbox-game-pass-2024-lineup',
  false,
  true,
  true,
  'Xbox Game Pass 2024: Complete Games List | Technikaz',
  'Explore the full list of games coming to Xbox Game Pass in 2024, including exclusive releases and indie titles.',
  'Xbox Game Pass, 2024 games, Xbox Series X, Microsoft, gaming subscription'
),

-- ENTERTAINMENT Category
(
  'Dune: Part Two - Everything We Know So Far',
  '<p>Denis Villeneuve''s highly anticipated sequel to Dune is almost here. With an expanded cast and bigger scope, Part Two promises to be an epic conclusion.</p><h2>Cast and Characters</h2><p>Timothée Chalamet returns as Paul Atreides, joined by Zendaya in an expanded role. New additions include Austin Butler and Florence Pugh.</p><h2>Production Details</h2><p>The film features more practical effects and IMAX footage than its predecessor.</p>',
  'ENTERTAINMENT',
  'Movies',
  'Rachel Kim',
  'https://fkthvcaehstlbkgztspt.supabase.co/storage/v1/object/public/blog-images/dune2.webp',
  'dune-part-two-preview',
  true,
  true,
  true,
  'Dune: Part Two - Complete Preview Guide | Technikaz',
  'Everything you need to know about Dune: Part Two, including cast, plot details, and behind-the-scenes information.',
  'Dune Part Two, movies 2024, Timothée Chalamet, Zendaya, science fiction'
),
(
  'The Last of Us Season 2: Production Begins',
  '<p>HBO''s hit series The Last of Us begins production on its second season. New cast members join Pedro Pascal and Bella Ramsey in adapting the second game.</p><h2>New Characters</h2><p>Casting announcements reveal key roles including Abby Anderson. The season promises to be more ambitious than the first.</p><h2>Story Details</h2><p>The new season will adapt The Last of Us Part II''s controversial but powerful narrative.</p>',
  'ENTERTAINMENT',
  'Series',
  'David Martinez',
  'https://fkthvcaehstlbkgztspt.supabase.co/storage/v1/object/public/blog-images/lastofus2.webp',
  'last-of-us-season-2-production',
  false,
  true,
  true,
  'The Last of Us Season 2: Production Details | Technikaz',
  'Get the latest updates on The Last of Us Season 2 as production begins, including new cast members and story details.',
  'The Last of Us, HBO, TV series, Pedro Pascal, video game adaptation'
),

-- STOCKS Category
(
  'Nvidia Stock Analysis: AI Boom Continues',
  '<p>Nvidia''s stock performance continues to impress as AI demand drives growth. Analysis of the company''s market position and future prospects.</p><h2>Financial Performance</h2><p>Record revenues from data center and AI chips. Strong guidance for upcoming quarters suggests continued growth.</p><h2>Market Position</h2><p>Dominant position in AI hardware market with new products targeting emerging needs.</p>',
  'STOCKS',
  'Analysis',
  'Robert Chang',
  'https://fkthvcaehstlbkgztspt.supabase.co/storage/v1/object/public/blog-images/nvidia-stock.webp',
  'nvidia-stock-analysis-2024',
  true,
  true,
  true,
  'Nvidia Stock Analysis 2024: AI Boom Impact | Technikaz',
  'Detailed analysis of Nvidia''s stock performance and future prospects as AI demand continues to grow.',
  'Nvidia stock, NVDA, stock analysis, AI stocks, investment'
),
(
  'Cryptocurrency Market Outlook 2024',
  '<p>Analysis of the cryptocurrency market trends and predictions for 2024. Focus on Bitcoin ETF impact and regulatory developments.</p><h2>Bitcoin ETF Impact</h2><p>Spot Bitcoin ETF approval changes market dynamics. Institutional adoption increases.</p><h2>Regulatory Landscape</h2><p>Global regulatory frameworks evolve, providing more clarity for crypto markets.</p>',
  'STOCKS',
  'Crypto',
  'Lisa Wong',
  'https://fkthvcaehstlbkgztspt.supabase.co/storage/v1/object/public/blog-images/crypto-2024.webp',
  'crypto-market-outlook-2024',
  false,
  true,
  true,
  'Cryptocurrency Market Outlook 2024 | Technikaz',
  'Comprehensive analysis of cryptocurrency market trends and predictions for 2024, including Bitcoin ETF impact.',
  'cryptocurrency, Bitcoin, ETF, crypto market, 2024 outlook'
),

-- GADGETS Category
(
  'iPhone 15 Pro Max Long-Term Review',
  '<p>After three months with Apple''s flagship iPhone 15 Pro Max, here''s our detailed long-term review. From camera capabilities to battery life, we cover everything.</p><h2>Camera System</h2><p>The 48MP main camera continues to impress with consistent performance. New features via software updates enhance capabilities.</p><h2>Battery Life</h2><p>All-day battery life holds up even with intensive use. Fast charging could be better.</p>',
  'GADGETS',
  'MOBILE',
  'James Wilson',
  'https://fkthvcaehstlbkgztspt.supabase.co/storage/v1/object/public/blog-images/iphone15promax-review.webp',
  'iphone-15-pro-max-long-term-review',
  true,
  true,
  true,
  'iPhone 15 Pro Max: 3-Month Review | Technikaz',
  'Comprehensive long-term review of the iPhone 15 Pro Max after three months of use. Real-world performance and camera analysis.',
  'iPhone 15 Pro Max, Apple, smartphone review, mobile photography, iOS 17'
),
(
  'MacBook Pro M3 Max vs Windows Laptops',
  '<p>Comparing Apple''s latest MacBook Pro M3 Max against top Windows laptops. Performance, battery life, and value analysis.</p><h2>Performance Benchmarks</h2><p>M3 Max shows significant gains in professional workloads. Gaming performance improves but still lags dedicated GPUs.</p><h2>Battery Efficiency</h2><p>Apple Silicon maintains its efficiency lead while delivering desktop-class performance.</p>',
  'GADGETS',
  'LAPTOPS',
  'Thomas Lee',
  'https://fkthvcaehstlbkgztspt.supabase.co/storage/v1/object/public/blog-images/macbook-vs-windows.webp',
  'macbook-pro-m3-max-comparison',
  false,
  true,
  true,
  'MacBook Pro M3 Max vs Windows Laptops Comparison | Technikaz',
  'Detailed comparison between the MacBook Pro M3 Max and leading Windows laptops, analyzing performance and value.',
  'MacBook Pro, M3 Max, Windows laptops, laptop comparison, Apple Silicon'
);