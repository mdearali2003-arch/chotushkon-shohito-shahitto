import Navigation from "@/components/Navigation";

const Poetry = () => {
  const poems = [
    {
      id: 1,
      title: "আকাশের নীল",
      author: "রবীন্দ্রনাথ ঠাকুর",
      preview: "আকাশের নীল রঙে মিশে যায় সব স্বপ্ন\nহৃদয়ের গভীরে লুকিয়ে থাকে অজানা গান...",
      content: "আকাশের নীল রঙে মিশে যায় সব স্বপ্ন\nহৃদয়ের গভীরে লুকিয়ে থাকে অজানা গান\nপাখিদের কূজনে ভরে ওঠে এ মন\nপ্রেমের মূর্ছনায় হারিয়ে যাই আমি..."
    },
    {
      id: 2,
      title: "বর্ষার গান",
      author: "কাজী নজরুল ইসলাম",
      preview: "মেঘের গর্জনে জেগে ওঠে প্রাণ\nবৃষ্টির ছন্দে নাচে মাটির সুবাস...",
      content: "মেঘের গর্জনে জেগে ওঠে প্রাণ\nবৃষ্টির ছন্দে নাচে মাটির সুবাস\nজলের ফোঁটায় ধুয়ে যায় সব জ্বালা\nনতুন সকালের আশায় ভরে যায় বুক..."
    },
    {
      id: 3,
      title: "স্মৃতির পাতা",
      author: "জীবনানন্দ দাশ",
      preview: "স্মৃতির পাতায় লেখা আছে কত কথা\nহারিয়ে যাওয়া দিনের মধুর গল্প...",
      content: "স্মৃতির পাতায় লেখা আছে কত কথা\nহারিয়ে যাওয়া দিনের মধুর গল্প\nচোখের জলে ভেসে যায় অতীতের ছবি\nমনের কোণে থাকে শুধু একটা নাম..."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold font-bengali-display literary-gradient-text mb-4">
            কবিতা
          </h1>
          <p className="text-xl text-muted-foreground font-bengali">
            হৃদয়ের গভীর অনুভূতির প্রকাশ
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {poems.map((poem, index) => (
            <div 
              key={poem.id}
              className="literary-card hover:border-accent/30 animate-slide-up group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="text-xl font-semibold font-bengali-display text-foreground mb-2 group-hover:text-accent transition-colors">
                {poem.title}
              </h3>
              <p className="text-sm text-muted-foreground font-bengali mb-3">
                — {poem.author}
              </p>
              <div className="prose-bengali">
                <p className="text-foreground/80 leading-relaxed whitespace-pre-line">
                  {poem.preview}
                </p>
              </div>
              <button className="mt-4 text-accent hover:text-accent/80 font-bengali font-medium transition-colors hover:underline">
                সম্পূর্ণ পড়ুন →
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Poetry;