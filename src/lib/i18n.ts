export type Locale = "en" | "fr";

const translations = {
  en: {
    nav: {
      home: "Home",
      programs: "Programs",
      events: "Events",
      about: "About",
      contact: "Contact",
      more: "More",
      podcast: "Podcast",
      communityMoments: "Community Moments",
      impact: "Impact & Initiatives",
      partners: "Partners",
      viewEvents: "View Events",
    },
    hero: {
      location: "Ottawa, Ontario · Muslim Community",
      headlineBefore: "Crafting a space for",
      headlineHighlight: "Muslim youth",
      headlineAfter: "to confidently embrace their identity.",
      subtext:
        "Events, programs, and community initiatives designed to empower, connect, and inspire. For brothers, sisters, youth, and families across Ottawa.",
      cta1: "View Events",
      cta2: "Explore Programs",
      scroll: "Scroll",
    },
    about: {
      label: "About Salam Society",
      title: "A home for Muslim youth",
      titleHighlight: "in Ottawa",
      p1: "Salam Society is a Muslim community organization based in Ottawa, Ontario — dedicated to creating meaningful spaces for youth, families, and the broader Muslim community.",
      p2: "We organize events and programs that speak to brothers, sisters, youth, and kids. From weekly halaqas and sports to community service and family celebrations, every initiative is designed with purpose and care.",
      p3: "Our mission is simple: to craft a space where Muslim youth can confidently embrace their identity — and find belonging, growth, and community along the way.",
      cta1: "See Upcoming Events",
      cta2: "Get in Touch",
      pillars: [
        {
          icon: "🕌",
          title: "Faith-Centered",
          description:
            "Everything we do is rooted in Islamic values — compassion, knowledge, brotherhood, and service.",
        },
        {
          icon: "👥",
          title: "Community-First",
          description:
            "We create spaces where Muslims of all ages and backgrounds feel welcomed, seen, and valued.",
        },
        {
          icon: "⚡",
          title: "Youth-Driven",
          description:
            "We believe in the power of Muslim youth — our programs are built to support them at every stage.",
        },
        {
          icon: "🤲",
          title: "Service-Oriented",
          description:
            "From food drives to outreach, we are committed to serving Ottawa and the broader community.",
        },
      ],
    },
    events: {
      label: "Events",
      title: "What\u2019s coming ",
      highlight: "up next",
      description:
        "Don\u2019t miss out \u2014 upcoming events for the whole community. From special programs to community gatherings, there\u2019s something for everyone.",
      seeAll: "See All Events",
      noEvents: "No upcoming events right now.",
      checkBack: "Check back soon \u2014 we\u2019re always planning something!",
    },
    programs: {
      label: "Programs",
      title: "Built for every ",
      highlight: "member of the community",
      description:
        "Ongoing programs for brothers, sisters, youth, and families \u2014 designed to educate, connect, and inspire.",
      viewAll: "View All Programs",
      comingSoon: "Programs Coming Soon",
      comingSoonSub:
        "We\u2019re building something great. Follow us on Instagram to be the first to know.",
      followUs: "Follow on Instagram",
    },
    partners: {
      label: "Community Partners",
      title: "Organizations & mosques",
      titleHighlight: "we work with",
      subtitle:
        "Salam Society is proud to collaborate with mosques and organizations across Ottawa who share our commitment to community and service.",
      comingSoon: "Partners Coming Soon",
      comingSoonSub:
        "We\u2019ll be featuring our community partners here. Stay tuned!",
    },
    impact: {
      label: "Impact & Initiatives",
      title: "Serving the community",
      titleHighlight: "beyond the masjid",
      subtitle:
        "From street outreach to school drives, Salam Society is committed to making a real difference in Ottawa and beyond.",
      statusActive: "Active",
      statusCompleted: "Completed",
      statusUpcoming: "Upcoming",
      comingSoon: "Initiatives Coming Soon",
      comingSoonSub:
        "Our community initiatives will be featured here. Follow our Instagram to stay updated on our latest work.",
      followUs: "Follow on Instagram",
    },
    podcast: {
      label: "Podcast",
      title: "Listen to the",
      titleHighlight: "Salam Society",
      titleEnd: "podcast",
      subtitle:
        "Conversations about faith, identity, community, and what it means to be a Muslim youth in Canada. Real talks from the Salam Society team.",
      watchYoutube: "Watch on YouTube",
      episode: "Episode",
    },
    moments: {
      label: "Community Moments",
      title: "Real moments.",
      titleHighlight: "Real community.",
      subtitle:
        "A glimpse into the events, programs, and gatherings that make Salam Society special.",
      seeMore: "See More on Instagram",
      followCaption: "on Instagram for the latest moments",
    },
    contact: {
      label: "Get in Touch",
      title: "We\u2019d love to",
      titleHighlight: "hear from you",
      subtitle:
        "Questions about events, programs, or how to get involved? Reach out and our team will get back to you.",
      emailLabel: "Email",
      locationLabel: "Location",
      nameLabel: "Full Name",
      namePlaceholder: "Your name",
      emailFieldLabel: "Email Address",
      emailPlaceholder: "your@email.com",
      messageLabel: "Message",
      messagePlaceholder: "How can we help you?",
      send: "Send Message",
      sending: "Sending...",
      successTitle: "Message sent!",
      successSub: "Thank you for reaching out. We\u2019ll be in touch soon, in sha Allah.",
      sendAnother: "Send another message",
      errorMsg: "Something went wrong. Please try again or email us directly.",
      nameRequired: "Name is required",
      emailRequired: "Email is required",
      emailInvalid: "Enter a valid email",
      messageRequired: "Message is required",
      messageTooShort: "Message is too short",
    },
    eventsPage: {
      label: "Salam Society Events",
      heading: "What\u2019s happening",
      headingHighlight: "in the community",
      subtext:
        "From special programs to community gatherings \u2014 always something on at Salam Society.",
      upcomingEvents: "Upcoming Events",
      pastEvents: "Past Events",
      noUpcoming: "No upcoming events right now.",
      checkBack: "Check back soon \u2014 we\u2019re always planning something!",
      noUpcomingFor: (cat: string) => `No upcoming events for ${cat} at the moment.`,
    },
    programsPage: {
      label: "Salam Society Programs",
      heading: "Programs for",
      headingHighlight: "every member",
      headingEnd: "of the community",
      subtext:
        "Ongoing programs for brothers, sisters, youth, and families \u2014 built to educate, connect, and inspire.",
      activePrograms: "Active Programs",
      pastPrograms: "Past Programs",
      noPrograms: "No programs found.",
      noProgramsFor: (cat: string) => `No programs for ${cat} right now.`,
      noProgramsSoon: "Programs will appear here soon.",
    },
    footer: {
      tagline:
        "Crafting a space for Muslim youth to confidently embrace their identity.",
      rights: "All rights reserved.",
    },
  },

  fr: {
    nav: {
      home: "Accueil",
      programs: "Programmes",
      events: "\u00c9v\u00e9nements",
      about: "\u00c0 propos",
      contact: "Contact",
      more: "Plus",
      podcast: "Podcast",
      communityMoments: "Moments communautaires",
      impact: "Impact & Initiatives",
      partners: "Partenaires",
      viewEvents: "Voir les événements",
    },
    hero: {
      location: "Ottawa, Ontario \u00b7 Communaut\u00e9 musulmane",
      headlineBefore: "Cr\u00e9er un espace pour",
      headlineHighlight: "les jeunes musulmans",
      headlineAfter: "d\u2019embrasser leur identit\u00e9 avec confiance.",
      subtext:
        "\u00c9v\u00e9nements, programmes et initiatives communautaires con\u00e7us pour autonomiser, connecter et inspirer. Pour fr\u00e8res, s\u0153urs, jeunes et familles \u00e0 Ottawa.",
      cta1: "Voir les \u00e9v\u00e9nements",
      cta2: "Explorer les programmes",
      scroll: "D\u00e9filer",
    },
    about: {
      label: "\u00c0 propos de Salam Society",
      title: "Un foyer pour les jeunes musulmans",
      titleHighlight: "\u00e0 Ottawa",
      p1: "Salam Society est une organisation communautaire musulmane bas\u00e9e \u00e0 Ottawa, en Ontario \u2014 d\u00e9di\u00e9e \u00e0 cr\u00e9er des espaces significatifs pour les jeunes, les familles et la communaut\u00e9 musulmane.",
      p2: "Nous organisons des \u00e9v\u00e9nements et programmes pour les fr\u00e8res, s\u0153urs, jeunes et enfants. Des halaqas hebdomadaires aux sports, en passant par le service communautaire et les c\u00e9l\u00e9brations familiales.",
      p3: "Notre mission : cr\u00e9er un espace o\u00f9 les jeunes musulmans peuvent embrasser leur identit\u00e9 avec confiance \u2014 et trouver appartenance, croissance et communaut\u00e9.",
      cta1: "Voir les \u00e9v\u00e9nements",
      cta2: "Contactez-nous",
      pillars: [
        {
          icon: "🕌",
          title: "Centr\u00e9 sur la foi",
          description:
            "Tout ce que nous faisons est ancr\u00e9 dans les valeurs islamiques \u2014 compassion, connaissance, fraternit\u00e9 et service.",
        },
        {
          icon: "👥",
          title: "Communaut\u00e9 d\u2019abord",
          description:
            "Nous cr\u00e9ons des espaces o\u00f9 les musulmans de tous \u00e2ges se sentent accueillis, vus et valoris\u00e9s.",
        },
        {
          icon: "⚡",
          title: "Port\u00e9 par la jeunesse",
          description:
            "Nous croyons au pouvoir des jeunes musulmans \u2014 nos programmes sont con\u00e7us pour les soutenir \u00e0 chaque \u00e9tape.",
        },
        {
          icon: "🤲",
          title: "Orient\u00e9 vers le service",
          description:
            "Des collectes alimentaires \u00e0 la sensibilisation, nous nous engageons \u00e0 servir Ottawa et la communaut\u00e9.",
        },
      ],
    },
    events: {
      label: "\u00c9v\u00e9nements",
      title: "Ce qui arrive ",
      highlight: "bient\u00f4t",
      description:
        "Ne manquez pas les prochains \u00e9v\u00e9nements pour toute la communaut\u00e9. Des programmes sp\u00e9ciaux aux rassemblements communautaires, il y en a pour tout le monde.",
      seeAll: "Voir tous les \u00e9v\u00e9nements",
      noEvents: "Aucun \u00e9v\u00e9nement \u00e0 venir pour le moment.",
      checkBack: "Revenez bient\u00f4t \u2014 nous planifions toujours quelque chose\u00a0!",
    },
    programs: {
      label: "Programmes",
      title: "Con\u00e7u pour chaque ",
      highlight: "membre de la communaut\u00e9",
      description:
        "Programmes continus pour fr\u00e8res, s\u0153urs, jeunes et familles \u2014 con\u00e7us pour \u00e9duquer, connecter et inspirer.",
      viewAll: "Voir tous les programmes",
      comingSoon: "Programmes \u00e0 venir",
      comingSoonSub:
        "Nous construisons quelque chose de formidable. Suivez-nous sur Instagram pour \u00eatre les premiers inform\u00e9s.",
      followUs: "Suivre sur Instagram",
    },
    partners: {
      label: "Partenaires communautaires",
      title: "Organisations et mosqu\u00e9es",
      titleHighlight: "avec qui nous travaillons",
      subtitle:
        "Salam Society est fier de collaborer avec des mosqu\u00e9es et organisations \u00e0 Ottawa qui partagent notre engagement envers la communaut\u00e9.",
      comingSoon: "Partenaires \u00e0 venir",
      comingSoonSub:
        "Nous pr\u00e9senterons bient\u00f4t nos partenaires communautaires ici. Restez \u00e0 l\u2019\u00e9coute\u00a0!",
    },
    impact: {
      label: "Impact et initiatives",
      title: "Servir la communaut\u00e9",
      titleHighlight: "au-del\u00e0 de la mosqu\u00e9e",
      subtitle:
        "Des sorties de rue aux collectes scolaires, Salam Society s\u2019engage \u00e0 faire une vraie diff\u00e9rence \u00e0 Ottawa et au-del\u00e0.",
      statusActive: "Actif",
      statusCompleted: "Termin\u00e9",
      statusUpcoming: "\u00c0 venir",
      comingSoon: "Initiatives \u00e0 venir",
      comingSoonSub:
        "Nos initiatives communautaires seront pr\u00e9sent\u00e9es ici. Suivez notre Instagram pour rester inform\u00e9.",
      followUs: "Suivre sur Instagram",
    },
    podcast: {
      label: "Podcast",
      title: "\u00c9coutez le podcast",
      titleHighlight: "Salam Society",
      titleEnd: "",
      subtitle:
        "Conversations sur la foi, l\u2019identit\u00e9, la communaut\u00e9 et ce que signifie \u00eatre un jeune musulman au Canada. Des discussions authentiques de l\u2019\u00e9quipe Salam Society.",
      watchYoutube: "Regarder sur YouTube",
      episode: "\u00c9pisode",
    },
    moments: {
      label: "Moments communautaires",
      title: "De vrais moments.",
      titleHighlight: "Une vraie communaut\u00e9.",
      subtitle:
        "Un aper\u00e7u des \u00e9v\u00e9nements, programmes et rassemblements qui rendent Salam Society sp\u00e9cial.",
      seeMore: "Voir plus sur Instagram",
      followCaption: "sur Instagram pour les derniers moments",
    },
    contact: {
      label: "Contactez-nous",
      title: "Nous serions ravis",
      titleHighlight: "de vous entendre",
      subtitle:
        "Des questions sur les \u00e9v\u00e9nements, programmes ou comment s\u2019impliquer\u00a0? Contactez-nous.",
      emailLabel: "Courriel",
      locationLabel: "Lieu",
      nameLabel: "Nom complet",
      namePlaceholder: "Votre nom",
      emailFieldLabel: "Adresse courriel",
      emailPlaceholder: "votre@courriel.com",
      messageLabel: "Message",
      messagePlaceholder: "Comment pouvons-nous vous aider\u00a0?",
      send: "Envoyer le message",
      sending: "Envoi en cours...",
      successTitle: "Message envoy\u00e9\u00a0!",
      successSub: "Merci de nous avoir contact\u00e9s. Nous vous r\u00e9pondrons bient\u00f4t, in sha Allah.",
      sendAnother: "Envoyer un autre message",
      errorMsg: "Quelque chose a mal tourn\u00e9. R\u00e9essayez ou envoyez-nous un courriel directement.",
      nameRequired: "Le nom est requis",
      emailRequired: "Le courriel est requis",
      emailInvalid: "Entrez un courriel valide",
      messageRequired: "Le message est requis",
      messageTooShort: "Le message est trop court",
    },
    eventsPage: {
      label: "\u00c9v\u00e9nements Salam Society",
      heading: "Ce qui se passe",
      headingHighlight: "dans la communaut\u00e9",
      subtext:
        "Des programmes sp\u00e9ciaux aux rassemblements communautaires \u2014 il se passe toujours quelque chose \u00e0 Salam Society.",
      upcomingEvents: "\u00c9v\u00e9nements \u00e0 venir",
      pastEvents: "\u00c9v\u00e9nements pass\u00e9s",
      noUpcoming: "Aucun \u00e9v\u00e9nement \u00e0 venir pour le moment.",
      checkBack: "Revenez bient\u00f4t \u2014 nous planifions toujours quelque chose\u00a0!",
      noUpcomingFor: (cat: string) => `Aucun \u00e9v\u00e9nement \u00e0 venir pour ${cat} pour le moment.`,
    },
    programsPage: {
      label: "Programmes Salam Society",
      heading: "Programmes pour",
      headingHighlight: "chaque membre",
      headingEnd: "de la communaut\u00e9",
      subtext:
        "Programmes continus pour fr\u00e8res, s\u0153urs, jeunes et familles \u2014 con\u00e7us pour \u00e9duquer, connecter et inspirer.",
      activePrograms: "Programmes actifs",
      pastPrograms: "Programmes passés",
      noPrograms: "Aucun programme trouvé.",
      noProgramsFor: (cat: string) => `Aucun programme pour ${cat} pour le moment.`,
      noProgramsSoon: "Les programmes apparaîtront bientôt.",
    },
    footer: {
      tagline:
        "Cr\u00e9er un espace pour que les jeunes musulmans embrassent leur identit\u00e9 avec confiance.",
      rights: "Tous droits r\u00e9serv\u00e9s.",
    },
  },
} as const;

export type Translations = typeof translations.en;

export function getT(locale: Locale): Translations {
  return translations[locale] as unknown as Translations;
}
