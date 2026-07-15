import { Product } from './types';

export const HERO_IMAGE_PATH = '/src/assets/images/nursery_hero_1784084308879.jpg';

export const TRUST_FEATURES = [
  {
    title: "100% Certified Organic",
    description: "Only GOTS and OEKO-TEX certified fabrics touch your baby's delicate skin.",
    icon: "ShieldCheck"
  },
  {
    title: "Pediatrician Evaluated",
    description: "Every item is reviewed by leading pediatric medical experts for developmental safety.",
    icon: "Heart"
  },
  {
    title: "Non-Toxic Materials",
    description: "Absolutely zero BPA, phthalates, lead, heavy metals, or chemical flame retardants.",
    icon: "Leaf"
  },
  {
    title: "365-Day Extended Return",
    description: "Sleep easy with a full year to return items. We support your nesting journey.",
    icon: "Sparkles"
  }
];

export const PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Aura Organic Nesting Swaddle",
    category: "sleep",
    price: 34.00,
    originalPrice: 42.00,
    rating: 4.9,
    reviewCount: 128,
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=600",
    description: "Designed to mimic the secure, warm feeling of the womb. Breathable GOTS-certified organic cotton keeps babies at the perfect body temperature, significantly reducing startle reflex and improving sleep duration.",
    features: [
      "2-way premium zipper for easy, disturbances-free midnight diaper changes",
      "Ergonomic, hip-healthy spacious bottom pocket design",
      "Gently weighted chest band (0.1 lbs) for extra touch-comfort stimulation",
      "Tagless neck design prevents skin irritation"
    ],
    materials: "95% GOTS Certified Organic Cotton, 5% Elastane for double-directional stretch",
    certifications: [
      {
        name: "GOTS Organic Standard",
        authority: "OneCert",
        description: "Ensures the organic status of textiles from harvesting of raw materials through environmentally and socially responsible manufacturing."
      },
      {
        name: "OEKO-TEX® Standard 100",
        authority: "OETI",
        description: "Guarantees that the fabric is completely free from harmful levels of toxic substances and chemicals."
      }
    ],
    pediatricianNote: {
      approvedBy: "Dr. Sarah Chen, MD, FAAP",
      note: "Swaddling is highly effective for newborns, but hip health is critical. The Aura Swaddle allows for full natural leg flexion ('frog position'), which prevents hip dysplasia while offering comfortable upper-body containment."
    },
    colors: [
      { name: "Oatmeal Sage", hex: "#dce1d3" },
      { name: "Soft Blush", hex: "#f3e1dc" },
      { name: "Sand Beige", hex: "#ebdcd0" }
    ],
    sizes: ["0-3 Months", "3-6 Months"],
    stock: 45,
    reviews: [
      {
        id: "rev-1-1",
        author: "Emily R.",
        role: "Mother of a 6-week-old",
        rating: 5,
        date: "2026-06-12",
        comment: "This is a lifesaver! The double zipper is so smooth and doesn't wake him up during diaper checks. The cotton is butter-soft.",
        verified: true
      },
      {
        id: "rev-1-2",
        author: "Dr. Marcus Vance",
        role: "Pediatrician & Dad of 2",
        rating: 5,
        date: "2026-05-28",
        comment: "As a pediatrician, I always look at the hip width. This swaddle is properly flared at the base, giving the femoral head the space it needs. Safe and beautiful.",
        verified: true
      }
    ]
  },
  {
    id: "prod-2",
    name: "Nesta Ergonomic Cloud Carrier",
    category: "gear",
    price: 139.00,
    rating: 4.8,
    reviewCount: 94,
    image: "https://images.unsplash.com/photo-1594782078968-2b07656d7bb2?auto=format&fit=crop&q=80&w=600",
    description: "An ultra-supportive, fully adjustable baby carrier designed for long-term comfort. Ergonomic structure distributes your baby's weight evenly across your hips and shoulders, allowing for natural front-inward, front-outward, and back carry.",
    features: [
      "Customizable lumbar support and padded crossable shoulder straps",
      "Made with breathable, hypoallergenic lightweight structured linen",
      "Built-in UPF 50+ tuck-away baby privacy hood for nursing and sun protection",
      "Acknowledged as a 'hip-healthy' product by the International Hip Dysplasia Institute"
    ],
    materials: "100% Hypoallergenic Belgian Linen blended with Organic Viscose, aerospace-grade shatterproof buckles",
    certifications: [
      {
        name: "IHDI Approved",
        authority: "International Hip Dysplasia Institute",
        description: "Officially certifies products that promote natural hip alignment and prevent infant joint strain."
      }
    ],
    pediatricianNote: {
      approvedBy: "Dr. Robert K. Mercer, Pediatric Orthopedic Surgeon",
      note: "The correct 'M' carrying position is vital for infant hip development. This carrier excels by fully supporting the thigh to the knee joint, preventing legs from hanging straight down."
    },
    colors: [
      { name: "Slate Grey", hex: "#7a828a" },
      { name: "Clay", hex: "#c4a493" },
      { name: "Olive", hex: "#6c705e" }
    ],
    sizes: ["One Size (Adjustable 7-45 lbs)"],
    stock: 20,
    reviews: [
      {
        id: "rev-2-1",
        author: "Sophia L.",
        role: "First-time Mom",
        rating: 5,
        date: "2026-07-02",
        comment: "I carried my daughter for 3 hours at the farmers market and had zero back pain! She fell asleep instantly in the snug chest-carrying position.",
        verified: true
      }
    ]
  },
  {
    id: "prod-3",
    name: "Elowen Natural Birch Play Gym",
    category: "play",
    price: 89.00,
    rating: 4.9,
    reviewCount: 82,
    image: "https://images.unsplash.com/photo-1515488042361-404e9250afef?auto=format&fit=crop&q=80&w=600",
    description: "Designed to encourage early sensory-motor exploration and visual tracking. Features a highly stable, foldable solid Baltic birch frame and five interchangeable developmental organic cotton toys that rattle, crinkle, and chime.",
    features: [
      "Sustainably harvested FSC certified Baltic birch frame",
      "Non-toxic, food-grade water-based sealant",
      "Removable, machine-washable organic cotton activity play mat",
      "Adjustable toy heights for growing infants"
    ],
    materials: "FSC Certified Baltic Birch, GOTS Organic Cotton, Vegetable Dyes, natural maple wood rings",
    certifications: [
      {
        name: "FSC® C124706",
        authority: "Forest Stewardship Council",
        description: "Assures that the timber used comes from strictly managed, renewable, and socially responsible forests."
      },
      {
        name: "ASTM F963 Toy Safety",
        authority: "CPSC Accredited Lab",
        description: "The gold standard for physical, mechanical, and heavy-metal testing of children's toys."
      }
    ],
    pediatricianNote: {
      approvedBy: "Dr. Sarah Chen, MD, FAAP",
      note: "Visual contrast and physical reach are the cornerstones of 2-6 month developmental play. The high-contrast organic visual cards included with this gym are perfectly aligned with infant optic nerve development."
    },
    colors: [
      { name: "Natural Birch", hex: "#e7d5c3" }
    ],
    sizes: ["Standard (32\" W x 20\" H)"],
    stock: 15,
    reviews: [
      {
        id: "rev-3-1",
        author: "Julian T.",
        role: "Dad of 3-month twins",
        rating: 5,
        date: "2026-06-25",
        comment: "The design is gorgeous and doesn't look like an explosion of plastic in our living room. The babies love reaching for the wooden rings.",
        verified: true
      }
    ]
  },
  {
    id: "prod-4",
    name: "Nurture Guardian Smart Monitor",
    category: "gear",
    price: 189.00,
    rating: 4.7,
    reviewCount: 67,
    image: "https://images.unsplash.com/photo-1537673156864-5d2de08cf9bc?auto=format&fit=crop&q=80&w=600",
    description: "A secure, localized baby monitor that offers true peace of mind. Unlike Wi-Fi monitors prone to security hacks, the Guardian uses secure FHSS 2.4GHz digital connection to provide an encrypted, stable, 1000-ft range video feed directly to your parent unit.",
    features: [
      "Full HD 1080p camera with active infrared night vision",
      "Localized room temperature and humidity tracking alerts",
      "Two-way high-fidelity talkback intercom to soothe your baby instantly",
      "Long-lasting 12-hour audio standby battery mode"
    ],
    materials: "BPA-Free, non-toxic matte polymer casing, medical-grade charging cables",
    certifications: [
      {
        name: "FCC Secure Certified",
        authority: "Federal Communications Commission",
        description: "Ensures secure FHSS signals that cannot be intercepted or tapped by outside networks."
      }
    ],
    pediatricianNote: {
      approvedBy: "Dr. Amy Miller, Pediatric Sleep Medicine Specialist",
      note: "Temperature regulation is vital for safe sleep and SIDS risk reduction. This monitor's active, customizable temperature sensor immediately alerts parents if the nursery moves outside the optimal 68–72°F range."
    },
    colors: [
      { name: "Soft Alabaster", hex: "#fcfaf2" }
    ],
    sizes: ["Standard Set"],
    stock: 12,
    reviews: [
      {
        id: "rev-4-1",
        author: "Sarah & Dan",
        role: "Security-conscious Parents",
        rating: 5,
        date: "2026-07-09",
        comment: "We specifically avoided Wi-Fi cameras because of security concerns. This localized monitor works instantly, is beautifully crisp, and doesn't load our internet. Perfect.",
        verified: true
      }
    ]
  },
  {
    id: "prod-5",
    name: "Terra Organic Bamboo Plate Set",
    category: "feeding",
    price: 26.00,
    originalPrice: 32.00,
    rating: 4.6,
    reviewCount: 55,
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600",
    description: "Help your child transition to independent eating with our 100% natural, biodegradable bamboo tableware. Equipped with a strong silicone suction ring that firmly sticks to flat highchair trays, preventing spills and kitchen cleanups.",
    features: [
      "FSC certified biodegradable bamboo and food-grade silicone",
      "Smart divider sectioning for healthy, balanced portion sizes",
      "Includes an ergonomic soft-tip training spoon to protect delicate gums",
      "Heat-resistant, easy handwash surface"
    ],
    materials: "100% Renewable Bamboo wood, LFGB Certified Food-Grade Silicone",
    certifications: [
      {
        name: "FDA Safe Certified",
        authority: "U.S. Food & Drug Administration",
        description: "Validates that all materials are food-contact safe, lead-free, and contain zero chemical plasticizers."
      },
      {
        name: "LFGB Food Grade",
        authority: "TUV Rheinland",
        description: "The strictest European standard for food-grade safety, guaranteeing zero chemical migration."
      }
    ],
    pediatricianNote: {
      approvedBy: "Dr. Sarah Chen, MD, FAAP",
      note: "During baby-led weaning, plastic plates can release microplastics when hot foods are introduced. Transitioning to clean bamboo and medical silicone ensures zero toxic exposure during this rapid growth phase."
    },
    colors: [
      { name: "Sage Green", hex: "#9cad9a" },
      { name: "Dusty Rose", hex: "#cca7a2" },
      { name: "Oatmeal", hex: "#e5dec9" }
    ],
    sizes: ["3-Piece Feeding Set"],
    stock: 50,
    reviews: [
      {
        id: "rev-5-1",
        author: "Megan K.",
        role: "Mother of a 10-month-old",
        rating: 5,
        date: "2026-05-14",
        comment: "This suction is incredibly strong! My toddler has tried multiple times to fling it, but it stays locked on. The divider is great for separating his soft fruits and puree.",
        verified: true
      }
    ]
  },
  {
    id: "prod-6",
    name: "Nestling Organic Bodysuit Trio",
    category: "apparel",
    price: 38.00,
    rating: 4.8,
    reviewCount: 112,
    image: "https://images.unsplash.com/photo-1619086303291-0ef7b4140da3?auto=format&fit=crop&q=80&w=600",
    description: "A premium pack of three butter-soft organic cotton bodysuits designed with envelope necks and nickel-free bottom snaps. Features flat-lock internal seams to protect your newborn's ultra-sensitive skin from chafing.",
    features: [
      "100% GOTS certified premium combed organic cotton",
      "Envelope neckline slides down over shoulders easily in case of diaper blowouts",
      "Lead-free, nickel-free snap buttons",
      "Naturally hypoallergenic, breathable, and highly durable under hot washes"
    ],
    materials: "100% GOTS Certified Organic Combed Cotton",
    certifications: [
      {
        name: "GOTS Organic Standard",
        authority: "Ecocert Greenlife",
        description: "Guarantees strict environmental and social guidelines throughout the entire textile supply chain."
      }
    ],
    pediatricianNote: {
      approvedBy: "Dr. Sarah Chen, MD, FAAP",
      note: "Infant skin is 30% thinner than adult skin and highly susceptible to contact dermatitis. Eliminating synthetics, chemical finishes, and metallic nickel in snaps is a foundational step in preventing eczema flare-ups."
    },
    colors: [
      { name: "Earth Collection", hex: "#dfd2c4" }
    ],
    sizes: ["Newborn", "0-3M", "3-6M", "6-12M"],
    stock: 30,
    reviews: [
      {
        id: "rev-6-1",
        author: "Alex G.",
        role: "New Dad",
        rating: 5,
        date: "2026-06-30",
        comment: "The envelope neck is a complete game-changer when cleanups get messy. They don't shrink in the wash and stay incredibly soft. Purchased two more sets.",
        verified: true
      }
    ]
  },
  {
    id: "prod-7",
    name: "Bear Cub Hooded Bamboo Towel",
    category: "bath",
    price: 24.00,
    rating: 4.9,
    reviewCount: 76,
    image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&q=80&w=600",
    description: "An ultra-plush, hypoallergenic hooded towel shaped with adorable bear ears. Crafted from heavy 500 GSM organic bamboo fibers, making it twice as thick and absorbent as standard cotton towels, wrapping your little one in instant warmth.",
    features: [
      "Natural premium organic bamboo fabric (500 GSM density)",
      "Naturally anti-bacterial, odor-resistant, and mildew-resistant",
      "Generous 35\" x 35\" size fits newborns up to age three",
      "Beautiful unisex design, perfect for baby showers"
    ],
    materials: "92% Organic Bamboo Viscose, 8% Organic Combed Cotton base for core durability",
    certifications: [
      {
        name: "OEKO-TEX® Standard 100",
        authority: "SGS",
        description: "Independently certified free from hazardous substances, formaldehyde, and heavy metals."
      }
    ],
    pediatricianNote: {
      approvedBy: "Dr. Sarah Chen, MD, FAAP",
      note: "Regulating body temperature post-bath is crucial because infants lose heat very rapidly through their heads. A high-density hooded bamboo towel provides instant insulation and moisture-wicking."
    },
    colors: [
      { name: "Creamy Ivory", hex: "#fbf6ec" },
      { name: "Pebble Grey", hex: "#e0ded9" }
    ],
    sizes: ["One Size (35\" x 35\")"],
    stock: 25,
    reviews: [
      {
        id: "rev-7-1",
        author: "Olivia P.",
        role: "Mother of 3",
        rating: 5,
        date: "2026-07-04",
        comment: "This is easily the softest towel in our house. It is so thick that it absorbs water instantly without having to rub their skin. The ears are adorable too!",
        verified: true
      }
    ]
  },
  {
    id: "prod-8",
    name: "Soft Touch Sensory Stacking Blocks",
    category: "play",
    price: 32.00,
    rating: 4.7,
    reviewCount: 42,
    image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=600",
    description: "A set of 9 squeezeable, textured, food-grade silicone play blocks. Each block features a unique tactile surface, animal relief, counting numbers, and geometrical shapes to encourage comprehensive cognitive and sensory milestone progress.",
    features: [
      "100% food-grade medical-grade silicone, free from nitrosamines",
      "Perfectly sized for tiny hands to grasp, squeeze, and hold",
      "Safe to teething and mouthing—completely mold-resistant with solid seamless design",
      "Squeaks gently when compressed to stimulate auditory feedback"
    ],
    materials: "100% Pure Food-Grade Silicone, zero plastics, BPA-free",
    certifications: [
      {
        name: "EN71 Toys Safety",
        authority: "Intertek",
        description: "Strict European safety standard verifying non-toxicity and structural durability against tearing."
      }
    ],
    pediatricianNote: {
      approvedBy: "Dr. Gregory Wu, Developmental Psychologist & Pediatrician",
      note: "Teething infants explore their world primarily through mouthing. These blocks are made of pure, medical-grade silicone which cannot peel or chip, offering safe oral exploration while fostering fine-motor finger dexterity."
    },
    colors: [
      { name: "Pastel Earth", hex: "#dccfb8" }
    ],
    sizes: ["9-Block Set"],
    stock: 18,
    reviews: [
      {
        id: "rev-8-1",
        author: "Rachel B.",
        role: "Mom of an 8-month-old",
        rating: 5,
        date: "2026-05-30",
        comment: "My son is teething badly and gnaws on these constantly. Since they don't have squeaker holes at the bottom, water doesn't get trapped inside, so they don't grow mold. Best purchase ever!",
        verified: true
      }
    ]
  }
];
