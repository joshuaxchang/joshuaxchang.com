---
title: "Building a Thoughtful E-commerce Experience"
description: "The design choices and technical challenges in creating a digital storefront"
order: 2
---

## High-Level Decisions

### The Pragmatic Choice for Privacy & Security

A core goal was to respect user privacy. I considered a self-hosted platform like [Medusa](https://github.com/medusajs/medusa), which would offer maximum control and minimize data collection. However, a self-hosted solution means I become personally responsible for securing all customer data, including shipping addresses and order histories. The risk of a data breach, however low, carries significant consequences for my customers.

I made the pragmatic decision to build on Shopify. While this introduces some required data collection for e-commerce functionality, it outsources the immense responsibility of data security to a platform architected to handle it. The risk of me mismanaging private data is far greater than the privacy cost of using Shopify's infrastructure. To mitigate the impact, I disabled all optional tracking features within Shopify and made the data opt-out link available to all visitors globally, rather than just in regions where it's legally mandated.

### From Prototype to Platform

The project began with a rapid prototype built using Astro and Tailwind by directly copying this personal site’s code base. Shopify Storefront API was added for a “headless” approach, which was excellent for quickly developing the front-end and establishing the visual identity.

Once the design was working, I made the strategic decision to rebuild the site as a custom Shopify Theme with Shopify’s Liquid templating language. This integrated approach is more robust for the long term. It simplifies content management for product tutorials, allows for easier integration with the Shopify app ecosystem, and provides a more cohesive system overall, trading the flexibility of a headless build for greater stability and maintainability.

The code for my shop's theme is [avaliable here](https://github.com/joshuaxchang/camphora-theme).

## Engineering the User Experience

### The “Living” Cart: Engineering for Perceived Performance
Server actions in e-commerce are not instant. An “Add to Cart” click requires a round trip to Shopify's servers that can take several hundred milliseconds. To prevent the site from feeling unresponsive, the interface is engineered to provide immediate feedback.

When a user clicks “Add to Cart”, a multi-stage process begins:

1. **Instant Acknowledgment:** The button is immediately disabled and its text is replaced with a loading spinner. This confirms the click was registered.
2. **Confirmation:** Upon a successful response from the server, the button text changes to “✓ Added!”. This on-button feedback is then paired with a subtle shake animation on the header's cart icon.

This confirmation method was a deliberate choice. Many sites will open a cart drawer or navigate to a new page after an item is added, often to create upsell opportunities. I find this flow disruptive, as it interrupts the user if they are still reading a description or viewing photos. To respect the user's attention, I opted for a minimally intrusive design. The button provides feedback where the user is already looking, while the shake animation leverages the human visual system's high sensitivity to motion. This effectively draws the eye to the cart to confirm the update without being distracting.

The cart drawer itself uses a hybrid debounce logic for quantity updates. If a user rapidly clicks the “+” button, sending a server request for each click would cause a half second delay every click. Instead, “debouncing” waits for the user to stop clicking for 400ms and then sends a single, consolidated update. This makes the interface feel fast while keeping backend communication clean. However, when a user clicks to remove an item (a more decisive action), the request is sent immediately for maximum responsiveness.

### Consistent Button Behavior: The Email Signup & Captcha Form
The same principles of feedback and respect for the user's flow apply to secondary actions, like the email signup form. This form also needs to handle API delays, but with an added complication: Shopify's unpredictable Captcha page.

This un-themeable page would confusingly show the site's footer again, presenting a duplicate signup form and an ambiguous "Submit" button. To solve this, a JavaScript snippet now detects the `/challenge` URL and adds a class to the body. A CSS rule then hides the footer entirely on that page, creating a focused, less confusing experience. The same rule is used to style the default Captcha button to match the theme's branding.

After a successful signup, the user is redirected back, and a brief "pulse" animation on the button draws their eye to the "Subscribed!" confirmation. This temporary feedback is intentional for a low-stakes action, in contrast to the high-stakes contact form, which displays a persistent success message.

### Solving the Back-Forward Cache Bug
A recurring issue appeared on mobile browsers, particularly Safari on iOS. If a user navigated to the checkout page and then used the browser's “back” button, the buttons on the product page would be stuck in their loading state. This is caused by an aggressive caching feature called the Back-Forward Cache (bfcache), which creates a snapshot of the page, including the button's temporary loading state.

The fix was to implement a `pageshow` event listener. This script checks if a page is being loaded from this cache (`event.persisted`) and, if so, forcefully resets all interactive buttons to their default, active state.

### The Product Gallery: Designing for Focus
The site uses overlays in two key places, but with a subtle difference in implementation to suit the user's intent.
* **Product Gallery:** When a user clicks to zoom in on a product image, the full-screen lightbox uses a background blur. The user's goal is to inspect the product in detail, and the blur removes background distractions, creating an immersive viewing environment.
* **Cart Drawer:** When the cart slides out, the background is dimmed but not blurred. Here, the user often wants to reference the page they were just on to confirm their selection. Maintaining this context is more important than creating immersion, so the background remains legible.

### The Mobile Menu Case Study
The mobile menu proved to be a significant technical challenge. The design goal was a modern “glass effect” menu that dropped down from a sticky header. The first issue appeared immediately, even in desktop browser emulators. When the page was scrolled to the very top, opening the menu would push the entire page content down, causing a jarring layout shift.

After much experimentation, I implemented a “1 pixel scroll hack” Just before the opening animation, a script programmatically scrolls the page down by one pixel. This tricks the browser into treating the sticky header as if it's already “stuck”, preventing the content push. A further refinement was needed for short pages: the script temporarily adds height to the footer to ensure the page is scrollable, and it leaves that height in place to prevent a jump when the menu closes.

This hack worked perfectly in the emulator. On a real iPhone, however, the original problem persisted. A rendering behavior in Safari still caused the main page content to scroll behind the open menu causing the layout shift. It became clear that trying to force a complex animation on top of a sticky header was fighting the browser.

The final, robust solution was to simplify. I replaced the complex drop-down with a simple, reliable fade-in/fade-out on a full-screen overlay. Even this had its own challenge: animating the `opacity` of an element that also has a `backdrop-blur` can create a race condition, where the blur effect appears to pop in at the end of the fade. The solution was careful layering and timing of the animations. This entire process was a lesson in development: the goal is not the most complex implementation, but the one that provides the most stable and predictable user experience across all devices.

### Small Fixes
* **Solving “Sticky Hover” on Touch Devices:** On touch devices, CSS hover states can get stuck after an element is tapped, leaving it in a visually active state. The fix was to make hover effects apply only on screens large enough for a mouse to be the likely input. Using Tailwind's responsive prefixes, styles like hover:-translate-y-1 were changed to md:hover:-translate-y-1, which keeps the interactive feel for desktop users while providing a clean, tap-only experience on mobile.

* **Responsive Product Page Buttons:** A horizontal row containing a quantity selector and two action buttons looked good on desktop but became squished on mobile. CSS Grid provided a flexible solution. On mobile, the layout uses a two-column grid that stacks the “Buy Now” button on its own row. On desktop, the grid expands to three columns, placing all elements in a single, well-proportioned line. This responsive structure optimizes the layout for both contexts.

* **The Unbalanced Header:** The small notification badge showing the item count in the cart would appear next to the cart icon, slightly shifting its position and making the header look unbalanced. The solution was to wrap the cart icon and its badge in a fixed-width container. The icon itself is centered within this container, so whether the badge is visible or not, the icon's position remains perfectly static, preserving the header's symmetry.

