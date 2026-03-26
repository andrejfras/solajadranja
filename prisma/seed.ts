import { PrismaClient } from "../src/generated/prisma/client.js";
import bcryptjs from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // ─── Courses ───
  const courses = [
    {
      slug: "beginner",
      name: "Začetni tečaj jadranja",
      shortDescription: "Osnovni tečaj jadranja za začetnike.",
      image: "/images/beginner.jpg",
      boat: "Express 770",
      priceEur: 149,
      priceLabel: "149€ na osebo",
      duration: "2 dnevni tečaj jadranja (skupaj 9ur)",
      description:
        "Imate opravljen izpit za voditelja čolna, a vam primanjkuje praktičnih izkušenj z jadranjem? Začetni tečaj jadranja je idealna osnova za samozavestno in varno upravljanje jadrnice. Tečaj je namenjen vsem, tudi kandidatom ki še nimajo izpita za voditelja čolna, vendar si želijo osvojiti temeljna znanja in veščine, potrebne za aktivno sodelovanje v jadralski posadki.",
      program: [
        "Uvod - spoznavanje jadrnice (tehnične značilnosti in pomorski izrazi)",
        "Učenje osnovnih vozlov (osmica, moški vozel, pašnjak, vrzni vozel)",
        "Organizacija posadke in delitev nalog",
        "Priprava jadrnice ter njene opreme",
        "Varnost na plovilu (analiza tveganj, varna uporaba opreme, premikanje po jadrnici in uporaba varnostne opreme)",
        "Varna plovba v marini in privezovanje (z motorjem)",
        "Priprava, dvig in osnove nastavljanja jader",
        "Plovba z jadri z vetrom iz različnih smeri (uporaba različnih tehnik jadranja in obratov ter skrajševanje jader)",
        "Upoštevanje pravil o izogibanju trčenju na morju v praksi",
      ],
      includes: [
        "2 dnevni tečaj jadranja (skupaj 9ur)",
        "Stroške najema plovila, goriva in zavarovanja",
        "Jadralski priročnik",
        "Video-gradiva",
      ],
      note: "Pri začetnem tečaju jadranja je poudarek na učenju jadranja in varni plovbi. Če vas zanima tečaj fokusiran na pristajanje in manevriranje v marini vam priporočamo Tečaj pristajanja.",
      relatedCourseSlug: "course-docking",
      sortOrder: 1,
    },
    {
      slug: "course-docking",
      name: "Tečaj pristajanja in manevriranja",
      shortDescription: "Tečaj varnega in natančnega pristajanja ter manevriranja v marinah.",
      image: "/images/docking.jpg",
      boat: "Y999",
      priceEur: 179,
      priceLabel: "179€ na osebo",
      duration: "2 dnevni tečaj pristajanja (skupaj 9ur)",
      description:
        "Naučite se varnega in samozavestnega pristajanja v marinah v vseh vremenskih pogojih.",
      program: [
        "Uvod - spoznavanje jadrnice (tehnične značilnosti in pomorski izrazi)",
        "Učenje osnovnih vozlov (osmica, moški vozel, pašnjak, vrzni vozel)",
        "Organizacija posadke in delitev nalog",
        "Priprava jadrnice ter njene opreme",
        "Varnost na plovilu (analiza tveganj, varna uporaba opreme, premikanje po jadrnici in uporaba varnostne opreme)",
        "Varna plovba v marini in privezovanje (z motorjem)",
        "Priprava, dvig in osnove nastavljanja jader",
        "Plovba z jadri z vetrom iz različnih smeri (uporaba različnih tehnik jadranja in obratov ter skrajševanje jader)",
        "Upoštevanje pravil o izogibanju trčenju na morju v praksi",
      ],
      includes: [
        "2 dnevni tečaj pristajanja (skupaj 9ur)",
        "Stroške najema plovila, goriva in zavarovanja",
        "Jadralski priročnik",
        "Video-gradiva",
      ],
      sortOrder: 2,
    },
    {
      slug: "course-rib",
      name: "Tečaj plovbe z gumenjakom",
      shortDescription: "Plovba in manevriranje z gumenjakom.",
      image: "/images/rib.jpg",
      boat: "Gumenjak 5m, 60hp",
      priceEur: 99,
      priceLabel: "99€ na osebo",
      duration: "4-urni tečaj plovbe na gumenjaku",
      description:
        "Imate izpit za voditelja čolna, a nimate praktičnega znanja za plovbo z gumenjakom? Opravite praktični tečaj plovbe z gumenjakom in se sami varno odpravite na morje s katerimkoli gumenjakom.",
      program: [
        "Spoznavanje gumenjaka",
        "Pregled in priprava čolna ter opreme",
        "Varna plovba po marini (uporaba pravil o izogibanju trčenju na morju)",
        "Glisiranje in manevriranje",
        "Pristajanje z bočnim privezovanjem in izplutje",
        "Privezovanje v četverovez in izplutje",
        "Sidranje",
      ],
      includes: [
        "4-urni tečaj plovbe na gumenjaku",
        "Stroške najema plovila, goriva in zavarovanja",
        "Priročnik za pristajanje",
        "Video-gradiva",
      ],
      note: "Tečajniki izmenjujejo vloge na čolnu, tako da vsak izmed njih izvede vse vaje iz programa tečaja.",
      sortOrder: 3,
    },
    {
      slug: "course-intermediate",
      name: "Nadaljevalni tečaj jadranja",
      shortDescription: "Navigacija ob obali, jadranje z genakerjem.",
      image: "/images/intermediate.jpg",
      priceEur: 180,
      priceLabel: "180€",
      description:
        "Naučite se varnega in samozavestnega pristajanja v marinah v vseh vremenskih pogojih.",
      sortOrder: 4,
    },
    {
      slug: "course-regatta",
      name: "Regatno jadranje",
      shortDescription: "Treningi manevrov in udeležba na regatah.",
      image: "/images/regatta.jpg",
      priceEur: 180,
      priceLabel: "180€",
      description:
        "Naučite se varnega in samozavestnega pristajanja v marinah v vseh vremenskih pogojih.",
      sortOrder: 5,
    },
  ];

  for (const course of courses) {
    await prisma.course.upsert({
      where: { slug: course.slug },
      update: course,
      create: course,
    });
  }

  // ─── Boats ───
  const boats = [
    { name: "Gumenjak", image: "/images/erikgumon.jpg", priceLabel: "289€", specs: "7m, 150KM", sortOrder: 1 },
    { name: "Šolska jadrnica - Express 770", image: "/images/jajca.jpg", priceLabel: "115€/dan", specs: "7,7m, 5KM", sortOrder: 2 },
    { name: "VSR 5.8", image: "/images/vsr.jpg", priceLabel: "199€/dan", specs: "5.8m, 70KM", sortOrder: 3 },
  ];

  await prisma.boat.deleteMany();
  for (const boat of boats) {
    await prisma.boat.create({ data: boat });
  }

  // ─── Admin User ───
  const username = process.env.ADMIN_USER || "admin";
  const password = process.env.ADMIN_PASS || "admin123";
  const hash = await bcryptjs.hash(password, 10);

  await prisma.adminUser.upsert({
    where: { username },
    update: { passwordHash: hash },
    create: { username, passwordHash: hash },
  });

  console.log("Seed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
