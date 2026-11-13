// Edit prices, estates and content here. Everything on the site reads from this file.
const CONFIG={formEndpoint:"",email:"customercare.rollingstonerealty@gmail.com",phone:"+234 806 772 3726"}; // paste a Formspree/Web3Forms URL into formEndpoint
const L=(n,m)=>[n+" sqm",n,m];
const ESTATES=[
    {
        slug: "elite-city", name: "Elite City", loc: "Pyakasa", title: "C of O", plan: true, sizes: [L(150, 4.5), L(250, 7.5), L(350, 10.5), L(400, 12), L(550, 16.5), L(1000, 30), ["1 hectare", 10000, 200]],
    
 build:{150:"2 Bedroom Terrace Duplex + BQ",250:"4 Bedroom Terrace Duplex + BQ",350:"3 Bedroom Semi Detached Duplex + BQ",400:"4 Bedroom Fully Detached Duplex + BQ",550:"4 Bedroom Mansionette with 2 Bedroom BQ",1000:"3 Bedroom Block of Flats"}},
    {
        slug:
            "brick-city", name: "Brick City Estate", loc: "Kuje", title: "R of O", sizes: [L(250, 7), L(450, 12.6), L(500, 10)]
    }, // 500 sqm price copied from live site; looks like a typo
    {
        slug:
            "paragon-hills-2", name: "Paragon Hills 2", loc: "Katampe Extension", title: "C of O", sizes: [L(180, 18), L(250, 25), L(350, 35), L(400, 40), L(1000, 100)]
    },
    {
        slug:
            "nobles-villa", name: "The Nobles Villa", loc: "Asokoro Extension", title: "NAGIS", sizes: [L(250, 14), L(400, 22.4), L(500, 28)]
    },
    {
        slug:
            "pine-view", name: "Pine View Estate", loc: "Guzape 2", title: "C of O", sizes: [L(180, 12.5), L(350, 24), L(450, 31)]
    },
    {
        slug:
            "cheta-city", name: "Cheta City", loc: "Katampe Extension", title: "C of O", sizes: [L(250, 50), L(500, 100), L(1000, 200)]
    }];

const BUD=["Under ₦10M","₦10M to ₦30M","₦30M to ₦100M","Above ₦100M"],NEXT=["Free inspection","Consultation call"];
// Services. Each step is [question, options]; an option can be [label, link] to branch to another page. Descriptions are drafts to confirm with the company.

const SERVICES=[
    {
        id:
            "marketing", title: "Real Estate Marketing", desc: "Verified land in Abuja’s growing corridors, with free inspections and flexible payment.", steps: [["Which estate?", [...ESTATES.map(e => e.name), "Not sure, recommend one"]], ["Are you buying or referring?", ["Buying", ["Referring someone", "earn.html"]]], ["How would you like to pay?", ["Outright", "Installments"]], ["Your budget", BUD], ["What next?", NEXT]]
    },
    {
        id:
            "construction", title: "Construction", desc: "Build your home or commercial property on your plot, from plan to completion.", steps: [["What are you building?", ["Home", "Commercial building", "Renovation", "Not sure"]], ["Do you own land?", ["Yes, in a Rolling Stone estate", "Yes, elsewhere", ["Not yet", "services.html?service=marketing"]]], ["Your budget", BUD], ["Timeline", ["Within 3 months", "3 to 6 months", "6 to 12 months", "Just exploring"]], ["What next?", ["Site visit", "Consultation call"]]]
    },
    {
        id:
            "infrastructure", title: "Infrastructure", desc: "Roads, drainage, power, water and smart systems that make an estate liveable.", steps: [["Who is it for?", ["Estate developer", "Community or association", "Commercial property"]], ["What is needed?", ["Roads and drainage", "Power and water", "Smart or proptech systems", "Not sure"]], ["Project stage", ["Planning", "Ongoing", "Existing, needs upgrade"]], ["What next?", ["Consultation call", "Site visit"]]]
    },

    {
        id:
            "consultation", title: "Real Estate Consultation", desc: "Straight advice on land banking, title checks and what to buy first.", steps: [["Topic", ["Land banking and investment", "Checking title documents", "Buying advice", "Selling a property"]], ["Your experience", ["First-time buyer", "Returning buyer"]], ["Your budget", BUD], ["Preferred format", ["Phone call", "WhatsApp chat", "In person at Garki 2"]]]
    },
    {
        id:
            "management", title: "Estate Management", desc: "Day-to-day care of your property or estate, so it keeps its value.", steps: [["You are a", ["Landlord", "Estate owner", "Residents’ association"]], ["How many units or plots?", ["1 to 5", "6 to 20", "More than 20"]], ["What do you need?", ["Maintenance", "Rent collection", "Security", "Record keeping"]], ["What next?", ["Consultation call", "Site visit"]]]
    }];

const TEAM = [["Ndubuisi Justice Aroh", "Managing Director", "2348067723726"], ["Chibuike O Anih", "General Manager", "2347031573383"], ["Nwadinobi Victor", "Head of Operation", "2347038644950"]];

const INSIGHTS = [["Event", "Upcoming housing show", "Sample card: announce an event and where to find the team.", "9 Jul 2026"], ["Promo", "Promo sales on selected estates", "Sample card: summarise an offer in text so it can be read and searched.", "9 Jul 2026"], ["Site inspection", "Inspection day at an estate", "Sample card: add a photo and a short recap of the visit.", "Date"]];

const REVIEWS = [["Investing in Green Hills was one of the best decisions I’ve made. The development pace is impressive and the ROI projections are highly promising.", "Amina Bello", "Investor"], ["I have enjoyed good discounts from Rolling Stone Realty Ltd as a returning subscriber", "Engr Okoro", "Engineer"], ["As a young tech bro the only way I was able to afford my own space was through a payment plan. Paying in installment was a huge help.", "Ferdinand", "Backend Developer"], ["I am surprised at how quick I was given my land ownership documents. Really appreciate the speed.", "Mr Gana", "Driver"], ["I love the fact inspection is free of charge", "Mrs Chioma", "Store Owner"], ["What stood out to me was their customer service. From site inspection to document handover, the team handled everything with professionalism.", "Dr. Samuel Adeyemi", "Business Owner"], ["I didn’t have much time to go for an inspection but I sent my brother in my stead who also took a live video of the site for me. I was satisfied, made payments and had my documents delivered to my office", "Dr. George", "Medical Doctor"], ["The strategic location guarantees appreciation. As an investor, the secure FCDA CofO title was the absolute clincher for me.", "Femi Ojo", "Real Estate Investor"], ["I never thought I could own land in a city like Abuja, but my marketer told me all about land banking and today through her guidance, I am a land lady", "Madam Janet", "Civil Servant"]];

const FAQ=[["What legal documents do I receive after full payment?","[Placeholder: confirm with the company.]"],["Are there hidden charges or developmental fees?","[Placeholder: confirm with the company.]"],["Can I pay in installments?","Yes. On Elite City the plan is a 30% deposit, then 3 to 6 months with no added interest. Confirm terms for other estates."],["When can I start building on my plot?","[Placeholder: confirm with the company.]"]];
