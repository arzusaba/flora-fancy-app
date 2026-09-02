import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Flower2,
  ShoppingBag,
  X,
  Minus,
  Plus,
  Trash2,
  MapPin,
  Phone,
  Mail,
  Star,
  Truck,
  Leaf,
  HeartHandshake,
} from "lucide-react";

import heroImg from "../assets/hero.jpg";
import rosesImg from "../assets/bouquet-roses.jpg";
import wildflowerImg from "../assets/bouquet-wildflower.jpg";
import peonyImg from "../assets/bouquet-peony.jpg";
import tulipsImg from "../assets/bouquet-tulips.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
};

const PRODUCTS: Product[] = [
  {
    id: "blush-roses",
    name: "Blush Rose Bouquet",
    description: "Two dozen garden roses in soft pink, hand-tied in kraft paper.",
    price: 58,
    image: rosesImg,
    category: "Roses",
  },
  {
    id: "meadow-wildflower",
    name: "Meadow Wildflowers",
    description: "Daisies, lavender and fresh greenery, straight from the field.",
    price: 42,
    image: wildflowerImg,
    category: "Seasonal",
  },
  {
    id: "ivory-peony",
    name: "Ivory Peony Posy",
    description: "Cloud-soft white peonies wrapped in our signature white paper.",
    price: 68,
    image: peonyImg,
    category: "Weddings",
  },
  {
    id: "spring-tulips",
    name: "Spring Tulip Bunch",
    description: "A cheerful mix of coral, pink and yellow tulips.",
    price: 36,
    image: tulipsImg,
    category: "Seasonal",
  },
];

const CATEGORIES = [
  { name: "Roses", count: 12, image: rosesImg },
  { name: "Seasonal", count: 18, image: tulipsImg },
  { name: "Wildflowers", count: 9, image: wildflowerImg },
  { name: "Weddings", count: 7, image: peonyImg },
];

const TESTIMONIALS = [
  {
    name: "Amelia R.",
    text: "The bouquet for my mother's birthday was stunning — it lasted nearly two weeks. Petal & Stem is my go-to now.",
    rating: 5,
  },
  {
    name: "Daniel K.",
    text: "Ordered at 10am and the flowers were on her desk by noon. Gorgeous arrangement and such friendly service.",
    rating: 5,
  },
  {
    name: "Sofia M.",
    text: "They did our wedding flowers and every single table looked like a painting. I still get compliments.",
    rating: 5,
  },
];

type CartItem = { product: Product; qty: number };

function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const cartTotal = useMemo(
    () => cart.reduce((sum, i) => sum + i.qty * i.product.price, 0),
    [cart],
  );

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i,
        );
      }
      return [...prev, { product, qty: 1 }];
    });
    setCartOpen(true);
  };

  const changeQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.product.id === id ? { ...i, qty: i.qty + delta } : i,
        )
        .filter((i) => i.qty > 0),
    );
  };

  const removeItem = (id: string) =>
    setCart((prev) => prev.filter((i) => i.product.id !== id));

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <a href="#top" className="flex items-center gap-2">
            <Flower2 className="h-7 w-7 text-primary" />
            <span className="font-display text-2xl font-semibold tracking-tight">
              Petal &amp; Stem
            </span>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
            <a href="#shop" className="transition-colors hover:text-primary">Shop</a>
            <a href="#categories" className="transition-colors hover:text-primary">Categories</a>
            <a href="#about" className="transition-colors hover:text-primary">About</a>
            <a href="#contact" className="transition-colors hover:text-primary">Contact</a>
          </nav>
          <button
            onClick={() => setCartOpen(true)}
            className="relative inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            aria-label="Open cart"
          >
            <ShoppingBag className="h-4 w-4" />
            Cart
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
          <div>
            <p className="mb-4 inline-block rounded-full bg-sage px-4 py-1 text-xs font-semibold uppercase tracking-widest text-sage-foreground">
              Fresh every morning
            </p>
            <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
              Flowers that say it beautifully
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
              Hand-tied bouquets made from the freshest seasonal stems, delivered
              across town the same day.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#shop"
                className="rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Shop bouquets
              </a>
              <a
                href="#about"
                className="rounded-full border border-border bg-card px-7 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
              >
                Our story
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-blush" aria-hidden="true" />
            <img
              src={heroImg}
              alt="Inside the Petal & Stem flower shop, surrounded by fresh pink roses"
              width={1600}
              height={1000}
              className="relative rounded-3xl object-cover shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Featured bouquets */}
      <section id="shop" className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Featured bouquets
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
              This week's favorites, arranged by hand and ready for same-day delivery.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PRODUCTS.map((product) => (
              <article
                key={product.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    width={1024}
                    height={1024}
                    loading="lazy"
                    className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {product.category}
                  </span>
                  <h3 className="mt-1 font-display text-2xl font-semibold">{product.name}</h3>
                  <p className="mt-1 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {product.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold">${product.price}</span>
                    <button
                      onClick={() => addToCart(product)}
                      className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-center font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Shop by category
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORIES.map((cat) => (
              <a
                key={cat.name}
                href="#shop"
                className="group relative overflow-hidden rounded-2xl"
              >
                <img
                  src={cat.image}
                  alt={`${cat.name} category`}
                  width={1024}
                  height={1024}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-end bg-foreground/30 p-6 text-center">
                  <h3 className="font-display text-3xl font-semibold text-primary-foreground">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-primary-foreground/90">{cat.count} arrangements</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="bg-sage py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <h2 className="font-display text-4xl font-semibold tracking-tight text-sage-foreground sm:text-5xl">
                A little shop with a big love of flowers
              </h2>
              <p className="mt-6 leading-relaxed text-sage-foreground/80">
                Since 2012, Petal &amp; Stem has been the neighborhood's corner of
                calm. We source from local growers each morning, so every stem in
                your bouquet was in the ground just days ago.
              </p>
              <p className="mt-4 leading-relaxed text-sage-foreground/80">
                Whether it's a wedding, a birthday, or a "just because," we
                believe flowers should feel personal — never mass-produced.
              </p>
            </div>
            <div className="grid gap-4">
              {[
                { icon: Truck, title: "Same-day delivery", text: "Order by 2pm for delivery across town today." },
                { icon: Leaf, title: "Locally grown", text: "90% of our stems come from farms within 50 miles." },
                { icon: HeartHandshake, title: "Made by hand", text: "Every bouquet is tied by one of our florists." },
              ].map((f) => (
                <div key={f.title} className="flex gap-4 rounded-2xl bg-card/80 p-5">
                  <f.icon className="mt-1 h-6 w-6 shrink-0 text-primary" />
                  <div>
                    <h3 className="font-semibold">{f.title}</h3>
                    <p className="text-sm text-muted-foreground">{f.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-center font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Kind words
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure
                key={t.name}
                className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm"
              >
                <div className="flex gap-1 text-primary" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 leading-relaxed text-muted-foreground">
                  “{t.text}”
                </blockquote>
                <figcaption className="mt-4 font-semibold">— {t.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / Footer */}
      <footer id="contact" className="bg-foreground py-16 text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-2">
                <Flower2 className="h-6 w-6" />
                <span className="font-display text-2xl font-semibold">Petal &amp; Stem</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-primary-foreground/70">
                Fresh flowers, hand-tied daily. Open Monday to Saturday, 9am – 6pm.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-widest">Visit us</h3>
              <ul className="mt-4 space-y-3 text-sm text-primary-foreground/80">
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> 42 Garden Lane, Willow Creek
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" /> (555) 123-4567
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" /> hello@petalandstem.com
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-widest">Quick links</h3>
              <ul className="mt-4 space-y-2 text-sm text-primary-foreground/80">
                <li><a href="#shop" className="hover:opacity-80">Shop bouquets</a></li>
                <li><a href="#categories" className="hover:opacity-80">Categories</a></li>
                <li><a href="#about" className="hover:opacity-80">About us</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-primary-foreground/20 pt-6 text-center text-xs text-primary-foreground/60">
            © 2026 Petal &amp; Stem. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Cart drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50" role="dialog" aria-label="Shopping cart">
          <div
            className="absolute inset-0 bg-foreground/40"
            onClick={() => setCartOpen(false)}
          />
          <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-card shadow-2xl">
            <div className="flex items-center justify-between border-b border-border p-5">
              <h2 className="font-display text-2xl font-semibold">Your cart</h2>
              <button
                onClick={() => setCartOpen(false)}
                aria-label="Close cart"
                className="rounded-full p-2 transition-colors hover:bg-secondary"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              {cart.length === 0 ? (
                <p className="mt-10 text-center text-muted-foreground">
                  Your cart is empty. Add something beautiful!
                </p>
              ) : (
                <ul className="space-y-4">
                  {cart.map((item) => (
                    <li
                      key={item.product.id}
                      className="flex gap-4 rounded-xl border border-border p-3"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        width={1024}
                        height={1024}
                        className="h-20 w-20 rounded-lg object-cover"
                      />
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between">
                          <h3 className="font-semibold leading-tight">{item.product.name}</h3>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            aria-label={`Remove ${item.product.name}`}
                            className="text-muted-foreground transition-colors hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="mt-auto flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => changeQty(item.product.id, -1)}
                              aria-label="Decrease quantity"
                              className="rounded-full border border-border p-1 transition-colors hover:bg-secondary"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-6 text-center text-sm font-medium">{item.qty}</span>
                            <button
                              onClick={() => changeQty(item.product.id, 1)}
                              aria-label="Increase quantity"
                              className="rounded-full border border-border p-1 transition-colors hover:bg-secondary"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <span className="font-semibold">
                            ${item.qty * item.product.price}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {cart.length > 0 && (
              <div className="border-t border-border p-5">
                <div className="mb-4 flex items-center justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${cartTotal}</span>
                </div>
                <button className="w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
                  Checkout
                </button>
              </div>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}
